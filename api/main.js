import { useApiFetch } from "./fetch";

export const useMainApi = () => {
  const apiFetch = useApiFetch();

  /**
   * 메인 대시보드 데이터
   */
  const _getMain = async (params = {}) => {
    return await apiFetch("/main", {
      method: "GET",
      query: params,
    });
  };

  return {
    _getMain,
  };
};