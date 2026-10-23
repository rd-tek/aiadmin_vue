<template>
  <!-- 2026-10-22: 대회관리 > 매장대회 등록·수정(매장 선택, 수정 중 매장 변경 시 확인) — 공용 폼 components/tournament/tournament-form.vue -->
  <tournament-form kind="competition" />
</template>
<script setup>
import TournamentForm from "~/components/tournament/tournament-form.vue";

const route = useRoute();
definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: Number(route.params.slug) > 0 ? "매장대회 수정" : "매장대회 등록" });
</script>
