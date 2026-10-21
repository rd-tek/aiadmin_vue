// B2(UX 접근성): 저장된 글자 크기(body zoom)를 앱 로드 시 복원
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    try {
      const s = parseFloat(localStorage.getItem("xg_fontscale"));
      if (!isNaN(s) && s > 0) document.body.style.zoom = String(s);
    } catch (e) {}
  }
});
