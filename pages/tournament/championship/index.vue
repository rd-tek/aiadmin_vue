<template>
  <!-- 2026-10-22: 대회관리 > 챔피언십(본사 대회, 전체 매장) -->
  <tournament-list kind="championship" />
</template>
<script setup>
import TournamentList from "~/components/tournament/tournament-list.vue";

definePageMeta({ layout: "default" });
useHead({
  htmlAttrs: { lang: "ko" },
  title: "챔피언십",
  meta: [{ name: "description", content: "챔피언십 목록 페이지 입니다." }],
});
</script>
