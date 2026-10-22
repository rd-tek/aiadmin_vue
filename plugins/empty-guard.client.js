/**
 * 2026-10-21: 빈 상태 문구 깜빡임 방지 (4앱 동일 파일)
 *
 * 목록 대부분이 화면이 뜬 뒤(onMounted) 브라우저에서 데이터를 불러와,
 * 서버 HTML·첫 화면에 '데이터가 없습니다' 가 잠깐 보였다가 목록으로 바뀌었습니다.
 *
 * - 전역 CSS(common.scss)가 html 에 .xg-ready 가 없을 때 빈 상태 문구(.no-data / .no-info 등)를 숨김
 * - 이 플러그인은 진행 중인 API 요청(stores/request 의 pending, api/fetch.js 가 증감)이
 *   모두 끝나면 .xg-ready 를 붙이고, 페이지 이동 시작 때 떼었다가 새 페이지 요청이 끝나면 다시 붙임
 * - 요청이 이어서 시작되는 경우를 위해 0 이 된 뒤 120ms 더 확인, 요청이 끝나지 않아도 6초 뒤엔 표시(안전장치)
 */
import { useRequestStore } from "~/stores/request";

export default defineNuxtPlugin((nuxtApp) => {
  const root = document.documentElement;
  const store = useRequestStore(nuxtApp.$pinia);
  let timer = 0;
  let cap = 0;

  const ready = () => {
    clearTimeout(timer);
    clearTimeout(cap);
    root.classList.add("xg-ready");
  };

  const settle = () => {
    clearTimeout(timer);
    clearTimeout(cap);
    cap = setTimeout(ready, 6000);
    const check = () => {
      if (store.pending > 0) {
        timer = setTimeout(check, 60);
        return;
      }
      timer = setTimeout(() => (store.pending > 0 ? check() : ready()), 120);
    };
    check();
  };

  nuxtApp.hook("app:mounted", settle);
  nuxtApp.hook("page:start", () => root.classList.remove("xg-ready"));
  nuxtApp.hook("page:finish", () => setTimeout(settle, 0));
});
