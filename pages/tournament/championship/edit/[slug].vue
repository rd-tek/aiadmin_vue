<template>
  <!-- 2026-10-22: 대회관리 > 챔피언십 등록·수정(본사 대회, 전체 매장) — 공용 폼 components/tournament/tournament-form.vue -->
  <tournament-form kind="championship" />
</template>
<script setup>
import TournamentForm from "~/components/tournament/tournament-form.vue";

const route = useRoute();
definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: Number(route.params.slug) > 0 ? "챔피언십 수정" : "챔피언십 등록" });
</script>
