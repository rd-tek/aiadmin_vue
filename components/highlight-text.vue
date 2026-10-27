<template>
  <span class="highlight-text"><template v-for="(seg, i) in segments" :key="i"><mark v-if="seg.hl" class="hl-word">{{ seg.t }}</mark><template v-else>{{ seg.t }}</template></template></span>
</template>
<script setup>
// 2026-10-26: 바깥 태그 p → span(display:block) — 리포트의 <p class="desc-area"> 안에 들어가 문단 중첩(잘못된 HTML)이었음. aishop·aiadmin 에 같은 파일 복사
// C18(UX): 코칭 피드백 글에서 핵심 골프 용어를 강조(볼드/색). XSS 안전 — v-html 미사용, 텍스트 보간+<mark>.
const props = defineProps({ text: { type: [String, Number], default: "" } });
const KEYWORDS = [
  "체중 이동","체중이동","헤드 스피드","헤드스피드","볼 스피드","볼스피드","클럽 스피드","클럽스피드",
  "다운스윙","백스윙","팔로우","릴리스","임팩트","어드레스","템포","그립","스탠스","축",
  "캐리","비거리","미트율","백스핀","사이드스핀","발사각","스핀량","스핀","방향성","정확도",
  "회전","하체","상체","손목","어깨","코킹","스웨이","슬라이스","훅","탑","뒤땅","일관성",
];
const segments = computed(() => {
  const text = String(props.text ?? "");
  if (!text) return [];
  const kw = [...new Set(KEYWORDS)]
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp("(" + kw.join("|") + ")", "g");
  const out = [];
  let last = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index === re.lastIndex) { re.lastIndex++; continue; }
    if (m.index > last) out.push({ t: text.slice(last, m.index), hl: false });
    out.push({ t: m[0], hl: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ t: text.slice(last), hl: false });
  return out;
});
</script>
<style lang="scss" scoped>
.highlight-text {
  display: block;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: #333;
}
.hl-word {
  background: #fff3cd;
  color: #8a5a00;
  font-weight: 700;
  border-radius: 3px;
  padding: 0 2px;
}
</style>
