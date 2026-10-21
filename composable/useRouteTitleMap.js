export const useRouteTitleMap = () => ({
  "membership-member": "일반회원",
  "membership-member-slug": "일반회원 상세",

  "membership-shop": "매장회원",
  "membership-shop-slug": "매장회원 상세",
  "membership-shop-write": "매장회원 등록",

  "customer-member": "공지사항(회원)",
  "customer-member-slug": "공지사항(회원) 상세",
  "customer-member-edit": "공지사항(회원) 수정",
  "customer-member-write": "공지사항(회원) 등록",

  "customer-shop": "공지사항(매장)",
  "customer-shop-slug": "공지사항(매장) 상세",
  "customer-shop-edit": "공지사항(매장) 수정",
  "customer-shop-write": "공지사항(매장) 등록",

  "customer-app": "공지사항(앱)",
  "customer-app-slug": "공지사항(앱) 상세",
  "customer-app-edit": "공지사항(앱) 수정",
  "customer-app-write": "공지사항(앱) 등록",

  "customer-library": "자료실",
  "customer-library-slug": "자료실 상세",
  "customer-library-edit": "자료실 수정",
  "customer-library-write": "자료실 등록",

  "customer-inquiry": "고객문의",
  "customer-inquiry-slug": "고객문의 상세",
  "customer-inquiry-edit": "고객문의 수정",
  "customer-inquiry-write": "고객문의 등록",

  golfcourse: "코스관리",
  // 2026-10-08(UI 2차 검토): 목록 페이지 제목이 '코스관리 상세'로 나오던 문제 → 메뉴명(코스리스트)과 같게, 하위 페이지는 접두 일치로 구분
  "golfcourse-list": "코스 목록", // 2026-10-20: 메뉴명과 같게(리스트 → 목록)
  "golfcourse-list-slug": "코스 상세",
  "golfcourse-list-edit": "코스 등록",
  "golfcourse-list-edit-slug": "코스 수정",
  "golfcourse-edit": "코스 등록",
  "golfcourse-edit-slug": "코스 수정",

  "swing-list": "스윙영상 목록", // 2026-10-20: 메뉴명과 같게(리스트 → 목록)
  "swing-list-slug": "스윙영상 상세",

  "coaching-golf": "코칭",
  "coaching-golf-slug": "코칭 상세",

  "manager-list": "관리자", // 2026-10-20: 제목에서 "리스트" 제거
  "manager-list-slug": "관리자 상세",
  "manager-write": "관리자 등록",
  "manager-list-write": "관리자 등록", // 2026-10-12(회귀 점검): 목록의 [등록하기](/manager/list/write) 제목이 "관리자 리스트"로 보이던 문제

  "manager-game-data": "게임데이터 관리",
  "manager-game-data-game-score": "게임데이터 관리(스코어보드)",
  "manager-game-data-game-oneshot": "게임데이터 관리(원샷정보)",
  "manager-game-data-game-info": "게임데이터 관리(게임정보)",
});

export default useRouteTitleMap;
