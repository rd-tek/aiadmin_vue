import { useApiFetch } from "./fetch";

export const useManagerApi = () => {
  const apiFetch = useApiFetch();

  // 관리자 목록
  const _adminList = async (params) => {
    return await apiFetch("/manager/adminlist", {
      method: "GET",
      query: params,
    });
  };

  // 관리자 상세
  const _adminView = async (adminno) => {
    return await apiFetch(`/manager/adminview/${adminno}`, {
      method: "GET",
    });
  };

  // 관리자 등록
  const _adminWrite = async (data) => {
    return await apiFetch("/manager/adminwrite", {
      method: "POST",
      body: data,
    });
  };

  // 관리자 수정
  const _adminUpdate = async (adminno, data) => {
    return await apiFetch(`/manager/adminwrite/${adminno}`, {
      method: "POST",
      body: data,
    });
  };

  // 타임존 목록
  const _timezoneList = async (params) => {
    return await apiFetch("/manager/timezonelist", {
      method: "GET",
      query: params,
    });
  };

  // 타임존 상세
  const _timezoneView = async (timezonePk) => {
    return await apiFetch(`/manager/timezoneview/${timezonePk}`, {
      method: "GET",
    });
  };

  // 타임존 등록
  const _timezoneWrite = async (data) => {
    return await apiFetch("/manager/timezonewrite", {
      method: "POST",
      body: data,
    });
  };

  // 타임존 수정
  const _timezoneUpdate = async (timezonePk, data) => {
    return await apiFetch(`/manager/timezonewrite/${timezonePk}`, {
      method: "POST",
      body: data,
    });
  };

  // DST 목록
  const _timezonedstList = async (params) => {
    return await apiFetch("/manager/timezonedstList", {
      method: "GET",
      query: params,
    });
  };

  // DST 상세
  const _timezonedstView = async (timezonedstPk) => {
    return await apiFetch(`/manager/timezonedstview/${timezonedstPk}`, {
      method: "GET",
    });
  };

  // DST 등록
  const _timezonedstWrite = async (data) => {
    return await apiFetch("/manager/timezonedstwrite", {
      method: "POST",
      body: data,
    });
  };

  // DST 수정
  const _timezonedstUpdate = async (timezonedstPk, data) => {
    return await apiFetch(`/manager/timezonedstwrite/${timezonedstPk}`, {
      method: "POST",
      body: data,
    });
  };

  // 국가 목록
  const _countryList = async () => {
    return await apiFetch("/common/countrylist", {
      method: "GET",
    });
  };

  // 주(지역) 목록
  const _statesList = async (countryno) => {
    return await apiFetch(`/common/stateslist/${countryno}`, {
      method: "GET",
    });
  };

  // 타임존(주) 목록
  const _timezoneStateList = async () => {
    return await apiFetch("/common/timezonelist", {
      method: "GET",
    });
  };

  return {
    _adminList,
    _adminView,
    _adminWrite,
    _adminUpdate,

    _timezoneList,
    _timezoneView,
    _timezoneWrite,
    _timezoneUpdate,

    _timezonedstList,
    _timezonedstView,
    _timezonedstWrite,
    _timezonedstUpdate,

    _countryList,
    _statesList,
    _timezoneStateList,
  };
};