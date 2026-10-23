<template>
  <!-- 2026-10-22: 대회 코스 선택(aishop modal-course-select 를 aiadmin 에 맞춤 + 코스 이름 검색) -->
  <div class="modal modal-course-select" :class="{ 'is-active': isOpen }" @click.self="modalClose">
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">코스 선택</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="" />
        </button>
      </div>
      <div class="modal-body">
        <div class="course-tools">
          <input type="text" v-model="keyword" placeholder="코스 이름 검색" aria-label="코스 이름 검색" />
          <div class="sort" role="radiogroup" aria-label="정렬">
            <button type="button" :class="{ on: sort === 'recent' }" :aria-pressed="sort === 'recent'" @click="sort = 'recent'">등록일순</button>
            <button type="button" :class="{ on: sort === 'name' }" :aria-pressed="sort === 'name'" @click="sort = 'name'">이름순</button>
          </div>
        </div>
        <ul class="course-list" v-if="visible.length">
          <li v-for="c in visible" :key="c.maincourseno">
            <label :class="{ on: Number(checked) === Number(c.maincourseno) }">
              <input type="radio" name="course_radio" :value="Number(c.maincourseno)" v-model="checked" />
              <span>{{ c.coursename }}</span>
            </label>
          </li>
        </ul>
        <p class="no-info" v-else>{{ loading ? '불러오는 중...' : '검색 결과가 없습니다.' }}</p>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-md-line" @click="modalClose">닫기</button>
          <button type="button" class="btn-primary-purple btn-md-fill" :disabled="!checked" @click="apply">적용하기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTournamentApi } from "~/api/tournament";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  tournamentno: { type: [Number, String], default: 0 },
  selected: { type: [Number, String], default: 0 },
});
const emit = defineEmits(["update:isOpen", "apply"]);
const api = useTournamentApi();

const courses = ref([]);
const loading = ref(false);
const checked = ref(Number(props.selected) || 0);
const keyword = ref("");
const sort = ref("recent");

const visible = computed(() => {
  const k = keyword.value.trim().toLowerCase();
  let list = courses.value.filter((c) => !k || String(c.coursename).toLowerCase().includes(k));
  if (sort.value === "name") list = [...list].sort((a, b) => String(a.coursename).localeCompare(String(b.coursename), "ko"));
  return list;
});

const load = async () => {
  loading.value = true;
  try {
    const res = await api.courseList(props.tournamentno || 0);
    courses.value = res?.courselist || [];
    const pre = courses.value.find((c) => Number(c.flag) === 1);
    if (!checked.value && pre) checked.value = Number(pre.maincourseno);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

watch(() => props.isOpen, (open) => {
  if (!open) return;
  checked.value = Number(props.selected) || checked.value;
  keyword.value = "";
  if (!courses.value.length) load();
});

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body")?.classList.remove("is-hidden");
};
const apply = () => {
  const c = courses.value.find((x) => Number(x.maincourseno) === Number(checked.value));
  if (!c) return;
  emit("apply", { maincourseno: Number(c.maincourseno), coursename: c.coursename });
  modalClose();
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";

.course-tools {
  display: flex; gap: 8px; align-items: center; margin-bottom: 12px;
  input { flex: 1; min-width: 0; height: 40px; padding: 0 12px; border: 1px solid #E5E7E8; border-radius: 8px; }
  .sort { display: flex; gap: 4px; button { height: 36px; padding: 0 12px; border: 1px solid #E5E7E8; border-radius: 999px; background: #fff; font-size: 13px; cursor: pointer; &.on { border-color: #4318FF; color: #4318FF; background: #F4F1FF; font-weight: 600; } } }
}
.course-list {
  list-style: none; margin: 0; padding: 0;
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px;
  max-height: 52vh; overflow-y: auto;
  grid-auto-rows: max-content; align-content: start; /* 행이 70px 로 늘어나던 문제 */
  li { height: auto; min-height: 0; }
  label {
    display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1px solid #E5E7E8; border-radius: 8px; cursor: pointer; font-size: 14px;
    min-height: 0; height: auto; line-height: 1.4; margin: 0; /* 공통 modal 의 label 높이 규칙 덮어씀(칸이 70px 로 커지던 문제) */
    &.on { border-color: #4318FF; background: #F4F1FF; }
    input { accent-color: #4318FF; width: 16px; height: 16px; min-height: 0; margin: 0; padding: 0; flex: none; } /* 공통 input 높이(50px)가 라디오에 적용돼 칸이 커지던 문제 */
    span { word-break: keep-all; overflow-wrap: anywhere; }
  }
}
.no-info { padding: 32px 0; text-align: center; color: #6e6e6e; }
@media (max-width: 768px) {
  .course-tools { flex-wrap: wrap; input { flex-basis: 100%; } }
  .course-list { grid-template-columns: minmax(0, 1fr); max-height: 44vh; } /* 팝업 본문 스크롤과 겹치지 않게 */
}
</style>
