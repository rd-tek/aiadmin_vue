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
    if (!import.meta.client || method === "GET" || method === "HEAD") return fetcher(url, options);
    let query = "";
    try { query = JSON.stringify(options.query || options.params || {}); } catch (e) { query = ""; }
    const key = `${method} ${String(url)} ${bodyKey(options.body)} ${query}`;
    if (inflight.has(key)) return inflight.get(key);
    const p = Promise.resolve()
      .then(() => fetcher(url, options))
      .finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}
