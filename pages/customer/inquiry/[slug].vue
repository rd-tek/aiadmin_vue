<template>
    <div class="customer-member detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">{{ noticeInfo.title }}</div>
                <div class="info">
                    <div class="info-list label">
                        <span class="label" :class="{ 'color-purple': noticeInfo.type === '1', 'color-blue': noticeInfo.type === '2' }">{{ noticeInfo.type === '1' ? '공지' : '뉴스' }}</span>
                    </div>
                    <div class="info-list name">{{ noticeInfo.lastname }}</div>
                    <div class="info-list date">{{ noticeInfo.date }}</div>
                </div>
            </div>
            <div class="desc-area">
                <span v-html="noticeInfo.content" />
            </div>
            <div class="page-area">
                <div class="page-area-list">
                    <span class="tit">이전글</span>
                    <span class="cnt">
                        <nuxt-link
                            v-if="prevPost"
                            :to="`/customer/inquiry/${prevPost.inquiry_pk}`"
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
                            :to="`/customer/inquiry/${nextPost.inquiry_pk}`"
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
    </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCustomerApi } from "~/api/support";

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
  const res = await customerApi._inquiryView(route.params.slug);
    console.log(res, 'res')
  noticeInfo.value = res.inquiryview || {};
  nextPost.value = res.next_post || null;
  prevPost.value = res.prev_post || null;
};

// 2026.06.08[cgnoh]: 글 수정 페이지로 이동
const handleEdit = () => {
  router.push(`/customer/inquiry/edit/${route.params.slug}`);
};

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
      alert("삭제되었습니다.");

      router.push("/customer/inquiry");
      return;
    }

    alert(res.message || "삭제에 실패했습니다.");
  } catch (err) {
    console.error(err);

    alert(
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