<template>
  <div
    class="modal modal-member-info"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">회원 정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body" v-if="playerInfo">
        <div class="content-section">
          <p class="title">기본 정보</p>
          <table>
              <colgroup>
                  <col width="20%">
                  <col width="*">
              </colgroup>
              <tbody>
                  <tr>
                      <th>닉네임</th>
                      <td>{{ playerInfo?.playerbasicinfo?.nickname || '-' }}</td>
                      <th>성별</th>
                      <td>{{ playerInfo?.playerbasicinfo?.gender === 'M' ? '남' : playerInfo?.playerbasicinfo?.gender === 'F' ? '여' : '-' }}</td>
                  </tr>
                  <tr>
                      <th>단골매장</th>
                      <td>
                          <span class="color-grey">{{ playerInfo?.playerbasicinfo?.shopname || '-' }}</span>
                      </td>
                      <th>가입일</th>
                      <td>{{ formatDate(playerInfo?.playerbasicinfo?.timezone_date) || '-' }}</td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div class="content-section">
          <p class="title">
            <span>추가 정보</span>
            <span class="sub">(18홀 완료*)</span>
          </p>
          <table>
            <colgroup>
              <col width="30%">
              <col width="*">
            </colgroup>
            <tbody>
              <tr>
                <th>평균 성공 퍼트 거리</th>
                <td>{{ playerInfo?.playerpalyinfo?.avggreenhit ? playerInfo.playerpalyinfo.avggreenhit + 'm' : '-' }}</td>
                <th>전체 라운드</th>
                <td>{{ playerInfo?.playerpalyinfo?.playcnt || '-' }}</td>
              </tr>
              <tr>
                <th>평균 드라이버 거리</th>
                <td>{{ playerInfo?.playerpalyinfo?.avgdriver ? playerInfo.playerpalyinfo.avgdriver + 'm' : '-' }}</td>
                <th>페어웨이 안착률</th>
                <td>{{ playerInfo?.playerpalyinfo?.farewayrate ? playerInfo.playerpalyinfo.farewayrate + '%' : '-' }}</td>
              </tr>
              <tr>
                <th>GIR</th>
                <td>{{ playerInfo?.playerpalyinfo?.greenrate ? playerInfo.playerpalyinfo.greenrate + '%' : '-' }}</td>
                <th>파 세이브율</th>
                <td>{{ playerInfo?.playerpalyinfo?.parsaverate ? playerInfo.playerpalyinfo.parsaverate + '%' : '-' }}</td>
              </tr>
              <tr>
                <th>평균 타수</th>
                <td>{{ playerInfo?.playerpalyinfo?.avgshot || '-' }}</td>
                <th>최저 타수</th>
                <td>{{ playerInfo?.playerpalyinfo?.minshot || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap column-reverse">
          <button type="button" class="btn-md-line" @click="modalClose">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMembersApi } from "~/api/member";

const membersApi = useMembersApi();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  playerno: { type: [String, Number], default: null },
});

const emit = defineEmits(['update:isOpen']);

const playerInfo = ref(null);

watch(() => props.isOpen, async (val) => {
  console.log('Modal open state changed:', props.playerno);
  if (val && props.playerno) {
    const res = await membersApi._playerinfo(props.playerno);
    if (res) playerInfo.value = res;
  }
});

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return "-";

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>