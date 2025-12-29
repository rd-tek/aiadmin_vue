<template>
    <div class="floating-menu">
        <div class="floating-menu-list" v-for="(item, i) in menu" :key="i">
            <a class="title" :class="{ 'is-active' : gnbIndex === i && item.children }"  @click="handleGnb(i)">
                <span class="text">{{ item.name }}</span>
                <img src="/public/images/icon/icon_arrow_down.png" alt="icon_arrow_down">
            </a>
            <transition @before-enter="beforeEnter"
                        @enter="enter"
                        @before-leave="beforeLeave" 
                        @leave="leave">
                <ul class="gnb" v-if="gnbIndex === i && item.children">
                    <li class="gnb-list" v-for="(depth, j) in item.children" :key="j">
                        <nuxt-link 
                            :to="{ path: `${depth.path}` }" 
                            class="gnb-list-link" 
                           :class="{
                                'is-active': route.path === depth.path ||
                                            (route.path.startsWith(depth.path + '/') && route.path.split('/')[2] === depth.path.split('/')[2])
                                }">{{ depth.name }}</nuxt-link>
                    </li>
                </ul>
            </transition>
        </div>
    </div>
</template>
<script setup>
const route = useRoute();

const menu = ref([
    {
        name: '나의 기록실',
        path: '/myrecord',
        children: [
            {
                name: '대시보드',
                path: '/myrecord'
            },
            {
                name: '나의 라운드',
                path: '/myrecord/myround'
            },
            {
                name: '나의 토너먼트',
                path: '/myrecord/mytournament'
            },
            {
                name: '나의 이벤트',
                path: '/myrecord/myevent'
            },
            {
                name: '나의 스윙',
                path: '/myrecord/myswing'
            }
        ]
    },
    {
        name: '나의 코칭',
        path: '/mycoaching',
        children: [
            {
                name: '스마트매칭',
                path: '/mycoaching/smartmatching'
            },
            {
                name: '나의 강좌',
                path: '/mycoaching/mylecture'
            }
        ]
    },
    {
        name: '나의정보',
        path: '/membership',
        children: [
            {
                name: '개인정보',
                path: '/membership/info'
            },
            {
                name: '단골매장',
                path: '/membership/shop'
            }
        ]
    }
])

const beforeEnter = (el) => {
  el.style.height = '0';
}

const enter = (el) => {
  el.style.transition = 'all .4s ease';
  el.style.height = el.scrollHeight + 'px';
}

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + 'px';
}

const leave = (el) => {
  el.style.transition = 'all .4s ease';
  el.style.height = '0';
}

const gnbIndex = ref(-1);
const handleGnb = (i) => {
    gnbIndex.value = gnbIndex.value === i ? -1 : i
}

onMounted(() => {
  const index = menu.value.findIndex(item => route.path.startsWith(item.path))

  if (index !== -1) {
    gnbIndex.value = index
  }
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/layouts/sub-gnb.scss';
</style> 