<!--
  오류 화면 (404 / 500 …) — 2026-10-20 신설(aiadmin)
  이 파일이 없으면 Nuxt 기본 영문 오류 화면(개발 모드에선 스택까지)이 그대로 보였음. aishop·aimember 와 같은 한글 안내로 통일.
  레이아웃 없이 자체적으로 그림(오류 상황에서 레이아웃이 데이터를 다시 불러 2차 오류가 나는 것 방지).
-->
<template>
  <div class="error-page">
    <div class="error-page-inner">
      <p class="code">{{ statusCode }}</p>
      <h1 class="title">{{ title }}</h1>
      <p class="desc">{{ desc }}</p>
      <div class="btn-wrap">
        <button type="button" class="btn-home" @click="goHome">홈으로</button>
        <button type="button" class="btn-back" @click="goBack">이전 페이지</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: { type: Object, default: () => ({}) },
});

const statusCode = computed(() => Number(props.error?.statusCode) || 500);
const title = computed(() => (statusCode.value === 404 ? "페이지를 찾을 수 없습니다" : "문제가 발생했습니다"));
const desc = computed(() =>
  statusCode.value === 404
    ? "주소가 바뀌었거나 삭제된 페이지입니다."
    : "잠시 후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요.",
);

// clearError 로 오류 상태를 지우면서 이동해야 화면이 정상 복귀합니다.
const goHome = () => clearError({ redirect: "/" });
const goBack = () => {
  if (import.meta.client && window.history.length > 1) {
    clearError();
    window.history.back();
  } else {
    clearError({ redirect: "/" });
  }
};

useHead({
  htmlAttrs: { lang: "ko" },
  title: computed(() => `${statusCode.value} · ${title.value}`),
});
</script>

<style lang="scss" scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: #F3F5F6;

  &-inner {
    width: 100%;
    max-width: 560px;
    padding: 56px 40px;
    border-radius: 12px;
    background: #fff;
    text-align: center;
    box-shadow: 0 1px 8px rgba(110, 110, 110, 0.15);
  }

  .code {
    font-size: clamp(64px, 9vw, 120px);
    font-weight: 700;
    line-height: 1;
    color: #4318FF;
  }

  .title {
    margin-top: 18px;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 700;
    color: #35383B;
  }

  .desc {
    margin-top: 12px;
    font-size: 15px;
    line-height: 1.6;
    color: #72777A;
  }

  .btn-wrap {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 36px;

    button {
      min-width: 140px;
      height: 48px;
      padding: 0 20px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-home {
      border: 1px solid #4318FF;
      background: #4318FF;
      color: #fff;
    }

    .btn-back {
      border: 1px solid #CDCFD1;
      background: #fff;
      color: #35383B;
    }
  }
}

@media screen and (max-width: 480px) {
  .error-page-inner { padding: 40px 20px; }
  .error-page .btn-wrap { flex-direction: column; }
  .error-page .btn-wrap button { width: 100%; }
}
</style>
