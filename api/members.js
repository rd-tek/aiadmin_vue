import { useApiFetch } from "./fetch";
import qs from "qs";

export const useMembersApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _playerlist = async (params) => {
    try {
      const res = await apiFetch("/membership/playerlist", {
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
    try {
      const res = await apiFetch("/membership/playerview/" + params.player_pk, {
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
    try {
      const playerpk = form.player_pk;

      // 🔥 안전하게 초기화
      let memoObj = {};

      try {
        memoObj =
          typeof form.memo === "string"
            ? JSON.parse(form.memo || "{}")
            : form.memo || {};
      } catch (e) {
        memoObj = {};
      }

      // 🔥 현재 값 반영
      memoObj[playerpk] = form.filtered_memo ?? "";

      const mergedMemo = JSON.stringify(memoObj);

      console.log("기존 memo:", form.memo);
      console.log("변경 memo:", mergedMemo);

      const res = await apiFetch(`/membership/playerwrite/${playerpk}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify({
          memo: mergedMemo,
          lockerno: form.lockerno,
          lockersdate: form.lockersdate,
          lockeredate: form.lockeredate,
        }),
      });

      if (res.code === 200) {
        return {
          success: true,
          message: res.message,
        };
      } else {
        throw new Error(res.message);
      }
    } catch (err) {
      throw {
        success: false,
        message: err?.message || "서버 오류 발생",
      };
    }
  };

  // 날짜 포맷 변환 (Date 객체 → 'YYYY-MM-DD')
  const formatForServer = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const _playersend = async (form) => {
    try {
      // 4) 백엔드로 전송
      const res = await apiFetch("/membership/playeremailsend", {
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

  const _playerlockerlist = async (params) => {
    try {
      const res = await apiFetch("/membership/playerlockerlist", {
        method: "GET",
        query: params, // ✅ pageno 전달
      });

      return res;
    } catch (err) {
      console.error("locker list 조회 실패:", err);
      throw err;
    }
  };

  const _playerinfo = async (playerPk) => {
    const res = await apiFetch(`/membership/playerinfo/${playerPk}`, {
      method: "GET",
    });
    return res;
  };

  const _playerlockerchange = async (lockerno, status) => {
    try {
      const res = await apiFetch(
        `/postact/playerlockerchangeinfo/${lockerno}/${status}`,
        {
          method: "PUT",
        },
      );
      return res;
    } catch (err) {
      console.error("라커 상태 변경 실패:", err);
      throw err;
    }
  };

  const _playerexcel = async (params) => {
    try {
      const res = await apiFetch("/membership/playerlist/excel", {
        method: "GET",
        query: params,
      });

      return {
        success: true,
        data: res.excel_html,
      };
    } catch (err) {
      throw {
        success: false,
        message:
          err?.data?.message || err?.message || "서버 오류가 발생했습니다.",
      };
    }
  };

  const _commonPlayerinfo = async (playerPk) => {
    try {
      const res = await apiFetch(
        `/common/playerinfo?player=${playerPk}&type=player_pk`,
      );
      return res?.code === 200 ? res : null;
    } catch (error) {
      console.error("_commonPlayerinfo error:", error);
      return null;
    }
  };

  // return에도 추가
  // _commonPlayerinfo,

  return {
    _playerlist,
    _playerview,
    _playermodify,
    _playersend,
    _playerlockerlist,
    _playerinfo,
    _playerlockerchange,
    _playerexcel,
    _commonPlayerinfo,
  };
};
