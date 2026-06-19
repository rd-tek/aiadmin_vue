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
      <div class="modal-body" v-if="item?.playerinfo">
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
                      <td>{{ item.playerinfo.nickname }}</td>
                      <th>성별</th>
                      <td>{{ item.playerinfo.gender === 'M' ? '남' : item.playerinfo.gender === 'F' ? '여' : '-' }}</td>
                  </tr>
                  <tr>
                      <th>단골매장</th>
                      <td>
                          <span class="color-grey">{{ item.playerinfo.shopname || '-' }}</span>
                      </td>
                      <th>가입일</th>
                      <td>{{ formatDate(item.playerinfo.regdate) || '-' }}</td>
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
                <td>{{ item.playerinfo.avg_putt_distance || '-' }}</td>
                <th>전체 라운드</th>
                <td>{{ item.playerinfo.total_rounds || '-' }}</td>
              </tr>
              <tr>
                <th>평균 드라이버 거리</th>
                <td>{{ item.playerinfo.avg_driver_distance || '-' }}</td>
                <th>페어웨이 안착률</th>
                <td>{{ item.playerinfo.fairway_hit_rate || '-' }}</td>
              </tr>
              <tr>
                <th>GIR</th>
                <td>{{ item.playerinfo.gir || '-' }}</td>
                <th>파 세이브율</th>
                <td>{{ item.playerinfo.par_save_rate || '-' }}</td>
              </tr>
              <tr>
                <th>평균 타수</th>
                <td>{{ item.playerinfo.avg_strokes || '-' }}</td>
                <th>최저 타수</th>
                <td>{{ item.playerinfo.best_strokes || '-' }}</td>
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
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object
  }
});
const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

// 2026.06.19[cgnoh]: 날짜 포맷
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
