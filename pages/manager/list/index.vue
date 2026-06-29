<template>
    <div class="manager-list">
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ tableList.length }}</span></div>
        <div class="select-default"> 
            <select v-model="pageSize" @change="changePageSize">
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
          <div class="table-head-col">No</div>
          <div class="table-head-col">이름</div>
          <div class="table-head-col is-mob">ID</div>
          <div class="table-head-col is-mob">부서</div>
          <div class="table-head-col is-mob">직급</div>
          <div class="table-head-col is-mob">연락처</div>
          <div class="table-head-col is-mob">이메일</div>
          <div class="table-head-col is-mob">등록일</div>
          <div class="table-head-col is-mob">상태</div>
        </div>
        <div class="table-body">
          <div class="table-body-row" v-for="(item, index) in tableList" :key="index" :class="{ 'is-move': tableMove }" ref="tableRef">
            <div class="table-body-flex" :class="{ 'is-active': mobListIndex === index }">
              <div class="table-body-col">{{ index + 1 }}</div>
              <div class="table-body-col" @click="handleMobList(index)">
                <span>{{ item.name }}</span>
                <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                  <img
                    src="/public/images/icon/icon_arrow_down.png"
                    alt="icon_arrow_down"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <nuxt-link :to="`/manager/list/${item.no}`" class="color-purple link text-underline">{{ item.id }}</nuxt-link>
              </div>
              <div class="table-body-col is-mob">{{ item.part }}</div>
              <div class="table-body-col is-mob">{{ item.position }}</div>
              <div class="table-body-col is-mob">{{ item.phone }}</div>
              <div class="table-body-col is-mob">{{ item.email }}</div>
              <div class="table-body-col is-mob">
                <span class="color-grey">{{ item.regdate }}</span>
              </div>
              <div class="table-body-col is-mob">
                <span :class="{ 'color-green': item.status === '1', 'color-grey': item.status === '2', 'color-red': item.status === '3' }">{{item.status === '1' ? '정상' : item.status === '2' ? '대기' : '중지' }}</span>
              </div>
            </div>
            <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
              <div class="table-body-mob" v-if="mobListIndex === index">
                <dl class="list">
                  <dt class="tit">아이디</dt>
                  <dd class="cnt">
                    <nuxt-link :to="`/manager/list/${item.no}`" class="link">{{ item.id }}</nuxt-link>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">부서</dt>
                  <dd class="cnt">{{ item.part }}</dd>
                </dl>
                <dl class="list"> 
                  <dt class="tit">직급</dt>
                  <dd class="cnt">{{ item.position }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">연락처</dt>
                  <dd class="cnt">{{ item.phone }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">이메일</dt>
                  <dd class="cnt">{{ item.email }}</dd>
                </dl>
                <dl class="list">
                  <dt class="tit">등록일</dt>
                  <dd class="cnt">
                    <span class="color-grey">{{ item.join }}</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">상태</dt>
                  <dd class="cnt">
                    <span :class="{ 'color-green': item.status === '1' }">{{ item.status === '1' ? '정상' : '비정상' }}</span>
                  </dd>
                </dl>
              </div>
            </transition>
          </div>
        </div>
        <div class="btn-wrap">
          <ul
            class="pagination-container type02"
            v-if="totalPage > 0"
          >
            <!-- 이전 -->
            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="pageNo === 1"
                @click="changePage(pageNo - 1)"
              >
                <img
                  src="/images/icon/icon_prev.png"
                  alt="icon_prev"
                />
              </button>
            </li>

            <!-- 페이지 번호 -->
            <li
              v-for="page in visiblePages"
              :key="page"
            >
              <button
                type="button"
                class="paginate-buttons"
                :class="{ active: pageNo === page }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>

            <!-- 다음 -->
            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="pageNo === totalPage"
                @click="changePage(pageNo + 1)"
              >
                <img
                  src="/images/icon/icon_next.png"
                  alt="icon_next"
                />
              </button>
            </li>
          </ul>
          <div class="btn-group">
            <button type="button" class="btn-primary-purple btn-md-fill" @click="handleRegister">등록하기</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useManagerApi } from "@/api/manager";

// 2026.06.17[cgnoh]: api 관련
const { _adminList } = useManagerApi();

// 2026.06.17[cgnoh]: 라우터 관련
const router = useRouter();

// 2026.06.17[cgnoh]: 관리자 리스트
const tableList = ref([]);

// 2026.06.17[cgnoh]: 페이지 관련
const totalCount = ref(0);
const pageNo = ref(1);
const pageSize = ref(10);

// 2026.06.17[cgnoh]: 관리자 리스트 조회
const getAdminList = async () => {
  try {
    const res = await _adminList({
      pageno: pageNo.value,
      pagesize: pageSize.value,
    });

    if (res.code === 200) {
      tableList.value = res.managerlist ?? [];
      totalCount.value = Number(res.managerlistcnt ?? 0);
    }
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.17[cgnoh]: 총 페이지 수
const totalPage = computed(() =>
  Math.ceil(totalCount.value / pageSize.value)
);

// 2026.06.17[cgnoh]: 페이지 노출 메서드
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

// 2026.06.17[cgnoh]: 페이지네이션 핸들링
const changePage = async (page) => {
  if (page < 1 || page > totalPage.value) return;

  pageNo.value = page;
  await getAdminList();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 2026.06.17[cgnoh]: 등록하기 이동
const handleRegister = () => {
  router.push(`/manager/write`)
}

// 2026.06.17[cgnoh]: 아코디언 관련
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

// 2026.06.17[cgnoh]: 인터렉션 관련
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

onMounted(() => {
  getAdminList();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '관리자 리스트',
  meta: [
    { name: 'description', content: '관리자 리스트 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';
</style>