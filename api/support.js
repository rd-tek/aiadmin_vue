import { useApiFetch } from "./fetch";

export const useCustomerApi = () => {
  const apiFetch = useApiFetch();

  // =====================
  // 플레이어 공지사항
  // =====================
  const _playerNoticelist = async (params) => {
    return await apiFetch("/customer/noticeweblist", {
      method: "GET",
      query: params,
    });
  };

  const _playerNoticeview = async (noticeno, params) => {
    return await apiFetch(`/customer/noticewebview/${noticeno}`, {
      method: "GET",
      query: params,
    });
  };

  const _playerNoticeWrite = async (formData) => {
    return await apiFetch("/customer/noticewebwrite", {
      method: "POST",
      body: formData,
    });
  };

  const _playerNoticeModify = async (noticeno, formData) => {
    return await apiFetch(`/customer/noticewebwrite/${noticeno}`, {
      method: "POST",
      body: formData,
    });
  };

  const _playerNoticeDelete = async (noticeno) => {
    return await apiFetch(`/postact/noticewebdelete/${noticeno}`, {
      method: "DELETE",
    });
  };

  // =====================
  // 매장주 공지사항
  // =====================
  const _ownerNoticelist = async (params) => {
    return await apiFetch("/customer/noticeshoplist", {
      method: "GET",
      query: params,
    });
  };

  const _ownerNoticeview = async (noticeno, params) => {
    return await apiFetch(`/customer/noticeshopview/${noticeno}`, {
      method: "GET",
      query: params,
    });
  };

  const _ownerNoticeWrite = async (formData) => {
    return await apiFetch("/customer/noticeshopwrite", {
      method: "POST",
      body: formData,
    });
  };

  const _ownerNoticeModify = async (noticeno, formData) => {
    return await apiFetch(`/customer/noticeshopwrite/${noticeno}`, {
      method: "POST",
      body: formData,
    });
  };

  const _ownerNoticeDelete = async (noticeno) => {
    return await apiFetch(`/postact/noticeshopdelete/${noticeno}`, {
      method: "DELETE",
    });
  };

  // =====================
  // 앱 공지사항
  // =====================
  const _appNoticelist = async (params) => {
    return await apiFetch("/customer/noticeapplist", {
      method: "GET",
      query: params,
    });
  };

  const _appNoticeview = async (noticeno, params) => {
    return await apiFetch(`/customer/noticeappview/${noticeno}`, {
      method: "GET",
      query: params,
    });
  };

  const _appNoticeWrite = async (formData) => {
    return await apiFetch("/customer/noticeappwrite", {
      method: "POST",
      body: formData,
    });
  };

  const _appNoticeModify = async (noticeno, formData) => {
    return await apiFetch(`/customer/noticeappwrite/${noticeno}`, {
      method: "POST",
      body: formData,
    });
  };

  const _appNoticeDelete = async (noticeno) => {
    return await apiFetch(`/postact/noticeappdelete/${noticeno}`, {
      method: "DELETE",
    });
  };

  // =====================
  // 자료실
  // =====================
  const _resourceslist = async (params) => {
    return await apiFetch("/customer/resourceslist", {
      method: "GET",
      query: params,
    });
  };

  const _resourcesView = async (resourcesno, params) => {
    return await apiFetch(`/customer/resourcesview/${resourcesno}`, {
      method: "GET",
      query: params,
    });
  };

  const _resourcesWrite = async (formData) => {
    return await apiFetch("/customer/resourceswrite", {
      method: "POST",
      body: formData,
    });
  };

  const _resourcesModify = async (resourcesno, formData) => {
    return await apiFetch(`/customer/resourceswrite/${resourcesno}`, {
      method: "POST",
      body: formData,
    });
  };

  const _resourcesDelete = async (resourcesno) => {
    return await apiFetch(`/postact/resourcesdelete/${resourcesno}`, {
      method: "DELETE", // ⚠️ 기존 코드 GET으로 되어있음 — 백엔드 확인 필요
    });
  };

  // =====================
  // 문의
  // =====================
  const _inquiryList = async (params) => {
    return await apiFetch("/customer/inquirylist", {
      method: "GET",
      query: params,
    });
  };

  const _inquiryView = async (inquiryno, params) => {
    return await apiFetch(`/customer/inquiryview/${inquiryno}`, {
      method: "GET",
      query: params,
    });
  };

  const _inquiryDelete = async (inquiryno) => {
    return await apiFetch(`/postact/inquirydelete/${inquiryno}`, {
      method: "DELETE",
    });
  };

  const _inquiryStatus = async (inquiryno, viewflag) => {
    return await apiFetch(`/postact/inquiryedit/${inquiryno}/${viewflag}`, {
      method: "PUT",
    });
  };

  return {
    // 플레이어 공지사항
    _playerNoticelist,
    _playerNoticeview,
    _playerNoticeWrite,
    _playerNoticeModify,
    _playerNoticeDelete,
    // 매장주 공지사항
    _ownerNoticelist,
    _ownerNoticeview,
    _ownerNoticeWrite,
    _ownerNoticeModify,
    _ownerNoticeDelete,
    // 앱 공지사항
    _appNoticelist,
    _appNoticeview,
    _appNoticeWrite,
    _appNoticeModify,
    _appNoticeDelete,
    // 자료실
    _resourceslist,
    _resourcesView,
    _resourcesWrite,
    _resourcesModify,
    _resourcesDelete,
    // 문의
    _inquiryList,
    _inquiryView,
    _inquiryDelete,
    _inquiryStatus,
  };
};