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
          <img src="/images/icon/icon_close_grey.png" alt="" />
        </button>
      </div>
      <!-- 2026-10-21: 표 → 카드형(회원 앱과 동일 구성). 숫자 소수 1자리, 가입일은 날짜만, 값 없는 항목 숨김 -->
      <div class="modal-body">
        <div class="member-card">
          <div class="profile">
            <div class="profile-name">{{ card.nickname || '-' }}<span class="chip" v-if="card.gender">{{ card.gender }}</span></div>
            <dl class="profile-meta">
              <div class="meta" v-if="card.shop"><dt>단골매장</dt><dd>{{ card.shop }}</dd></div>
              <div class="meta" v-if="card.joined"><dt>가입일</dt><dd>{{ card.joined }}</dd></div>
            </dl>
          </div>
          <ul class="stats" v-if="card.stats.length">
            <li class="stat" v-for="t in card.stats" :key="t.label"><span class="label">{{ t.label }}</span><strong class="value">{{ t.value }}</strong></li>
          </ul>
          <p class="stats-empty" v-else>아직 라운드 기록이 없습니다.</p>
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

// 2026-10-21: 카드형 표시값
const card = computed(() => {
  const b = props.item?.playerinfo || {};
  const p = props.item?.playerinfo || {};
  const num = (v) => (v === null || v === undefined || v === '' || isNaN(Number(v)) ? null : Number(v));
  const fx = (v, u = '') => { const n = num(v); return n === null || n === 0 ? '' : (Math.round(n * 10) / 10).toLocaleString() + u; };
  const best = num(p.best_strokes);
  const bestText = best === null ? '' : best < 40 ? (best > 0 ? '+' + best : String(best)) : String(best);
  return {
    nickname: b.nickname || '',
    gender: b.gender === 'M' ? '남성' : b.gender === 'F' ? '여성' : '',
    shop: b.shopname || '',
    joined: String(b.regdate || '').slice(0, 10).replace(/-/g, '.'),
    stats: [
      { label: '라운드 수', value: num(p.total_rounds) ? String(num(p.total_rounds)) : '' },
      { label: '평균 타수', value: fx(p.avg_strokes) },
      { label: best !== null && best < 40 ? '베스트(파 대비)' : '베스트 타수', value: bestText },
      { label: '평균 드라이버 거리', value: fx(p.avg_driver_distance, 'm') },
      { label: '평균 퍼트 거리', value: fx(p.avg_putt_distance, 'm') },
      { label: '페어웨이 안착률', value: fx(p.fairway_hit_rate, '%') },
      { label: '그린 적중률', value: fx(p.gir, '%') },
      { label: '파세이브율', value: fx(p.par_save_rate, '%') },
    ].filter((t) => t.value),
  };
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";

/* 2026-09-17: 모바일에서 th/td/th/td 4열이 화면을 넘치던 문제 → 라벨|값 2열로 재배치 */
.modal-member-info {
  :deep(table) { width: 100%; table-layout: fixed; }
  :deep(th), :deep(td) { word-break: keep-all; overflow-wrap: anywhere; }

  @media (max-width: 768px) {
    :deep(.content-section table),
    :deep(.content-section tbody) { display: block; width: 100%; }
    :deep(.content-section tr) {
      display: grid;
      grid-template-columns: max-content 1fr;
      align-items: center;
      column-gap: 8px;
    }
    :deep(.content-section th),
    :deep(.content-section td) { display: block; }
  }
}

/* 2026-10-21: 회원정보 카드형 */
.member-card {
  .profile { padding-bottom: 16px; border-bottom: 1px solid #E5E7E8; margin-bottom: 16px; }
  .profile-name { display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 700; color: #35383B; }
  .chip { padding: 2px 8px; border-radius: 999px; background: color-mix(in srgb, #4318FF 12%, #fff); color: #4318FF; font-size: 12px; font-weight: 600; }
  .profile-meta { display: flex; flex-wrap: wrap; gap: 4px 16px; margin: 8px 0 0;
    .meta { display: flex; gap: 6px; font-size: 14px; } dt { color: #6c7174; } dd { margin: 0; color: #35383B; } }
  .stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin: 0; padding: 0; list-style: none; }
  .stat { display: flex; flex-direction: column; gap: 6px; padding: 14px 12px; border-radius: 10px; background: #F7F8F9; min-width: 0;
    .label { font-size: 12px; color: #6c7174; line-height: 1.3; word-break: keep-all; }
    .value { font-size: 18px; font-weight: 700; color: #35383B; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } }
  .stats-empty { margin: 0; padding: 18px; border-radius: 10px; background: #F7F8F9; color: #6c7174; text-align: center; font-size: 14px; }
}
@media screen and (max-width: 768px) {
  .member-card { .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; } .stat { padding: 10px 12px; .value { font-size: 16px; } } }
}
</style>
