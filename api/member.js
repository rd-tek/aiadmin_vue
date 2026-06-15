import { useApiFetch } from "./fetch";
import qs from "qs";

export const useMembersApi = () => {
  const apiFetch = useApiFetch();

  // 회원 리스트
const _playerlist = async (params) => {
  return await apiFetch("/membership/playerlist", {
    method: "GET",
    query: {
      status: params.status,
      searchtype: params.searchtype,
      searchname: params.searchname,
      pageno: params.pageno,
      pagesize: params.pagesize,
    },
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

  // 회원 작성
  const _ownerwrite = async (form) => {
    return await apiFetch("/ownership/ownerwrite", {
      method: "POST",
      body: qs.stringify({
        id: form.id,
        idoverlap: form.idoverlap,
        password: form.password,
        shopnameoverlap: form.shopnameoverlap,
        shopname: form.shopname,
        emailoverlap: form.emailoverlap,
        email: form.email,
        ownertype: form.ownertype,
        fieldunit: form.fieldunit,
        greenunit: form.greenunit,
        speedunit: form.speedunit,
        agreeemail: form.emailagree,
        firstname: form.firstname,
        lastname: form.lastname,
        address1: form.address1,
        address2: form.address2,
        address3: form.address3,
        address4: form.address4,
        zipcode: form.zipcode,
        phone: form.phone,
        fax: form.fax,
        website: form.website,
        status: form.status,
        roomcnt: form.roomcnt,
        etcinfo: form.etcinfo,
        lockercnt: form.lockercnt,
        address_lat: form.address_lat,
        address_lng: form.address_lng,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  // 중복체크
  const _availabilityCheck = async (type, name, result) => {
    let url = "";
    let body = {};

    if (type === 1) {
      url = "/ownership/ajax_owner_id_check";
      body = { owner_id: name };
    }

    if (type === 2) {
      url = "/ownership/ajax_nickname_check";
      body = { nickname: name };
    }

    if (type === 3) {
      url = "/ownership/ajax_email_check";
      body = { email: name };
    }

    try {
      const response = await apiFetch(url, {
        method: "POST",
        body,
      });

      if (response?.code === 200) {
        result(true, response);
      } else {
        console.error(response?.code, response?.message);
        result(false, response);
      }
    } catch (err) {
      console.error("availability_check", err);
      result(false, err);
    }
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

  // 매장 회원 수정
  const _owneredit = async (ownerno, form) => {
    return await apiFetch(`/ownership/ownerwrite/${ownerno}`, {
      method: "POST",
      body: qs.stringify({
        password: form.password,
        shopnameoverlap: form.shopnameoverlap,
        shopname: form.shopname,
        emailoverlap: form.emailoverlap,
        email: form.email,
        ownertype: form.ownertype,
        fieldunit: form.fieldunit,
        greenunit: form.greenunit,
        speedunit: form.speedunit,
        agreeemail: form.emailagree,
        firstname: form.firstname,
        lastname: form.lastname,
        address1: form.address1,
        address2: form.address2,
        address3: form.address3,
        address4: form.address4,
        zipcode: form.zipcode,
        phone: form.phone,
        fax: form.fax,
        website: form.website,
        status: form.status,
        oldroomcnt: form.oldroomcnt,
        roomcnt: form.roomcnt,
        etcinfo: form.etcinfo,
        lockercnt: form.lockercnt,
        address_lat: form.address_lat,
        address_lng: form.address_lng,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  // 통합관리매장회원장비등록
  const _adminOwnerRoomWrite = async (form) => {
    try {
      return await apiFetch(`/ownership/ownerroomwrite/${form.ownerno}`, {
        method: "POST",
        body: {
          owner_pk: form.ownerno,
          roomno: form.roomno,
          roomname: form.roomname,
          maincode: form.maincode,
          subcode: form.subcode,
          etccode: form.etccode,
          hwmodelno: form.hwmodelno,
          swmodelno: form.swmodelno,
          installdate: form.installdate,
          roomstatus: form.roomstatus,
        },
      });
    } catch (err) {
      console.error("_adminOwnerRoomWrite", err);
      throw err;
    }
  };

// 통합관리매장회원장비수정
  const _adminOwnerRoomEdit = async (form) => {
    try {
      return await apiFetch(`/ownership/ownerroomwrite/${form.ownerno}`, {
        method: "POST",
        body: {
          roomno: form.roomno,
          roomname: form.roomname,
          maincode: form.maincode,
          subcode: form.subcode,
          etccode: form.etccode,
          hwmodelno: form.hwmodelno,
          swmodelno: form.swmodelno,
          installdate: form.installdate,
          roomstatus: form.roomstatus,
          api_pk: form.api_pk,
          simulator_pk: form.simulator_pk,
          token: form.token,
          expdate: form.expdate,
        },
      });
    } catch (err) {
      console.error("_adminOwnerRoomEdit", err);
      throw err;
    }
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
    _ownerwrite,
    _availabilityCheck,
    _ownerlist,
    _ownerview,
    _owneredit,
    _adminOwnerRoomWrite,
    _adminOwnerRoomEdit,
    _countrylist,
    _stateslist,
    _citylist,
    _pointlist,
    _addpoint,
    _removepoint,
  };
};