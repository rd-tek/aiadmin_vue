<template>
  <div class="library">
    <div class="library-wrap">
      <div class="content">
        <div class="content-head">고객지원</div>
        <div class="content-wrap">
          <!-- 상단 질문 영역 -->
          <div class="top-area">
            <div class="title">
              {{ formatDate(customerView.view.regdate) }}
              {{ customerView.view.player_nickname }} 질문
            </div>
            <div class="info">
              <span class="info-list">
                {{ customerView.view.player_nickname || "익명 회원" }}
              </span>
              <span class="info-list">
                {{ formatDate(customerView.view.regdate) }}
              </span>
              <!-- 첨부파일 영역 (추후 API 연결 시 사용) -->
              <div class="download" v-if="customerView.view.attachment_name">
                <button
                  type="button"
                  class="btn-download"
                  aria-label="다운로드"
                  @click="handleDownload(customerView.view)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_396_121339"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_396_121339)">
                      <path
                        d="M12 15.7885L7.73075 11.5192L8.78475 10.4348L11.25 12.9V4.5H12.75V12.9L15.2153 10.4348L16.2693 11.5192L12 15.7885ZM6.30775 19.5C5.80258 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.1974 4.5 17.6923V14.9808H6V17.6923C6 17.7692 6.03208 17.8398 6.09625 17.9038C6.16025 17.9679 6.23075 18 6.30775 18H17.6923C17.7692 18 17.8398 17.9679 17.9038 17.9038C17.9679 17.8398 18 17.7692 18 17.6923V14.9808H19.5V17.6923C19.5 18.1974 19.325 18.625 18.975 18.975C18.625 19.325 18.1974 19.5 17.6923 19.5H6.30775Z"
                        fill="#298097"
                      />
                    </g>
                  </svg>
                </button>
                <span class="text">
                  {{ customerView.view.attachment_name }}
                </span>
              </div>
            </div>
          </div>

          <!-- 질문 내용 -->
          <div class="desc-area">
            <p>
              {{ customerView.view.content }}
            </p>
          </div>

          <!-- 답변 작성 영역 -->
          <div class="reply-area">
            <div class="tit">답변하기</div>

            <!-- 기존 답변이 있으면 표시 -->
            <div
              class="old-answer"
              v-if="customerView.answer && customerView.answer.content"
            >
              <div class="info">
                <span class="info-list">
                  {{ customerView.answer.expert_nickname || "전문가" }}
                </span>
                <span class="info-list">
                  {{ formatDate(customerView.answer.regdate) }}
                </span>
              </div>
              <div class="desc-area">
                <p>{{ customerView.answer.content }}</p>
              </div>
            </div>

            <!-- 새 답변 / 수정하기 -->
            <div class="review-writing">
              <div class="text-area">
                <textarea
                  v-model="commentText"
                  placeholder="답변을 입력해주세요."
                ></textarea>
              </div>

              <div class="attach-area">
                <ul class="btn">
                  <li class="btn-list">
                    <button
                      type="button"
                      class="btn-list-item"
                      aria-label="사진"
                    >
                      <img
                        src="/public/images/icon/icon_add_photo_alternate.png"
                        alt=""
                      />
                    </button>
                  </li>
                  <li class="btn-list">
                    <button
                      type="button"
                      class="btn-list-item"
                      aria-label="파일"
                    >
                      <img
                        src="/public/images/icon/icon_attach_file.png"
                        alt=""
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 버튼 영역 -->
          <div class="btn-wrap">
            <nuxt-link
              :to="{
                path: '/customer',
                query: {
                  searchtype,
                  searchname,
                  pageno,
                },
              }"
              class="btn-md-line"
            >
              취소
            </nuxt-link>
            <button
              type="button"
              class="btn-primary-teal btn-md-fill"
              @click="handleSubmit"
            >
              등록
            </button>
          </div>

          <!-- 이전/다음글 (지금은 더미, 추후 API 연동) -->
          <ul class="page-area">
            <!-- 이전글 -->
            <li class="page-area-list">
              <span class="tit">이전글</span>

              <!-- 이전글이 없을 때 -->
              <span v-if="!customerView.prev" class="cnt"
                >이전 글이 없습니다.</span
              >

              <!-- 이전글 있을 때 -->
              <span
                v-else
                class="cnt link"
                @click="goToReview(customerView.prev.comment_pk)"
              >
                {{ truncate(customerView.prev.content) }}
              </span>
            </li>

            <!-- 다음글 -->
            <li class="page-area-list">
              <span class="tit">다음글</span>

              <!-- 다음글이 없을 때 -->
              <span v-if="!customerView.next" class="cnt"
                >다음 글이 없습니다.</span
              >

              <!-- 다음글 있을 때 -->
              <span
                v-else
                class="cnt link"
                @click="goToReview(customerView.next.comment_pk)"
              >
                {{ truncate(customerView.next.content) }}
              </span>
            </li>
          </ul>
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

  <!-- 토스트 경고 모달 -->
  <toast-warn-modal
    :isOpen="modals.toastWarnModal"
    :toastWarnMessage="toastWarnMessage"
    @update:isOpen="modals.toastWarnModal = $event"
  />
