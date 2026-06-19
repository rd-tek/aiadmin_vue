<template>
    <div class="customer-member detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">{{ noticeInfo.title }}</div>
                <div class="info">
                    <div class="info-list label">
                        <span class="label" :class="{ 'color-purple': noticeInfo.type === '1', 'color-blue': noticeInfo.type === '2' }">{{ noticeInfo.type === '1' ? '공지' : '뉴스' }}</span>
                    </div>
                    <div class="info-list name">{{ noticeInfo.regname }}</div>
                    <div class="info-list date">{{ noticeInfo.date }}</div>
                    <div class="info-list count">조회수 : {{ noticeInfo.cnt }}</div>
                    <div class="info-list download">
                        <button type="button" class="btn-download" aria-label="다운로드">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_4215_81312" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_4215_81312)">
                                    <path d="M12 15.7885L7.73075 11.5192L8.78475 10.4348L11.25 12.9V4.5H12.75V12.9L15.2153 10.4348L16.2693 11.5192L12 15.7885ZM6.30775 19.5C5.80258 19.5 5.375 19.325 5.025 18.975C4.675 18.625 4.5 18.1974 4.5 17.6923V14.9808H6V17.6923C6 17.7692 6.03208 17.8398 6.09625 17.9038C6.16025 17.9679 6.23075 18 6.30775 18H17.6923C17.7692 18 17.8398 17.9679 17.9038 17.9038C17.9679 17.8398 18 17.7692 18 17.6923V14.9808H19.5V17.6923C19.5 18.1974 19.325 18.625 18.975 18.975C18.625 19.325 18.1974 19.5 17.6923 19.5H6.30775Z" fill="#3577F1"/>
                                </g>
                            </svg>
                        </button> 
                        <span class="text">{{ noticeInfo.filename }}</span>
                    </div>
                </div>
            </div>
            <div class="desc-area"> 
                <span v-html="noticeInfo.contents" />
            </div>
            <div class="page-area">
                <div class="page-area-list">
                    <span class="tit">이전글</span>
                    <span class="cnt">
                        <nuxt-link
                            v-if="prevPost"
                            :to="`/customer/member/${prevPost.notice_web_pk}`"
                            >
                            {{ prevPost.title }}
                        </nuxt-link>
                        <span v-if="prevPost == ''" class="no-link">
                            이전 글이 없습니다.
                        </span>
                    </span>
                </div>
                <div class="page-area-list">
                    <span class="tit">다음글</span>
                    <span class="cnt">
                        <nuxt-link
                            v-if="nextPost"
                            :to="`/customer/member/${nextPost.notice_web_pk}`"
                            >
                            {{ nextPost.title }}
                        </nuxt-link>
                        <span v-if="nextPost == ''" class="no-link">
                            다음 글이 없습니다.
                        </span>
                    </span>
                </div>
            </div>
            <div class="btn-wrap column-reverse">
                <nuxt-link to="/customer/member" class="btn-md-line">목록보기</nuxt-link>
                  <button
                        type="button"
                        class="btn-md-line"
                        @click="handleDelete"
                    >
                삭제
                </button>
                <button type="button" class="btn-md-fill btn-primary-purple" @click="handleEdit">수정하기</button>
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
            @update:isOpen="modals.toastWarnModal = $event"/>

        <!-- 토스트 에러 모달 -->
        <toast-error-modal 
            :isOpen="modals.toastErrorModal"
            :toastErrorMessage="toastErrorMessage"
            @update:isOpen="modals.toastErrorModal = $event"/>

        <!-- 토스트 컨펌 모달 -->
        <toast-confirm-modal
            :isOpen="modals.toastConfirmModal"
            :toastConfirmMessage="toastConfirmMessage"
            @confirm="handleConfirm"
            @update:isOpen="modals.toastConfirmModal = $event"/>

    </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCustomerApi } from "~/api/support";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';
import toastConfirmModal from '@/components/toast-ui/toast-confirm-modal.vue';

// 2026.06.08[cgnoh]: 라우터 관련
const route = useRoute();
const router = useRouter();

// 2026.06.08[cgnoh]: API 관련
const customerApi = useCustomerApi();

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회 관련 상태
const noticeInfo = ref({});

// 2026.06.08[cgnoh]: 이전/다음 글 관련 상태
const nextPost = ref(null);
const prevPost = ref(null);

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회
const getNoticeDetail = async () => {
  const res = await customerApi._playerNoticeview(route.params.slug);

  noticeInfo.value = res.noticeview || {};
  nextPost.value = res.next_post || null;
  prevPost.value = res.prev_post || null;
};

// 2026.06.08[cgnoh]: 글 수정 페이지로 이동
const handleEdit = () => {
  router.push(`/customer/member/edit/${route.params.slug}`);
};

// 2026.06.15[cgnoh]: 토스트 메시지 관련
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();
const toastConfirmMessage = ref();

// 2026.06.15[cgnoh]: 모달 관련
const modals = reactive({});

// 2026.06.04[cgnoh]: 저장 토스트
const openSaveToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 2026.06.04[cgnoh]: 경고 토스트
const openWarnToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastWarnModal'] = true;
  toastWarnMessage.value = message;
}

// 2026.06.04[cgnoh]: 에러 토스트
const openErrorToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastErrorModal'] = true;
  toastErrorMessage.value = message;
}

// 2026.06.19[cgnoh]: 컨펌 핸들링
const confirmResolver = ref(null);
const handleConfirm = () => {
    modals['toastConfirmModal'] = false;
    document.querySelector('body').classList.add('is-hidden');
    confirmResolver.value(true);
    confirmResolver.value = null;
}

// 2026.06.19[cgnoh]: 컨펌 토스트
const openConfirmToast = (message) => {
    return new Promise((resolve) => {
        confirmResolver.value = resolve;
        document.querySelector('body').classList.add('is-hidden');
        modals['toastConfirmModal'] = true;
        toastConfirmMessage.value = message;
    })
}

// 2026.06.08[cgnoh]: 글 삭제 처리
const handleDelete = async () => {
  const confirmed = await openConfirmToast("정말 삭제하시겠습니까?");
  if (!confirmed) return;

  try {
    const res = await customerApi._playerNoticeDelete(
      route.params.slug,
    );

    console.log("delete result", res);

    if (res.code === 200 || res.result === "success") {
      openSaveToast("삭제되었습니다.");

      router.push("/customer/member");
      return;
    }

    openErrorToast(res.message || "삭제에 실패했습니다.");
  } catch (err) {
    console.error(err);

    openWarnToast(
      err?.data?.message ||
      err?.message ||
      "삭제 중 오류가 발생했습니다."
    );
  }
};

// 2026.06.08[cgnoh]: 상세 참조 및 Intersection Observer 설정
const detailRef  = ref();
const detailMove = ref(false);
useIntersectionObserver(detailRef, ([{ isIntersecting }]) => {
    if (isIntersecting) detailMove.value = true;
}, { threshold: 0 });

onMounted(() => {
  getNoticeDetail();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>