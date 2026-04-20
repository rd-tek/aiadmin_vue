<template>
    <nav class="nav-wrap" :class="{ close: !isOpen }" ref="navWrap">
        <div class="nav-wrap-top">
            <button type="button" class="logo" @click="handleHome">
                <img src="/public/images/default/img_logo_black.png" alt="logo">
            </button>
            <ul class="gnb">
                <li class="gnb-list" v-for="(item, i) in gnbMenu" :key="i">
                    <div class="gnb-list-link" 
                        :class="{ 'is-active': gnbIndex === i }" 
                        @click="handleAccordion(item, i)">
                        <component :is="iconMap[item.path]" />
                        <span class="name">{{ item.name }}</span>
                        <button type="button" class="btn-arrow" :class="{ 'is-active': setDepthList.includes(i) }" v-if="item.children">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.39935 9.39886C6.7313 9.06692 7.26949 9.06692 7.60143 9.39886L12.0004 13.7978L16.3994 9.39886C16.7313 9.06692 17.2695 9.06692 17.6014 9.39886C17.9334 9.73081 17.9334 10.269 17.6014 10.6009L12.6014 15.6009C12.2695 15.9329 11.7313 15.9329 11.3993 15.6009L6.39935 10.6009C6.0674 10.269 6.0674 9.73081 6.39935 9.39886Z" fill="#CDCFD1"/>
                            </svg>
                        </button>
                    </div>
                    <transition
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @before-leave="beforeLeave"
                        @leave="leave">
                        <ul class="depth" v-if="gnbIndex === i && item.children">
                            <li class="depth-list" v-for="(depth, j) in item.children" :key="j" @click="handleDepth(depth)">
                                <span class="name" :class="{ 'is-active': route.path.endsWith(depth.path) || route.path.includes(depth.path) }">{{ depth.name }}</span>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
        <div class="nav-wrap-bottom">
            <div class="info">
                <p>Connect Time</p>
                <p>{{ currentTime }}</p>
            </div>
            <div class="btn-wrap align-left">
                <button type="button" class="btn-logout" @click="handleLogout">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="#ADB0B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="text">Log out</span>
                </button>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";

// 2026.03.04[cgnoh]: 라이브러리 관련
import dayjs from 'dayjs'

// 2026.03.04[cgnoh]: 컴포넌트 관련
import svgMembership from '@/components/svg/membership.vue'
import svgBooking from '@/components/svg/booking.vue'
import svgSimulator from '@/components/svg/simulator.vue'
import svgSettings from '@/components/svg/settings.vue'
import svgTournament from '@/components/svg/tournament.vue'
import svgEvent from '@/components/svg/event.vue'

// 2026.03.04[cgnoh]: 라우터 설정
const router = useRouter();
const route = useRoute();
const props = defineProps({
    isOpen: Boolean
})

// 2026.03.04[cgnoh]: GNB 아이콘
const iconMap = {
  membership: svgMembership,
  customer: svgBooking, 
  golfcourse: svgSimulator,
  manager: svgSettings,
  swing: svgTournament,
}

// 2026.03.04[cgnoh]: GNB 메뉴
const gnbMenu = [
    {
        name: '관리',
        path: 'membership',
        children: [
            {
                name: '회원관리',
                path: 'membership/member'
            },
            {
                name: '코치관리',
                path: 'membership/coach'
            },
            {
                name: '매장관리',
                path: 'membership/shop'
            }
        ]
    },
    {
        name: '고객센터',
        path: 'customer',
        children: [
            {
                name: '공지사항(회원)',
                path: 'customer/member'
            },
            {
                name: '공지사항(매장)',
                path: 'customer/shop'
            },
            {
                name: '공지사항(앱)',
                path: 'customer/app'
            },
            {
                name: '자료실',
                path: 'customer/library'
            },
            {
                name: '고객문의',
                path: 'customer/inquiry'
            }
        ]
    },
    {
        name: '골프코스',
        path: 'golfcourse',
    },
    {
        name: '스윙영상',
        path: 'swing',
        children: [
            {
                name: '스윙영상리스트',
                path: 'swing/list'
            }
        ]
    },
    {
        name: '관리자',
        path: 'manager',
        children: [
            {
                name: '관리자 리스트',
                path: 'manager/list'
            },
            {
                name: '게임데이터 관리',
                path: 'manager/game-data'
            }
        ]
    },
]

const handleHome = () => {
    router.push({ path: `/publish/dashboard` });
    if(window.innerWidth < 1300) {
        navWrap.value.classList.add('close');
        document.querySelector('section').classList.remove('is-on');
        emit('close-gnb');
    }
}

//  2026.03.04[cgnoh]: GNB 아코디언 & 1depth 이동
const gnbIndex = ref(-1);
const setDepthList = ref([]);
const handleAccordion = (item, index) => { 
  gnbIndex.value = gnbIndex.value === index ? -1 : index

  if (!item.children && item.path) {
    router.push({ path: `/publish/${item.path}` });

    if(window.innerWidth < 1300) {
        navWrap.value.classList.add('close');
        document.querySelector('section').classList.remove('is-on');
        emit('close-gnb');
    }
  }
}

// 2026.03.04[cgnoh]: 2depth 이동
const emit = defineEmits(['close-gnb'])
const handleDepth = (item) => {
  if (item.path) {
    router.push({ path: `/publish/${item.path}` });
    
    if(window.innerWidth < 1300) {
        emit('close-gnb');
    }
  }
}

// 2026.03.04[cgnoh]: 아코디언 애니메이션
const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = "0";
};


// 2026.03.04[cgnoh]: 로그아웃
const handleLogout = () => {
    router.push('/publish/login')
}

// 2026.03.04[cgnoh]: 현재 시간 관련
let timeInterval = null;
const currentTime = ref('');
const updateTime = () => {
  currentTime.value = dayjs().format('YYYY.MM.DD HH:mm:ss')
}

// 2026.03.04[cgnoh]: 컴포넌트 라이프사이클
const navWrap = ref();
onMounted(() => {
    updateTime()
    timeInterval = setInterval(updateTime, 1000);
    
    if(window.innerWidth < 1300) {
        navWrap.value.classList.add('close')
    } else {
        navWrap.value.classList.remove('close')
    }
})

onUnmounted(() => {
  clearInterval(timeInterval)
})

watch(
  () => route.path,
  (path) => {
    gnbMenu.forEach((menu, i) => {
      // 1depth match
      if (path.includes(menu.path)) {
        gnbIndex.value = i
      }

      // 2depth match
      if (menu.children) {
        const match = menu.children.find(child => path.includes(child.path))
        if (match) {
          gnbIndex.value = i
        }
      }
    })
  },
  { immediate: true }
)

</script>
<style lang="scss" scoped>
@use '@/assets/scss/components/gnb.scss';
</style>