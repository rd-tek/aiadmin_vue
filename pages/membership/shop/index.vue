<template>
    <div class="membership-member">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default">
                <select v-model="searchForm.status" @change="handleSearch">
                  <option value="">전체</option>
                  <option value="1">정상</option>
                  <option value="2">탈퇴</option>
                </select>
              </div>
              <div class="select-default"> 
                <select v-model="searchForm.ownertype" @change="handleSearch">
                  <option value="">전체</option>
                  <option value="1">프랜차이즈</option>
                  <option value="2">직영매장</option>
                </select>
              </div>
            </div>
            <div class="col d-flex">
                <div class="d-flex">
                    <select v-model="searchForm.searchtype">
                      <option value="1">매장</option>
                      <option value="2">아이디</option>
                      <option value="3">대표자</option>
                      <option value="4">연락처</option>
                    </select>
                    <input type="text" v-model="searchForm.searchname" placeholder="검색어를 입력해주세요." @input="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ totalCount }}</span></div>
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
        <div class="table-head">
          <div class="table-head-col col-1 align-left">No</div>
          <div class="table-head-col">아이디</div>
          <div class="table-head-col is-mob">매장</div>
          <div class="table-head-col is-mob">지역</div>
          <div class="table-head-col is-mob">대표자</div>
          <div class="table-head-col is-mob">장비수</div>
          <div class="table-head-col is-mob">연락처</div>
          <div class="table-head-col is-mob">등록일</div>
          <div class="table-head-col is-mob">상태</div>
        </div>
        <div class="table-body">
          <template v-if="tableList.length > 0">
            <div class="table-body-row" 
              v-for="(item, index) in tableList" 
              :key="index" 
              :class="{ 'is-move': tableMove }"
              ref="tableRef">
              <div class="table-body-flex">
                <div class="table-body-col col-1 align-left">{{ item.no }}</div>
                <div class="table-body-col" @click="handleMobList(index)">
                  <span class="text-overflow">{{ item.id }}</span>
                  <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                    <img
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
                    />
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  <nuxt-link :to="`/membership/shop/${item.ownerno}`" class="color-purple link text-underline">{{ item.shopname || '-' }}</nuxt-link>
                </div>
                <div class="table-body-col is-mob">{{ item.address4 || '-' }}</div>
                <div class="table-body-col is-mob">{{ item.name || '-' }}</div>
                <div class="table-body-col is-mob">
                  <button type="button" @click="modalOpen(item)" class="link text-underline">{{ item.roomcnt || '-' }}</button>
                </div>
                <div class="table-body-col is-mob">{{ item.phone || '-' }}</div>
                <div class="table-body-col is-mob">
                  <span class="color-grey">{{ item.regdate || '-' }}</span>
                </div>
                <div class="table-body-col is-mob">
                  <span v-if="item.status === '1'" class="color-green">정상</span>
                  <span v-else-if="item.status === '2'" class="color-red">정지</span>
                </div>
              </div>
              <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave">
                <div class="table-body-mob" v-if="mobListIndex === index">
                  <dl class="list">
                    <dt class="tit">지역</dt>
                    <dd class="cnt">{{ item.address4 || '-' }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">매장</dt>
                    <dd class="cnt">
                      <nuxt-link :to="`/membership/shop/${index}`" class="color-purple link text-underline">{{ item.shopname || '-' }}</nuxt-link>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">대표자</dt>
                    <dd class="cnt">{{ item.name || '-' }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">장비 수</dt>
                    <dd class="cnt">
                      <button type="button" @click="modalOpen(item)" class="text-underline">{{ item.roomcnt || '-' }}</button>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">연락처</dt>
                    <dd class="cnt">{{ item.phone || '-' }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">등록일</dt>
                    <dd class="cnt">
                      <span class="color-grey">{{ item.regdate || '-' }}</span>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">상태</dt>
                    <dd class="cnt">
                      <span v-if="item.status === '1'" class="color-green">정상</span>
                      <span v-else-if="item.status === '2'" class="color-red">정지</span>
                    </dd>
                  </dl>
                </div>
              </transition>
            </div>
          </template>
          <div class="table-body-row is-move" v-else>
            <div class="table-body-flex">
              <div class="no-data">데이터가 없습니다.</div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <ul class="pagination-container type02" v-if="totalPage > 0">
            <!-- 이전 -->
            <li>
              <button
                type="button"
                class="paginate-buttons"
                aria-label="이전"
                :disabled="searchForm.pageno === 1"
                @click="prevPage"
              >
                <img
                  src="/images/icon/icon_prev.png"
                  alt="icon_prev"
                />
              </button>
            </li>

            <!-- 첫 페이지 -->
            <li v-if="pageNumbers[0] > 1">
              <button
                type="button"
                class="paginate-buttons"
                @click="changePage(1)"
              >
                1
              </button>
            </li>

            <li v-if="pageNumbers[0] > 2">
              <button type="button" class="paginate-buttons" disabled>
                ...
              </button>
            </li>

            <!-- 페이지 목록 -->
            <li
              v-for="page in pageNumbers"
              :key="page"
            >
              <button
                type="button"
                class="paginate-buttons"
                :class="{ active: page === searchForm.pageno }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>

            <!-- 마지막 페이지 -->
            <li v-if="pageNumbers[pageNumbers.length - 1] < totalPage - 1">
              <button type="button" class="paginate-buttons" disabled>
                ...
              </button>
            </li>

            <li v-if="pageNumbers[pageNumbers.length - 1] < totalPage">
              <button
                type="button"
                class="paginate-buttons"
                @click="changePage(totalPage)"
              >
                {{ totalPage }}
              </button>
            </li>

            <!-- 다음 -->
            <li>
              <button
                type="button"
                class="paginate-buttons"
                aria-label="다음"
                :disabled="searchForm.pageno === totalPage"
                @click="nextPage"
              >
                <img
                  src="/images/icon/icon_next.png"
                  alt="icon_next"
                />
              </button>
            </li>
          </ul>
          <div class="btn-group">
            <button type="button" class="btn-primary-purple btn-md-fill" @click="handleWrite">등록하기</button>
          </div>
        </div>
      </div>

      <!-- 회원 정보 모달 -->
      <modal-member-info
        :isOpen="modals.modalMemberInfo"
        @update:isOpen="modals.modalMemberInfo = $event"/>

      <!-- 장비 정보 모달 -->
      <modal-machine-info
        :isOpen="modals.modalMachineInfo"
        :item="selectedItem"
        @update:isOpen="modals.modalMachineInfo = $event"/>

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useMembersApi } from "~/api/member";

// 2026.06.12[cgnoh]: api 관련
const membersApi = useMembersApi();

// 2026.06.12[cgnoh]: 테이블 리스트
const tableList = ref([]);

// 2026.06.12[cgnoh]: 총 갯수
const totalCount = ref(0);

// 2026.06.12[cgnoh]: 검색 폼
const searchForm = reactive({
  status: "", // 상태(정상/탈퇴)
  ownertype: "", // 유형(프랜차이즈/직영매장)
  searchtype: "1", // 검색유형(매장/아이디/대표자/연락처)
  searchname: "",
  pageno: 1, // 페이지 넘버
  pagesize: 10, // 페이지 단위
});

// 2026.06.12[cgnoh]: 매장 회원 리스트 조회
const getOwnerList = async () => {
  try {
    const res = await membersApi._ownerlist(searchForm);
    totalCount.value = res.ownerlistcnt || 0;
    tableList.value = res.ownerlist || [];
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.12[cgnoh]: 검색 핸들러
const handleSearch = async () => {
  searchForm.pageno = 1;
  await getOwnerList();
};

onMounted(async () => {
  await getOwnerList();
});

// 2026.05.22[cgnoh]: 등록하기 이벤트
const router = useRouter();
const handleWrite = () => {
  router.push(`/membership/shop/write`)
}

// 2026.05.22[cgnoh]: 인터렉션 관련
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.05.22[cgnoh]: 모달 관련 
const selectedItem = ref(null);
const modals = reactive({ modalMemberInfo: false });
const modalOpen = (item) => { 
  selectedItem.value = item;
  modals['modalMachineInfo'] = true;
  document.querySelector('body').classList.add('is-hidden');
}

/** 페이지네이션 **/
// 총 페이지
const totalPage = computed(() => {
  return Math.ceil(totalCount.value / searchForm.pagesize);
});

// 페이지 전환
const changePage = async (page) => {
  if (page < 1 || page > totalPage.value) return;

  searchForm.pageno = page;
  await getOwnerList();
};

// 이전 페이지
const prevPage = async () => {
  if (searchForm.pageno <= 1) return;

  searchForm.pageno--;
  await getOwnerList();
};

// 다음 페이지
const nextPage = async () => {
  if (searchForm.pageno >= totalPage.value) return;

  searchForm.pageno++;
  await getOwnerList();
};

// 페이지 넘버링
const pageNumbers = computed(() => {
  const maxVisible = 5;

  let start = Math.max(1, searchForm.pageno - 2);
  let end = Math.min(totalPage.value, start + maxVisible - 1);

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
/** EOD: 페이지네이션 **/

// 2026.05.22[cgnoh]: 아코디언 애니메이션
const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
  }
};

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

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '매장회원',
  meta: [
    { name: 'description', content: '매장회원 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>