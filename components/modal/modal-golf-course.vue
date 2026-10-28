<template>
  <!-- 2026-10-29: aimember 골프코스 홀 정보 팝업 UI 로 교체(사용자 요청) — 서브코스 제목·핸디캡·이전/다음 홀(‹ 1/18 ›)·그린 미니맵 좌/우·홀 소개.
       aiadmin 홀 API 필드(minimap_*, grnmap1_*, grnmap2_*, par_score, contents)에 맞춤. 이전 템플릿은 맨 아래 주석 -->
  <div
    class="modal modal-golf-course"
    :class="{ 'is-active': isOpen, 'has-green-2': greenCount === 2 }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">
          서브 코스 {{ holeData?.coursubtype }}<template v-if="holeData?.description"> ({{ holeData.description }})</template>
        </p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="" />
        </button>
      </div>

      <div class="modal-body">
        <div class="content">
          <div class="top-row">
            <p class="top-area">
              <span class="top-area-item">Hole {{ holeData?.hole }}</span>
              <!-- 2026-09-16: Par는 coursubtype(코스타입코드)가 아니라 실제 par_score -->
              <span class="top-area-item">Par {{ holeData?.par_score ?? holeData?.par }}</span>
              <span class="top-area-item" v-if="holeData?.handicap != null">핸디캡 {{ holeData.handicap }}</span>
            </p>
            <div class="hole-nav" v-if="holeTotal > 1">
              <button type="button" class="hole-nav-btn" :disabled="holeIndex <= 0" @click="$emit('prev')" aria-label="이전 홀">‹<span class="sr">이전 홀</span></button>
              <span class="hole-nav-pos">{{ holeIndex + 1 }} / {{ holeTotal }}</span>
              <button type="button" class="hole-nav-btn" :disabled="holeIndex >= holeTotal - 1" @click="$emit('next')" aria-label="다음 홀">›<span class="sr">다음 홀</span></button>
            </div>
          </div>

          <!-- 2026-10-30: 그린 미니맵 수에 따라 배치(aimember 와 같게)
               · 1개: 코스 미니맵(좌) + 그린 미니맵(우), 제목은 '그린 미니맵'
               · 2개: 코스 미니맵을 왼쪽에 크게, 오른쪽에 그린 미니맵(좌)=위 / (우)=아래 -->
          <div class="box" :class="{ 'is-green-2': greenCount === 2 }">
            <div class="box-list box-mini">
              <p class="box-list-tit">코스 미니맵</p>
              <div class="box-list-cnt">
                <img v-if="imgs.mini && !broken[imgs.mini]" :src="imgs.mini" alt="코스 미니맵" loading="lazy" @error="broken[imgs.mini] = true" />
                <p v-else class="no-img">{{ imgs.mini ? '이미지를 불러올 수 없습니다.' : '등록된 이미지가 없습니다.' }}</p>
              </div>
            </div>
            <div class="box-list box-green" v-if="greenCount === 1">
              <p class="box-list-tit">그린 미니맵</p>
              <div class="box-list-cnt">
                <img v-if="!broken[imgs.grn1 || imgs.grn2]" :src="imgs.grn1 || imgs.grn2" alt="그린 미니맵" loading="lazy" @error="broken[imgs.grn1 || imgs.grn2] = true" />
                <p v-else class="no-img">이미지를 불러올 수 없습니다.</p>
              </div>
            </div>
            <div class="box-greens" v-if="greenCount === 2">
              <div class="box-list box-green">
                <p class="box-list-tit">그린 미니맵(좌)</p>
                <div class="box-list-cnt">
                  <img v-if="!broken[imgs.grn1]" :src="imgs.grn1" alt="그린 미니맵(좌)" loading="lazy" @error="broken[imgs.grn1] = true" />
                  <p v-else class="no-img">이미지를 불러올 수 없습니다.</p>
                </div>
              </div>
              <div class="box-list box-green">
                <p class="box-list-tit">그린 미니맵(우)</p>
                <div class="box-list-cnt">
                  <img v-if="!broken[imgs.grn2]" :src="imgs.grn2" alt="그린 미니맵(우)" loading="lazy" @error="broken[imgs.grn2] = true" />
                  <p v-else class="no-img">이미지를 불러올 수 없습니다.</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 2026-10-30 이전 배치(보존): 코스 미니맵 · 그린 미니맵(좌) v-if grnmap1_name · 그린 미니맵(우) v-if grnmap2_name 을 한 줄에 나란히 -->

          <!-- 관리자용: 홀 소개(수정 화면에서 입력) -->
          <div class="hole-intro" v-if="holeData?.contents">
            <p class="hole-intro-tit">홀 소개</p>
            <p class="hole-intro-txt">{{ holeData.contents }}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-md-line" @click="modalClose">닫기</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 2026-10-29 이전 템플릿(보존):
  <div class="modal modal-golf-course" :class="{ 'is-active': isOpen }" @click.self="modalClose">
    <div class="modal-container">
      <div class="modal-header"><p class="title">코스홀 정보</p> … 닫기(X) </div>
      <div class="modal-body"><div class="content">
        <p class="top-area">Hole {{ holeData.hole }}. Par {{ holeData.par_score }}.</p>
        <div class="box">
          코스 미니맵: common.getImg(holeData?.minimap_url + '/' + holeData?.minimap_name)
          그린 미니맵(좌): common.getImg(holeData?.grnmap1_url + '/' + holeData?.grnmap1_name)
        </div>
      </div></div>
      <div class="modal-footer"> 닫기 </div>
    </div>
  </div>
  -->
