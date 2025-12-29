import { useApiFetch } from "./fetch";
import qs from "qs";

export const useEventApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _eventlist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/event/minigamelist", {
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

          list: res.eventlist,
          listcnt: res.eventlistcnt,
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

  const _swinglist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/event/swinglist", {
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

          list: res.swinglist,
          listcnt: res.swinglistcnt,
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

  const _swingview = async (swing_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/event/swingview/" + swing_pk, {
        method: "GET",

        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          view: res.swingview,
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
  const _swingreplylist = async (swing_pk, params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/event/swingreplylist/" + swing_pk, {
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
          list: res.swingreplylist,
          listcnt: res.swingreplylistcnt,
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

  const _swingreplywrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/swingreplywrite/" + form.fit_shotdata_pk,
        {
          method: "POST",

          body: qs.stringify(form),
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        },
      );

      if (res.code === 200) {
        return {
          success: true,
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

  const _swingreplydrop = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/swingreplydrop/" + params.comment_pk,
        {
          method: "DELETE",

          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        },
      );

      if (res.code === 200) {
        return {
          success: true,
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

  const _eventview = async (rule_pk) => {
    try {
      const res = await apiFetch("/event/eventview/" + rule_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          awardprizerank: res.awardprizerank,
          eventinfo: res.eventinfo,
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

  const _eventwinninglist = async (param) => {
    try {
      const res = await apiFetch(
        "/event/minigamewinninglist/" + param.rule_pk,
        {
          method: "GET",
          query: param,
        },
      );

      if (res.code === 200) {
        return {
          success: true,
          eventinfo: res.eventinfo,
          list: res.eventwvinninglist,
          listcnt: res.eventwvinninglistcnt,
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

  const _eventwinningranklist = async (param) => {
    try {
      const res = await apiFetch(
        "/event/eventwinningranklist/" + param.rule_pk,
        {
          method: "GET",
          query: param,
        },
      );

      if (res.code === 200) {
        return {
          success: true,

          eventinfo: res.eventinfo,
          prizerank: res.awardprizeranklist,
          list: res.eventwinningranklist,
          listcnt: res.eventwinningrankcnt,
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
    _eventlist,
    _swinglist,
    _swingview,
    _swingreplylist,
    _swingreplywrite,
    _swingreplydrop,
    _eventview,
    _eventwinninglist,
    _eventwinningranklist,
  };
};
