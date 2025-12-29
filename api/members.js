import { useApiFetch } from "./fetch";
import qs from "qs";

export const useMembersApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _playerlist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/members/playerlist", {
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
          expert_master: res.expert_master,
          list: res.playerlist,
          listcnt: res.playerlistcnt,
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

  const _playerview = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/members/playerview/" + params.player_pk, {
        method: "GET",

        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          view: res.playerview,
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

  const _playermodify = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const playerpk = form.player_pk; // 부모에서 이미 넘어옴 (selectedItem에 있었던 값)

      let memoObj = {};
      if (form.player_memo) {
        try {
          memoObj = JSON.parse(form.player_memo);
        } catch (e) {
          memoObj = {};
        }
      }

      // 2) 현재 플레이어 메모만 덮어쓰기 (머지)
      memoObj[playerpk] = form.filtered_memo;

      // 3) 다시 JSON 문자열로 변환
      const mergedPlayerMemo = JSON.stringify(memoObj);

      // 4) 백엔드로 전송
      const res = await apiFetch("/members/modify/" + form.player_pk, {
        method: "POST",
        body: qs.stringify({
          player_memo: mergedPlayerMemo,
        }),
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

  const _playersend = async (form) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      // 4) 백엔드로 전송
      const res = await apiFetch("/members/playeremailsend", {
        method: "POST",
        body: qs.stringify(form),
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

  return {
    _playerlist,
    _playerview,
    _playermodify,
    _playersend,
  };
};
