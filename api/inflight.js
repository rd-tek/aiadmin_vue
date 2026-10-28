/**
 * 2026-10-26: 저장 버튼 이중 제출 방지(4앱 같은 파일)
 *
 * 저장 버튼을 빠르게 두 번 누르면 같은 저장 요청이 두 번 나가 글·예약 등이 두 건 생길 수 있었습니다.
 * 화면마다 '저장 중' 잠금을 다는 대신 공통 요청 함수(api/fetch.js)에서 한 번에 막습니다.
 *
 * - GET/HEAD 가 아닌 요청(POST·PUT·DELETE)에서 '방식 + 주소 + 보내는 내용'이 똑같은 요청이
 *   아직 진행 중이면 새로 보내지 않고, 진행 중인 요청의 결과를 함께 돌려줍니다.
 * - 내용이 하나라도 다르면(다른 글·다른 시간) 그대로 각각 보냅니다. 응답이 오면 바로 풀립니다.
 * - 서버 렌더링 중에는 쓰지 않습니다(여러 사용자의 요청이 한 서버에 섞이므로).
 */
const inflight = new Map();

// 2026-10-28 AI검토 4차: 네트워크 끊김(응답 없음)·서버가 JSON 이 아닌 5xx 를 준 경우
//   토스트에 '[DELETE] "https://…" <no response> Failed to fetch' 같은 원문이 그대로 보이던 것 → 안내 문구로 바꿔 다시 던짐
//   (백엔드가 보낸 message 가 있으면 건드리지 않음. 401 처리·404 판별(statusCode)은 그대로)
const NET_MSG = "서버에 연결하지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.";
const SERVER_MSG = "일시적인 서버 오류입니다. 잠시 후 다시 시도해 주세요.";
// 2026-10-28(최종 검토): 실패했던 주소가 다시 성공하면 안내를 거두도록 주소(쿼리 제외)를 함께 알림
const pathOf = (url) => String(url || "").split("?")[0];
function loadOk(method, url, res) {
  if (import.meta.client && method === "GET") {
    try { window.dispatchEvent(new CustomEvent("xg:load-ok", { detail: { path: pathOf(url) } })); } catch (e) { /* 무시 */ }
  }
  return res;
}
function friendlyError(err, method = "GET", url = "") {
  try {
    const hasBodyMsg = err?.data && typeof err.data === "object" && err.data.message;
    const aborted = err?.cause?.name === "AbortError" || err?.name === "AbortError"; // 페이지 이동 등으로 중단된 요청은 오류 아님
    if (err?.name === "FetchError" && !hasBodyMsg && !aborted) {
      const net = !err.response;
      if (net) err.message = NET_MSG;
      else if (err.response.status >= 500) err.message = SERVER_MSG;
      // 2026-10-28: 불러오기(GET) 실패는 plugins/load-error.client.js 가 화면에 안내(빈 상태 문구 대신)
      if (import.meta.client && method === "GET" && (net || err.response.status >= 500)) {
        window.dispatchEvent(new CustomEvent("xg:load-error", { detail: { net, path: pathOf(url) } }));
      }
    }
  } catch (e) { /* 메시지를 못 바꿔도 원래 오류를 던짐 */ }
  throw err;
}

const bodyKey = (body) => {
  if (body === null || body === undefined) return "";
  if (typeof body === "string") return body;
  if (typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams) return body.toString();
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const parts = [];
    for (const [k, v] of body.entries()) {
      parts.push(`${k}=${typeof v === "string" ? v : `[file:${v.name}:${v.size}:${v.lastModified}]`}`);
    }
    return parts.join("&");
  }
  try {
    return JSON.stringify(body);
  } catch (e) {
    return `${Date.now()}:${Math.random()}`; // 직렬화할 수 없으면 합치지 않음
  }
};

export function dedupeInflight(fetcher) {
  return (url, options = {}) => {
    const method = String(options?.method || "GET").toUpperCase();
    if (!import.meta.client || method === "GET" || method === "HEAD") return Promise.resolve(fetcher(url, options)).then((r) => loadOk(method, url, r)).catch((e) => friendlyError(e, method, url)); // 즉시 호출(서버 렌더링 중 Nuxt 컨텍스트 유지 — then 안에서 부르면 useCookie 등이 컨텍스트를 잃음)
    let query = "";
    try { query = JSON.stringify(options.query || options.params || {}); } catch (e) { query = ""; }
    const key = `${method} ${String(url)} ${bodyKey(options.body)} ${query}`;
    if (inflight.has(key)) return inflight.get(key);
    const p = Promise.resolve()
      .then(() => fetcher(url, options))
      .catch((e) => friendlyError(e, method, url))
      .finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}
