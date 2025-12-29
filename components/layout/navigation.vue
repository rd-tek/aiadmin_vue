<template>
    <ul class="gnb">
        <li class="gnb-list">
            <nuxt-link to="/" class="gnb-list-link">홈</nuxt-link>
        </li>
        <li class="gnb-list">
            <nuxt-link :to="route.path" class="gnb-list-link">{{ route.name }}</nuxt-link>
        </li>
    </ul>
</template>
<script setup>
const route = useRoute();
</script>