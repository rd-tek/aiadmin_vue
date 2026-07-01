<template>
    <div class="golf-course list">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <select v-model="searchForm.searchtype">
                      <option value="1">골프코스 이름</option>
                      <option value="2">골프코스 코드</option>
                  </select>
                  <input type="text" v-model="searchForm.searchname" placeholder="검색어를 입력해 주세요." @input="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="row">
        <template v-if="rowList.length > 0">
          <div class="row-list" :class="{ 'is-move': rowListMove }" v-for="(item, index) in rowList" :key="index" ref="rowListRef">
            <div class="row-list-item col-1 is-mob">
              <span class="color-grey">{{ item.no }}</span>
            </div>
            <div class="row-list-item">
              <div class="state type01">
                <span class="state-list" :class="{ 'color-blue': item.status === '0', 'border-grey': item.status === '1' }">{{ item.status === '0' ? '사용' : '대기' }}</span>
                <span class="state-list" :class="{ 'color-green': item.viewflag === '0', 'color-black': item.viewflag === '1' }">{{ item.viewflag === '0' ? '공개' : '비공개' }}</span>
              </div>
              <div class="title">
                <nuxt-link :to="`/golfcourse/list/${item.courseno}`" class="link">{{ item.coursename || '-' }}</nuxt-link>
              </div>
              <div class="label">
                <div class="label-list hole">{{ item.coursecode || '-' }}</div>
              </div>
            </div>
            <div class="row-list-item col-1 align-center is-mob">
              <div class="hole">
                {{ item.hole || '-' }}홀
              </div>
            </div>
            <div class="row-list-item col-3">
              <div class="diff">
                <div class="diff-list">
                  <span class="text">코스난이도</span>
                  <div class="star">
                    <span class="star-list" v-for="index in 5" :key="index">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M18.2961 6.58663C18.2384 6.41682 18.1323 6.26761 17.9908 6.15742C17.8493 6.04723 17.6787 5.98089 17.4999 5.96658L12.2708 5.55107L10.008 0.542056C9.9359 0.380725 9.81869 0.243699 9.67047 0.147514C9.52225 0.0513295 9.34936 9.71158e-05 9.17266 1.37932e-07C8.99597 -9.684e-05 8.82302 0.0509458 8.6747 0.146968C8.52637 0.24299 8.40901 0.379887 8.33677 0.541138L6.07395 5.55107L0.844797 5.96658C0.669105 5.9805 0.501144 6.04474 0.361006 6.15161C0.220868 6.25849 0.114488 6.40348 0.0545932 6.56923C-0.00530196 6.73498 -0.0161763 6.91448 0.0232713 7.08625C0.062719 7.25802 0.150818 7.41479 0.277029 7.5378L4.14134 11.3049L2.77466 17.2229C2.73316 17.402 2.74646 17.5895 2.81283 17.761C2.8792 17.9324 2.99559 18.08 3.14687 18.1845C3.29816 18.2891 3.47737 18.3457 3.66124 18.3471C3.84511 18.3485 4.02516 18.2946 4.17803 18.1924L9.17237 14.8628L14.1667 18.1924C14.3229 18.2961 14.5072 18.3495 14.6947 18.3454C14.8822 18.3413 15.0639 18.2799 15.2155 18.1694C15.367 18.0589 15.4811 17.9047 15.5423 17.7274C15.6036 17.5502 15.6091 17.3584 15.5581 17.1779L13.8805 11.3076L18.0411 7.56348C18.3135 7.31766 18.4135 6.93426 18.2961 6.58663Z" :fill="index <= item.field ? '#F8AD15' : '#E5E7E8'" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="diff-list">
                  <span class="text">그린난이도</span>
                  <div class="star">
                    <span class="star-list" v-for="index in 5" :key="index">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                        <path d="M18.2961 6.58663C18.2384 6.41682 18.1323 6.26761 17.9908 6.15742C17.8493 6.04723 17.6787 5.98089 17.4999 5.96658L12.2708 5.55107L10.008 0.542056C9.9359 0.380725 9.81869 0.243699 9.67047 0.147514C9.52225 0.0513295 9.34936 9.71158e-05 9.17266 1.37932e-07C8.99597 -9.684e-05 8.82302 0.0509458 8.6747 0.146968C8.52637 0.24299 8.40901 0.379887 8.33677 0.541138L6.07395 5.55107L0.844797 5.96658C0.669105 5.9805 0.501144 6.04474 0.361006 6.15161C0.220868 6.25849 0.114488 6.40348 0.0545932 6.56923C-0.00530196 6.73498 -0.0161763 6.91448 0.0232713 7.08625C0.062719 7.25802 0.150818 7.41479 0.277029 7.5378L4.14134 11.3049L2.77466 17.2229C2.73316 17.402 2.74646 17.5895 2.81283 17.761C2.8792 17.9324 2.99559 18.08 3.14687 18.1845C3.29816 18.2891 3.47737 18.3457 3.66124 18.3471C3.84511 18.3485 4.02516 18.2946 4.17803 18.1924L9.17237 14.8628L14.1667 18.1924C14.3229 18.2961 14.5072 18.3495 14.6947 18.3454C14.8822 18.3413 15.0639 18.2799 15.2155 18.1694C15.367 18.0589 15.4811 17.9047 15.5423 17.7274C15.6036 17.5502 15.6091 17.3584 15.5581 17.1779L13.8805 11.3076L18.0411 7.56348C18.3135 7.31766 18.4135 6.93426 18.2961 6.58663Z" :fill="index <= item.green ? '#298097' : '#E5E7E8'"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="row-list is-move" v-else>
          <div class="no-data">데이터가 없습니다.</div>
        </div>
        <ul
          class="pagination-container type02"
        >
          <li>
            <button
              type="button"
              class="paginate-buttons"
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
            >
              <img src="/images/icon/icon_prev.png" alt="prev" />
            </button>
          </li>

          <li
            v-for="page in visiblePages"
            :key="page"
          >
            <button
              type="button"
              class="paginate-buttons"
              :class="{ active: currentPage === page }"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </li>

          <li>
            <button
              type="button"
              class="paginate-buttons"
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
            >
              <img src="/images/icon/icon_next.png" alt="next" />
            </button>
          </li>
        </ul>
        <div class="btn-wrap">
          <button type="button" class="btn-md-fill btn-primary-purple" @click="handleSave">등록하기</button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useCourseApi } from "~/api/course";

