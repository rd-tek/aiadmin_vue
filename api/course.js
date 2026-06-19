import { useApiFetch } from "./fetch";

export const useCourseApi = () => {
  const apiFetch = useApiFetch();

  // 통합관리코스리스트
  const _courseList = async (params) => {
    return await apiFetch("/course/courselist", {
      method: "GET",
      query: {
        searchtype: params.searchtype,
        searchname: params.searchname,
        pageno: params.pageno,
      },
    });
  };

  // 통합관리코스보기
  const _courseView = async (courseno) => {
    return await apiFetch(`/course/courseview/${courseno}`, {
      method: "GET",
    });
  };

  // 통합관리코스홀보기
  const _courseHoleView = async (courseno, holeno, subcourseseq) => {
    return await apiFetch(
      `/course/courseholeview/${courseno}/${subcourseseq}/${holeno}`,
      {
        method: "GET",
      },
    );
  };

  // 서브코스 개수 체크
  const _subcourseCntCheck = async (courseno, subcourselistcnt) => {
    return await apiFetch(`/course/ajax_subcourse_cnt_check/${courseno}`, {
      method: "POST",
      body: {
        subcourselistcnt,
      },
    });
  };

  // 통합관리코스 등록
  const _courseWrite = async (formData) => {
    return await apiFetch("/course/coursewrite", {
      method: "POST",
      body: formData,
    });
  };

  // 통합관리코스 수정
  const _courseEdit = async (courseno, formData) => {
    return await apiFetch(`/course/coursewrite/${courseno}`, {
      method: "POST",
      body: formData,
    });
  };

  // 통합관리코스홀 등록
  const _courseHoleWrite = async (formData) => {
    return await apiFetch("/course/courseholewrite", {
      method: "POST",
      body: formData,
    });
  };

  // 통합관리코스홀 수정
  const _courseHoleEdit = async (formData) => {
    return await apiFetch("/course/courseholewrite", {
      method: "POST",
      body: formData,
    });
  };

  return {
    _courseList,
    _courseView,
    _courseHoleView,
    _subcourseCntCheck,
    _courseWrite,
    _courseEdit,
    _courseHoleWrite,
    _courseHoleEdit,
  };
};
