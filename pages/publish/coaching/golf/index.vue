<template>
    <div class="coaching golf">
        <div class="filter-box">
            <div class="col-2 flex-end">
                <div class="col d-flex">
                    <div class="d-flex">
                        <div class="select-default">
                            <select>
                                <option>이름</option>
                            </select>
                        </div>
                        <div class="input-text">
                            <input type="text" placeholder="검색어를 입력하세요." />
                        </div>
                    </div>
                    <button type="button" class="btn">검색</button>
                </div>
            </div>
        </div>
        <div class="top-area">
            <div class="total">전체 <span class="num">(3)</span></div>
            <button type="button">
                <span>10 페이지</span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_4153_10724" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_4153_10724)">
                            <path d="M11 19L6 13.9531L7.11842 12.8242L11 16.7422L14.8816 12.8242L16 13.9531L11 19ZM7.11842 8.17578L6 7.04688L11 2L16 7.04688L14.8816 8.17578L11 4.25781L7.11842 8.17578Z" fill="#1C1B1F"/>
                        </g>
                    </svg>
                </span>
            </button>
        </div>
        <div class="table type03 mob-type01">
            <div class="table-head">
                <div class="table-head-col is-mob">No</div>
                <div class="table-head-col is-mob">아카데미/클래스</div>
                <div class="table-head-col">닉네임</div> 
                <div class="table-head-col is-mob">매장</div>
                <div class="table-head-col is-mob">일시</div>
                <div class="table-head-col">상태</div>
            </div>
            <div class="table-body">
                <div class="table-body-row" :class="{ 'is-move': coachingListMove }" ref="coachingListRef" v-for="(item, index) in coachingList" :key="index">
                    <div class="table-body-flex">
                        <div class="table-body-col is-mob">222</div>
                        <div class="table-body-col is-mob">
                            <div class="item-wrap">
                                <div class="academy">{{ item.academy }}</div>
                                <nuxt-link :to="`/publish/coaching/golf/${index}`" class="class-name">{{ item.className }}</nuxt-link>
                            </div>
                        </div>
                        <div class="table-body-col">
                            <span class="link" @click="modalOpenMember">{{ item.student }}</span>
                        </div>
                        <div class="table-body-col is-mob">{{ item.store }}</div>
                        <div class="table-body-col is-mob">
                            <div class="item-wrap">
                                <div class="date">{{ item.date }}</div>
                                <div class="time">{{ item.time }}</div>
                            </div>
                        </div>
                        <div class="table-body-col" @click="handleMobList(index)">
                            <span class="state type01">
                                <span class="state-list" :class="`color-${item.state === '진행' ? 'green' : 'grey'}`">{{ item.state }}</span>
                            </span>
                            <button
                                type="button"
                                class="btn-arrow"
                                :class="{ 'is-active': mobListIndex === index }"
                            >
                                <img
                                src="/public/images/icon/icon_arrow_down.png"
                                alt="icon_arrow_down"
                                />
                            </button>
                        </div>
                    </div>
                    <transition
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @before-leave="beforeLeave"
                        @leave="leave">
                        <div class="table-body-mob" v-if="mobListIndex === index">
                            <dl class="list">
                                <dt class="tit">아카데미</dt>
                                <dd class="cnt">{{ item.academy }}</dd>
                            </dl>
                            <dl class="list">
                                <dt class="tit">클래스</dt>
                                <dd class="cnt">
                                    <nuxt-link :to="`/publish/coaching/golf/${index}`" class="link">{{ item.className }}</nuxt-link>
                                </dd>
                            </dl>
                            <dl class="list">
                                <dt class="tit">매장</dt>
                                <dd class="cnt">{{ item.store }}</dd>
                            </dl>
                            <dl class="list">
                                <dt class="tit">일시</dt>
                                <dd class="cnt">
                                    <p>{{ item.date }}</p>
                                    <p>{{ item.time }}</p>
                                </dd>
                            </dl>
                        </div>
                    </transition>
                </div>
            </div>
            <ul class="pagination-container type02">
                <li>
                    <button type="button" class="paginate-buttons" aria-label="이전">
                        <img src="/images/icon/icon_prev.png" alt="icon_prev"/>
                    </button>
                </li>
                <li>
                    <button type="button" class="paginate-buttons active">1</button>
                </li>
                <li>
                    <button type="button" class="paginate-buttons">2</button>
                </li>
                <li>
                    <button type="button" class="paginate-buttons">3</button>
                </li>
                <li>
                    <button type="button" class="paginate-buttons" aria-label="더보기">
                        <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
                    </button>
                </li>
                <li>
                    <button type="button" class="paginate-buttons" aria-label="다음">
                        <img src="/images/icon/icon_next.png" alt="icon_next"/> 
                    </button>
                </li>
            </ul>
        </div>

        <!-- 회원 정보 -->
        <modal-member-info-sample
            :isOpen="modals.modalMemberInfo"
            @update:isOpen="modals.modalMemberInfo = $event" />

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";

const coachingList = [
    {
        academy: "김프로 아카데미",
        className: "SW 바로가기",
        student: "골프천재 홍익점",
        store: "X-GOLF 서울지점",
        date: "2026.03.04",
        time: "오전 11:30:23",
        state: "진행"
    },
    {
        academy: "김프로 아카데미",
        className: "SW 바로가기",
        student: "골프천재 홍익점",
        store: "X-GOLF 서울지점",
        date: "2026.03.04",
        time: "오전 11:30:23",
        state: "완료"
    },
    {
        academy: "김프로 아카데미",
        className: "SW 바로가기",
        student: "골프천재 홍익점",
        store: "X-GOLF 서울지점",
        date: "2026.03.04",
        time: "오전 11:30:23",
        state: "완료"
    }
];

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

const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
  }
};

// 2026.03.04[cgnoh]: 모달 관련
const modals = reactive({
  modalPerScorecard: false,
  modalMemberInfo: false
});

const modalOpenMember = () => {
    modals['modalMemberInfo'] = true;
    document.querySelector('body').classList.add('is-hidden');
}

const coachingListRef = ref();
const coachingListMove = ref(false);
useIntersectionObserver(
  coachingListRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      coachingListMove.value = true;
    }
  },
  {
    threshold: 0,
  }
)

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/coaching.scss";
</style> 