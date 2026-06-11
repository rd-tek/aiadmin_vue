import { useApiFetch } from "./fetch";

export const useGameDataApi = () => {
  const apiFetch = useApiFetch();

  // 게임 데이터 리스트
  const _gameDataList = async (params) => {
    return await apiFetch("/manager/gamedataset1", {
      method: "POST",
      body: params,
    });
  };

  // 게임 스코어
  const _gameDataScore = async (gameno) => {
    return await apiFetch(`/manager/gamedataset2/${gameno}`, {
      method: "GET",
    });
  };

  // 원샷 데이터
  const _gameOneShot = async (gameno) => {
    return await apiFetch(`/manager/gamedataset3/${gameno}`, {
      method: "GET",
    });
  };

  // 게임 정보
  const _gameInfo = async (gameno) => {
    return await apiFetch(`/manager/gamedataset4/${gameno}`, {
      method: "GET",
    });
  };

  // 교정 리스트
  const _correctionList = async (params) => {
    return await apiFetch("/manager/correctionlist", {
      method: "GET",
      query: {
        startdate: params.startdate,
        enddate: params.enddate,
        searchtype: params.searchtype,
        searchname: params.searchname,
        type: params.type,
        status: params.status,
        pageno: params.pageno,
      },
    });
  };

  // 스코어카드
  const _scorecard = async (player_pk, define1_pk) => {
    return await apiFetch(
      `/manager/scorecard/${player_pk}/${define1_pk}`,
      {
        method: "GET",
      }
    );
  };

  // 교정 파일
  const _correctionFile = async (player_pk, define1_pk) => {
    return await apiFetch(
      `/manager/correctionfile/${player_pk}/${define1_pk}`,
      {
        method: "GET",
      }
    );
  };

  // 보류 처리
  const _pending = async (define1_pk, params) => {
    return await apiFetch(`/manager/pending/${define1_pk}`, {
      method: "POST",
      body: params,
    });
  };

  // 재처리
  const _reprocess = async (define1_pk, params) => {
    return await apiFetch(`/manager/reprocess/${define1_pk}`, {
      method: "POST",
      body: params,
    });
  };

  return {
    _gameDataList,
    _gameDataScore,
    _gameOneShot,
    _gameInfo,
    _correctionList,
    _scorecard,
    _correctionFile,
    _pending,
    _reprocess,
  };
};