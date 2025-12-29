<template>
    <div class="academy">
        <div class="academy-wrap">
            <div class="academy-head">아카데미</div>
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
                    <div class="col-2">
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
                        <img src="/public/images/icon/icon_filter.png">
                    </button>
                </div>
                <div class="cont-list" v-for="(row, index) in tableData" :key="index">
                    <div class="cont-list-link hover-none">
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
                        <div class="image-wrap">
                            <div class="image-area" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }">
                            </div>
                        </div>
                        <div class="cont-list-flex">
                            <div class="info-area">
                                <ul class="label">
                                    <li class="label-list">
                                        <span>중급</span>
                                    </li>
                                    <li class="label-list"> 
                                        <span>챕터 8개</span>
                                    </li>
                                </ul>
                                <div class="title">
                                    <span class="text">싱글로 가는 가장 빠른 길. 강골프의 '숏게임 마스터 클래스'</span>
                                </div>
                                <div class="info">
                                    <div class="info-list">
                                        <img src="/public/images/icon/icon_favorite.png" alt="icon_favorite">
                                        <span>120</span>
                                    </div>
                                    <div class="info-list">
                                        <img src="/public/images/icon/icon_person.png" alt="icon_person">
                                        <span>120</span>
                                    </div>
                                    <div class="info-list">
                                        <div class="state type01">
                                            <div class="state-list color-green">진행</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-wrap">
                                <div class="btn-group">
                                    <button type="button" class="btn-primary-orange btn-md-line">수정</button>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>
            </div>
            <div class="btn-wrap">
                <div class="btn-group">
                    <button type="button" class="btn-primary btn-lg-line">삭제</button>
                    <ul class="pagination-container type02">
                        <li>
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_prev.png" />
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
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_more_horiz.png" />
                            </button>
                        </li>
                        <li>
                            <button type="button" class="paginate-buttons">
                                <img src="/images/icon/icon_next.png" />
                            </button>
                        </li>
                    </ul>
                    <nuxt-link to="/academy/write" class="btn-primary-teal btn-lg-fill">등록하기</nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const nodata = ref(false);

const allSelected = ref(false)

const toggleAll = () => {
    tableData.value.forEach((row) => {
    row.checked = allSelected.value
  })
}
const tableData = ref([
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: true
  },
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: false
  },
  {
    region: '경기',
    name: '가나 스크린골프',
    phone: '02-1234-1234',
    address: '서울시 강남구 강남로1길 22',
    date: '25.05.05',
    value: 324,
    checked: false,
    fixed: false
  },
]);

const checkIfAllSelected = () => {
    allSelected.value = tableData.value.every((row) => row.checked)
}


definePageMeta({ 
    layout: 'sub-page'
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/academy.scss';
</style> 