<!-- 2026-11-12(aisports2 11-11): 추천 운동 관리(관리자, aisports1 은 골프만) — 목록·검색, 등록·수정(대표 이미지 S3), 공개/비공개. 삭제 대신 비공개(리포트에 이미 연결된 운동 보존). 골프·양궁 페이지가 sport 만 바꿔 씀 -->
<template>
  <div class="customer-member ex-admin">
    <div class="filter-box">
      <div class="col-2 flex-end">
        <div class="col d-flex">
          <div class="d-flex">
            <select aria-label="공개 여부 선택" v-model="status" @change="search">
              <option value="">전체 공개 여부</option>
              <option value="1">공개</option>
              <option value="0">비공개</option>
            </select>
            <select aria-label="등록 주체 선택" v-model="owner" @change="search">
              <option value="">전체 등록</option>
              <option value="shared">공용</option>
              <option value="coach">코치 등록</option>
            </select>
            <input aria-label="운동 제목 검색" type="text" v-model="searchname" placeholder="운동 제목" @keyup.enter="search">
          </div>
          <button type="button" class="btn" @click="search">검색</button>
        </div>
      </div>
    </div>
    <div class="top-area ex-top">
      <div class="total">전체 <span class="num">{{ total.toLocaleString() }}</span></div>
      <button type="button" class="btn-sm-line ex-new" @click="openEdit(null)">새 운동 등록</button>
    </div>
    <div class="table type03 mob-type02">
      <div class="table-head is-mob">
        <!-- 2026-11-19: 썸네일 84px → 128px(모바일 96px → 112px). 이미지 칸은 비율(col-N) 대신 썸네일에 딱 맞는 고정 너비(ex-col-thumb)로 — 좌우 빈 간격 축소 -->
        <div class="table-head-col ex-col-thumb">이미지</div>
        <div class="table-head-col">운동</div>
        <div class="table-head-col col-1">등록</div>
        <div class="table-head-col col-1">사용</div>
        <div class="table-head-col col-1">공개</div>
        <div class="table-head-col col-2">관리</div>
      </div>
      <div class="table-body">
        <template v-if="list.length">
          <div class="table-body-row is-move" v-for="item in list" :key="item.recommend_exercise_pk">
            <div class="table-body-flex flex-column">
              <div class="table-body-col ex-col-thumb ex-c-thumb">
                <!-- 2026-11-18: 대표 이미지가 없거나 불러오지 못하면 기본 로고(img_logo_black.png) 표시, alt 추가 -->
                <button type="button" class="ex-thumb" :class="{ 'is-empty': !hasThumb(item.thumbnail_url) }" :aria-label="item.title + ' 수정'" @click="openEdit(item)">
                  <img :src="thumb(item.thumbnail_url)" :alt="hasThumb(item.thumbnail_url) ? `${item.title || '추천 운동'} 대표 이미지` : 'X-COACH 로고 (대표 이미지 없음)'" loading="lazy" @error="onThumbError(item.thumbnail_url)" />
                </button>
              </div>
              <div class="table-body-col align-left ex-info">
                <button type="button" class="link ex-title" @click="openEdit(item)">{{ item.title }}</button>
                <span class="ex-sub">{{ [item.target_audience, item.objective].filter(Boolean).join(' · ') || '-' }}</span>
              </div>
              <div class="table-body-col col-1 ex-c-owner"><span class="color-grey">{{ Number(item.expert_fk) > 0 ? (item.expert_nickname || '코치') : '공용' }}</span></div>
              <div class="table-body-col col-1 ex-c-use"><span class="color-grey" title="이 운동이 연결된 리포트 수">리포트 {{ Number(item.use_cnt) }}건</span></div>
              <div class="table-body-col col-1 ex-c-status">
                <span :class="Number(item.status) === 1 ? 'color-green' : 'color-grey'">{{ Number(item.status) === 1 ? '공개' : '비공개' }}</span>
              </div>
              <div class="table-body-col col-2 ex-c-act adm-act">
                <button type="button" class="btn-xs-line" @click="openEdit(item)">수정</button>
                <button type="button" class="btn-xs-line" @click="toggleStatus(item)">{{ Number(item.status) === 1 ? '비공개' : '공개' }}</button>
              </div>
            </div>
          </div>
        </template>
        <div class="no-data" v-else-if="loaded">내역이 없습니다.</div>
      </div>
    </div>
    <div class="btn-wrap" v-if="total > 0"><!-- 2026-11-11: 10개씩, 번호는 현재 주변 5개 -->
      <ul class="pagination-container type02">
        <li><button type="button" class="paginate-buttons" aria-label="이전" :disabled="pageno <= 1" @click="go(pageno - 1)"><img src="/images/icon/icon_prev.png" alt="" /></button></li>
        <li v-for="p in visiblePages" :key="p"><button type="button" class="paginate-buttons" :class="{ active: pageno === p }" @click="go(p)">{{ p }}</button></li>
        <li><button type="button" class="paginate-buttons" aria-label="다음" :disabled="pageno >= pages" @click="go(pageno + 1)"><img src="/images/icon/icon_next.png" alt="" /></button></li>
      </ul>
    </div>

    <div class="adm-view ex-edit" v-if="edit.open">
      <div class="adm-view-head">
        <h3 class="adm-view-title">{{ edit.pk ? '추천 운동 수정' : '새 추천 운동 등록' }}<!-- (메모: 골프만이라 종목 표시 숨김) <span class="ex-sport">…</span> --></h3>
        <button type="button" class="btn-xs-line" @click="closeEdit">닫기</button>
      </div>
      <div class="ex-form">
        <div class="ex-img">
          <!-- 2026-11-18: 대표 이미지가 없거나 불러오지 못하면 기본 로고(img_logo_black.png) 표시, alt 추가 -->
          <div class="ex-img-preview" :class="{ 'is-empty': !hasPreview }">
            <img :src="hasPreview ? preview : defaultThumb" :alt="hasPreview ? `${edit.form.title || '추천 운동'} 대표 이미지` : 'X-COACH 로고 (대표 이미지 없음)'" @error="onPreviewError" />
          </div>
          <button type="button" class="btn-xs-line ex-file" @click="fileInput?.click()">{{ hasPreview ? '이미지 바꾸기' : '이미지 선택' }}</button>
          <input ref="fileInput" class="ex-file-input" type="file" accept="image/jpeg,image/png,image/gif" aria-label="대표 이미지 파일 선택" @change="onFile" />
          <p class="ex-help">JPG·PNG, 가로형(7:5) 권장</p>
        </div>
        <div class="ex-fields">
          <label class="ex-row"><span class="ex-label">제목 <i class="req">*</i></span><input type="text" v-model.trim="edit.form.title" maxlength="200" placeholder="운동 제목" /></label>
          <label class="ex-row"><span class="ex-label">추천 대상</span><input type="text" v-model.trim="edit.form.target_audience" maxlength="200" :placeholder="sport === 'archery' ? '예: 조준이 흔들리는 궁사' : '예: 어드레스가 불안정한 초급 골퍼'" /></label>
          <label class="ex-row"><span class="ex-label">운동 목적</span><input type="text" v-model.trim="edit.form.objective" maxlength="200" :placeholder="sport === 'archery' ? '예: 조준 흔들림 감소' : '예: 어드레스 자세 교정'" /></label>
          <label class="ex-row"><span class="ex-label">운동 설명</span><textarea v-model="edit.form.content" rows="4" placeholder="방법·횟수·주의할 점"></textarea></label>
          <label class="ex-row"><span class="ex-label">영상 주소</span><input type="text" v-model.trim="edit.form.video_url" maxlength="500" placeholder="https://" /></label>
          <div class="ex-row"><span class="ex-label">공개 여부</span>
            <!-- 2026-11-19: 브라우저 기본 라디오 → 공통 라디오(radio-box, 가이드·다른 화면과 같은 모양) -->
            <div class="ex-radio" role="radiogroup" aria-label="공개 여부">
              <div class="radio-box">
                <input type="radio" id="ex_status_open" name="ex_status" :value="1" v-model="edit.form.status" />
                <label for="ex_status_open">
                  <span class="check-box-item" />
                  <span class="check-box-txt">공개</span>
                </label>
              </div>
              <div class="radio-box">
                <input type="radio" id="ex_status_closed" name="ex_status" :value="0" v-model="edit.form.status" />
                <label for="ex_status_closed">
                  <span class="check-box-item" />
                  <span class="check-box-txt">비공개</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="ex-error" role="alert" v-if="edit.error">{{ edit.error }}</p>
      <div class="ex-foot">
        <button type="button" class="btn-sm-line" @click="closeEdit">취소</button>
        <button type="button" class="btn-sm-fill" :disabled="edit.saving" @click="save">{{ edit.saving ? '저장 중...' : '저장' }}</button>
      </div>
    </div>
    <ToastModal :isOpen="toast.open" :toastMessage="toast.msg" @update:isOpen="toast.open = $event" />
  </div>
