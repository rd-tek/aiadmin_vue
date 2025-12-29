<template>
    <div class="swing">
        <div class="header">
            <button type="button" class="btn-back" @click="goBack">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <mask id="mask0_207_32142" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="19" height="20">
                    <rect y="0.789062" width="18.421" height="18.421" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_207_32142)">
                    <path d="M7.6754 17.675L0 9.99962L7.6754 2.32422L9.03778 3.6866L2.72477 9.99962L9.03778 16.3126L7.6754 17.675Z" fill="white"/>
                    </g>
                </svg>
            </button>
            <div class="title">나의 스윙</div>
            <button type="button" class="btn-profile" @click="handleProfile">
                <div class="image" :style="{ backgroundImage: `url('/images/default/img_profile_01.png')` }" />
            </button>
            <nav class="nav my-menu" :class="{ 'is-active' : showMobMenu }">
                <div class="nav-wrap">
                    <div class="header">
                        <button type="button" class="btn-prev" @click="menuClose">
                            <img src="/public/images/icon/icon_arrow_prev.png">
                        </button>
                    </div>
                    <div class="content">
                        <div class="profile">
                            <div class="profile-image" :style="{ backgroundImage: `url('/images/default/img_profile_01.png')` }"/>
                            <div class="profile-name">Koong_golferm</div>
                            <p class="profile-email">ssadasdhaasjkdh@naver.com</p>
                        </div>
                        <ul class="menu">
                            <li class="menu-list" v-for="(item, i) in mobMenuList" :key="i">
                                <a class="menu-list-item" :class="{ 'is-active' : profileGnbIndex === i && item.children }" @click="handleProfileGnb(i)">
                                    <span class="text">{{ item.name }}</span>
                                    <img src="/public/images/icon/icon_arrow_down_black.png">
                                </a>
                                <transition 
                                    @before-enter="beforeEnter"
                                    @enter="enter" 
                                    @before-leave="beforeLeave" 
                                    @leave="leave">
                                    <div class="slide" v-if="profileGnbIndex === i && item.children">
                                        <ul class="depth">
                                            <li class="depth-list" v-for="(depth, j) in item.children" :key="j">
                                                <a class="depth-list-item" :class="{ 'is-active' : gnbProfileDepthIndex === j }" @click="handleProfileGnbDepth(depth, j)">{{ depth.name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="swing-wrap">
            <button type="button" class="btn-back" @click="goBack">
                <img src="/public/images/icon/icon_arrow_left_alt.png">
                <span class="text">아카데미 돌아가기</span>
            </button>
            <div class="head">
                 <ul class="category">
                    <li class="category-list">Step 02</li>
                    <li class="category-list">S/W 바로잡기</li>
                 </ul>
                 <h2 class="title">
                    <span class="title-depth"><span class="text">어프로치 연습</span></span>
                    <span class="title-depth">
                        <span class="text">#1</span>
                        <span class="date">(2024.10.12 09:10:00)</span>
                        <span class="label">
                            <span class="label-list" :class="{ 'is-green' : item?.state === '성공' }" v-if="item?.state === '성공'">성공</span>
                            <span class="label-list" v-else>실패</span>
                        </span>
                    </span>
                 </h2>
                 <div class="date is-mob-show">(2024.10.12 09:10:00)</div>
                 <div class="form-box">
                    <select>
                        <option>1. S/W 바로잡기</option>
                    </select>
                    <select>
                        <option>2. 어프로치 연습1</option>
                    </select>
                    <select>
                        <option>#1번째 시도</option>
                    </select>
                    <button type="button" class="btn-default btn-sm-fill">이동</button>
                 </div>
            </div> 
            <div class="cont">
                <div class="col-1">
                    <div class="cont-section">
                        <div class="cont-box">
                            <div class="cont-box-list">
                                <div class="video-area" v-if="nodata">
                                    <videoPlayer />
                                </div>
                                <div class="no-data" v-else />
                            </div>
                            <div class="cont-box-list">
                                <div class="video-area" v-if="nodata">
                                    <videoPlayer2 />
                                </div>
                                <div class="no-data" v-else />
                            </div>
                        </div>
                        <ul class="tab type03 box"> 
                            <li class="tab-list"
                                :class="{'is-active' : currentTab === item }" 
                                v-for="(item, index) in swingList" 
                                :key="index" 
                                @click="currentTab = item">
                                <span class="icon">
                                    <svg-address v-if="item === 'address'"/>
                                    <svg-back-swing v-else-if="item === 'backswing'" />
                                    <svg-top-swing v-else-if="item === 'topswing'"/>
                                    <svg-down-swing v-else-if="item === 'downswing'"/>
                                    <svg-impact v-else-if="item === 'impact'"/>
                                    <svg-follow-through v-else-if="item === 'follow-through'"/>
                                    <svg-finish v-else-if="item === 'finish'"/>
                                </span>
                                <span class="text">{{ item }}</span>
                            </li>
                        </ul>
                        <div class="cont-wrap">
                            <div class="cont-box">
                                <div class="foot-area">
                                    <span></span>
                                    <span class="foot-area-list"><span class="point teal">L</span>{{ animated.Left }}</span>
                                    <span></span>
                                    <span class="foot-area-list"><span class="point yellow">B</span>{{ animated.Back }}</span>
                                    <span>
                                        <img src="/public/images/default/img_human_footprints.png" alt="">
                                    </span>
                                    <span class="foot-area-list"><span class="point yellow">F</span>{{ animated.Front }}</span>
                                    <span></span>
                                    <span class="foot-area-list"><span class="point teal">R</span>{{ animated.Right }}</span>
                                    <span></span>
                                </div>
                                <EChart />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="cont-section">
                        <div class="table-area">
                            <div class="table" ref="tableRef">
                                <ul class="row"> 
                                    <li class="row-list" v-for="(item, index) in swingInfo" :key="index">
                                        <p class="tit">{{ item.name }}</p>
                                        <div class="info">{{ item.info }}</div>
                                    </li> 
                                </ul>
                            </div> 
                        </div>
                    </div>
                    <div class="cont-section">
                        <div class="col-wrap">
                            <div class="col-list">
                                <div class="col-list-title">Graph01</div>
                                <div class="col-list-cont">
                                    <EChart2 />
                                </div>
                            </div>
                            <div class="col-list">
                                <div class="col-list-title">Graph02</div>
                                <div class="col-list-cont">
                                    <EChart3 />
                                </div>
                            </div>
                            <div class="col-list">
                                <div class="col-list-title">Graph03</div>
                                <div class="col-list-cont">
                                    <EChart4 />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { defineAsyncComponent } from 'vue'
// const videoPlayer = defineAsyncComponent(() => import('~/components/video/videoPlayer.vue'))
// const videoPlayer2 = defineAsyncComponent(() => import('~/components/video/videoPlayer2.vue'))
import EChart from '~/components/chart/EChart.vue';
import EChart2 from '~/components/chart/EChart2.vue';
import EChart3 from '~/components/chart/EChart3.vue';
import EChart4 from '~/components/chart/EChart4.vue';
import VideoPlayer from '~/components/video/videoPlayer.vue';
import VideoPlayer2 from '~/components/video/videoPlayer2.vue';
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter()
const swingList = ['address', 'backswing', 'topswing', 'downswing', 'impact', 'follow-through', 'finish'];
const swingInfo = [
    {
        name: '클럽정보',
        info: 'I7',
    },
    {
        name: '볼속도',
        info: '97.5km/h',
    },
    {
        name: '백스핀',
        info: '3244rpm'
    },
    {
        name: '캐리',
        info: '188m',
    },
    {
        name: '클럽속도',
        info: '77.5km/h',
    },
    {
        name: '볼방향',
        info: '0.2deg',
    },
    {
        name: '사이드스핀',
        info: '-29rpm',
    },
    {
        name: '비거리',
        info: '210m',
    },
    {
        name: '클럽진입각',
        info: '10.5deg',
    },
    {
        name: '탈출각',
        info: '20.5deg',
    },
    {
        name: '구질',
        info: 'Push Straight',
    },
    {
        name: '티높이',
        info: '55mm'
    }
]

const currentTab = ref('address');

const tableRef = ref(null);

const targets = {
  Left: ref(55),
  Right: ref(65),
  Back: ref(75),
  Front: ref(85),
};

const animated = {
  Left: ref(0),
  Right: ref(0),
  Back: ref(0),
  Front: ref(0),
};

const goBack = () => {
    router.back()
}

onMounted(() => {
  const duration = 1000;
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let currentFrame = 0;

  const easeOutQuad = (t) => t * (2 - t);

  const animate = () => {
    currentFrame++;
    for (const key in targets) {
      const progressValue = easeOutQuad(currentFrame / totalFrames) * targets[key].value;
      animated[key].value = Math.round(progressValue);
    }

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
  
});

const mobMenuList = [
    {
        name: '나의 기록실',
        children: [
            {
                name: '대시보드',
                link: '/myrecord'
            },
            {
                name: '나의 라운드',
                link: '/myrecord/myround'
            },
            {
                name: '나의 토너먼트',
                link: '/myrecord/mytournament'
            },
            {
                name: '나의 이벤트',
                link: '/myrecord/myevent'
            },
            {
                name: '나의 스윙',
                link: '/myrecord/myswing'
            }
        ]
    },
    {
        name: '나의코칭',
        children: [
            {
                name: '스마트매칭',
                link: '/mycoaching/smartmatching'
            },
            {
                name: '나의 강좌',
                link: '/mycoaching/mylecture'
            }
        ]
    },
    {
        name: '나의 정보',
        children: [
            {
                name: '개인정보',
                link: '/membership/info'
            },
            {
                name: '단골매장',
                link: '/membership/shop'
            }
        ]
    }
]

const showMobMenu = ref(false);
const handleProfile = () => {
    showMobMenu.value = true;
    document.querySelector('body').classList.add('is-hidden');
}

const menuClose = () => {
    showMobMenu.value = false;
    document.querySelector('body').classList.remove('is-hidden');
}

const profileGnbIndex = ref(-1);
const handleProfileGnb = (i) => {
    profileGnbIndex.value = profileGnbIndex.value === i ? -1 : i;
}

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

const gnbProfileDepthIndex = ref(-1);
const handleProfileGnbDepth = (depth, j) => {
    gnbProfileDepthIndex.value = gnbProfileDepthIndex.value === j ? -1 : j;
    router.push(depth.link);
    showMobMenu.value = false;
    document.querySelector('body').classList.remove('is-hidden');
}

definePageMeta({ 
    layout: 'sub'
});

</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing.scss';
</style> 