<template>
    <div class="customer-member detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">X-GOLF 신규 매장 오픈 뉴스</div>
                <div class="info">
                    <div class="info-list label">
                        <span class="label">공지</span>
                    </div>
                    <div class="info-list name">관리자</div>
                    <div class="info-list date">2026.06.11</div>
                    <div class="info-list count">조회수 : 4</div>
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
                        <span class="text">관련 캡쳐 이미지.jpeg</span>
                    </div>
                </div>
            </div>
            <div class="desc-area"> 
                <span>
                    제가 골프를 배운 지는 1년 정도 되었는데, 아직 드라이버 샷에서 가장 큰 어려움을 겪고 있습니다. 연습장에서 공을 칠 때는 괜찮은 것 같은데, 실제 필드에 나가면 드라이버 샷이 자꾸 오른쪽으로 휘어 나가는 슬라이스가 심하게 발생합니다. 특히 티샷에서 힘을 주면 줄수록 클럽 페이스가 열리면서 볼이 오른쪽으로 크게 벗어나 버리는데, 제 스윙 자세가 잘못된 건지, 아니면 그립을 잡는 방식이 문제인지 잘 모르겠습니다. 혹시 초보자가 흔히 범하는 드라이버 샷 슬라이스 원인이 어떤 것들이 있는지, 그리고 이를 교정하기 위해 연습장에서 어떤 드릴이나 연습 방법을 집중적으로 해보면 좋을지 조언 부탁드립니다제가 골프를 배운 지는 1년 정도 되었는데, 아직 드라이버 샷에서 가장 큰 어려움을 겪고 있습니다. 연습장에서 공을 칠 때는 괜찮은 것 같은데, 실제 필드에 나가면 드라이버 샷이 자꾸 오른쪽으로 휘어 나가는 슬라이스가 심하게 발생합니다. 특히 티샷에서 힘을 주면 줄수록 클럽 페이스가 열리면서 볼이 오른쪽으로 크게 벗어나 버리는데, 제 스윙 자세가 잘못된 건지, 아니면 그립을 잡는 방식이 문제인지 잘 모르겠습니다. 혹시 초보자가 흔히 범하는 드라이버 샷 슬라이스 원인이 어떤 것들이 있는지, 그리고 이를 교정하기 위해 연습장에서 어떤 드릴이나 연습 방법을 집중적으로 해보면 좋을지 조언 부탁드립니다
                </span>
            </div>
            <div class="page-area">
                <div class="page-area-list">
                    <span class="tit">이전글</span>
                    <span class="cnt">
                        <span class="no-link">이전 글이 없습니다.</span>
                    </span>
                </div>
                <div class="page-area-list">
                    <span class="tit">다음글</span>
                    <span class="cnt">
                        <span class="no-link">다음 글이 없습니다.</span>
                    </span>
                </div>
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/publish/customer/shop" class="btn-md-line">목록</nuxt-link>
                <button type="button" class="btn-md-line">삭제</button>
                <button type="button" class="btn-md-fill btn-primary-purple" @click="handleEdit">수정</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";

const detailRef  = ref();
const detailMove = ref(false);
useIntersectionObserver(detailRef, ([{ isIntersecting }]) => {
    if (isIntersecting) detailMove.value = true;
}, { threshold: 0 });
const router = useRouter();

const handleEdit = () => {
    router.push(`/publish/customer/shop/edit/0`)
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>