<template>
    <div class="member">
         <div class="member-wrap">
            <div class="member-head">회원</div>
            <div class="filter-box">
                <div class="search-area">
                    <div class="search-area-flex">
                        <div class="select-default">
                            <select class="lg">
                                <option>전체</option>
                            </select>
                        </div>
                        <div class="input-text">
                            <input type="text">
                        </div>
                    </div>
                    <button type="button" class="btn-search">검색</button>
                </div>
            </div>
            <div class="cont">
                <div class="top-area">
                    <div class="col-1">
                        <div class="check-box">
                            <input 
                                type="checkbox" 
                                id="chk_all"
                                v-model="allSelected"
                                @change="toggleAll"
                                name="chk_all">
                            <label for="chk_all">
                                <span class="check-box-item">
                                    <span class="item-blur"></span>
                                    <i class="item-line"></i>
                                </span>
                                <span class="check-box-txt">전체선택</span>
                            </label>
                        </div>
                    </div> 
                    <button type="button" class="col-2">
                        <span>최신순</span>
                        <img src="/public/images/icon/icon_filter.png" alt="icon_filter">
                    </button>
                </div>
                <div class="table">
                    <div class="table-head">
                        <div class="table-head-col col-1"></div>
                        <div class="table-head-col is-mob">번호</div>
                        <div class="table-head-col">닉네임</div>
                        <div class="table-head-col is-mob">성별</div>
                        <div class="table-head-col is-mob">휴대전화</div>
                        <div class="table-head-col is-mob">매장</div>
                        <div class="table-head-col is-mob">코칭진행</div>
                        <div class="table-head-col is-mob">코칭완료</div>
                    </div>
                    <div class="table-body">
                        <div class="table-body-row" v-for="(row, index) in tableData" :key="index">
                            <div class="table-body-flex align-start">
                                <div class="table-body-col col-1">
                                    <div class="check-box">
                                    <input
                                        type="checkbox"
                                        :id="`check_${index}`"
                                        v-model="row.checked"
                                        @change="checkIfAllSelected">
                                        <label :for="`check_${index}`">
                                            <span class="check-box-item">
                                                <span class="item-blur"></span>
                                                <i class="item-line"></i>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div class="table-body-col is-mob">{{ row.num }}</div>
                                <div class="table-body-col" @click="handleMobList(index)">
                                    <a class="link">{{ row.nickName }}</a>
                                    <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }" aria-label="더보기">
                                        <img src="/public/images/icon/icon_arrow_down.png" alt="icon_arrow_down" />
                                    </button>
                                </div>
                                <div class="table-body-col is-mob">{{ row.gender }}</div>
                                <div class="table-body-col is-mob">{{ row.phone }}</div>
                                <div class="table-body-col is-mob">{{ row.shop }}</div>
                                <div class="table-body-col is-mob">
                                    <span class="box color-green">{{ row.ing }}</span>
                                </div>
                                <div class="table-body-col is-mob">
                                    <span class="box color-grey">{{ row.complete }}</span>
                                </div>
                            </div>
                            <transition
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @before-leave="beforeLeave"
                                @leave="leave">
                                <div class="table-body-mob" v-if="mobListIndex === index">
                                    <dl class="list">
                                        <dt class="tit">성별</dt>
                                        <dd class="cnt">{{ row.gender }}</dd>
                                    </dl>
                                    <dl class="list">
                                        <dt class="tit">휴대전화</dt>
                                        <dd class="cnt">{{ row.phone }}</dd>
                                    </dl>
                                    <dl class="list">
                                        <dt class="tit">매장</dt>
                                        <dd class="cnt">{{ row.shop }}</dd>
                                    </dl>
                                    <dl class="list">
                                        <dt class="tit">코칭진행</dt>
                                        <dd class="cnt">
                                            <span class="box color-green">{{ row.ing }}</span>
                                        </dd>
                                    </dl>
                                    <dl class="list">
                                        <dt class="tit">코칭완료</dt>
                                        <dd class="cnt">
                                            <span class="box color-grey">{{ row.complete }}</span>
                                        </dd>
                                    </dl>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <div class="btn-group align-left">
                    <button type="button" class="btn-primary btn-lg-line">이메일 보내기</button>
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
            </div>
         </div>
    </div>
</template>
<script setup>
const tableData = ref([
    {
        num: 222,
        nickName: '골프천재 홍길동',
        gender: '남성',
        phone: '010-4545-4545',
        shop: '동원스크린',
        ing: '2',
        complete: '2',
        checked: false,
    },
    {
        num: 222,
        nickName: '골프천재 홍길동',
        gender: '남성',
        phone: '010-4545-4545',
        shop: '동원스크린',
        ing: '2',
        complete: '2',
        checked: false,
    },
    {
        num: 222,
        nickName: '골프천재 홍길동',
        gender: '남성',
        phone: '010-4545-4545',
        shop: '동원스크린',
        ing: '2',
        complete: '2',
        checked: false,
    },
    {
        num: 222,
        nickName: '골프천재 홍길동',
        gender: '남성',
        phone: '010-4545-4545',
        shop: '동원스크린',
        ing: '2',
        complete: '2',
        checked: false,
    }
])

const allSelected = ref(false)

const toggleAll = () => {
    tableData.value.forEach((row) => {
    row.checked = allSelected.value
  })
}

const checkIfAllSelected = () => {
    allSelected.value = tableData.value.every((row) => row.checked)
}

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

definePageMeta({ 
    layout: 'sub-page'
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/member.scss";
</style>