</template>

<script setup>
import { useApiFetch } from "~/api/fetch";
import { useCommon } from "~/utils/common";
import ToastModal from "~/components/toast-ui/toast-modal.vue";

const props = defineProps({ sport: { type: String, default: "golf" } });
const apiFetch = useApiFetch();
const common = useCommon();
const list = ref([]); const total = ref(0); const loaded = ref(false);
const pageno = ref(1); const status = ref(""); const owner = ref(""); const searchname = ref("");
const toast = reactive({ open: false, msg: "" });
const notify = (m) => { toast.msg = m; toast.open = true; };
// 2026-11-18: 이미지가 비었거나 불러오기 실패하면 기본 로고로 대체
const defaultThumb = "/images/default/img_logo_black.png";
const brokenThumbs = reactive({});
const hasThumb = (u) => !!String(u || "").trim() && !brokenThumbs[u];
const onThumbError = (u) => { if (u) brokenThumbs[u] = true; };
const thumb = (u) => (hasThumb(u) ? common.getImg(u) : defaultThumb);
const blank = () => ({ title: "", target_audience: "", objective: "", content: "", video_url: "", status: 1, thumbnail_url: "" });
const edit = reactive({ open: false, pk: 0, form: blank(), file: null, error: "", saving: false });
const preview = ref("");
const previewBroken = ref(false);
const hasPreview = computed(() => !!preview.value && !previewBroken.value);
const onPreviewError = () => { if (preview.value) previewBroken.value = true; };
watch(preview, () => { previewBroken.value = false; });
const fileInput = ref(null);

