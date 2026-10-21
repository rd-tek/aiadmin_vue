import { useApiFetch } from "./fetch";
import qs from "qs";

export const useCoachingApi = () => {
  const apiFetch = useApiFetch();

  const _coachinglist = async (params) => {
    try {
      const res = await apiFetch("/coaching/coachinglist", {
        method: "GET",
        query: params,
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
    try {
      const res = await apiFetch("/coaching/coachingview/" + enroll_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          view: res.academy_master,
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

  const _reviewlist = async (academy_pk, params) => {
    try {
      const res = await apiFetch("/coaching/reviewlist/" + academy_pk, {
        method: "GET",
        query: params,
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
    try {
      const res = await apiFetch("/coaching/qnalist", {
        method: "GET",
        query: params,
      });

      if (res.code === 200) {
        return {
          success: true,
          list: res.qnalist,
          listcnt: res.qnalistcnt,
          threads: res.threads,
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
    try {
      const res = await apiFetch("/coaching/qnawrite", {
        method: "POST",
        body: qs.stringify(form),
      });

      if (res.code === 200) {
        return {
          success: true,
          comment_pk: res.comment_pk,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || "등록하지 못했습니다.",
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

  const _qnamodify = async (comment_pk, content) => {
    try {
      const res = await apiFetch(`/coaching/qnamodify/${comment_pk}`, {
        method: "POST",
        body: qs.stringify({ content }),
      });

      if (res.code === 200) {
        return { success: true, message: res.message };
      } else {
        throw {
          success: false,
          message: res.message || "수정하지 못했습니다.",
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

  const _qnadrop = async (comment_pk) => {
    try {
      const res = await apiFetch(`/coaching/qnadrop/${comment_pk}`, {
        method: "DELETE",
      });

      if (res.code === 200) {
        return { success: true, message: res.message };
      } else {
        throw {
          success: false,
          message: res.message || "삭제하지 못했습니다.",
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

  const _playerswingview = async (result_pk) => {
    try {
      const res = await apiFetch("/coaching/playerswingview/" + result_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
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

  const _resultanalysisview = async (enroll_pk) => {
    try {
      const res = await apiFetch("/coaching/resultanalysisview/" + enroll_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          analysis: res.analysis,
          stats: res.stats,
          stats_clubs: res.stats_clubs || [], // 2026-10-13
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

  const _resultanalysislist = async (params) => {
    try {
      const res = await apiFetch("/coaching/resultanalysislist", {
        method: "GET",
        query: params,
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
    try {
      const res = await apiFetch(
        "/coaching/analysisresulttitlewrite/" + form.fit_ans_analysis_pk,
        {
          method: "POST",
          body: qs.stringify(form),
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

  return {
    _coachinglist,
    _coachingview,
    _reviewlist,
    _qnalist,
    _qnawrite,
    _qnamodify,
    _qnadrop,
    _playerswingview,
    _resultanalysisview,
    _resultanalysislist,
    _analysisresulttitlewrite,
  };
};
