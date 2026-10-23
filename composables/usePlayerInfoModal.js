import { useMembersApi } from "~/api/members"; // _commonPlayerinfo 는 members.js 에 있음(member.js 와 이름이 같은 다른 파일)

/**
 * 2026-10-22: 회원 정보 팝업(modal-member-info) 데이터 — coaching/golf/[slug].vue 의 showMemberInfoModal 과 같은 변환
 *   /common/playerinfo 응답(playerbasicinfo/playerpalyinfo) → modal 이 기대하는 item.playerinfo.*
 */
export const usePlayerInfoModal = () => {
  const membersApi = useMembersApi();
  const isOpen = ref(false);
  const item = ref(null);

  const open = async (playerno) => {
    if (typeof document === "undefined" || !playerno) return;
    try {
      const res = await membersApi._commonPlayerinfo(playerno);
      const basic = res?.playerbasicinfo || {};
      const play = res?.playerpalyinfo || {};
      item.value = {
        playerinfo: {
          nickname: basic.nickname,
          gender: basic.gender,
          shopname: basic.shopname,
          regdate: basic.date,
          avg_putt_distance: play.avggreenhit,
          total_rounds: play.playcnt,
          avg_driver_distance: play.avgdriver,
          fairway_hit_rate: play.farewayrate,
          gir: play.greenrate,
          par_save_rate: play.parsaverate,
          avg_strokes: play.avgshot,
          best_strokes: play.minshot,
        },
      };
    } catch (e) {
      item.value = null;
    }
    isOpen.value = true;
    document.querySelector("body")?.classList.add("is-hidden");
  };

  return { isOpen, item, open };
};