const load = async () => {
  const res = await apiFetch("/coaching/recommendexercisemanage", { method: "GET", query: { sport_code: props.sport, pageno: pageno.value, pagesize: 10, status: status.value, owner: owner.value, searchname: searchname.value } });
  list.value = res?.list || []; total.value = Number(res?.listcnt || 0); loaded.value = true;
};
const search = () => { pageno.value = 1; load(); };
const pages = computed(() => Math.max(1, Math.ceil(total.value / 10)));
const go = (p) => { if (p < 1 || p > pages.value || p === pageno.value) return; pageno.value = p; load(); if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" }); };
// 2026-11-11: 페이지 번호는 현재 페이지 주변 5개만(목록이 늘어도 번호 줄이 길어지지 않게 — 코칭 관리와 같은 방식)
const visiblePages = computed(() => {
  const total = pages.value;
  let start = Math.max(1, pageno.value - 2);
  const end = Math.min(total, start + 4);
  if (end - start < 4) start = Math.max(1, end - 4);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const openEdit = (item) => {
  edit.pk = item ? Number(item.recommend_exercise_pk) : 0;
  edit.form = item ? { title: item.title || "", target_audience: item.target_audience || "", objective: item.objective || "", content: item.content || "", video_url: item.video_url || "", status: Number(item.status) === 0 ? 0 : 1, thumbnail_url: item.thumbnail_url || "" } : blank();
  edit.file = null; edit.error = ""; edit.open = true;
  preview.value = item?.thumbnail_url ? common.getImg(item.thumbnail_url) : "";
  if (import.meta.client) nextTick(() => document.querySelector(".ex-edit")?.scrollIntoView({ behavior: "smooth", block: "start" }));
};
const closeEdit = () => { edit.open = false; edit.file = null; preview.value = ""; };
const onFile = (e) => {
  const f = e.target.files?.[0];
  if (!f || !f.type.startsWith("image/")) return;
  if (f.size > 10 * 1024 * 1024) { edit.error = "이미지는 10MB 이하로 올려 주세요."; return; }
  edit.file = f; edit.error = "";
  const r = new FileReader(); r.onload = () => { preview.value = r.result; }; r.readAsDataURL(f);
};
const body = (o) => { const f = new URLSearchParams(); Object.entries(o).forEach(([k, v]) => f.append(k, v == null ? "" : String(v))); return f; };
const writeRow = (pk, data) => apiFetch(`/coaching/recommendexercisewrite${pk ? "/" + pk : ""}`, { method: "POST", body: body({ ...data, sport_code: props.sport, ...(pk ? {} : { expert_fk: 0 }) }) });

const save = async () => {
  if (edit.saving) return;
  if (!edit.form.title) { edit.error = "제목을 입력해 주세요."; return; }
  if (!edit.file && !edit.form.thumbnail_url) { edit.error = "대표 이미지를 선택해 주세요."; return; }
  edit.error = ""; edit.saving = true;
  try {
    let thumbnail_url = edit.form.thumbnail_url;
    if (edit.file) {
      const fd = new FormData(); fd.append("thumbnail", edit.file);
      const up = await apiFetch("/coaching/recommendexerciseupload", { method: "POST", body: fd });
      if (up?.code !== 200 || !up.thumbnail_url) throw new Error(up?.message || "이미지를 올리지 못했습니다.");
      thumbnail_url = up.thumbnail_url;
    }
    const res = await writeRow(edit.pk, { ...edit.form, thumbnail_url });
    if (res?.code !== 200) throw new Error(res?.message || "저장하지 못했습니다.");
    notify(edit.pk ? "수정했습니다." : "등록했습니다.");
    closeEdit(); load();
  } catch (e) {
    edit.error = e?.data?.message || e?.message || "저장하지 못했습니다.";
  } finally { edit.saving = false; }
};
const toggleStatus = async (item) => {
  const next = Number(item.status) === 1 ? 0 : 1;
  const res = await writeRow(Number(item.recommend_exercise_pk), { title: item.title, target_audience: item.target_audience, objective: item.objective, content: item.content, video_url: item.video_url, thumbnail_url: item.thumbnail_url, status: next });
  notify(res?.code === 200 ? (next ? "공개로 바꿨습니다." : "비공개로 바꿨습니다.") : (res?.message || "바꾸지 못했습니다."));
  load();
};
watch(() => props.sport, () => { closeEdit(); search(); });
onMounted(load);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
.link { background: none; border: 0; padding: 0; text-align: left; cursor: pointer; }
.adm-act { display: flex; gap: 6px; justify-content: center; button { min-width: 0 !important; width: auto !important; padding: 0 12px !important; } }
.table-body-col .color-grey { white-space: nowrap; }
.ex-top { display: flex; justify-content: space-between; align-items: center; }
.ex-new { min-width: 0 !important; width: auto !important; padding: 0 16px !important; }
/* 이미지 칸: 썸네일 128px + 좌우 여백 10px */
.ex-admin .table-head-col.ex-col-thumb, .ex-admin .table-body-col.ex-col-thumb { flex: 0 0 148px; }
.ex-thumb { display: block; width: 128px; max-width: 100%; aspect-ratio: 7 / 5; border: 1px solid #E5E7E8; border-radius: 8px; background-color: #F1F3F4; cursor: pointer; margin: 0 auto; padding: 0; overflow: hidden; }
.ex-thumb img { display: block; width: 100%; height: 100%; object-fit: cover; }
.ex-thumb.is-empty img { object-fit: contain; box-sizing: border-box; padding: 14%; }
.ex-info { display: flex; flex-direction: column; align-items: flex-start; justify-content: center; gap: 4px; min-width: 0; }
.ex-title { font-weight: 600; color: #17191C; }
.ex-sub { font-size: 13px; color: #72777A; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
.adm-view { margin-top: 32px; padding: 28px 32px; border: 1px solid #E5E7E8; border-radius: 16px; background: #fff; }
.adm-view-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 20px; }
.adm-view-title { font-size: 20px; font-weight: 700; color: #17191C; display: flex; align-items: center; gap: 8px; }
.ex-sport { font-size: 12px; font-weight: 600; padding: 2px 8px; border-radius: 6px; background: #F1F3F4; color: #5B6168; }
.ex-form { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 28px; }
.ex-img { display: flex; flex-direction: column; gap: 10px; }
.ex-img-preview { width: 100%; aspect-ratio: 7 / 5; border-radius: 12px; border: 1px solid #E5E7E8; background: #F7F8F9; overflow: hidden; }
.ex-img-preview img { display: block; width: 100%; height: 100%; object-fit: cover; }
.ex-img-preview.is-empty img { object-fit: contain; box-sizing: border-box; padding: 18%; }
.ex-file { align-self: flex-start; padding: 0 14px !important; min-width: 0 !important; width: auto !important; }
.ex-file-input { display: none; }
.ex-help { font-size: 12px; color: #9AA0A6; }
.ex-fields { display: flex; flex-direction: column; gap: 14px; }
.ex-row { display: grid; grid-template-columns: 96px minmax(0, 1fr); align-items: center; gap: 12px; }
.ex-row textarea { align-self: stretch; }
.ex-label { font-size: 14px; font-weight: 600; color: #35383B; }
.ex-label .req { color: #D81E3C; font-style: normal; }
.ex-row input[type="text"], .ex-row textarea { width: 100%; border: 1px solid #DDE1E6; border-radius: 8px; padding: 10px 12px; font-size: 14px; color: #17191C; background: #fff; }
.ex-row textarea { resize: vertical; min-height: 96px; line-height: 1.6; }
.ex-radio { display: flex; align-items: center; gap: 20px; font-size: 14px; color: #35383B; .radio-box + .radio-box { margin-left: 0; } }
.ex-error { margin-top: 14px; font-size: 13px; color: #D81E3C; text-align: right; }
.ex-foot { display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px; button { min-width: 88px !important; width: auto !important; } }
@media screen and (max-width: 768px) {
  /* 모바일 목록: 이미지 왼쪽 / 제목·대상 / 등록·사용·공개 한 줄 / 버튼 */
  .ex-admin .table-body-flex { display: grid !important; grid-template-columns: 112px auto auto minmax(0, 1fr); grid-template-areas: 'thumb info info info' 'thumb owner use status' 'act act act act'; column-gap: 10px; row-gap: 8px; align-items: center; }
  .ex-admin .table-body-flex > .table-body-col { width: auto !important; min-width: 0 !important; max-width: none !important; padding: 0 !important; justify-content: flex-start !important; text-align: left !important; }
  .ex-c-thumb { grid-area: thumb; align-self: start; } .ex-info { grid-area: info; } .ex-c-owner { grid-area: owner; } .ex-c-use { grid-area: use; } .ex-c-status { grid-area: status; } .ex-c-act { grid-area: act; justify-content: flex-end !important; }
  .ex-c-owner .color-grey, .ex-c-use .color-grey, .ex-c-status span { font-size: 12px; }
  .ex-admin .filter-box .col { flex-wrap: wrap; gap: 8px; } .ex-admin .filter-box .col > .d-flex { flex-wrap: wrap; gap: 8px; width: 100%; }
  .ex-admin .filter-box select { flex: 1 1 calc(50% - 4px); min-width: 0; width: auto !important; } .ex-admin .filter-box input { flex: 1 1 100%; width: 100% !important; } .ex-admin .filter-box .btn { width: 100% !important; }
  .adm-view { padding: 20px; }
  .ex-form { grid-template-columns: minmax(0, 1fr); gap: 20px; }
  .ex-row { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  .ex-thumb { width: 112px; margin: 0; }
  .ex-foot button { flex: 1; }
}
</style>