</template>
<script setup>
import { useCommon } from "@/utils/common";

const common = useCommon();
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  holeData: { type: Object, default: () => ({}) }, // courseholeview 형태
  eventList: { type: Array, default: () => [] }, // 진행 중 이벤트 리스트(현재 미표시 — 이벤트 숨김)
  holeIndex: { type: Number, default: -1 }, // 현재 홀 순번(전체 홀 기준)
  holeTotal: { type: Number, default: 0 }, // 전체 홀 수
});
const emit = defineEmits(["update:isOpen", "prev", "next"]);
// 2026-10-29: 이미지 주소와 불러오기 실패 기록(파일이 S3 에 없으면 깨진 그림 대신 안내 문구)
const imgOf = (url, name) => (url && name ? common.getImg(url + "/" + name) : "");
const imgs = computed(() => ({
  mini: imgOf(props.holeData?.minimap_url, props.holeData?.minimap_name),
  grn1: imgOf(props.holeData?.grnmap1_url, props.holeData?.grnmap1_name),
  grn2: imgOf(props.holeData?.grnmap2_url, props.holeData?.grnmap2_name),
}));
const broken = reactive({});
// 2026-10-30: 그린 미니맵 개수(이름이 있는 것만) — 1개면 '그린 미니맵', 2개면 위(좌)·아래(우)
const greenCount = computed(() => (imgs.value.grn1 ? 1 : 0) + (imgs.value.grn2 ? 1 : 0));
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";

