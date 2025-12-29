<template>
    <div class="banner" 
         :class="{ 
            'is-championship' : route.name === 'tournament-championship', 
            'is-tournament' : route.name === 'tournament-info',
            'is-minigame-info' : route.name === 'event-mini-game-info',
            'is-golf-course' : route.name === 'golf-course',
            'is-inquiry' : route.name === 'customer-service-inquiry'
        }">
        <div class="banner-wrap" v-if="route.name === 'tournament-championship'">
            <img src="/public/images/default/img_logo_white.png" alt="img_logo_white">
            <nuxt-link :to="{ path: `${route.path}/0` }" class="title">
                <span class="label">공개</span>
                <span class="text">Procore 챔피언십 대회</span>
            </nuxt-link>
            <p class="sub">모든 회원 참가 가능합니다. 많은 참여 바랍니다.</p>
        </div>
        <div class="banner-wrap" v-else-if="route.name === 'customer-service-inquiry'">
            <div class="title">
                X-GOLF에 궁금한 사항을 문의해보세요.<br>
                최대한 빠르게 답변 드리겠습니다.
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

</script>
<style lang="scss" scoped>
@use '@/assets/scss/components/banner.scss';
</style>