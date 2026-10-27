// 2026-10-27: 게시판 날짜 표시 — 현지 시간(timezone_date) 우선, 없으면 원본(date). 목록 YYYY.MM.DD, 상세 YYYY.MM.DD HH:mm
//   이전엔 원본(UTC)을 그대로 보여 매장 앱보다 9시간 이르게 보였음
export const dispDate = (item, withTime = false) => {
  const t = item?.timezone_date;
  // timezone_date 가 {timezone_private, timezone_common} 묶음으로 오는 백엔드도 있음(회원 앱) → 문자열만 사용
  const tz = typeof t === "string" ? t : (t && (t.timezone_private || t.timezone_common)) || "";
  const v = String(tz || item?.date || "");
  if (!v) return "-";
  const d = v.slice(0, 10).replace(/-/g, ".");
  return withTime && v.length >= 16 ? `${d} ${v.slice(11, 16)}` : d;
};
