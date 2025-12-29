<!-- components/videoPlayer.vue -->
<template>
  <div class="video-wrapper">
    <client-only>
      <!-- src 있을 때만 보여주고, 에러로 가리지 않음 -->
      <video
        v-show="hasSrc"
        ref="videoRef"
        class="video-js vjs-default-skin"
        playsinline
        webkit-playsinline
        preload="auto"
        muted
        :poster="poster || defaultPoster"
        crossorigin="anonymous"
      ></video>

      <div v-if="!hasSrc" class="no-data" />
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, nextTick } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const props = defineProps({
  videoinfo: { type: Object, required: true }, // { fit_video_path, fit_video_type }
  autoplay:  { type: Boolean, default: true },
  poster:    { type: String,  default: '' },
})

const defaultPoster = '/images/default/img_coach_09.png'
const videoRef = ref(null)
let player = null
let pendingSeek = null   // ✅ 준비 전 호출된 seek를 저장해두는 큐

const srcUrl  = computed(() => props.videoinfo?.fit_video_path || '')
const hasSrc  = computed(() => !!srcUrl.value)
const srcType = computed(() => {
  const url = (srcUrl.value || '').toLowerCase()
  if (url.endsWith('.m3u8')) return 'application/x-mpegURL'
  if (url.endsWith('.webm')) return 'video/webm'
  if (url.endsWith('.ogg') || url.endsWith('.ogv')) return 'video/ogg'
  return 'video/mp4'
})

const initPlayer = () => {
  if (!videoRef.value || !hasSrc.value) return

  player = videojs(videoRef.value, {
    controls: true,
    autoplay: props.autoplay ? 'muted' : false, // ✅ 자동재생 안전모드
    preload: 'metadata',
    fluid: true,
    sources: [{ src: srcUrl.value, type: srcType.value }],
  })

  // ✅ 음소거 보장 (정책 우회)
  player.muted(true)

  // ✅ 메타데이터 이후에 pendingSeek 수행
  const flushPendingSeek = () => {
    if (pendingSeek != null) {
      try { player.currentTime(Math.max(0, pendingSeek)) } catch {}
      pendingSeek = null
    }
  }
  player.one('loadedmetadata', flushPendingSeek)

  // ✅ 자동재생 시도(여러 타이밍에서 안전하게)
  const tryPlay = () => {
    if (!props.autoplay) return
    player.play()?.catch(() => {})
  }
  player.one('loadeddata', tryPlay)
  player.one('canplay', tryPlay)

  player.on('error', () => {
    console.error('VideoJS Error:', player?.error())
  })
}

onMounted(async () => {
  if (hasSrc.value) {
    await nextTick()
    initPlayer()
  }
})

watch(srcUrl, async (newUrl) => {
  if (!newUrl) return

  if (!player) {
    await nextTick()
    initPlayer()
    return
  }

  // ✅ 소스 교체
  player.muted(true)
  player.src({ src: newUrl, type: srcType.value })
  player.load()

  // ✅ 소스 바뀐 뒤에도 pendingSeek가 있으면 적용
  const flushPendingSeek = () => {
    if (pendingSeek != null) {
      try { player.currentTime(Math.max(0, pendingSeek)) } catch {}
      pendingSeek = null
    }
  }
  player.one('loadedmetadata', flushPendingSeek)

  if (props.autoplay) {
    const tryPlay = () => player.play()?.catch(() => {})
    player.one('loadeddata', tryPlay)
    player.one('canplay', tryPlay)
  }
})

onBeforeUnmount(() => {
  try { player?.dispose() } catch(_) {}
  player = null
})

/* =========================
   ✅ 부모에서 사용할 공개 메서드
   ========================= */
const setCurrentTime = (sec) => {
  const t = Number(sec)
  if (!Number.isFinite(t)) return
  // 메타데이터가 준비되었으면 즉시, 아니면 큐잉
  if (player && player.readyState?.() >= 1) { // HAVE_METADATA
    try {
      // 같은 위치 시킹 무시 방지용 미세 오프셋
      player.currentTime(Math.max(0, t + 0.0001))
    } catch {}
  } else {
    pendingSeek = t
  }
}

const play = async () => { try { await player?.play() } catch {} }
const pause = () => { player?.pause?.() }
const getPlayer = () => player

defineExpose({ setCurrentTime, play, pause, getPlayer })
</script>

<style scoped lang="scss">
@use '@/assets/scss/components/video.scss';
</style>