<template>
    <div class="membership-member">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default"> 
                <select v-model="searchForm.status">
                  <option value="">전체</option>
                  <option value="1">정상</option>
                  <option value="2">탈퇴</option>
                </select>
              </div>
            </div>
            <div class="col d-flex flex-column">
                <div class="d-flex">
                    <select v-model="searchForm.searchtype">
                      <option value="">전체</option>
                      <option value="id">아이디</option>
                      <option value="nickname">닉네임</option>
                      <option value="email">이메일</option>
                    </select>
                    <input type="text" v-model="searchForm.searchname" placeholder="닉네임" @keyup.enter="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ totalCount  }}</span></div>
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
                    <a class="link text-underline" @click="modalOpen">{{ item.playerinfo.nickname }}</a>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">이메일</dt>
                  <dd class="cnt">{{ item.playerinfo.email }}</dd>
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
    </div>

    <!-- 회원 정보 모달 -->
    <modal-member-info
      :isOpen="modals.modalMemberInfo"
      :item="selectedItem"
      @update:isOpen="modals.modalMemberInfo = $event"/>

</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useMembersApi } from "~/api/member";

const membersApi = useMembersApi();
const tableList = ref([]);
const totalCount = ref(0);
const searchForm = reactive({
  status: "",
  searchtype: "id",
  searchname: "",
  pageno: 1,
  pagesize: 10,
});

const _playerList = async () => {
  try {
    const res = await membersApi._playerlist(searchForm);

    console.log("playerlist response", res);

    totalCount.value = res.playerlistcnt || 0;
    tableList.value = res.playerlist || [];
  } catch (err) {
    console.error(err);
  }
};

const handleSearch = async () => {
  searchForm.pageno = 1;
  await _playerList();
};

onMounted(async () => {
  await _playerList();
});

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
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>