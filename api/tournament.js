import { useApiFetch } from "./fetch";

/**
 * 2026-10-22: 대회관리(챔피언십·매장대회) — aiadmin 백엔드 Tournament.php
 *   챔피언십 = 본사 대회(regtype 4, 전체 매장), 매장대회 = 매장이 등록한 대회(regtype 1)
 *   aishop api/tournament.js 를 바탕으로 관리자 엔드포인트에 맞춤
 */
export const useTournamentApi = () => {
  const apiFetch = useApiFetch();

  const listQuery = (param = {}) => ({
    startdate: param.startdate || "",
    enddate: param.enddate || "",
    status: param.status || "",
    searchtype: param.searchtype || "1",
    searchname: param.searchname || "",
    pageno: param.pageno || 1,
  });

  // 챔피언십 목록
  const championshipList = async (param) =>
    apiFetch("/tournament/tournamentlist", { method: "GET", query: listQuery(param) });

  // 매장대회 목록(전체 매장)
  const competitionList = async (param) =>
    apiFetch("/tournament/ownertournamentlist", { method: "GET", query: listQuery(param) });

  // 대회 조건(상세)
  const condition = async (tournamentno) =>
    apiFetch(`/tournament/tournamentcondition/${tournamentno}`, { method: "GET" });

  // 대회 순위(10명씩)
  const ranking = async (tournamentno, param = {}) =>
    apiFetch(`/tournament/tournamentranklist/${tournamentno}`, {
      method: "GET",
      query: { scoretype: param.scoretype ?? 1, gender: param.gender ?? 0, pageno: param.pageno ?? 1 },
    });

  // 수정용 대회 정보
  const info = async (tournamentno) =>
    apiFetch(`/tournament/tournamentinfo/${tournamentno}`, { method: "GET" });

  // 코스 목록(코스 선택)
  const courseList = async (tournamentno = 0) =>
    apiFetch(`/tournament/tournamentcourselist/${tournamentno}`, { method: "GET" });

  // 서브 코스 목록
  const subCourseList = async (mainno) =>
    apiFetch(`/tournament/tournamentsubcourselist/${mainno}`, { method: "GET" });

  // 등록/수정 (tournamentno 가 있으면 수정). 배열은 key[] 로 전송
  const write = async (form, tournamentno = 0) => {
    const fd = new FormData();
    Object.keys(form).forEach((k) => {
      const v = form[k];
      if (Array.isArray(v)) v.forEach((x) => fd.append(`${k}[]`, x ?? ""));
      else fd.append(k, v ?? "");
    });
    const url = tournamentno ? `/tournament/tournamentwrite/${tournamentno}` : `/tournament/tournamentwrite`;
    return apiFetch(url, { method: "POST", body: fd });
  };

  // 초청 회원 목록(초청 대회) — 저장 시 tour_member_items[] 로 다시 보내야 기존 초청이 지워지지 않음
  const tourPlayerList = async (tournamentno) =>
    apiFetch(`/tournament/tourplayerlist/${tournamentno}`, { method: "GET", query: { pageno: 1, pagesize: 500 } });

  // 초청할 회원 검색(닉네임·아이디, 정상 회원)
  const playerSearch = async (keyword, field = "P.nickname") =>
    apiFetch("/membership/playerlist", { method: "GET", query: { status: 1, searchtype: field, searchname: keyword, pageno: 1, pagesize: 10 } });

  // 매장 선택용 전체 매장(삭제 제외) — kradmin ShopTournamentWrite 의 tournamentshoplist2 와 같은 API
  const shopList = async () => apiFetch("/tournament/tournamentshoplist2", { method: "GET" });

  return { championshipList, competitionList, condition, ranking, info, courseList, subCourseList, write, tourPlayerList, playerSearch, shopList };
};
