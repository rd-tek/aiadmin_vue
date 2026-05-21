import { useApiFetch } from "./fetch";
import qs from "qs";

export const useMemberApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저
  const _signup = async (form) => {
    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }

    try {
      const res = await apiFetch("/register", {
        method: "POST",
        body: data, // ✅ ofetch 기준이면 body로
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

  const _expertidcheck = async (form) => {
    try {
      const res = await apiFetch("/register/ajax_expert_id_check", {
        method: "POST",
        body: qs.stringify({
          expert_id: form.expert_id,
        }),
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

  const _nicknamecheck = async (form) => {
    const token = useCookie("aiadmintoken").value;

    const options = {
      method: "POST",
      headers: {},
      body: qs.stringify({
        nickname: form.nickname,
      }),
    };

    let url = "";

    if (token) {
      url = "/membership/ajax_nickname_check";
      // options.headers = {
      //   Authorization: "Bearer " + token,
      // };
    } else {
      url = "/register/ajax_nickname_check";
    }

    try {
      const res = await apiFetch(url, options);

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

  const _auth_number_chk = async (form) => {
    try {
      const res = await apiFetch("/common/ajax_auth_number_check", {
        method: "POST",
        body: qs.stringify({
          auth_number: form.auth_number,
          handphone: form.handphone,
        }),
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

  const _sms_send = async (form, result) => {
    try {
      const res = await apiFetch("/common/ajax_sms_send", {
        method: "POST",
        body: qs.stringify({
          handphone: form.handphone,
        }),
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

  // 인증 메일 발송
  const _emailcheck = async (form) => {
    const token = useCookie("aiadmintoken").value || null;

    const options = {
      method: "POST",
      headers: {},
      body: qs.stringify({
        email: form.email,
      }),
    };

    let url = "";

    if (token) {
      url = "/membership/ajax_email_check";
      // options.headers = {
      //   Authorization: "Bearer " + token,
      // };
    } else {
      url = "register/ajax_email_check";
    }

    try {
      const res = await apiFetch(url, options);

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

  // 회원정보보기
  const _memberinfo = async () => {
    // const token = sessionStorage.getItem("aimemrbertoken") || null;

    try {
      const res = await apiFetch("/membership/expertview", {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          memberinfo: res.memberinfo,
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

  // 정보수정
  const _membermodify = async (form) => {
    const data = new FormData();
    for (let key in form) {
      data.append(key, form[key]);
    }

    try {
      const res = await apiFetch("/membership/modify", {
        method: "POST",

        body: data, // ✅ ofetch 기준이면 body로
      });

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

  // 정보수정
  const _membersummary = async () => {
    try {
      const res = await apiFetch("/player/summary", {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          summaryinfo: res.summaryinfo,
          recentplayinfo: res.recentplayinfo,
          swinginfo: res.swinginfo,
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

  const _academyview = async (academy_pk) => {
    try {
      const res = await apiFetch("/player/academyview/" + academy_pk, {
        method: "GET",
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
    _signup,
    _expertidcheck,
    _nicknamecheck,
    _auth_number_chk,
    _sms_send,
    _emailcheck,
    _memberinfo,

    _membermodify,
    _membersummary,
    _academyview,
  };
};
