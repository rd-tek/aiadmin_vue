<template>
  <!-- 2026-10-22: 대회관리 > 매장대회(전체 매장이 등록한 대회, 조회 전용) -->
  <tournament-list kind="competition" />
</template>
<script setup>
import TournamentList from "~/components/tournament/tournament-list.vue";

definePageMeta({ layout: "default" });
useHead({
  htmlAttrs: { lang: "ko" },
  title: "매장대회",
  meta: [{ name: "description", content: "매장대회 목록 페이지 입니다." }],
});
</script>
