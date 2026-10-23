import { useApiFetch } from "./fetch";

/**
 * 2026-10-22: 이벤트관리(미니게임) — aiadmin 백엔드 Event.php
 *   전체 매장 기준(관리자). aishop api/event.js 를 바탕으로 관리자 엔드포인트에 맞춤
 */
export const useEventApi = () => {
  const apiFetch = useApiFetch();

  // 미니게임 목록
  const miniGameList = async (param = {}) =>
    apiFetch("/event/minigamelist", {
      method: "GET",
      query: {
        startdate: param.startdate || "",
        enddate: param.enddate || "",
        type: param.type || "",
        status_cd: param.status_cd ?? "",
        searchtype: param.searchtype || "1",
        searchname: param.searchname || "",
        pageno: param.pageno || 1,
      },
    });

  // 미니게임 상세
  const view = async (eventno) => apiFetch(`/event/eventview/${eventno}`, { method: "GET" });

  // 미니게임별 당첨자
  const winningList = async (eventno, param = {}) =>
    apiFetch(`/event/eventwinninglist/${eventno}`, {
      method: "GET",
      query: { searchtype: param.searchtype || "1", searchname: param.searchname || "", pageno: param.pageno || 1 },
    });

  // 미니게임 순위(롱기스트·니어핀 순위형)
  const winningRankList = async (eventno) =>
    apiFetch(`/event/eventwinningranklist/${eventno}`, { method: "GET" });

  // 전체 당첨자
  const allWinningList = async (param = {}) =>
    apiFetch("/event/minigamewinninglist", {
      method: "GET",
      query: {
        startdate: param.startdate || "",
        enddate: param.enddate || "",
        type: param.type || "",
        searchtype: param.searchtype || "1",
        searchname: param.searchname || "",
        pageno: param.pageno || 1,
      },
    });

  // 코스의 서브코스·홀(홀 선택) — subcourse[].{type_fk, title, subcoursehole[].{hole_no, par_score, distance}}
  const courseView = async (mainno) => apiFetch(`/event/eventcourseview/${mainno}`, { method: "GET" });

  // 미니게임 등록/수정(eventno 가 있으면 수정). 배열은 key[]
  const write = async (form, eventno = 0) => {
    const fd = new FormData();
    Object.keys(form).forEach((k) => {
      const v = form[k];
      if (Array.isArray(v)) v.forEach((x) => fd.append(`${k}[]`, x ?? ""));
      else fd.append(k, v ?? "");
    });
    return apiFetch(eventno ? `/event/eventwrite/${eventno}` : "/event/eventwrite", { method: "POST", body: fd });
  };

  return { miniGameList, view, winningList, winningRankList, allWinningList, courseView, write };
};
