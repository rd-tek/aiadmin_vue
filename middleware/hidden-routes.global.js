// 2026-10-27 서비스 정리(AI검토 4차): 메뉴에서 숨긴 화면은 주소를 직접 입력해 들어와도 대시보드('/')로 보냄.
//   되살리려면 아래 목록에서 해당 줄을 주석 처리(gnb.vue 의 '2026-10-27 서비스 정리' 주석도 함께 해제).
//   전체를 되돌리려면 이 파일의 export 부분을 주석 처리.
const HIDDEN = [
  /^\/tournament(\/|$)/, // 대회관리(챔피언십·매장대회)
  /^\/event(\/|$)/, // 이벤트관리(미니게임·미니게임 당첨자)
  /^\/customer\/(app|library|inquiry)(\/|$)/, // 고객센터: 공지사항(앱)·자료실·고객문의
];

// 2026-10-29: 링크 없는 옛 코스 등록·수정 화면(pages/golfcourse/edit/*, list/edit/* 의 이전 사본)은
//   공개 표시(view_flag)가 반대로 연결된 채 남아 있어 주소로 들어오면 정본 화면(/golfcourse/list/edit/*)으로 보냄. 파일은 보존.
const OLD_COURSE_EDIT = /^\/golfcourse\/edit(\/.*)?$/;

export default defineNuxtRouteMiddleware((to) => {
  const m = to.path.match(OLD_COURSE_EDIT);
  if (m) return navigateTo(`/golfcourse/list/edit${m[1] || ""}`, { replace: true });
  if (HIDDEN.some((re) => re.test(to.path))) return navigateTo("/", { replace: true });
});
