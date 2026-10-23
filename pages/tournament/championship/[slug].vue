<template>
  <!-- 2026-10-22: 대회관리 > 챔피언십 상세(조건·순위) -->
  <tournament-detail kind="championship" />
</template>
<script setup>
import TournamentDetail from "~/components/tournament/tournament-detail.vue";

definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, meta: [{ name: "description", content: "챔피언십 상세 페이지 입니다." }] });
</script>
