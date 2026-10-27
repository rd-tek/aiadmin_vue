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

  // 2026-10-13: 화면 숫자는 소수점 2자리까지(반올림 없이 자름). 숫자가 아니거나 비어 있으면 그대로 반환
  const n2 = (v) => {
    if (v === null || v === undefined || v === "" || typeof v === "boolean") return v;
    if (typeof v === "number" && !Number.isFinite(v)) return "-"; // 2026-10-27: 'NaN' 노출 방지
    if (typeof v === "string" && !/^\s*-?\d+(\.\d+)?\s*$/.test(v)) return v;
    const n = Number(v);
    if (!isFinite(n)) return v;
    if (Number.isInteger(n)) return typeof v === "string" && !v.includes(".") ? v : n;
    return Math.trunc(n * 100 + (n >= 0 ? 1e-9 : -1e-9)) / 100;
  };

  // 2026-10-27: 숫자가 아니면 'NaN' 대신 text 또는 '-'
  const toFixed = (value, text) => {
    if (!value) return text || 0;
    const n = Number(value);
    return Number.isFinite(n) ? n.toFixed(2) : text || "-";
  };

  const transToValue = (value, text) => (value == "0" ? text : value || 0);

  // 2026-10-27: 'YYYY-MM-DD HH:mm:ss' 는 구형 Safari 가 못 읽음 → 'T' 로 바꿔 읽고, 잘못된 값이면 toISOString 오류 대신 ''
  const toDate = (value) => {
    if (/^0000-00-00/.test(String(value))) return null;
    const d = value instanceof Date ? value : new Date(typeof value === "string" ? value.replace(/^(\d{4}-\d{2}-\d{2}) /, "$1T") : value);
    return isNaN(d.getTime()) ? null : d;
  };
  const GMTtuUTCTIME = (value) => {
    if (!value) return "";
    const date = toDate(value);
    if (!date) return "";
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
    const date = toDate(value);
    if (!date) return "";
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
    // 2026-10-27: 전체 URL(https://…)은 그대로 — 이전엔 앞에 S3 주소를 또 붙여 이미지가 깨짐(aimember 와 같게)
    if (value && /^https?:\/\//i.test(value)) return value;
    if (value) return `${base}/${value}`;
    return img || "/images/default/img_logo.png";
  };

  const getURL = (value, img = "") => {
    const base = useRuntimeConfig().public.s3BucketUrl;
    // 2026-10-27: 전체 URL(https://…)은 그대로 — 이전엔 앞에 S3 주소를 또 붙여 이미지가 깨짐(aimember 와 같게)
    if (value && /^https?:\/\//i.test(value)) return value;
    if (value) return `${base}/${value}`;
    return img || "/images/default/img_logo.png";
  };

  const getDownload = (value) => {
    const base = useRuntimeConfig().public.s3BucketUrl;
    return value ? `${base}/${value}` : "";
  };

  const getClubType = (value) => {
    switch (String(value ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
    switch (String(value ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
    switch (String(value ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
    switch (String(teebox ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
    if (!value || /^0000-00-00/.test(String(value))) return "-"; // DB 빈 날짜
    const d = dayjs(value);
    return d.isValid() ? d.format(type) : "-"; // 2026-10-27: 'Invalid Date' 노출 방지
  };

  const greenspeed = (status) => {
    const map = {
      1: "없음",
      2: "매우 빠름",
      3: "빠름",
      4: "보통",
      5: "느림",
      6: "매우 느림",
      7: "수동",
    };
    return map[status] || "-";
  };

  const greengravity = (status) => {
    const map = {
      1: "없음",
      2: "매우 높음",
      3: "높음",
      4: "중간",
      5: "낮음",
      6: "매우 낮음",
    };
    return map[status] || "-";
  };
  const hc_au = (value) => {
    if (value == null || value === "" || isNaN(value)) {
      return "-"; // 기본값
    }

    // 2026-10-27: 반올림 후 부호 — 이전엔 0.6 → '1'(+ 없음), -0.4 → '-0'
    const r = Math.round(Number(value));
    if (r > 0) return "+" + r;
    return r === 0 ? "0" : String(r);
  };

  const suffix = (value, text) => {
    // 2026-10-27: 4앱 같은 함수 — 값 없음(null·undefined·빈 값·'undefined'·'null'·NaN)과 0 은 '-' (aicoach 체공시간 'undefineds' 노출 수정)
    if (value === null || value === undefined) return "-";
    const s = String(value).trim();
    if (s === "" || s === "-" || s === "undefined" || s === "null" || s === "NaN" || value == "0") return "-";
    if (/^-?0+(\.0+)?$/.test(s)) return "-"; // '0.00' 같은 소수 0 도 0 과 같게
    return value + text;
  };

  const gamestatus = (status) => {
    status = String(status ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
    if (status === "1") return "준비";
    else if (status === "2") return "플레이";
    else if (status === "3") return "이동";
    else if (status === "4") return "종료";
    else if (status === "5") return "중단";
    else if (status === "6") return "완료";
    // else return "대기";
    return "-";
  };

  const play_type = (mode) => {
    mode = String(mode ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
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
    return "-";
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
    status = String(status ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
    if (status === "1") {
      return "대기";
    } else if (status === "2") {
      return "진행중";
    } else if (status === "3") {
      return "완료";
    } else if (status === "4") {
      return "취소";
    }
    return "-";
  };
  const tournament_type = (type) => {
    type = String(type ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
    if (type === "1") {
      return "공개";
    } else if (type === "2") {
      return "초청";
    } else if (type === "3") {
      return "비공개";
    }
    return "-";
  };

  const tournament_level = (level) => {
    level = String(level ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
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
    wind = String(wind ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
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
      return wind || "-";
    }
  };
  const teeboxman_type = (teebox) => {
    switch (String(teebox ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
    switch (String(teebox ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
      // 2026-10-27: 매장·관리자 앱과 같은 이름('이글-파5'·'버디-P5' 섞임 정리)
      3: "이글(P5)",
      4: "버디(P5)",
      5: "파(P5)",
      6: "이글(P4)",
      7: "버디(P4)",
      8: "파(P4)",
      9: "롱기스트",
      10: "니어핀",
      11: "롱기스트 랭크",
      12: "니어핀 랭크",
    };
    return map[type] || "";
  };

  const event_status = (status) => {
    switch (String(status ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
      case "0":
        return "대기";
      case "1":
        return "진행중";
      case "2":
        return "완료";
      case "3":
        return "취소";
      default:
        return "-"; // 2026-10-27: 정의되지 않은 값(이전엔 "대기")
    }
  };

  const event_level = (level) => {
    level = String(level ?? ""); // 2026-10-27: 숫자로 와도 같은 결과
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
    switch (String(value ?? "")) { // 2026-10-27: 숫자로 와도 같은 결과
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
  // 2026-10-21: 웹 에디터(Tiptap) HTML 표시용 — 허용 태그만 남김(스크립트·이벤트 속성 제거), 태그 없는 기존 평문은 줄바꿈 유지
  const RICH_TAGS = ["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "h2", "h3", "h4", "blockquote", "hr", "a", "img"];
  const escHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const richHtml = (v) => {
    const s = String(v ?? "");
    if (!s) return "";
    if (!/<\/?[a-z][\s\S]*>/i.test(s)) return escHtml(s).replace(/\r?\n/g, "<br>");
    return s
      .replace(/<(script|style|iframe|object|embed|form)[\s\S]*?<\/\1\s*>/gi, "")
      .replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (m, tag, attrs) => {
        const t = tag.toLowerCase();
        if (!RICH_TAGS.includes(t)) return "";
        if (m.startsWith("</")) return "</" + t + ">";
        let keep = "";
        if (t === "a") {
          const h = attrs.match(/href\s*=\s*"([^"]*)"/i);
          if (h && /^(https?:|mailto:|tel:)/i.test(h[1])) keep = ' href="' + h[1].replace(/"/g, "&quot;") + '" target="_blank" rel="noopener noreferrer"';
        }
        if (t === "img") {
          const h = attrs.match(/src\s*=\s*"([^"]*)"/i);
          if (!h || !/^https?:\/\//i.test(h[1])) return "";
          keep = ' src="' + h[1].replace(/"/g, "&quot;") + '" alt=""';
        }
        const al = attrs.match(/text-align:\s*(left|center|right)/i);
        if (al && /^(p|h2|h3|h4)$/.test(t)) keep += ' style="text-align:' + al[1].toLowerCase() + '"';
        return "<" + t + keep + ">";
      });
  };
  // 목록 카드 요약 등: 태그를 걷어낸 글자만
  const plainText = (v) =>
    String(v ?? "")
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/(p|li|h[2-4]|blockquote)>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();

  return {
    richHtml,
    plainText,
    comma,
    n2,
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