/* 2026-10-29: aimember 홀 팝업과 같은 홀 정보 줄·이동 버튼 */
.top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  .top-area { margin: 0 !important; display: flex; gap: 12px; flex-wrap: wrap; }
}
.hole-nav {
  display: inline-flex;
  align-items: center;
  flex: none;
  border: 1px solid #CDCFD1;
  border-radius: 999px;
  overflow: hidden;
}
.hole-nav-btn {
  width: 32px;
  height: 30px;
  font-size: 18px;
  line-height: 1;
  color: #35383B;
  background: #fff;
  &:hover:not([disabled]) { background: #F2F3F4; }
  &[disabled] { color: #CDCFD1; cursor: not-allowed; }
}
.hole-nav-pos {
  min-width: 52px;
  padding: 0 4px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: #35383B;
  border-left: 1px solid #E5E7E8;
  border-right: 1px solid #E5E7E8;
  line-height: 30px;
}
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
.box-list-cnt img { display: block; max-width: 100%; max-height: 360px; margin: 0 auto; object-fit: contain; }
.no-img { padding: 40px 0; text-align: center; color: #6E7378; font-size: 14px; }
.hole-intro {
  margin-top: 16px;
  padding: 14px 16px;
  border: 1px solid #E5E7E8;
  border-radius: 12px;
  &-tit { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  &-txt { font-size: 14px; line-height: 1.6; color: #35383B; white-space: pre-line; }
}
@media screen and (max-width: 768px) {
  .box {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    gap: 8px;
  }
  .box-list { margin: 0 !important; min-width: 0; }
  .box-list-tit { font-size: 13px !important; padding: 8px 4px !important; }
  .box-list-cnt { padding: 8px !important; }
  .box-list-cnt img { width: 100%; max-height: 300px; }
}
/* 2026-10-30: 그린 미니맵 2개 — 코스 미니맵(왼쪽, 크게) + 오른쪽에 그린 미니맵(좌)=위 / (우)=아래 */
.modal-golf-course.has-green-2 .modal-container { width: 720px !important; max-width: calc(100vw - 32px); }
.content .box.is-green-2 {
  display: grid !important;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr) !important;
  gap: 14px !important;
  align-items: stretch !important;
  justify-content: stretch !important;
}
.content .box.is-green-2 > .box-list,
.content .box.is-green-2 .box-greens > .box-list { max-width: none !important; margin: 0 !important; min-width: 0; }
.content .box.is-green-2 .box-greens { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
.content .box.is-green-2 .box-greens > .box-list { flex: 1 1 0; display: flex; flex-direction: column; }
.content .box.is-green-2 .box-greens .box-list-cnt { flex: 1; display: flex; align-items: center; justify-content: center; }
.content .box.is-green-2 .box-mini .box-list-cnt img { max-height: 440px !important; }
.content .box.is-green-2 .box-greens .box-list-cnt img { max-height: 170px !important; }
@media screen and (max-width: 768px) {
  .content .box.is-green-2 { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) !important; gap: 8px !important; }
  .content .box.is-green-2 .box-greens { gap: 8px; }
  .content .box.is-green-2 .box-mini .box-list-cnt img { max-height: 340px !important; }
  .content .box.is-green-2 .box-greens .box-list-cnt img { max-height: 130px !important; }
}
/* 2026-10-30: 관리자 홀 팝업(그린 2개)이 팝업 높이를 넘어 안쪽 스크롤이 생기던 것 → 이미지 높이·여백을 줄여 한 화면에 */
.modal-golf-course.has-green-2 .content .box.is-green-2 .box-list-cnt { padding: 10px !important; }
.modal-golf-course.has-green-2 .content .box.is-green-2 .box-mini .box-list-cnt img { max-height: 360px !important; }
.modal-golf-course.has-green-2 .content .box.is-green-2 .box-greens .box-list-cnt img { max-height: 132px !important; }
.modal-golf-course.has-green-2 .content .box.is-green-2 .box-list-tit { height: 44px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
/* 2026-10-30: 노트북(높이 768) 등 낮은 화면에서 홀 팝업 안쪽 스크롤이 생기던 것 → 이미지 높이·여백만 줄임 */
@media screen and (min-width: 769px) and (max-height: 820px) {
  .content .box .box-list-tit { height: 42px !important; padding-top: 0 !important; padding-bottom: 0 !important; }
  .content .box .box-list-cnt { padding: 10px !important; }
  .content .box:not(.is-green-2) .box-list-cnt img { max-height: 250px !important; }
  .content .box.is-green-2 .box-mini .box-list-cnt img { max-height: 300px !important; }
  .content .box.is-green-2 .box-greens .box-list-cnt img { max-height: 104px !important; }
  .top-row { margin-bottom: 10px !important; }
}
</style>
