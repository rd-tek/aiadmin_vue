<template>
    <div class="customer-member detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">{{ noticeInfo.title || '-' }}</div>
                <div class="info">
                    <div class="info-list name">{{ noticeInfo.lastname || '-' }}</div>
                    <div class="info-list date">{{ noticeInfo.date || '-' }}</div>
                </div>
            </div>
            <div class="desc-area">
                <span v-html="noticeInfo.content" />
                <span v-if="!noticeInfo.content">-</span>
            </div>
            <div class="page-area">
                <div class="page-area-list">
                    <span class="tit">이전글</span>
                    <span class="cnt">
                        <nuxt-link
                            v-if="nextPost"
                            :to="`/customer/inquiry/${nextPost.inquiry_pk}`"
                            >
                            {{ nextPost.title }}
                        </nuxt-link>
                        <span v-if="nextPost == ''" class="no-link">
                            이전 글이 없습니다.
                        </span>
                    </span>
                </div>
                <div class="page-area-list">
                    <span class="tit">다음글</span>
                    <span class="cnt">
                        <nuxt-link
                            v-if="prevPost"
                            :to="`/customer/inquiry/${prevPost.inquiry_pk}`"
                            >
                            {{ prevPost.title }}
                        </nuxt-link>
                        <span v-if="prevPost == ''" class="no-link">
                            다음 글이 없습니다.
                        </span>
                    </span>
                </div>
            </div>
            <div class="btn-wrap column-reverse">
                <nuxt-link to="/customer/inquiry" class="btn-md-line">목록보기</nuxt-link>
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

    </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCustomerApi } from "~/api/support";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

// 2026.06.08[cgnoh]: 라우터 관련
const route = useRoute();
const router = useRouter();

// 2026.06.08[cgnoh]: API 관련
const customerApi = useCustomerApi();

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회 관련 상태
const noticeInfo = ref({});

// 2026.06.08[cgnoh]: 이전/다음 글 관련 상태
const prevPost = ref(null);
const nextPost = ref(null);

// 2026.06.08[cgnoh]: 공지사항/뉴스 상세 조회
const getNoticeDetail = async () => {
    const res = await customerApi._inquiryView(route.params.slug);
    noticeInfo.value = res.inquiryview || {};
    prevPost.value = res.prev_post || null;
    nextPost.value = res.next_post || null;
};

// 2026.06.08[cgnoh]: 글 수정 페이지로 이동
const handleEdit = () => {
  router.push(`/customer/inquiry/edit/${route.params.slug}`);
};

// 2026.06.15[cgnoh]: 토스트 메시지 관련
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();

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


// 2026.06.08[cgnoh]: 글 삭제 처리
const handleDelete = async () => {
  const confirmed = confirm("정말 삭제하시겠습니까?");

  if (!confirmed) return;

  try {
    const res = await customerApi._inquiryDelete(
      route.params.slug,
    );

    console.log("delete result", res);

    if (res.code === 200 || res.result === "success") {
      openSaveToast("삭제되었습니다.");

      router.push("/customer/inquiry");
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