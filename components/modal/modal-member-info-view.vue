<template>
  <div
    class="modal modal-member-info-view"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">회원정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="content-desc">
            <div class="content-desc-row">
              <p class="title">신장</p>
              <div class="desc">{{
                          common.suffix(
                            form.request_userinfo?.user_height,
                            "cm",
                          )
                        }}</div>
            </div>
            <div class="content-desc-row">
              <p class="title">바닥에서 손목길이</p>
              <div class="desc">{{
                          common.suffix(form.request_userinfo?.user_wrist, "cm")
                        }}</div>
            </div>
            <div class="content-desc-row">
              <p class="title">몸무게</p>
              <div class="desc">{{
                          common.suffix(
                            form.request_userinfo?.user_weight,
                            "kg",
                          )
                        }}</div>
            </div>
            <div class="content-desc-row">
              <p class="title">핸디캡</p>
              <div class="desc">
                {{
                        form.request_userinfo?.user_handicap == "1"
                          ? "-79"
                          : form.request_userinfo?.user_handicap == "2"
                          ? "80-89"
                          : form.request_userinfo?.user_handicap == "3"
                          ? "90-99"
                          : form.request_userinfo?.user_handicap == "4"
                          ? "+100"
                          : "-"
                      }}
              </div>
            </div>
            <div class="content-desc-row">
              <p class="title">평균드라이버거리</p>
              <div class="desc">
                {{
                        form.request_userinfo?.user_driver == "1"
                          ? "+240"
                          : form.request_userinfo?.user_driver == "2"
                          ? "220-240"
                          : form.request_userinfo?.user_driver == "3"
                          ? "200-220"
                          : form.request_userinfo?.user_driver == "4"
                          ? "180-200"
                          : form.request_userinfo?.user_driver == "5"
                          ? "-179"
                          : "-"
                      }}
              </div>
            </div>
            <div class="content-desc-row">
              <p class="title">클럽의 중요성</p>
              <div class="desc">
                {{
                        form.request_userinfo?.user_important == "1"
                          ? "타구감"
                          : form.request_userinfo?.user_important == "2"
                          ? "방향감"
                          : form.request_userinfo?.user_important == "3"
                          ? "거리감"
                          : "-"
                      }}
              </div>
            </div>
            <div class="content-desc-row">
              <p class="title">선호 샤프트</p>
              <div class="desc">{{
                        form.request_userinfo?.user_use_shaft == "1"
                          ? "R"
                          : form.request_userinfo?.user_use_shaft == "2"
                          ? "SR"
                          : form.request_userinfo?.user_use_shaft == "3"
                          ? "S"
                          : form.request_userinfo?.user_use_shaft == "4"
                          ? "L"
                          : "-"
                      }}</div>
            </div>
            <div class="content-desc-row">
              <p class="title">손</p>
              <div class="desc">{{
                        common.suffix(form.request_userinfo?.user_glove, "cm")
                      }}</div>
            </div>
            
            <div class="content-desc-row">
              <p class="title">상의</p>
              <div class="desc">{{
                        common.suffix(form.request_userinfo?.user_shirt, "inch")
                      }}</div>
            </div>
            
            <div class="content-desc-row">
              <p class="title">하의</p>
              <div class="desc">{{
                        common.suffix(form.request_userinfo?.user_pants, "inch")
                      }}</div>
            </div>
            <div class="content-desc-row">
              <p class="title">신발</p>
              <div class="desc">{{
                        common.suffix(form.request_userinfo?.user_shoes, "mm")
                      }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="modalClose">
            확인
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
    required: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const form = ref({});
const emit = defineEmits(["update:isOpen"]);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

watch(
  () => props.item,
  (val) => {
    //console.log("val", val);
    form.value = val ? { ...val } : {};
  },
);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
    window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
