/**
 * 2026-10-22: 대회·미니게임 화면 표시 라벨(정본 = krshop ShopWrite/ShopRank + tg_* 참조 pk, aishop·aimember 와 같은 표기)
 *   utils/common.js 의 wind_type(0-base 옛 기준)·tournament_status('대기') 는 다른 화면이 쓰고 있어 그대로 두고 여기서 따로 정의
 */
export const useCompetitionLabels = () => {
  const pick = (map, v, dash = "-") => (v === null || v === undefined || v === "" ? dash : map[Number(v)] ?? dash);

  // 대회 상태 tt_tourdefine.tourstatus_fk
  const tourStatus = (v) => pick({ 1: "예정", 2: "진행중", 3: "완료", 4: "취소" }, v, "");
  const tourStatusClass = (v) => ({ 2: "color-green", 4: "color-red" }[Number(v)] || "color-grey");
  // 대회 구분 tourtype_fk
  const tourType = (v) => pick({ 1: "공개", 2: "초청", 3: "비공개", 4: "엑스골프리그", 5: "토너먼트" }, v, "");
  // 게임모드 gamemode_fk
  const gameMode = (v) => pick({ 1: "라운드", 2: "연습", 3: "이벤트", 4: "토너먼트" }, v);
  // 등급 level_fk (1=프로 … 5=입문)
  const level = (v) => pick({ 1: "프로", 2: "준프로", 3: "숙련", 4: "일반", 5: "입문" }, v);
  // 바람 windforce_fk (pk 1=무풍 … 5=랜덤, 0=미설정 기본 → 무풍)
  const wind = (v) => pick({ 0: "무풍", 1: "무풍", 2: "약풍", 3: "중풍", 4: "강풍", 5: "랜덤" }, v);
  // 티박스 tee_fk / tee_fk2
  const tee = (v) => pick({ 1: "프로(블루)", 2: "일반(화이트)", 3: "레이디(레드)", 4: "시니어(옐로우)" }, v);
  // 그린 스피드 / 경사 (pk)
  const greenSpeed = (v) => pick({ 1: "없음", 2: "매우 빠름", 3: "빠름", 4: "보통", 5: "느림", 6: "매우 느림", 7: "수동" }, v);
  const greenGravity = (v) => pick({ 1: "없음", 2: "매우 높음", 3: "높음", 4: "중간", 5: "낮음", 6: "매우 낮음" }, v);
  // 멀리건(0=없음)
  const mulligan = (v) => (v === null || v === undefined || v === "" ? "-" : Number(v) === 0 ? "없음" : `${v}회`);
  // 참가 제한(0=제한 없음)
  const entryLimit = (v) => (v === null || v === undefined || v === "" ? "-" : Number(v) === 0 ? "제한 없음" : `1인 ${v}회`);

  // 미니게임 종류 award_fk
  const awardType = (v) =>
    pick({ 1: "홀인원", 2: "알바트로스", 3: "이글(P5)", 4: "버디(P5)", 5: "파(P5)", 6: "이글(P4)", 7: "버디(P4)", 8: "파(P4)", 9: "롱기스트", 10: "니어핀", 11: "롱기스트 랭크", 12: "니어핀 랭크" }, v);
  const isRankAward = (v) => [11, 12].includes(Number(v));
  // 미니게임 상태 status_cd (0 예정·1 진행중·2 완료·3 취소) — 2026-10-27: 4앱 통일(이전 '대기')
  const eventStatus = (v) => pick({ 0: "예정", 1: "진행중", 2: "완료", 3: "취소" }, v, "");
  const eventStatusClass = (v) => ({ 1: "color-green", 3: "color-red" }[Number(v)] || "color-grey");

  // 날짜: 'YYYY-MM-DD HH:mm:ss' → 'YYYY.MM.DD'
  const ymd = (s) => (s ? String(s).slice(0, 10).replace(/-/g, ".") : "-");
  const ymdhm = (s) => (s ? String(s).slice(0, 16).replace(/-/g, ".") : "-");
  // 날짜 → API 'YYYY-MM-DD'
  const apiDate = (d) => {
    if (!d) return "";
    const x = new Date(d);
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
  };
  const pickerFormat = (d) => (d ? apiDate(d).replace(/-/g, ".") : "");

  return { tourStatus, tourStatusClass, tourType, gameMode, level, wind, tee, greenSpeed, greenGravity, mulligan, entryLimit, awardType, isRankAward, eventStatus, eventStatusClass, ymd, ymdhm, apiDate, pickerFormat };
};