</template>

<script setup>
import { useRouteQuery } from "@vueuse/router";
import { useCustomerApi } from "~/api/customer";
import { useCommon } from "~/utils/common";

import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import { useHead } from "#app";

const router = useRouter();
const route = useRoute();
const common = useCommon();
const customerApi = useCustomerApi();

const searchtype = useRouteQuery("searchtype", "c.content");
const searchname = useRouteQuery("searchname", "");
const pageno = useRouteQuery("pageno", 1);

// 토스트 모달 상태
const modals = reactive({
  toastModal: false,
  toastWarnModal: false,
});
const toastMessage = ref("");
const toastWarnMessage = ref("");

// 현재 글 PK (질문 comment_pk)
const comment_pk = Number(route.params.slug);

// 질문 + 답변 데이터
const customerView = ref({
  view: {},
  next: null,
  prev: null,
  answer: {},
});

// 답변 입력 값
const commentText = ref("");

// 날짜 표시 포맷터 (YYYY-MM-DD만 잘라 쓰기)
const formatDate = (val) => {
  if (!val) return "";
  // 'YYYY-MM-DD HH:mm:ss' 형태라면 앞 10자리만 사용
  return String(val).substring(0, 10);
};

// 토스트 (확인)
const handleToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals.toastModal = true;
  toastMessage.value = message;
};

// 토스트 (경고)
const handleWarnToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals.toastWarnModal = true;
  toastWarnMessage.value = message;
};

const truncate = (text, len = 30) => {
  if (!text) return "";
  const str = String(text);
  return str.length > len ? str.substring(0, len) + "..." : str;
};
// 질문 + 답변 상세 조회
const _customerView = async () => {
  try {
    const res = await customerApi._customerview(comment_pk);
    // 백엔드 응답을 { view, answers } 형태로 맞추는 걸 추천
    customerView.value.view = res.view || {};
    customerView.value.next = res.next || {};
    customerView.value.prev = res.prev || {};
    customerView.value.answer = res.answer || [];

    commentText.value = res.answer?.content || "";
  } catch (err) {
    console.error(err);
    alert(err.message || "상세 정보를 불러오지 못했습니다.");
  }
};

// 첨부파일 다운로드 (추후 구현 포인트)
const handleDownload = (view) => {
  if (!view || !view.attachment_url) {
    return handleWarnToast("다운로드할 파일이 없습니다.");
  }
  window.open(view.attachment_url, "_blank");
};

// 답변 등록
const handleSubmit = async () => {
  if (!commentText.value.trim()) {
    return handleWarnToast("답변 내용을 입력해주세요.");
  }

  const payload = {
    comment_pk: comment_pk, // URL에 들어갈 PK
    content: commentText.value.trim(),
  };

  const res = await customerApi._customeranswerwrite(payload);

  if (res.success) {
    handleToast("답변이 성공적으로 등록되었습니다."); // 🔥 여기 문구 변경
    await _customerView(); // 최신 데이터 다시 로드
  } else {
    handleWarnToast(res.message || "답변 저장에 실패했습니다.");
  }
};

definePageMeta({
  layout: "sub-page",
});

onMounted(async () => {
  await _customerView();
});

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "고객지원",
  meta: [{ name: "description", content: "고객지원 상세 페이지 입니다." }],
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/pages/library.scss";
</style>
