import { useApiFetch } from "./fetch";
import qs from "qs";

export const useCoachingApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _coachinglist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/coachinglist", {
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
          list: res.coachinglist,
          listcnt: res.coachinglistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _coachingview = async (enroll_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/coachingview/" + enroll_pk, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,

          view: res.academy_master,
          relatedcoachinglist: res.related_coachinglist,
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

  const _reviewlist = async (academy_pk, params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/reviewlist/" + academy_pk, {
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
          list: res.reviewlist,
          listcnt: res.reviewlistcnt,
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

  const _reviewwrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/postact/reviewwrite/" + form.academy_pk, {
        method: "POST",

        body: qs.stringify(form),
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _reviewdrop = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/reviewdrop/" + params.academy_pk + "/" + params.review_pk,
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

  const _replylist = async (academy_pk, params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/replylist/" + academy_pk, {
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
          list: res.reviewlist,
          listcnt: res.reviewlistcnt,
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

  const _replywrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/postact/replywrite/" + form.academy_pk, {
        method: "POST",

        body: qs.stringify(form),
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _replydrop = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/replydrop/" + params.academy_pk + "/" + params.comment_pk,
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

  const _academylike = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/academy_like/" + params.academy_pk + "/" + params.like_type,
        {
          method: "POST",

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
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _academyenroll = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/academy_enroll/" + params.academy_pk,
        {
          method: "POST",

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
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _swingview = async (shotdata_pk) => {
    try {
      const res = await apiFetch("/coaching/swingview/" + shotdata_pk, {
        method: "GET",
      });

      // 서버가 { success: true, message, code } 형식 반환한다고 가정
      if (res.code === 200) {
        return {
          success: true,

          info: res.swinginfo,
          view: res.swingview,
          classlist: res.class_list,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _qnalist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/qnalist", {
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
          list: res.qnalist,
          listcnt: res.qnalistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _qnawrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/postact/qnawrite", {
        method: "POST",

        body: qs.stringify(form),
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _qnamodify = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/postact/qnamodify/" + (form.comment_pk || ""),
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
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _qnadrop = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/postact/qnadrop/" + params.comment_pk, {
        method: "DELETE",

        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _resultanalysisview = async (enroll_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/resultanalysisview/" + enroll_pk, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          analysis: res.analysis,
          stats: res.stats,
          recommendations: res.recommendations,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _playerswingview = async (fit_shotdata_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/coaching/playerswingview/" + fit_shotdata_pk,
        {
          method: "GET",

          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        },
      );

      if (res.code === 200) {
        return {
          success: true,
          info: res.swinginfo,
          view: res.swingview,
          classlist: res.class_list,

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

  const _analysiswrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    const flat = {
      ...(form.analysis || {}),
      selected_pks: form.selected_pks || [],
    };

    try {
      const res = await apiFetch(
        "/coaching/analysiswrite/" +
          (form.enroll_pk || "") +
          "/" +
          (form.fit_ans_analysis_pk || ""),
        {
          method: "POST",

          body: qs.stringify(flat),
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
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _analysisresulttitlewrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/coaching/analysisresulttitlewrite/" + form.fit_ans_analysis_pk,
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
          message: res.message || "정보를 불러오지 못했습니다.",
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

  const _resultanalysislist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/coaching/resultanalysislist", {
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

  return {
    _coachinglist,
    _coachingview,
    _reviewlist,
    _reviewwrite,
    _reviewdrop,
    _replylist,
    _replywrite,
    _replydrop,
    _academylike,
    _academyenroll,
    _swingview,
    _qnalist,
    _qnawrite,
    _qnamodify,
    _qnadrop,
    _resultanalysisview,
    _playerswingview,
    _analysiswrite,
    _analysisresulttitlewrite,
    _resultanalysislist,
  };
};
