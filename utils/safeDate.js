// 2026-10-23: 서버 날짜 문자열("2026-10-23 10:00:00", "2026.10.23") → Date.
// 공백·점 형식은 구형 Safari(iOS)에서 Invalid Date 가 되어 최신순 정렬이 뒤섞임 → ISO(T) 로 바꿔 읽음. 크롬 결과는 같음.
// 값이 없거나 읽을 수 없으면 1970-01-01(정렬 맨 뒤/앞) — 기존 new Date(x ?? 0) 과 같은 동작.
export function parseServerDate(v) {
  if (v instanceof Date) return v;
  if (v === null || v === undefined || v === "") return new Date(0);
  if (typeof v === "number") return new Date(v);
  const s = String(v).trim()
    .replace(/^(\d{4})[./](\d{1,2})[./](\d{1,2})/, (m, y, mo, d) => `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`)
    .replace(" ", "T");
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date(0) : d;
}
