<template>
    <div class="membership-member">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default"> 
                <select v-model="searchForm.status" @change="handleSearch">
                  <option value="0">전체</option>
                  <option value="1">정상</option>
                  <option value="2">탈퇴</option>
                </select>
              </div>
            </div>
            <div class="col d-flex flex-column">
                <div class="d-flex">
                    <select v-model="searchForm.searchtype">
                      <option value="P.player_id">아이디</option>
                      <option value="P.nickname">닉네임</option>
                      <option value="P.email">이메일</option>
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
          <div class="table-head-col is-mob">닉네임</div>
          <div class="table-head-col is-mob">이메일</div>
          <div class="table-head-col is-mob">인증</div>
          <div class="table-head-col is-mob">성별</div>
          <div class="table-head-col is-mob">단골매장</div>
          <div class="table-head-col is-mob">가입일</div>
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
              <div class="table-body-col col-1 align-left">
                <span>{{ item.playerinfo.no }}</span>
              </div>
              <div class="table-body-col" @click="handleMobList(index)">
                <nuxt-link :to="`/membership/member/${item.playerinfo.playerno}`" class="color-purple link text-underline">{{ item.playerinfo.id }}</nuxt-link>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                  <img
                    src="/public/images/icon/icon_arrow_down.png"
                    alt="icon_arrow_down"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <button type="button" @click="modalOpen(item)" class="link text-underline">{{ item.playerinfo.nickname || '-' }}</button>
              </div>
              <div class="table-body-col is-mob">
                <span class="no-wrap">{{ item.playerinfo.email || '-' }}</span>
              </div>
              <div class="table-body-col is-mob">
                <b v-if="item.playerinfo.auth === '1'">인증</b>
                <span v-else-if="item.playerinfo.auth === '2'" class="color-grey">미인증</span>
                <span v-else>-</span>
              </div>
              <div class="table-body-col is-mob">{{ item.playerinfo.gender || '-' }}</div>
              <div class="table-body-col is-mob">{{ item.playerinfo.shopname || '-' }}</div>
              <div class="table-body-col is-mob"><span class="color-grey">{{ item.playerinfo.regdate || '-' }}</span></div>
              <div class="table-body-col is-mob">
                <span v-if="item.playerinfo.status === '1'" class="color-green">정상</span>
                <span v-else-if="item.playerinfo.status === '2'" class="color-red">탈퇴</span>
                <span v-else>-</span>
              </div>
            </div>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
              <div class="table-body-mob" v-if="mobListIndex === index">
                <dl class="list">
                  <dt class="tit">닉네임</dt>
                  <dd class="cnt">
                    <a class="link text-underline" @click="modalOpen(item)">{{ item.playerinfo.nickname }}</a>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">이메일</dt>
                  <dd class="cnt">{{ item.playerinfo.email || '-' }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">인증</dt>
                  <dd class="cnt">
                    <b v-if="item.playerinfo.auth === '1'">인증</b>
                    <span v-else-if="item.playerinfo.auth === '2'" class="color-grey">미인증</span>
                    <span v-else>-</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">성별</dt>
                  <dd class="cnt">{{ item.playerinfo.gender || '-' }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">단골매장</dt>
                  <dd class="cnt">{{ item.playerinfo.shopname || '-' }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">가입일</dt>
                  <dd class="cnt">
                    <span class="color-grey">{{ item.playerinfo.regdate || '-' }}</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">상태</dt>
                  <dd class="cnt">
                    <span v-if="item.playerinfo.status === '1'" class="color-green">정상</span>
                    <span v-else-if="item.playerinfo.status === '2'" class="color-red">탈퇴</span>
                    <span v-else>-</span>
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
      </div>

      <!-- 회원 정보 모달 -->
      <modal-member-info
        :isOpen="modals.modalMemberInfo"
        :item="selectedItem"
        @update:isOpen="modals.modalMemberInfo = $event"/>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useMembersApi } from "~/api/member";
import { useDebounceFn } from "@vueuse/core";

// 2026.06.11[cgnoh]: api 관련
const membersApi = useMembersApi();

// 2026.06.11[cgnoh]: 테이블 리스트
const tableList = ref([]);

// 2026.06.11[cgnoh]: 총 갯수
const totalCount = ref(0);

// 2026.06.11[cgnoh]: 검색 폼
const searchForm = reactive({
  status: 0, // 상태
  searchtype: "P.player_id", // 전체
  id: '', // 아이디
  nickname: '', // 닉네임
  email: '', // 이메일
  searchname: "", // 검색어
  pageno: 1, // 페이지 넘버
  pagesize: 10, // 페이지 노출수
});

// 2026.06.11[cgnoh]: 일반회원 리스트 조회
const _playerList = async () => {
  try {
    const res = await membersApi._playerlist(searchForm);
    totalCount.value = res.playerlistcnt || 0;
    tableList.value = res.playerlist || [];
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.11[cgnoh]: 동적 검색 핸들러
const fetchList = async () => {
  try {
    const res = await membersApi._playerlist(searchForm);

    totalCount.value = res.playerlistcnt || 0;
    tableList.value = res.playerlist || [];
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.11[cgnoh]: 검색 핸들러
const handleSearch = useDebounceFn(async () => {
  searchForm.pageno = 1;
  await fetchList();
}, 0);

// 2026.05.22[cgnoh]: 인터렉션 관련
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.05.22[cgnoh]: 모달 관련
const selectedItem = ref(null); 
const modals = reactive({ modalMemberInfo: false });
const modalOpen = async (item) => {
  selectedItem.value = item;
  modals['modalMemberInfo'] = true;
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
  await _playerList();
};

// 이전 페이지
const prevPage = async () => {
  if (searchForm.pageno <= 1) return;

  searchForm.pageno--;
  await _playerList();
};

// 다음 페이지
const nextPage = async () => {
  if (searchForm.pageno >= totalPage.value) return;

  searchForm.pageno++;
  await _playerList();
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

onMounted(async () => {
  await _playerList();
});


// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>