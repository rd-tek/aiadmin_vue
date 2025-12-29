import { useApiFetch } from "./fetch";
import qs from "qs";

export const useSupportApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _noticelist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/customer/noticelist", {
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

          list: res.noticelist,
          listcnt: res.noticelistcnt,
          toplist: res.topnoticelist,

          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || " 정보를 불러오지 못했습니다.",
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

  const _noticeview = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/customer/noticeview/" + params.notice_pk, {
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

          view: res.noticeview,
          next_post: res.next_post,
          prev_post: res.prev_post,
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

  const _resourceslist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/customer/resourceslist", {
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

          list: res.resourceslist,
          listcnt: res.resourceslistcnt,
          message: res.message,
        };
      } else {
        throw {
          success: false,
          message: res.message || " 정보를 불러오지 못했습니다.",
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

  const _resourcesview = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch(
        "/customer/resourcesview/" + params.resources_pk,
        {
          method: "GET",

          query: params,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          //   // ❌ Content-Type 제거
          // },
        },
      );

      if (res.code === 200) {
        return {
          success: true,

          view: res.resourcesview,
          next_post: res.next_post,
          prev_post: res.prev_post,
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

  const _inquirytwrite = async (form) => {
    try {
      const res = await apiFetch("/customer/inquirywrite", {
        method: "POST",
        body: qs.stringify(form),
      });

      // 서버가 { success: true, message, code } 형식 반환한다고 가정
      if (res.code === 200) {
        return { success: true, message: res.message };
      } else {
        return Promise.reject({ success: false, message: res.message });
      }
    } catch (err) {
      return Promise.reject({
        success: false,
        message: err?.data?.msg || "서버 오류",
      });
    }
  };

  return {
    _noticelist,
    _noticeview,
    _inquirytwrite,

    _resourceslist,
    _resourcesview,
  };
};
