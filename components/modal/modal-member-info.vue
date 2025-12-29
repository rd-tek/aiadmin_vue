<template>
  <div
    class="modal modal-member-info"
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
          <div class="content-section">
            <div class="head">기본정보</div>

            <div class="cont">
              <div class="table">
                <div class="table-body">
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">닉네임</div>
                      <div class="table-row-data">{{ form.nickname || item.nickname }}</div>
                    </div>
                    <div class="table-row-flex">
                      <div class="table-row-head">성별</div>
                      <div class="table-row-data">
                        {{ form.gender == "M" ? "남자" : "여자" || item.gender == "M" ? "남자" : "여자" }}
                      </div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">가입일자</div>
                      <div class="table-row-data">
                        {{ common.dateformat(form.timezone_date) }}
                      </div>
                    </div>
                    <div class="table-row-flex">
                      <div class="table-row-head">생년월일</div>
                      <div class="table-row-data">-</div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">단골매장</div>
                      <div class="table-row-data">{{ form.shopname || '-' }}</div>
                    </div>
                    <div class="table-row-flex">
                      <div class="table-row-head">이메일</div>
                      <div class="table-row-data">{{ form.email || '-' }}</div>
                    </div>
                  </div>
                  <div class="table-row col-1">
                    <div class="table-row-flex">
                      <div class="table-row-head">코칭횟수</div>
                      <div class="table-row-data">
                        {{ form.request_userinfo?.request_cnt || '-' }}
                      </div>
                    </div>
                  </div>
                  <div class="table-row col-1">
                    <div class="table-row-flex">
                      <div class="table-row-head align-start">메모</div>
                      <div class="table-row-data">
                        <div class="text-area">
                          <textarea
                            placeholder="내용을 입력하세요"
                            v-model="form.filtered_memo"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content-section">
            <div class="head">추가 정보</div>
            <div class="cont">
              <div class="table">
                <div class="table-body">
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">신장</div>
                      <div class="table-row-data">
                        {{
                          common.suffix(
                            form.request_userinfo?.user_height || '0',
                            "cm",
                          )
                        }}
                      </div>
                    </div>
                    <div class="table-row-flex">
                      <div class="table-row-head">바닥에서손목길이</div>
                      <div class="table-row-data">
                        {{
                          common.suffix(form.request_userinfo?.user_wrist || '0', "cm")
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="table-row">
                    <div class="table-row-flex">
                      <div class="table-row-head">몸무게</div>
                      <div class="table-row-data">
                        {{
                          common.suffix(
                            form.request_userinfo?.user_weight || '0',
                            "kg",
                          )
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-row col-1">
                  <div class="table-row-flex">
                    <div class="table-row-head">핸디캡</div>
                    <div class="table-row-data">
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
                </div>
                <div class="table-row col-1">
                  <div class="table-row-flex">
                    <div class="table-row-head">평균드라이버거리</div>
                    <div class="table-row-data">
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
                </div>
                <div class="table-row col-1">
                  <div class="table-row-flex">
                    <div class="table-row-head">클럽의 중요성</div>
                    <div class="table-row-data">
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
                </div>
                <div class="table-row">
                  <div class="table-row-flex">
                    <div class="table-row-head">선호 샤프트</div>
                    <div class="table-row-data">
                      {{
                        form.request_userinfo?.user_use_shaft == "1"
                          ? "R"
                          : form.request_userinfo?.user_use_shaft == "2"
                          ? "SR"
                          : form.request_userinfo?.user_use_shaft == "3"
                          ? "S"
                          : form.request_userinfo?.user_use_shaft == "4"
                          ? "L"
                          : "-"
                      }}
                    </div>
                  </div>
                  <div class="table-row-flex">
                    <div class="table-row-head">손</div>
                    <div class="table-row-data">
                      {{
                        common.suffix(form.request_userinfo?.user_glove || '0', "cm")
                      }}
                    </div>
                  </div>
                </div>

                <div class="table-row">
                  <div class="table-row-flex">
                    <div class="table-row-head">하의</div>
                    <div class="table-row-data">
                      {{
                        common.suffix(form.request_userinfo?.user_pants || '0', "cm")
                      }}
                    </div>
                  </div>
                  <div class="table-row-flex">
                    <div class="table-row-head">신발</div>
                    <div class="table-row-data">
                      {{
                        common.suffix(form.request_userinfo?.user_shoes || '0', "mm")
                      }}
                    </div>
                  </div>
                </div>
                <div class="table-row col-1">
                  <div class="table-row-flex">
                    <div class="table-row-head">나의 문제점</div>
                    <div class="table-row-data">
                      {{ form.request_userinfo?.user_trouble || '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="handleSubmit">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- 토스트 알림 모달 -->
  <toast-modal
    :isOpen="modals.toastModal"
    :toastMessage="toastMessage"
    @update:isOpen="modals.toastModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal 
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"/>

</template>
<script setup>
import { useMembersApi } from "~/api/members";
import { useCommon } from "@/utils/common";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

const common = useCommon();
const membersApi = useMembersApi();
const form = ref({});
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isOpen", "refresh"]);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

// 토스트 확인 모달
const modals = reactive({});
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
    document.querySelector('body').classList.add('is-hidden');
    modals['toastErrorModal'] = true;
    toastErrorMessage.value = message;
}

const handleSubmit = async () => {
  try {
    const { message } = await membersApi._playermodify(form.value);
    handleToast(message);
    emit("update:isOpen", false);
    emit("refresh");
  } catch (err) {
    handleErrorToast(err.message);
  }
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