// 2026.06.16[cgnoh]: api 관련
const { _courseList } = useCourseApi();

// 2026.06.16[cgnoh]: 검색 폼
const searchForm = reactive({
  searchtype: 1,
  searchname: "",
  pageno: 1,
  pagesize: 10,
});

// 2026.06.16[cgnoh]: 검색 핸들러
const handleSearch = async () => {
  currentPage.value = 1;
  await getCourseList();
};

// 2026.06.16[cgnoh]: 코스관리 리스트
const rowList = ref([]);

// 2026.06.16[cgnoh]: 코스 리스트 조회
const getCourseList = async () => {
  try {
    const res = await _courseList({
      searchtype: searchForm.searchtype,
      searchname: searchForm.searchname,
      pageno: currentPage.value,
      pagesize: pageSize.value,
    });

    if (res.code === 200) {
      rowList.value = res.courselist || [];
      totalCount.value = Number(res.totalCount || 0);
    }
  } catch (err) {
    console.error("코스 목록 조회 실패", err);
  }
};

// 2026.06.16[cgnoh]: 라우터 관련
const router = useRouter();

// 2026.06.16[cgnoh]: 등록하기 핸들링
const handleSave = () => {
  router.push(`/golfcourse/list/edit`)
}

// 2026.06.16[cgnoh]: 페이지 관련 변수
const currentPage = ref(1);
const pageNo = ref(1);
const pageSize = ref(10);
const totalCount = ref(0);
const totalPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(totalCount.value / pageSize.value)
);

// 2026.06.16[cgnoh]: 페이지 이동 함수
const changePage = async (page) => {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
  await getCourseList();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 2026.06.16[cgnoh]: 페이지 번호 계산
const visiblePages = computed(() => {
  const current = pageNo.value;
  const total = totalPage.value;

  let start = Math.max(1, current - 2);
  let end = Math.min(total, start + 4);

  if (end - start < 4) {
    start = Math.max(1, end - 4);
  }

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
});

// 2026.06.16[cgnoh]: 인터렉션 관련
const rowListRef = ref();
const rowListMove = ref(false);
useIntersectionObserver( 
    rowListRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
            rowListMove.value = true;
        }
    },
    {
        threshold: 0
    }
);

onMounted(() => {
  getCourseList();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '코스관리',
  meta: [
    { name: 'description', content: '코스관리 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>