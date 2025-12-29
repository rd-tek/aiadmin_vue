<template>
    <div class="board final-report">
        <div class="board-wrap">
            <div class="title" id="report">
                <h2 class="text" v-if="currentState === 'reportRegister'">코칭 리포트 등록하기</h2>
                <h2 class="text" v-else-if="currentState === 'onepointLesson'">원포인트레슨 관리</h2>
                <h2 class="text" v-else-if="currentState === 'recommendActive'">추천 운동 등록</h2>
            </div>
            <div class="content-tab">
                <div class="content-tab-list left"
                     @click="leftClick"
                    :class="{ 
                        'is-ing' : currentState === 'reportRegister', 
                        'is-complete': currentState === 'onepointLesson' || currentState === 'recommendActive' || currentState === 'done' }">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="text">1. 리포트 등록</div>
                </div>
                <div class="content-tab-list center" @click="centerClick" :class="{ 'is-ing' : currentState === 'onepointLesson', 'is-complete' : currentState === 'recommendActive' || currentState === 'done' }">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="text">2. 원포인트레슨 관리</div>
                </div>
                <div class="content-tab-list right" @click="rightClick" :class="{ 'is-ing' : currentState === 'recommendActive', 'is-complete' : currentState === 'done' }">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path d="M11.6668 18.184L7.82496 14.3421L6.17529 15.9918L11.6668 21.4833L22.9916 10.1585L21.342 8.50879L11.6668 18.184Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="text">3. 추천 운동 등록</div>
                </div>
            </div>

            <!-- 코칭 리포트 등록하기 -->
            <div class="cont" v-if="currentState === 'reportRegister'">
                <div class="section">
                    <div class="top-area">
                        <div class="title">리포트 등록</div>
                        <button type="button" class="btn-callback btn-sm-line" @click="modalOpen('modalCallback')">불러오기</button>
                    </div>
                    <div class="chart-area">
                        <div class="chart-box radar-chart">
                            <p class="title">코칭 구질분석</p>
                            <div class="chart">
                                <chart-radar />
                            </div>
                        </div>
                        <div class="chart-box bar-chart">
                            <div class="chart-box-list">
                                <p class="title">평균 비거리(m)</p>
                                <ul class="progress">
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">70.00</span>
                                            <span class="text">나의평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-orange" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">20.00</span>
                                            <span class="text">전체평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-cyan" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="chart-box-list">
                                <p class="title">평균 캐리(m)</p>
                                <ul class="progress">
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">70.00</span>
                                            <span class="text">나의평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-orange" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">20.00</span>
                                            <span class="text">전체평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-cyan" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="chart-box-list">
                                <p class="title">평균 볼속도(km/h )</p>
                                <ul class="progress">
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">70.00</span>
                                            <span class="text">나의평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-orange" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                    <li class="progress-list">
                                        <div class="progress-num">
                                            <span class="num">20.00</span>
                                            <span class="text">전체평균</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-bar-inner is-cyan" :style="{ width: animatedProgress + '%' }"></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="form-area">
                        <div class="form-area-list"> 
                            <label>제목</label>
                            <div class="input-text">
                                <input type="text" placeholder="내용을 입력하세요">
                            </div>
                        </div>
                        <div class="form-area-list"> 
                            <label>내용</label>
                            <div class="text-area">
                                <textarea placeholder="내용을 입력하세요"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="btn-area">
                        <button type="button" class="btn-primary-teal btn-lg-fill">확인</button>
                    </div>
                </div>
            </div>

            <!-- 원포인트레슨 -->
            <div class="cont" v-else-if="currentState === 'onepointLesson'">
                <div class="section">
                    <div class="top-area">
                        <div class="title">원포인트레슨 등록</div>
                    </div>
                    <div class="table-area" v-if="!isMobile">
                        <table class="type01">
                            <colgroup>
                                <col width="15%">
                                <col width="15%">
                                <col width="*">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>구분동작</th>
                                    <th>평가</th> 
                                    <th>내용</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in onePointLessonList" :key="index">
                                    <td>
                                        <div class="flex-wrap">
                                            <div class="color-point">{{ item.name }}</div>
                                            <button type="button" class="btn-callback btn-sm-line" @click="modalOpen('modalCallback')">불러오기</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="select-default">
                                            <select>
                                                <option>레벨선택</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-area">
                                            <textarea v-model="item.desc" disabled />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="table-area" v-else>
                        <table class="type01">
                            <thead>
                                <tr>
                                    <th>
                                        <div class="head-wrap">
                                            <span class="text">구분동작</span>
                                            <span class="text">평가</span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in onePointLessonList" :key="index">
                                    <td>
                                        <div class="info-area">
                                            <span class="info-area-list">
                                                <span class="color-point">{{ item.name }}</span>
                                            </span>
                                            <span class="info-area-list">
                                                <span class="border-box">{{ item.state }}</span>
                                            </span>
                                        </div>
                                        <div class="text-area">
                                            <textarea v-model="item.desc"></textarea>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="btn-wrap">
                        <button type="button" class="btn-primary-teal btn-lg-fill">확인</button>
                        <button type="button" class="btn-lg-line" @click="goBack">이전 페이지</button>
                    </div>
                </div>
            </div>

            <!-- 추천운동 -->
            <div class="cont" v-else-if="currentState === 'recommendActive'">
                <div class="section">
                    <div class="top-area">
                        <div class="title">추천운동 선택</div>
                        <button type="button" class="btn-callback btn-sm-line" @click="modalOpen('modalCallback')">불러오기</button>
                    </div>
                    <div class="grid-area">
                        <div class="grid-list" v-for="n in 12" :key="n">
                            <div class="check-box">
                                <input type="checkbox" :id="`check_${n}`" :name="`check_${n}`">
                                <label :for="`check_${n}`">
                                    <span class="check-box-item">
                                        <i class="item-line" />
                                    </span>
                                    <div class="chexk-box-wrap">
                                        <div class="img-area">
                                            <div class="image" :style="{ backgroundImage: `url('/images/default/img_recommend_01.png')` }"></div>
                                        </div>
                                        <div class="label">
                                            <div class="label-list">초급</div>
                                            <div class="label-list">자세관련</div>
                                        </div>
                                        <div class="title">추천운동1</div>
                                    </div>
                                </label>
                            </div>
                            <!-- <div class="img-area">
                                <div class="image" :style="{ backgroundImage: `url('/images/default/img_recommend_01.png')` }"></div>
                            </div>
                            <div class="label">
                                <div class="label-list">초급</div>
                                <div class="label-list">자세관련</div>
                            </div>
                            <div class="title">추천운동1</div> -->
                        </div>
                    </div>
                    <div class="btn-wrap">
                        <button type="button" class="btn-lg-line" @click="goBack">이전 페이지</button>
                        <button type="button" class="btn-lg-line" @click="modalOpen('modalPreview')">미리보기</button>
                        <button type="button" class="btn-primary-teal btn-lg-fill">확인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <modal-callback :isOpen="modals.modalCallback" @update:isOpen="modals.modalCallback = $event"/>
    <modal-preview :isOpen="modals.modalPreview" @update:isOpen="modals.modalPreview = $event"/>

