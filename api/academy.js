import { useApiFetch } from "./fetch";
import qs from "qs";

export const useAcademyApi = () => {
  const apiFetch = useApiFetch(); // ✅ 인스턴스 생성 먼저

  const _academylist = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/academy/academylist", {
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
          list: res.academylist,
          listcnt: res.academylistcnt,
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

  const _academyview = async (academy_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/academy/academyview/" + academy_pk, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   // ❌ Content-Type 제거
        // },
      });

      if (res.code === 200) {
        return {
          success: true,
          academy: res.academy,
          classes: res.classes,
          recommend: res.recommend,
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

  const _academydrop = async (params) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/postact/academydrop", {
        method: "POST",
        body: qs.stringify(params),
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
          message: res.message || "서버 에러",
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

  const _coachingview = async (academy_pk) => {
    // const token = sessionStorage.getItem("token") || null;

    try {
      const res = await apiFetch("/academy/coachingview/" + academy_pk, {
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
      const res = await apiFetch("/academy/reviewlist/" + academy_pk, {
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

  const _academywrite = async (form) => {
    // const token = sessionStorage.getItem("token") || null;
    console.log("form to submit:", form);

    const flat = {
      academy_pk: form.academy_pk || form.academy?.academy_pk || null,

      // academy 객체에서 thumbnail, coach_thumbnail 은 제외 (파일이라서)
      ...(form.academy
        ? Object.fromEntries(
            Object.entries(form.academy).filter(
              ([key]) => key !== "thumbnail" && key !== "coach_thumbnail",
            ),
          )
        : {}),

      classes: JSON.stringify(form.classes || []),
      recommend: JSON.stringify(form.recommend || {}),
    };

    const data = new FormData();

    Object.entries(flat).forEach(([key, value]) => {
      // null/undefined 방지
      if (value === null || value === undefined) {
        data.append(key, "");
      } else {
        data.append(key, value);
      }
    });

    // 🔥 파일 필드: form.value.academy.thumbnail 이 이제 File 객체임
    if (form.academy?.thumbnail instanceof File) {
      data.append("thumbnail", form.academy.thumbnail);
    }

    if (form.academy?.coach_thumbnail instanceof File) {
      data.append("coach_thumbnail", form.academy.coach_thumbnail);
    }

    try {
      const res = await apiFetch(
        "/academy/academywrite/" + (form.academy_pk || ""),
        {
          method: "POST",

          body: data,
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
  return {
    _academylist,
    _academyview,
    _academylike,
    _academyenroll,
    _academydrop,
    _coachingview,
    _reviewlist,
    _academywrite,
  };
};
