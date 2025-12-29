import { useApiFetch } from "./fetch";
import qs from "qs";
import { useAuthStore } from "@/stores/useauthstore"; // 실제 경로에 맞게 조정

export const useAuthApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _login = async (form) => {
    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: qs.stringify(form),
      });

      if (res.code === 200) {
        const authStore = useAuthStore();

        authStore.setTimezone(res.timezone);
        authStore.login({
          token: res.loginresult.token,
          nickname: res.loginresult.nickname,
          expert_pk: res.loginresult.expert_pk,
          is_initialize: res.loginresult.is_initialize,
          binary_filepath: res.loginresult.binary_filepath,
        });

        if (form.remember_yn) {
          localStorage.setItem("remember_id", form.expert_id);
          localStorage.setItem("remember_yn", true);
        } else {
          localStorage.removeItem("remember_id");
          localStorage.removeItem("remember_yn");
        }

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

  const _findPw = async (form, result) => {
    try {
      const res = await apiFetch("/findaccount/findpwd", {
        method: "POST",
        body: qs.stringify({
          handphone: form.handphone,
          expert_id: form.expert_id,
        }),
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        return Promise.reject({
          success: false,
          message: res.message,
        });
      }
    } catch (err) {
      return Promise.reject({
        success: false,
        message: err?.data?.message || "서버 오류",
      });
    }
  };

  const _findId = async (form) => {
    try {
      const res = await apiFetch("/findaccount/findid", {
        method: "POST",
        body: qs.stringify({
          handphone: form.handphone,
        }),
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        return Promise.reject({
          success: false,
          message: res.message,
        });
      }
    } catch (err) {
      return Promise.reject({
        success: false,
        message: err?.data?.message || "서버 오류",
      });
    }
  };

  const _notification = async () => {
    try {
      const res = await apiFetch("/notification", {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          list: res.list,
          message: res.message,
        };
      } else {
        return Promise.reject({
          success: false,
          message: res.message,
        });
      }
    } catch (err) {
      return Promise.reject({
        success: false,
        message: err?.data?.message || "서버 오류",
      });
    }
  };

  const _notificationread = async (payload) => {
    try {
      const res = await apiFetch("/notification/read/" + payload.not_pk, {
        method: "GET",
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        return Promise.reject({
          success: false,
          message: res.message,
        });
      }
    } catch (err) {
      return Promise.reject({
        success: false,
        message: err?.data?.message || "서버 오류",
      });
    }
  };

  return {
    _login,
    _findPw,
    _findId,
    _notification,
    _notificationread,
  };
};
