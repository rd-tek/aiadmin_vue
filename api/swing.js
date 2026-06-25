import { useApiFetch } from "./fetch";

export const useSwingApi = () => {
  const apiFetch = useApiFetch();

  // 스윙 리스트
  const _swingList = async (params) => {
    return await apiFetch("/swing/swinglist", {
      method: "GET",
      query: params,
    });
  };

  // 스윙 상세
  const _swingView = async (fit_shotdata_pk) => {
    return await apiFetch(`/swing/swingview/${fit_shotdata_pk}`, {
      method: "GET",
    });
  };

  // 공개 여부 변경
  const _swingChangeFlag = async (flag, swingno) => {
    return await apiFetch("/app/swing/swingopen.php", {
      method: "GET",
      query: {
        flag,
        swingno,
      },
    });
  };

  // 스윙 삭제
  const _swingDelete = async (swingno) => {
    return await apiFetch(`/postact/swingdrop/${swingno}`, {
      method: "PUT",
    });
  };

  // 댓글 리스트
  const _swingReplyList = async (swingno, pageno = 1) => {
    return await apiFetch(`/swing/swingreplylist/${swingno}`, {
      method: "GET",
      query: {
        pageno,
      },
    });
  };

  // 댓글 등록
  const _swingReplyWrite = async (swingno, comment, top_comment_pk = 0) => {
    return await apiFetch(`/postact/swingreplywrite/${swingno}`, {
      method: "POST",
      body: {
        comment,
        top_comment_pk,
      },
    });
  };

  // 댓글 삭제
  const _swingReplyDelete = async (comment_pk) => {
    return await apiFetch(`/postact/swingreplydrop/${comment_pk}`, {
      method: "DELETE",
    });
  };

  // 제목/내용 수정
  const _swingTitleWrite = async (swingno, title, content, flag) => {
    return await apiFetch(`/swing/swingtitlewrite/${swingno}`, {
      method: "POST",
      body: {
        title,
        content,
        flag,
      },
    });
  };

  return {
    _swingList,
    _swingView,
    _swingChangeFlag,
    _swingDelete,
    _swingReplyList,
    _swingReplyWrite,
    _swingReplyDelete,
    _swingTitleWrite,
  };
};
