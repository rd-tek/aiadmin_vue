// utils/common.js
import dayjs from "dayjs";

export function useCommon() {
  const comma = (value) => {
    if (value) {
      const parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    } else return 0;
  };

  const toFixed = (value, text) =>
    value ? Number(value).toFixed(2) : text || 0;

  const transToValue = (value, text) => (value == "0" ? text : value || 0);

  const GMTtuUTCTIME = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return new Date(now_utc)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "");
  };

  const GMTtuUTC = (value) => {
    if (!value) return "";
    const date = new Date(value);
    const now_utc = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    );
    return new Date(now_utc).toISOString().split("T")[0];
  };

  const getImg = (value, img = "") => {
    const base = useRuntimeConfig().public.s3BucketUrl;
    if (value) return `${base}/${value}`;
    return img || "/images/default/img_logo.png";
  };

  const getURL = (value, img = "") => {
    const base = useRuntimeConfig().public.s3BucketUrl;
    if (value) return `${base}/${value}`;
    return img || "/images/default/img_logo.png";
  };

  const getDownload = (value) => {
    const base = useRuntimeConfig().public.s3BucketUrl;
    return value ? `${base}/${value}` : "";
  };

  const getClubType = (value) => {
    switch (value) {
      case "1":
        return "드라이버";
      case "2":
        return "우드";
      case "3":
        return "유틸리티";
      case "4":
        return "아이언";
      case "5":
        return "웨지";
      case "6":
        return "퍼터";
      default:
        return "-";
    }
  };

  const getShaftMaterial = (value) => {
    switch (value) {
      case "1":
        return "그라파이트";
      case "2":
        return "스틸";
      case "3":
        return "카본";
      default:
        return "-";
    }
  };

  const getBalance = (value) => {
    return (
      {
        1: "R",
        2: "SR",
        3: "S",
        4: "L",
      }[value] || "-"
    );
  };

  const getInterestClub = (value) => {
    switch (value) {
      case "1":
        return "타구감";
      case "2":
        return "방향감";
      case "3":
        return "거리감";
      default:
        return "-";
    }
  };

  const getClubCode = (value) => {
    return (
      {
        1: "DR",
        2: "W2",
        3: "I3",
        4: "U4",
        5: "PW",
        6: "AW",
      }[value] || "ETC"
    );
  };

  const getLessonTitle = (value) => {
    const map = {
      lesson1: "어드레스",
      lesson2: "백 스윙",
      lesson3: "탑 스윙",
      lesson4: "다운 스윙",
      lesson5: "임팩트",
      lesson6: "폴로 스루",
      lesson7: "피니쉬",
      lessontotal: "전체 리뷰",
    };
    return map[value] || "-";
  };

  const teeboxType = (teebox) => {
    switch (teebox) {
      case "1":
        return "프로(블루)";
      case "2":
        return "일반(화이트)";
      case "3":
        return "레이디(레드)";
      case "4":
        return "시니어(옐로우)";
      default:
        return "-";
    }
  };

  const dateformat = (value, type = "YYYY.MM.DD") => {
    return value ? dayjs(value).format(type) : "-";
  };

  const greenspeed = (status) => {
    const map = {
      0: "매우 빠름",
      1: "빠름",
      2: "보통",
      3: "느림",
      4: "매우 느림",
    };
    return map[status] || "-";
  };

  const greengravity = (status) => {
    const map = {
      0: "매우 높음",
      1: "높음",
      2: "중간",
      3: "낮음",
      4: "매우 낮음",
    };
    return map[status] || "-";
  };
  const hc_au = (value) => {
    if (value == null || value === "" || isNaN(value)) {
      return "-"; // 기본값
    }

    const num = Number(value);

    if (num < 1) {
      return num.toFixed(0); // 음수나 0일 때
    } else {
      return "+" + Math.abs(num).toFixed(0); // 양수일 때
    }
  };

  const suffix = (value, text) => {
    if (value == "0") {
      return "-";
    } else return value + text;
  };

  const gamestatus = (status) => {
    if (status === "1") return "준비";
    else if (status === "2") return "플레이";
    else if (status === "3") return "이동";
    else if (status === "4") return "종료";
    else if (status === "5") return "중단";
    else if (status === "6") return "완료";
    // else return "대기";
  };

  const play_type = (mode) => {
    if (mode === "1") {
      return "stroke";
    } else if (mode === "2") {
      return "match";
    } else if (mode === "3") {
      return "skins";
    } else if (mode === "4") {
      return "approach";
    } else if (mode === "5") {
      return "driveway";
    } else if (mode === "6") {
      return "par3";
    } else if (mode === "7") {
      return "longest";
    } else if (mode === "8") {
      return "putting";
    } else if (mode === "9") {
      return "nearpin";
    }
  };
  const change_balltype = (type) => {
    if (type == 1) return "스트레이트";
    else if (type == 2) return "훅";
    else if (type == 3) return "슬라이스";
    else if (type == 4) return "풀 스트레이트";
    else if (type == 5) return "풀 훅";
    else if (type == 6) return "풀 슬라이스";
    else if (type == 7) return "푸시 스트레이트";
    else if (type == 8) return "푸시 훅";
    else if (type == 9) return "푸시 슬라이스";
    else return "-";
  };

  const tournament_status = (status) => {
    if (status === "1") {
      return "대기";
    } else if (status === "2") {
      return "진행중";
    } else if (status === "3") {
      return "완료";
    } else if (status === "4") {
      return "취소";
    }
  };
  const tournament_type = (type) => {
    if (type === "1") {
      return "공개";
    } else if (type === "2") {
      return "초청";
    } else if (type === "3") {
      return "비공개";
    }
  };

  const tournament_level = (level) => {
    if (level === "1") {
      return "프로";
    } else if (level === "2") {
      return "준프로";
    } else if (level === "3") {
      return "숙련";
    } else if (level === "4") {
      return "일반";
    } else if (level === "5") {
      return "입문";
    } else {
      return "-";
    }
  };

  const wind_type = (wind) => {
    if (wind === "0") {
      return "무풍";
    } else if (wind === "1") {
      return "약풍";
    } else if (wind === "2") {
      return "중풍";
    } else if (wind === "3") {
      return "강풍";
    } else if (wind === "4") {
      return "랜덤";
    } else {
      return wind;
    }
  };
  const teeboxman_type = (teebox) => {
    switch (teebox) {
      case "1":
        return "프로(블루)";
      case "2":
        return "일반(화이트)";
      case "3":
        return "레이디(레드)";
      case "4":
        return "시니어(옐로우)";
      default:
        return "-";
    }
  };
  const teeboxwoman_type = (teebox) => {
    switch (teebox) {
      case "1":
        return "프로(블루)";
      case "2":
        return "일반(화이트)";
      case "3":
        return "레이디(레드)";
      case "4":
        return "시니어(옐로우)";
      default:
        return "-";
    }
  };

  const event_type = (type) => {
    const map = {
      1: "홀인원",
      2: "알바트로스",
      3: "이글-파5",
      4: "버디-P5",
      5: "파-P5",
      6: "이글-파4",
      7: "버디-P4",
      8: "파-P4",
      9: "롱기스트",
      10: "니어핀",
      11: "롱기스트 랭킹",
      12: "니어핀 랭킹",
    };
    return map[type] || "";
  };

  const event_status = (status) => {
    switch (status) {
      case "0":
        return "대기";
      case "1":
        return "진행중";
      case "2":
        return "완료";
      case "3":
        return "취소";
      default:
        return "대기"; // 정의되지 않은 값은 null
    }
  };

  const event_level = (level) => {
    if (level === "1") {
      return "프로";
    } else if (level === "2") {
      return "준프로";
    } else if (level === "3") {
      return "숙련";
    } else if (level === "4") {
      return "일반";
    } else if (level === "5") {
      return "입문";
    } else {
      return "-";
    }
  };
  const getClubcodeToClubname = (value) => {
    switch (value) {
      case "101":
        return "DR";
      case "202":
        return "W2";
      case "203":
        return "W3";
      case "204":
        return "W4";
      case "205":
        return "W5";
      case "206":
        return "W6";
      case "207":
        return "W7";
      case "208":
        return "W8";
      case "303":
        return "U3";
      case "304":
        return "U4";
      case "305":
        return "U5";
      case "306":
        return "U6";
      case "307":
        return "U7";
      case "401":
        return "I1";
      case "402":
        return "I2";
      case "403":
        return "I3";
      case "404":
        return "I4";
      case "405":
        return "I5";
      case "406":
        return "I6";
      case "407":
        return "I7";
      case "408":
        return "I8";
      case "409":
        return "I9";
      case "501":
        return "PW";
      case "502":
        return "GW";
      case "503":
        return "AW";
      case "504":
        return "PS";
      case "505":
        return "FW";
      case "506":
        return "DW";
      case "507":
        return "TW";
      case "508":
        return "SW";
      case "509":
        return "LW";
      case "601":
        return "PT";
      default:
        return "-";
    }
  };
  return {
    comma,
    toFixed,
    transToValue,
    GMTtuUTCTIME,
    GMTtuUTC,
    getImg,
    getURL,
    getDownload,
    getClubType,
    getShaftMaterial,
    getBalance,
    getInterestClub,
    getClubCode,
    getLessonTitle,
    teeboxType,
    dateformat,
    greenspeed,
    greengravity,
    hc_au,
    suffix,
    gamestatus,
    play_type,
    change_balltype,
    tournament_status,
    tournament_type,
    tournament_level,
    wind_type,
    teeboxman_type,
    teeboxwoman_type,
    event_type,
    event_status,
    event_level,
    getClubcodeToClubname,
  };
}
