import { ofetch } from "ofetch";
import { useRuntimeConfig, useNuxtApp, useCookie, useRoute, navigateTo } from "#app";
import { useRequestStore } from "~/stores/request";

/**
 * 2026-10-06: 백엔드 response_error 가 실제 HTTP 4xx 를 반환하도록 바뀜(이전엔 항상 200 + 본문 code).
 *  - 4xx/5xx 라도 JSON 본문({code, message, ...})이 있으면 그 본문을 "그대로 반환" →
 *    각 api 함수의 기존 분기(res.code === 200 ? 성공 : reject(res))와 토스트 문구가 이전과 동일하게 동작.
 *  - 401 = 로그인 필요/세션 만료: 토큰 정리 후 /login 으로 1회 이동(백엔드에 /auth/refresh 가 없어 기존 refresh 시도는 동작한 적 없음 → 제거).
 */
let isRedirecting = false;

function handleUnauthorized() {
  if (!import.meta.client || isRedirecting) return;
  isRedirecting = true;
  try {
    useCookie("aiadmintoken").value = null;
    try { sessionStorage.removeItem("aiadmintoken"); } catch (e) {}
    const route = useRoute();
    if (route?.path !== "/login") {
      const target = route?.fullPath ? `/login?redirect=${encodeURIComponent(route.fullPath)}` : "/login";
      navigateTo(target, { replace: true });
    }
  } catch (e) {
    window.location.href = "/login";
  } finally {
    setTimeout(() => { isRedirecting = false; }, 1000);
  }
}

function errorBody(err) {
  const body = err?.data;
  return body && typeof body === "object" && "code" in body ? body : null;
}

export function useApiFetch() {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const requestStore = useRequestStore(nuxtApp.$pinia);

  const getAccessToken = () => {
    const cookie = useCookie("aiadmintoken");
    return cookie.value || null;
  };

  const apiFetch = async (url, options = {}) => {
    const token = getAccessToken();
    const headers = {
      Accept: "application/json",
      ...(!(options.body instanceof FormData) && {
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    };

    requestStore.requestStart();

    try {
      const res = await ofetch(config.public.apiBase + url, {
        ...options,
        headers,
      });
      requestStore.requestSuccess();
      return res;
    } catch (err) {
      const response = err?.response;
      requestStore.requestError(response);

      if (response?.status === 401) handleUnauthorized();

      // 4xx/5xx 라도 백엔드 JSON 본문이면 이전과 같이 반환(호출부가 res.code 로 분기)
      const body = errorBody(err);
      if (body) return body;

      throw err;
    }
  };

  return apiFetch;
}
