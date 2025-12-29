// ~/api/fetch.js
import { ofetch } from "ofetch";
import { useRuntimeConfig, useNuxtApp, useCookie } from "#app";
import { useRequestStore } from "~/stores/request"; // ✅ 반드시 직접 import

export function useApiFetch() {
  const config = useRuntimeConfig();
  const requestStore = useRequestStore(useNuxtApp().$pinia);

  // --- utils ---
  const getAccessToken = () => {
    // 클라이언트: sessionStorage 우선
    if (process.client) {
      const t = sessionStorage.getItem("aicoachtoken");
      if (t) return t;
    }
    // 서버/클라이언트 공통: 쿠키 fallback (httpOnly 아니어야 읽힘)
    const cookie = useCookie("aicoachtoken");
    return cookie.value || null;
  };

  const setAuthHeader = (headers) => {
    const token = getAccessToken();
    if (!token) return headers;

    if (headers instanceof Headers) {
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
    // plain object
    return {
      ...headers,
      Authorization: headers?.Authorization || `Bearer ${token}`,
    };
  };

  // 간단한 401 재시도(무한루프 방지용 플래그)
  let isRefreshing = false;

  return ofetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options, request }) {
      requestStore.requestStart();

      // 1) Authorization 자동 주입
      options.headers = setAuthHeader(options.headers || {});

      // 2) Content-Type 기본값 (FormData면 설정 금지)
      if (!(options.body instanceof FormData)) {
        if (options.headers instanceof Headers) {
          if (!options.headers.has("Content-Type")) {
            options.headers.set(
              "Content-Type",
              "application/x-www-form-urlencoded",
            );
          }
        } else {
          options.headers = {
            ...options.headers,
            "Content-Type":
              options.headers?.["Content-Type"] ||
              "application/x-www-form-urlencoded",
          };
        }
      }

      // (선택) Accept 기본값
      if (options.headers instanceof Headers) {
        if (!options.headers.has("Accept"))
          options.headers.set("Accept", "application/json");
      } else {
        options.headers = { Accept: "application/json", ...options.headers };
      }
    },

    onResponse({ response }) {
      requestStore.requestSuccess();
      return response;
    },

    async onResponseError({ response, request, options, error }) {
      requestStore.requestError(response);

      // 401 처리: 한 번만 refresh 시도 후 원요청 재시도
      if (response?.status === 401 && !isRefreshing) {
        try {
          isRefreshing = true;

          // refresh 토큰은 쿠키에 있다고 가정 (예: refresh_token)
          const refreshToken = useCookie("refresh_token").value;
          if (!refreshToken) throw new Error("No refresh token");

          // (엔드포인트는 예시) /auth/refresh 요청
          const refreshRes = await ofetch(
            `${config.public.apiBase}/auth/refresh`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh_token: refreshToken }),
            },
          );

          // 성공 시 새 access token 반영
          if (refreshRes?.token) {
            // 세션스토리지 & 쿠키 모두 업데이트 (환경에 맞게)
            if (process.client)
              sessionStorage.setItem("aicoachtoken", refreshRes.token);
            const tokenCookie = useCookie("aicoachtoken");
            tokenCookie.value = refreshRes.token;

            // 원요청 헤더 갱신 후 재시도 (단 1회)
            const retryHeaders =
              options.headers instanceof Headers
                ? new Headers(options.headers)
                : { ...(options.headers || {}) };

            if (retryHeaders instanceof Headers) {
              retryHeaders.set("Authorization", `Bearer ${refreshRes.token}`);
            } else {
              retryHeaders["Authorization"] = `Bearer ${refreshRes.token}`;
            }

            const retryOptions = { ...options, headers: retryHeaders };
            const retried = await ofetch.raw(request, retryOptions);
            return retried._data;
          }

          throw new Error("Failed to refresh");
        } catch (e) {
          // refresh 실패 → 로그아웃/재로그인 유도
          // TODO: authStore.reset(); navigateTo('/login');
          throw error;
        } finally {
          isRefreshing = false;
        }
      }

      // 기타 에러 그대로 throw
      throw error;
    },
  });
}
