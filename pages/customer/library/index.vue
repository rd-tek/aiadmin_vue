<template>
    <div class="customer-member">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                    <select v-model="searchForm.searchtype">
                      <option value="1">제목</option>
                      <option value="2">내용</option>
                    </select>
                    <input type="text" v-model="searchForm.searchname" placeholder="검색어" @input="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ tableList.length }}</span></div>
        <div class="select-default"> 
            <select v-model.number="searchForm.pagesize" @change="handleSearch">
                <option value="10">10개씩 보기</option>
                <option value="20">20개씩 보기</option>
                <option value="30">30개씩 보기</option>
                <option value="40">40개씩 보기</option>
                <option value="50">50개씩 보기</option>
                <option value="60">60개씩 보기</option>
                <option value="70">70개씩 보기</option>
                <option value="80">80개씩 보기</option>
                <option value="90">90개씩 보기</option>
                <option value="100">100개씩 보기</option>
            </select>
        </div>
      </div>
      <div class="table type03 mob-type02">
        <div class="table-head is-mob">
          <div class="table-head-col col-1">No</div>
          <div class="table-head-col col-1">구분</div>
          <div class="table-head-col">제목</div>
          <div class="table-head-col col-1">등록일</div>
          <div class="table-head-col col-1">조회수</div>
          <div class="table-head-col col-1">상태</div>
          <div class="table-head-col col-1">비고</div>
        </div>
        <div class="table-body">
          <template v-if="tableList.length > 0">
            <div class="table-body-row" v-for="(item, index) in tableList" :key="index" :class="{ 'is-move': tableMove }" ref="tableRef">
              <div class="table-body-flex flex-column">
                <div class="table-body-col col-1 is-mob">
                  <span class="color-grey">{{ item.no }}</span>
                </div>
                <div class="table-body-col col-1">
                  <span class="label" :class="{ 'color-purple': item.type === '1', 'color-blue': item.type === '2' }">{{ item.type === '1' ? '공지' : '뉴스' }}</span>
                </div>
                <div class="table-body-col align-left">
                  <nuxt-link :to="`/customer/library/${item.resourcesno}`" class="link" :class="{ 'line-through': item.note === '삭제' }">{{ item.title }}</nuxt-link>
                </div>
                <div class="table-body-col col-1 is-mob">
                  <span class="color-grey">{{ item.date }}</span>
                </div>
                <div class="table-body-col col-1 is-mob">
                  <span class="color-grey">{{ item.cnt }}</span>
                </div>
                <div class="table-body-col col-1 is-mob">
                  <span :class="{ 'color-green': item.status === '1', 'color-grey': item.status === '0' }">{{ item.status === '1' ? '게시' : '대기' }}</span>
                </div>
                <div class="table-body-col col-1 is-mob">
                  <span :class="{ 'color-green': item.deleteflag === '0', 'color-red': item.deleteflag === '1' }">{{ item.deleteflag === '1' ? '삭제' : '정상' }}</span>
                </div>
              </div>
              <div class="table-body-mob">
                <div class="row">
                  <div class="row-list">
                    <span class="date">{{ item.date }}</span>
                    <span class="status">{{ item.cnt }}</span>
                    <span class="status"><span class="note">{{ item.type === '1' ? '게시' : '대기' }}</span></span>
                    <span class="note">{{ item.deleteflag === '1' ? '삭제' : '정상' }}</span>
                  </div>
                </div> 
              </div>
            </div>
          </template>
          <div class="table-body-row is-move" v-else>
            <div class="no-data">데이터가 없습니다.</div>
          </div>
        </div>
        <div class="btn-wrap">
          <ul class="pagination-container type02">
            <li>
              <button
                type="button"
                class="paginate-buttons"
                aria-label="이전"
                :disabled="searchForm.pageno <= 1"
                @click="handlePageChange(searchForm.pageno - 1)"
              >
                <img src="/images/icon/icon_prev.png" alt="icon_prev"/>
              </button>
            </li>
            <li v-for="page in paginationPages" :key="page">
              <button
                v-if="page !== '...'"
                type="button"
                class="paginate-buttons"
                :class="{ active: searchForm.pageno === page }"
                @click="handlePageChange(page)"
              >
                {{ page }}
              </button>
              <button v-else type="button" class="paginate-buttons" aria-label="더보기">
                <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
              </button>
            </li>
            <li>
              <button
                type="button"
                class="paginate-buttons"
                aria-label="다음"
                :disabled="searchForm.pageno >= totalPages"
                @click="handlePageChange(searchForm.pageno + 1)"
              >
                <img src="/images/icon/icon_next.png" alt="icon_next"/>
              </button>
            </li>
          </ul>
          <div class="btn-group">
            <button type="button" class="btn-md-fill btn-primary-purple" @click="handleWrite">등록하기</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useCustomerApi } from "~/api/support";

// 2026.06.08[cgnoh]: 라우터 관련
const router = useRouter();

// 2026.06.08[cgnoh]: API 관련
const customerApi = useCustomerApi();

// 2026.06.08[cgnoh]: 공지사항/뉴스 리스트 관련 상태
const tableList = ref([]);

// 2026.06.08[cgnoh]: 페이지네이션 관련 상태
const totalCount = ref(0);

// 2026.06.08[cgnoh]: 검색 폼 상태
const searchForm = reactive({
  searchtype: "1", // 검색유형
  searchname: "", // 검색어
  pageno: 1,
  pagesize: 10,
});

// 2026.06.08[cgnoh]: 공지사항/뉴스 리스트 조회
const getNoticelist = async () => {
  try {
    const res = await customerApi._resourceslist(searchForm);
    console.log("resourceslist response", res);
    totalCount.value = res.resourceslistcnt || 0;
    tableList.value = res.resourceslist || [];
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.08[cgnoh]: 검색 처리 (한글 미완성 방지)
const handleSearch = async () => {
  searchForm.pageno = 1;
  await getNoticelist();
};

// 2026.06.08[cgnoh]: 페이지 변경
const handlePageChange = async (page) => {
  if (page < 1 || page > totalPages.value) return;
  searchForm.pageno = page;
  await getNoticelist();
};

// 2026.06.08[cgnoh]: 총 페이지 수
const totalPages = computed(() =>
  Math.ceil(totalCount.value / searchForm.pagesize) || 1
);

// 2026.06.08[cgnoh]: 페이지네이션 번호 목록 (최대 5개 + ... 처리)
const paginationPages = computed(() => {
  const total = totalPages.value;
  const current = searchForm.pageno;
  const pages = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  return pages;
});

onMounted(async () => {
  await getNoticelist();
});

// 2026.06.08[cgnoh]: 테이블 참조 및 Intersection Observer 설정
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

const handleWrite = () => {
  router.push(`/customer/library/write`)
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>