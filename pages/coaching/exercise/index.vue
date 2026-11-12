<!-- 2026-11-12(aisports2 11-11): 추천 운동 관리 — 공용 components/coaching/exercise-admin.vue -->
<template>
  <coaching-exercise-admin sport="golf" />
</template>
<script setup>
definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: "추천 운동 관리" });
</script>
