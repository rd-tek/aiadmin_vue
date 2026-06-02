import { useApiFetch } from "./fetch";
import qs from "qs";

export const useMembersApi = () => {
  const apiFetch = useApiFetch();

  // 회원 리스트
  const _playerlist = async (params) => {
    return await apiFetch("/membership/playerlist", {
      method: "GET",
      query: params,
    });
  };

  // 회원 상세
  const _playerview = async (playerno) => {
    return await apiFetch(`/membership/playerview/${playerno}`, {
      method: "GET",
    });
  };

  // 회원 수정
  const _playeredit = async (playerno, memberinfo) => {
    return await apiFetch(`/postact/playeredit/${playerno}`, {
      method: "POST",
      body: qs.stringify({
        handicap: memberinfo.handicap,
        status: memberinfo.status,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  // 매장 회원 리스트
  const _ownerlist = async (params) => {
    return await apiFetch("/ownership/ownerlist", {
      method: "GET",
      query: params,
    });
  };

  // 매장 회원 상세
  const _ownerview = async (ownerno) => {
    return await apiFetch(`/ownership/ownerview/${ownerno}`, {
      method: "GET",
    });
  };

  // 국가 목록
  const _countrylist = async () => {
    return await apiFetch("/common/countrylist", {
      method: "GET",
    });
  };

  // 주 목록
  const _stateslist = async (countryno) => {
    return await apiFetch(`/common/stateslist/${countryno}`, {
      method: "GET",
    });
  };

  // 도시 목록
  const _citylist = async (statesname) => {
    return await apiFetch(`/common/citylist/${statesname}`, {
      method: "GET",
    });
  };

  // 포인트 목록
  const _pointlist = async (params) => {
    return await apiFetch("/membership/pointlist", {
      method: "GET",
      query: params,
    });
  };

  // 포인트 지급
  const _addpoint = async (data) => {
    return await apiFetch("/membership/addpoint", {
      method: "POST",
      body: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  // 포인트 차감
  const _removepoint = async (data) => {
    return await apiFetch("/postact/removepoint", {
      method: "POST",
      body: qs.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  return {
    _playerlist,
    _playerview,
    _playeredit,
    _ownerlist,
    _ownerview,
    _countrylist,
    _stateslist,
    _citylist,
    _pointlist,
    _addpoint,
    _removepoint,
  };
};