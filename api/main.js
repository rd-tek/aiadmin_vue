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

  /**
   * 파일 업로드 테스트
   */
  const _saveFileTest = async (formData) => {
    return await apiFetch("http://127.0.0.1/test.php", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return {
    _getMain,
    _saveFileTest,
  };
};