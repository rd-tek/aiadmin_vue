<template>
    <div class="membership-member">
      <div class="filter-box">
        <div class="col-2">
            <div class="col d-flex">
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
              <div class="select-default"> 
                <select>
                  <option>전체</option>
                </select>
              </div>
            </div>
            <div class="col d-flex">
                <div class="d-flex">
                    <select>
                        <option>이름</option>
                    </select>
                    <input type="text" placeholder="닉네임" @keyup.enter="handleSearch">
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ tableList.length }}</span></div>
        <div class="select-default"> 
            <select>
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
          <div class="table-body-row" 
            v-for="(item, index) in tableList" 
            :key="index" 
            :class="{ 'is-move': tableMove }" 
            ref="tableRef">
            <div class="table-body-flex">
              <div class="table-body-col col-1 align-left">{{ item.no }}</div>
              <div class="table-body-col" @click="handleMobList(index)">
                <span>{{ item.id }}</span>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                  <img
                    src="/public/images/icon/icon_arrow_down.png"
                    alt="icon_arrow_down"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <nuxt-link :to="`/publish/membership/shop/${index}`" class="color-purple link text-underline">{{ item.shopname }}</nuxt-link>
              </div>
              <div class="table-body-col is-mob">{{ item.address4 }}</div>
              <div class="table-body-col is-mob">{{ item.name }}</div>
              <div class="table-body-col is-mob">
                <button type="button" @click="modalOpen" class="link text-underline">{{ item.roomcnt }}</button>
              </div>
              <div class="table-body-col is-mob">{{ item.phone }}</div>
              <div class="table-body-col is-mob">
                <span class="color-grey">{{ item.regdate }}</span>
              </div>
              <div class="table-body-col is-mob">
                <span v-if="item.status === '1'" class="color-green">정상</span>
                <span v-else-if="item.status === '2'" class="color-red">탈퇴</span>
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
                  <dd class="cnt">{{ item.region }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">매장</dt>
                  <dd class="cnt">
                    <nuxt-link :to="`/publish/membership/shop/${index}`" class="link text-underline">{{ item.shop }}</nuxt-link>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">대표자</dt>
                  <dd class="cnt">{{ item.name }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">장비 수</dt>
                  <dd class="cnt">
                    <button type="button" @click="modalOpen" class="color-purple">{{ item.count }}</button>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">연락처</dt>
                  <dd class="cnt">{{ item.number }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">등록일</dt>
                  <dd class="cnt">
                    <span class="color-grey">{{ item.date }}</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">상태</dt>
                  <dd class="cnt">
                    <span v-if="item.status === '정상'" class="color-green">{{ item.status }}</span>
                    <span v-else-if="item.status === '탈퇴'" class="color-red">{{ item.status }}</span>
                  </dd>
                </dl>
              </div>
            </transition>
          </div>
        </div>
        <div class="btn-wrap">
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
          <div class="btn-group">
            <button type="button" class="btn-primary-purple btn-md-fill" @click="handleWrite">등록하기</button>
          </div>
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
      @update:isOpen="modals.modalMachineInfo = $event"/>

</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useMembersApi } from "~/api/member";

const membersApi = useMembersApi();
const tableList = ref([]);
const totalCount = ref(0);
const searchForm = reactive({
  ownertype: "",
  status: "",
  searchtype: "shopname",
  searchname: "",
  pageno: 1,
  pagesize: 10,
});

const getOwnerList = async () => {
  try {
    const res = await membersApi._ownerlist(searchForm);

    console.log("ownerlist response", res);

    totalCount.value = res.ownerlistcnt || 0;
    tableList.value = res.ownerlist || [];
  } catch (err) {
    console.error(err);
  }
};

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
  router.push(`/publish/membership/shop/write`)
}

// 2026.05.22[cgnoh]: 인터렉션 관련
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.05.22[cgnoh]: 모달 관련 
const modals = reactive({ modalMemberInfo: false });
const modalOpen = () => { 
    modals['modalMachineInfo'] = true;
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