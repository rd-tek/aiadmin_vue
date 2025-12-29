import { useApiFetch } from "./fetch";
import qs from "qs";

export const useTournamentApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _roundlist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/player/roundlist", {
        method: "GET",

        query: params,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          list: res.playlist,
          listcnt: res.playlistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _scorecard = async (define1_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/player/scorecard/" + define1_pk, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          scorecardinfo: res.scorecardinfo,
          scorecardstats: res.scorecardstats,
          subcourselist: res.subcourselist,
          scorecardtotal: res.scorecardtotal,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _analysislist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/player/analysislist", {
        method: "GET",

        query: params,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          list: res.analysislist,
          listcnt: res.analysislistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _analysisinfo = async (request_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/player/analysisinfo/" + request_pk, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          analysisinfo: res.analysisinfo,
          analysislist: res.analysislist,
          matchlist: res.matchlist,

          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };
  const _tournamentlist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/tournament/tournamentlist", {
        method: "GET",

        query: params,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          tournamenttop: res.tournamenttop,
          list: res.tournamentlist,
          listcnt: res.tournamentlistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _tournamentcondition = async (tour_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/tournament/tournamentcondition/" + tour_pk, {
        method: "GET",

        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          subcourselist: res.subcourselist,
          tourbinary: res.tourbinary,
          tournamentcourse: res.tournamentcourse,
          tournamentdetail: res.tournamentdetail,
          tournamentinfo: res.tournamentinfo,
          tournamentprizeetc: res.tournamentprizeetc,
          tournamentprizerank: res.tournamentprizerank,
          tournamentshop: res.tournamentshop,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };
  const _tournamentranking = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/tournament/tournamentranking/" + params.tour_pk,
        {
          method: "GET",

          query: params,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        }
      );

      if (res.code === 200) {
        return {
          success: true,

          tournamentinfo: res.tournamentinfo,
          list: res.tournamentranklist,
          listcnt: res.tournamentranklistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  // 토너먼트참가리스트
  const _tournamentplaylist = async (tour_pk) => {
    try {
      const res = await apiFetch("/tournament/tournamentplaylist/" + tour_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          tournamentinfo: res.tournamentinfo,
          list: res.tournamentplaylist,
          listcnt: res.tournamentplaylistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _ownertournamentlist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/tournament/ownertournamentlist", {
        method: "GET",

        query: params,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,

          list: res.tournamentlist,
          listcnt: res.tournamentlistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _ownertournamentcondition = async (tour_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/tournament/ownertournamentcondition/" + tour_pk,
        {
          method: "GET",

          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        }
      );

      if (res.code === 200) {
        return {
          success: true,
          subcourselist: res.subcourselist,
          tourbinary: res.tourbinary,
          tournamentcourse: res.tournamentcourse,
          tournamentdetail: res.tournamentdetail,
          tournamentinfo: res.tournamentinfo,
          tournamentprizeetc: res.tournamentprizeetc,
          tournamentprizerank: res.tournamentprizerank,
          tournamentshop: res.tournamentshop,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };
  const _ownertournamentranking = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/tournament/ownertournamentranking/" + params.tour_pk,
        {
          method: "GET",

          query: params,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        }
      );

      if (res.code === 200) {
        return {
          success: true,

          tournamentinfo: res.tournamentinfo,
          list: res.tournamentranklist,
          listcnt: res.tournamentranklistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "회원 정보를 불러오지 못했습니다.",
        };
      }
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  return {
    _roundlist,
    _scorecard,
    _analysislist,
    _analysisinfo,
    _tournamentlist,
    _tournamentcondition,
    _tournamentranking,
    _tournamentplaylist,
    _ownertournamentlist,
    _ownertournamentcondition,
    _ownertournamentranking,
  };
};
