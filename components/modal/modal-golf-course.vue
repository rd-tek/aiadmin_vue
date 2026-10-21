<template>
  <div
    class="modal modal-golf-course"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코스홀 정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
            <!-- 2026-09-16: Par는 coursubtype(코스타입코드)가 아니라 실제 par_score -->
            <p class="top-area">Hole {{ holeData.hole }}. Par {{ holeData.par_score }}.</p>
            <div class="box">
                <div class="box-list">
                    <p class="box-list-tit">코스 미니맵</p>
                    <div class="box-list-cnt">
                        <img
                        :src="
                            (holeData?.minimap_url && holeData?.minimap_name) ? common.getImg(holeData?.minimap_url + '/' + holeData?.minimap_name) : null
                        "
                        alt="골프 코스 사진"
                        loading="lazy"
                        />
                    </div>
                </div>
                <div class="box-list">
                    <p class="box-list-tit">그린 미니맵(좌)</p>
                    <div class="box-list-cnt">
                        <img
                        :src="
                            (holeData?.grnmap1_url && holeData?.grnmap1_name) ? common.getImg(holeData?.grnmap1_url + '/' + holeData?.grnmap1_name) : null
                        "
                        alt="골프 코스 사진"
                        loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="modalClose">
                닫기
            </button>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { useCommon } from "@/utils/common";

const common = useCommon();
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  holeData: { type: Object, default: () => ({}) }, // courseholeview 형태
  eventList: { type: Array, default: () => [] }, // 진행 중 이벤트 리스트
});
const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
