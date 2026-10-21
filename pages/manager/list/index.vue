<template>
    <div class="manager-list">
      <div class="top-area">
        <div class="total">전체 <span class="num">{{ totalCount.toLocaleString() }}</span></div>
        <div class="select-default"> 
            <select aria-label="목록 표시 개수 선택" v-model="pageSize" @change="changePageSize">
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
                    src="/images/icon/icon_arrow_down.png"
                    alt="펼치기"
                  />
                </button>
              </div>
              <div class="table-body-col is-mob">
                <nuxt-link :to="`/manager/list/${item.no}`" class="color-purple link text-underline">{{ item.id }}</nuxt-link>
              </div>
              <div class="table-body-col is-mob">{{ partLabel(item.part) }}</div>
              <div class="table-body-col is-mob">{{ positionLabel(item.position) }}</div>
              <div class="table-body-col is-mob"><span class="u-tel">{{ item.phone }}</span></div>
              <div class="table-body-col is-mob">{{ item.email }}</div>
              <div class="table-body-col is-mob">
                <span class="color-grey">{{ item.regdate }}</span>
              </div>
              <div class="table-body-col is-mob">
                <span :class="{ 'color-green': String(item.status) === '1', 'color-grey': String(item.status) === '0' }">{{ String(item.status) === '1' ? '사용' : String(item.status) === '0' ? '대기' : '-' }}</span>
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
                  <dd class="cnt">{{ partLabel(item.part) }}</dd>
                </dl>
                <dl class="list"> 
                  <dt class="tit">직급</dt>
                  <dd class="cnt">{{ positionLabel(item.position) }}</dd>
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
                    <span class="color-grey">{{ item.regdate }}</span>
                  </dd>
                </dl>
                <dl class="list">
                  <dt class="tit">상태</dt>
                  <dd class="cnt">
                    <span :class="{ 'color-green': String(item.status) === '1', 'color-grey': String(item.status) === '0' }">{{ String(item.status) === '1' ? '사용' : String(item.status) === '0' ? '대기' : '-' }}</span>
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
                  alt="이전"
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
                  alt="다음"
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

// 2026-09-14: 부서/직급 코드→라벨 매핑 (등록/수정 폼 select 옵션과 동일 정본)
// 2026-10-20: admin_member.apart 정의(1 관리부·2 기술연구소·3 고객지원팀·4 제조부·5 해외영업부)
const partLabel = (v) => ({ "1": "관리부", "2": "기술연구소", "3": "고객지원팀", "4": "제조부", "5": "해외영업부" }[String(v)] ?? "-");
const positionLabel = (v) =>
  ({ "1": "사원", "2": "대리", "3": "과장", "4": "팀장", "5": "차장", "6": "부장", "7": "이사" }[String(v)] ?? "-"); // 2026-10-20: admin_member.alevel 정의

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

// 2026-10-12(회귀 점검): 목록 표시 개수 셀렉트가 정의되지 않은 changePageSize 를 호출해 개수를 바꿔도 목록이 그대로이던 문제(원래부터)
const changePageSize = async () => {
  pageNo.value = 1;
  await getAdminList();
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
  router.push(`/manager/list/write`) 
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
  title: '관리자',
  meta: [
    { name: 'description', content: '관리자 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';

/* 2026-09-14: 컬럼 폭을 실측 자연폭(px)에 비례 재분배해 개행 최소화 (데스크톱 한정).
   컬럼: No/이름/ID/부서/직급/연락처/이메일/등록일/상태 */
@media (min-width: 769px) {
  .table-head-col, .table-body-flex > .table-body-col { min-width: 0; }
  .table-head-col:nth-child(1), .table-body-flex > .table-body-col:nth-child(1) { flex: 37 1 0; }
  .table-head-col:nth-child(2), .table-body-flex > .table-body-col:nth-child(2) { flex: 105 1 0; }
  .table-head-col:nth-child(3), .table-body-flex > .table-body-col:nth-child(3) { flex: 97 1 0; }
  .table-head-col:nth-child(4), .table-body-flex > .table-body-col:nth-child(4) { flex: 65 1 0; }
  .table-head-col:nth-child(5), .table-body-flex > .table-body-col:nth-child(5) { flex: 53 1 0; }
  .table-head-col:nth-child(6), .table-body-flex > .table-body-col:nth-child(6) { flex: 132 1 0; min-width: 7.4em; } /* 2026-10-08: 연락처 한 줄 */
  .table-head-col:nth-child(7), .table-body-flex > .table-body-col:nth-child(7) { flex: 142 1 0; }
  .table-head-col:nth-child(8), .table-body-flex > .table-body-col:nth-child(8) { flex: 150 1 0; } /* 2026-10-08: 등록일 170→150, 연락처에 폭 양보 */
  .table-head-col:nth-child(9), .table-body-flex > .table-body-col:nth-child(9) { flex: 56 1 0; }
}
</style>