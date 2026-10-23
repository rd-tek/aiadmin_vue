<template>
  <!-- 2026-10-22: 대회관리 > 매장대회 상세(조건·순위, 조회 전용) -->
  <tournament-detail kind="competition" />
</template>
<script setup>
import TournamentDetail from "~/components/tournament/tournament-detail.vue";

definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, meta: [{ name: "description", content: "매장대회 상세 페이지 입니다." }] });
</script>
