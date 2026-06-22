<template>
  <div
    class="modal modal-golf-course"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코스 홀 정보 등록/수정</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
            <p class="top-area">Hole {{ holeData.hole }}. Par {{ holeData.coursubtype }}.</p>
            <div class="box">
                <div class="box-list">
                    <p class="box-list-tit">코스 미니맵</p>
                    <div class="box-list-cnt">
                        <img
                        :src="
                            common.getImg(
                            holeData?.minimap_url + '/' + holeData?.minimap_name
                            )
                        "
                        alt="img_golf_course"
                        loading="lazy"
                        />
                    </div>
                </div>
                <div class="box-list">
                    <p class="box-list-tit">그린 미니맵(좌)</p>
                    <div class="box-list-cnt">
                        <img
                        :src="
                            common.getImg(
                            holeData?.grnmap1_url + '/' + holeData?.grnmap1_name
                            )
                        "
                        alt="img_golf_course"
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
