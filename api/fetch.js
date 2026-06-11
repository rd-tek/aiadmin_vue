import { ofetch } from "ofetch";
import { useRuntimeConfig, useNuxtApp, useCookie } from "#app";
import { useRequestStore } from "~/stores/request";

export function useApiFetch() {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const requestStore = useRequestStore(nuxtApp.$pinia);

  const getAccessToken = () => {
    const cookie = useCookie("aiadmintoken");
    return cookie.value || null;
  };

  let isRefreshing = false;

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

      if (response?.status === 401 && !isRefreshing) {
        try {
          isRefreshing = true;

          const refreshToken = useCookie("refresh_token").value;
          if (!refreshToken) throw new Error("No refresh token");

          const refreshRes = await ofetch(
            `${config.public.apiBase}/auth/refresh`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ refresh_token: refreshToken }),
            },
          );

          if (refreshRes?.token) {
            useCookie("aiadmintoken").value = refreshRes.token;

            const retryHeaders = {
              ...headers,
              Authorization: `Bearer ${refreshRes.token}`,
            };

            const retried = await ofetch(config.public.apiBase + url, {
              ...options,
              headers: retryHeaders,
            });

            requestStore.requestSuccess();
            return retried;
          }

          throw new Error("Failed to refresh");
        } catch (e) {
          throw err;
        } finally {
          isRefreshing = false;
        }
      }

      throw err;
    }
  };

  return apiFetch;
}
