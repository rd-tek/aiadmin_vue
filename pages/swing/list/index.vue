<template>
    <div class="swing-list">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <ClientOnly>
                    <VueDatePicker
                      v-model="startDate"
                      :format="formatDate"
                      date-picker
                      auto-apply
                    />
                  </ClientOnly>
                  <span class="wave">~</span>
                  <ClientOnly>
                    <VueDatePicker
                      v-model="endDate"
                      :format="formatDate"
                      date-picker
                      auto-apply
                    />
                  </ClientOnly>
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="row">
        <template v-if="rowList.length > 0">
          <div class="row-list" :class="{ 'is-move': rowListMove }" v-for="(item, index) in rowList" :key="index" ref="rowListRef">
            <div class="row-list-item col-1 is-mob">
              <span class="color-grey">{{ index + 1 }}</span>
            </div>
            <div class="row-list-item">
              <div class="cont-wrap">
                <div class="img-area">
                  <div class="image" :style="{ backgroundImage: `url(${item.fit_preview_path})` }"></div>
                </div>
                <nuxt-link :to="`/swing/list/${item.swing_pk}`" class="info-area">
                  <div class="label" :class="{ 'color-green': item.view_flag === '1' }">{{ item.view_flag === '1' ? '공개' : '비공개' }}</div>
                  <button type="button" class="title">{{ item.title || '-' }}</button>
                  <div class="desc">
                    <span class="desc-list">
                      <span class="name">{{ item.nickname || '-' }}</span>
                    </span>
                    <span class="desc-list">
                      <span class="date">{{ item.regdate || '-' }}</span>
                    </span>
                    <span class="desc-list">
                      <span class="location">{{ item.shopname || '-' }}</span>
                    </span>
                  </div>
                </nuxt-link>
                <div class="btn-area">
                  <button type="button" class="btn-md-line btn-primary-purple" @click="modalOpen(item)">수정</button>
                  <button type="button" class="btn-md-line btn-delete" @click="handleDelete(item)">삭제</button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="row-list is-move" v-else>
          <div class="row-list-item">
            <div class="no-data">데이터가 없습니다.</div>
          </div>
        </div>
        <ul
          class="pagination-container type02"
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
                alt="prev"
              />
            </button>
          </li>

          <!-- 번호 -->
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
                alt="next"
              />
            </button>
          </li>
        </ul>
      </div>
      
      <!-- 회원 정보 모달 -->
      <modal-swing-info
        :isOpen="modals.modalSwingInfo"
        :item="selectedItem"
        @saved="getSwingList"
        @update:isOpen="modals.modalSwingInfo = $event" />

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useSwingApi } from "~/api/swing";

// 2026.06.16[cgnoh]: api 관련
const { _swingList } = useSwingApi();

// 2026.06.16[cgnoh]: 스윙영상 리스트
const rowList = ref([]);

// 2026.06.16[cgnoh]: 페이지 관련
const pageNo = ref(1);
const pageSize = 10;
const totalCount = ref(0);
const totalPage = ref(1);

// 2026.06.16[cgnoh]: 페이지 변경 메서드
const changePage = (page) => {
  if (page < 1 || page > totalPage.value) return;

  pageNo.value = page;
  getSwingList();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// 2026.06.16[cgnoh]: 페이지네이션 핸들링
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


// 2026.06.16[cgnoh]: 검색 폼
const searchForm = reactive({
  startdate: '',
  enddate: '',
});

// 2026.06.16[cgnoh]: 모달관련
const selectedItem = ref();
const modals = reactive({ modalMemberInfo: false });
const modalOpen = (item) => {
  selectedItem.value = item;
  modals.modalSwingInfo = true;
  document.querySelector('body')?.classList.add('is-hidden');
};

// 2026.06.16[cgnoh]: 삭제 핸들링
const handleDelete = async (item) => {
  const isConfirm = confirm(
    `[${item.title}] 영상을 삭제하시겠습니까?`
  );

  if (!isConfirm) return;

  try {
    const res = await _swingDelete(item.swing_pk);

    if (res.code === 200) {
      alert("삭제되었습니다.");

      await getSwingList();
    } else {
      alert(res.message || "삭제에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    alert("삭제 중 오류가 발생했습니다.");
  }
};

// 2026.06.16[cgnoh]: 날짜 관련
const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 14);
const endDate = ref(new Date());
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

// 2026.06.16[cgnoh]: 날짜 포맷
const formatApiDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 2026.06.16[cgnoh]: 리스트 조회
const getSwingList = async () => {
  try {
    const res = await _swingList({
      pageno: pageNo.value,
      pagesize: pageSize,
    });

    if (res.code === 200) {
      totalCount.value = Number(res.swinglistcnt || 0);
      totalPage.value = Math.ceil(totalCount.value / pageSize);

      rowList.value = res.swinglist || [];
    }
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.16[cgnoh]: 검색 핸들링
const handleSearch = () => {
  pageNo.value = 1;
  getSwingList();
};

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

watch(
  [startDate, endDate],
  ([newStart, newEnd]) => {
    if (!newStart || !newEnd) return;

    pageNo.value = 1;
    getSwingList();
  }
);

onMounted(() => {
  const today = new Date();

  const beforeMonth = new Date();
  beforeMonth.setMonth(beforeMonth.getMonth() - 1);

  searchForm.startdate = formatApiDate(beforeMonth);
  searchForm.enddate = formatApiDate(today);

  getSwingList();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>