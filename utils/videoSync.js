// 2026-11-18: 정면(main) 영상에 측면(side) 영상을 맞추는 동기화.
//   이전에는 매 프레임(초당 60회) 0.08초 넘게 어긋나면 측면 영상을 강제 이동(seek)시켜,
//   이동 → 버퍼링 → 더 뒤처짐 → 다시 이동이 반복되며 영상이 버벅였습니다.
//   - 재생 중: 0.25초마다만 확인. 조금 어긋나면 재생 속도를 살짝 조절해 따라잡고,
//              크게(0.3초 초과) 어긋났을 때만 한 번 이동합니다.
//   - 정지 중(일시정지·구간 이동): 정확한 위치로 바로 맞춥니다.
const CHECK_MS = 250     // 재생 중 확인 주기
const HARD_DRIFT = 0.3   // 이 이상 어긋나면 이동(seek)
const SOFT_DRIFT = 0.04  // 이 이상 어긋나면 속도 조절
const RATE_NUDGE = 0.08  // 속도 조절 폭(±8%)

export const createSideVideoSync = (getMain, getSide) => {
  let lastCheck = 0

  const num = (v) => Number(v) || 0
  const setRate = (p, r) => { try { if (p.playbackRate() !== r) p.playbackRate(r) } catch {} }
  const align = (side, t, tol) => {
    try { if (Math.abs(num(side.currentTime()) - t) > tol) side.currentTime(t) } catch {}
  }

  const onTime = (t) => {
    const side = getSide()
    if (!side) return
    const main = getMain()
    const sec = num(t)

    // 정면 영상이 멈춰 있으면(일시정지·구간 이동) 정확히 맞춤
    if (!main || main.paused()) {
      setRate(side, 1)
      align(side, sec, 0.03)
      return
    }

    const now = performance.now()
    if (now - lastCheck < CHECK_MS) return
    lastCheck = now

    // 측면 영상이 이동 중이거나 버퍼가 부족하면 건드리지 않음(끊김 악순환 방지)
    if (side.paused() || side.seeking() || side.readyState() < 3) return

    const rate = num(main.playbackRate()) || 1
    const drift = num(side.currentTime()) - sec
    const abs = Math.abs(drift)
    if (abs > HARD_DRIFT) {
      setRate(side, rate)
      try { side.currentTime(sec) } catch {}
    } else if (abs > SOFT_DRIFT) {
      setRate(side, rate * (drift > 0 ? 1 - RATE_NUDGE : 1 + RATE_NUDGE))
    } else {
      setRate(side, rate)
    }
  }

  const onState = (state) => {
    const side = getSide()
    if (!side) return
    const main = getMain()
    const sec = num(main?.currentTime?.())
    if (state === 'play') {
      setRate(side, num(main?.playbackRate?.()) || 1)
      align(side, sec, 0.05)
      lastCheck = performance.now()
      try { side.play()?.catch(() => {}) } catch {}
    } else {
      try { side.pause() } catch {}
      setRate(side, 1)
      if (state !== 'ended') align(side, sec, 0.03)
    }
  }

  return { onTime, onState }
}
