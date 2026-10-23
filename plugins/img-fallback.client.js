// 2026-10-23: 프로필 사진(S3)이 없거나 깨지면 기본 프로필 이미지로 — 깨진 이미지 아이콘 위에 alt 글자("프로필")가 겹쳐 보이던 문제.
// 화면마다 @error 를 다는 대신 한 곳에서 처리: 문서의 이미지 error 이벤트(캡처 단계)를 받아 '프로필 사진'만 바꿈
// (판별 = 주소에 member_photo/expert_photo/profile 이 있거나 alt 에 '프로필'). 썸네일·배너 등 다른 이미지는 건드리지 않음.
const FALLBACK = "/images/button/btn_profile.png";
const isProfile = (img) =>
  /member_photo|expert_photo|profile/i.test(img.getAttribute("src") || "") || /프로필|profile/i.test(img.alt || "");

const swap = (img) => {
  if (img.dataset.fallbackDone || !isProfile(img) || (img.getAttribute("src") || "").endsWith(FALLBACK)) return;
  img.dataset.fallbackDone = "1";
  img.removeAttribute("srcset");
  img.src = FALLBACK;
};
// 플러그인보다 먼저 실패한 이미지(서버 렌더 HTML 의 이미지) — 다 불러왔는데 크기 0 이면 실패
const sweep = () => setTimeout(() => {
  for (const img of document.images) if (img.complete && img.naturalWidth === 0 && !/\.svg(\?|$)/i.test(img.getAttribute("src") || ".svg")) swap(img); // SVG 는 정상이어도 0 일 수 있어 제외
}, 400);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", sweep);
  nuxtApp.hook("page:finish", sweep);
  window.addEventListener(
    "error",
    (e) => {
      if (e.target instanceof HTMLImageElement) swap(e.target);
    },
    true,
  );
});