</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useWindowSize } from '@vueuse/core'
import { useHead } from '#app'

const modals = reactive({modalSample: false});
const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector('body').classList.add('is-hidden');
};

// 리포트 등록(reportRegister)
// 원포인트레슨 관리(onepointLesson)
// 추천 운동 등록(recommendActive)
// 완료(done)
const currentState = ref('reportRegister')
const route = useRoute();
const router = useRouter();
const onePointLessonList = ref([
    {
        name: 'Address',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Back Swing',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Top Swing',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Down Swing',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Impact',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Follow Throw',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: 'Finish',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    },
    {
        name: '총평',
        state: 'A',
        desc: '1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. '
    }
])
const targetProgress = ref(30);
const animatedProgress = ref(0);

const leftClick = () => {
    currentState.value = 'reportRegister'
}

const centerClick = () => {
    currentState.value = 'onepointLesson'
}

const rightClick = () => {
    currentState.value = 'recommendActive'
}

onMounted(() => {
  const duration = 1000;
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate))
  let currentFrame = 0

  const easeOutQuad = (t) => t * (2 - t)

  const animate = () => {
    currentFrame++
    const progressRatio = currentFrame / totalFrames
    const easedRatio = easeOutQuad(progressRatio)
    animatedProgress.value = Math.round(easedRatio * targetProgress.value)

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate)
    } else {
      animatedProgress.value = targetProgress.value;
    }
  }

  requestAnimationFrame(animate)

//   const childIndex = Number(route.query.child);
//   if (!isNaN(childIndex) && childIndex >= 0) {
//     accordionIndex.value = childIndex;
//   }
})

// 현재 페이지 상태 (숫자)
const currentPage = ref(0)

// 초기값: URL param에서 가져오기
const initPage = Number(route.params.slug)
if (!isNaN(initPage)) currentPage.value = initPage

// 페이지 변경 시 URL 업데이트 (양방향 동기화)
watch(currentPage, (page) => {
  if (page !== Number(route.params.slug)) {
    router.push({ name: route.name, params: { slug: page } })
  }
})

// URL param 변경 시 currentPage 업데이트
watch(() => route.params.slug, (slug) => {
  const page = Number(slug)
  if (!isNaN(page) && page !== currentPage.value) {
    currentPage.value = page
  }
})

const { width } = useWindowSize();
const isMobile = ref(false);

const goBack = () => {
if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

watch(width, (newWidth) => {
  isMobile.value = newWidth <= 1024
}, { immediate: true })

definePageMeta({ 
    layout: 'sub-page'
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '최종 코칭 리포트',
  meta: [
    { name: 'description', content: '최종 코칭 리포트 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/final-report.scss';
</style> 