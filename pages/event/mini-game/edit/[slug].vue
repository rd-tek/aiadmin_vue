<template>
  <!--
    2026-10-22: 이벤트관리 > 미니게임 등록·수정(관리자). slug 0 = 신규
    · 화면 형식: aiadmin 기존 등록 화면과 같은 표 형태
    · 참고: kr_12/kradmin·hoju_10/hjadmin MiniGameWrite (나라별 변형) — 항목·검증은 aiadmin 백엔드 eventwrite 계약 기준
      shopno(0=전체 매장)·title/message/successmessage(2~50)·type·point(일반형)/rankprize[](랭킹형 11·12)·distance(롱기스트·니어핀)
      ·courseno·hole('홀번호_코스타입코드', 코스타입코드 = type_fk − 1)·isteebox/teeboxman/teeboxwoman·level_fk·greenspeed_fk·greengravity_fk·status·entrylimit
    · 수정 중 매장을 바꾸면 확인창
  -->
  <div class="membership-member write mg-form">
    <div class="write-wrap">
      <div class="table-wrap">
        <div class="table type02">
          <table>
            <colgroup><col width="18%" /><col width="*" /></colgroup>
            <tbody>
              <tr>
                <th><label for="mg-shop">매장</label> <span class="required"></span></th>
                <td>
                  <div class="select-default">
                    <select id="mg-shop" :value="form.shopno" @change="onShopChange($event)">
                      <option value="0">전체 매장</option>
                      <option v-for="s in shops" :key="s.shopno" :value="String(s.shopno)">{{ s.shopname }}</option>
                    </select>
                  </div>
                  <p class="hint">전체 매장 = 모든 매장에서 참여, 특정 매장 = 그 매장에서만 참여</p>
                </td>
              </tr>
              <tr>
                <th><label for="mg-status">진행 상태</label> <span class="required"></span></th>
                <td><div class="select-default"><select id="mg-status" v-model.number="form.status">
                  <option :value="0">대기</option><option :value="1">진행중</option><option :value="2">완료</option><option :value="3">취소</option>
                </select></div></td>
              </tr>
              <tr>
                <th><label for="mg-type">종류</label> <span class="required"></span></th>
                <td><div class="select-default"><select id="mg-type" v-model.number="form.type">
                  <option v-for="t in typeOptions" :key="t" :value="t">{{ L.awardType(t) }}</option>
                </select></div></td>
              </tr>
              <tr>
                <th><label for="mg-title">이벤트명</label> <span class="required"></span></th>
                <td><div class="input-text"><input id="mg-title" type="text" v-model="form.title" maxlength="50" placeholder="2~50자" /></div></td>
              </tr>
              <tr>
                <th><label for="mg-msg">안내 문구</label> <span class="required"></span></th>
                <td><div class="input-text"><input id="mg-msg" type="text" v-model="form.message" maxlength="50" placeholder="게임 화면에 보이는 안내(2~50자)" /></div></td>
              </tr>
              <tr>
                <th><label for="mg-smsg">달성 문구</label> <span class="required"></span></th>
                <td><div class="input-text"><input id="mg-smsg" type="text" v-model="form.successmessage" maxlength="50" placeholder="달성했을 때 보이는 문구(2~50자)" /></div></td>
              </tr>
              <tr>
                <th><span id="mg-period">기간</span> <span class="required"></span></th>
                <td>
                  <div class="period" role="group" aria-labelledby="mg-period">
                    <ClientOnly><VueDatePicker v-model="startDate" :format="L.pickerFormat" :enable-time-picker="false" :clearable="false" auto-apply placeholder="시작일" aria-label="시작일" /></ClientOnly>
                    <span class="wave">~</span>
                    <ClientOnly><VueDatePicker v-model="endDate" :format="L.pickerFormat" :enable-time-picker="false" :clearable="false" auto-apply placeholder="종료일" aria-label="종료일" /></ClientOnly>
                  </div>
                </td>
              </tr>
              <tr v-if="hasDistance">
                <th><label for="mg-dist">{{ isLongest ? '기준 비거리' : '기준 거리' }}</label> <span class="required"></span></th>
                <td>
                  <div class="input-wrap">
                    <div class="input-text narrow"><input id="mg-dist" type="number" min="1" v-model.number="form.distance" /></div>
                    <span class="hint">m {{ isLongest ? '이상 보내면 달성' : '(핀까지 남은 거리) 이내면 달성' }}</span>
                  </div>
                </td>
              </tr>
              <tr v-if="!isRank">
                <th><label for="mg-point">경품</label> <span class="required"></span></th>
                <td><div class="input-text"><input id="mg-point" type="text" v-model="form.point" maxlength="50" placeholder="예: 골프공 1더즌(2~50자)" /></div></td>
              </tr>
              <template v-else>
                <tr>
                  <th><label for="mg-rankno">시상 순위</label> <span class="required"></span></th>
                  <td><div class="select-default"><select id="mg-rankno" v-model.number="form.rankno"><option v-for="n in 10" :key="n" :value="n">{{ n }}위까지</option></select></div></td>
                </tr>
                <tr>
                  <th>순위별 상품 <span class="required"></span></th>
                  <td><div class="prize-grid">
                    <div class="input-text" v-for="(p, i) in form.rankprize" :key="i"><input type="text" v-model="form.rankprize[i]" :placeholder="`${i + 1}위 상품`" :aria-label="`${i + 1}위 상품`" /></div>
                  </div></td>
                </tr>
              </template>
              <tr>
                <th><label for="mg-limit">참가 제한</label></th>
                <td>
                  <div class="input-wrap">
                    <div class="input-text narrow"><input id="mg-limit" type="number" min="0" v-model.number="form.entrylimit" /></div>
                    <span class="hint">1인 참가 횟수 · 0 = 제한 없음</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>코스 <span class="required"></span></th>
                <td>
                  <div class="input-wrap">
                    <div class="input-text"><input type="text" :value="course.coursename" readonly placeholder="코스를 선택해 주세요" aria-label="선택한 코스" /></div>
                    <button type="button" class="btn-md-line" @click="openCourse">코스 선택</button>
                  </div>
                </td>
              </tr>
              <tr v-if="course.maincourseno">
                <th><label for="mg-hole">홀</label> <span class="required"></span></th>
                <td>
                  <div class="select-default">
                    <select id="mg-hole" v-model="form.hole">
                      <option value="" disabled>홀을 선택해 주세요</option>
                      <optgroup v-for="sc in holeGroups" :key="sc.key" :label="sc.title">
                        <option v-for="h in sc.holes" :key="h.value" :value="h.value">{{ h.label }}</option>
                      </optgroup>
                    </select>
                  </div>
                  <p class="hint" v-if="!holeGroups.length">이 코스의 홀 정보를 불러오지 못했습니다.</p>
                </td>
              </tr>
              <tr>
                <th>티박스</th>
                <td>
                  <div class="multi">
                    <div class="multi-item"><span class="multi-lbl">지정</span><div class="select-default"><select v-model.number="form.isteebox" aria-label="티박스 지정"><option :value="0">지정 안 함</option><option :value="1">지정</option></select></div></div>
                    <template v-if="form.isteebox === 1">
                      <div class="multi-item"><span class="multi-lbl">남성</span><div class="select-default"><select v-model.number="form.teeboxman" aria-label="남성 티박스"><option v-for="v in [1,2,3,4]" :key="v" :value="v">{{ L.tee(v) }}</option></select></div></div>
                      <div class="multi-item"><span class="multi-lbl">여성</span><div class="select-default"><select v-model.number="form.teeboxwoman" aria-label="여성 티박스"><option v-for="v in [1,2,3,4]" :key="v" :value="v">{{ L.tee(v) }}</option></select></div></div>
                    </template>
                  </div>
                </td>
              </tr>
              <tr>
                <th>게임 조건</th>
                <td>
                  <div class="multi">
                    <div class="multi-item"><span class="multi-lbl">레벨</span><div class="select-default"><select v-model.number="form.level_fk" aria-label="레벨"><option v-for="v in [1,2,3,4,5]" :key="v" :value="v">{{ L.level(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">그린 스피드</span><div class="select-default"><select v-model.number="form.greenspeed_fk" aria-label="그린 스피드"><option v-for="v in [1,2,3,4,5,6]" :key="v" :value="v">{{ L.greenSpeed(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">그린 경사</span><div class="select-default"><select v-model.number="form.greengravity_fk" aria-label="그린 경사"><option v-for="v in [1,2,3,4,5,6]" :key="v" :value="v">{{ L.greenGravity(v) }}</option></select></div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btn-wrap column-reverse">
        <nuxt-link :to="isEdit ? `/event/mini-game/${eventNo}` : '/event/mini-game'" class="btn-md-line">{{ isEdit ? '취소' : '목록 보기' }}</nuxt-link>
        <button type="button" class="btn-md-fill btn-primary-purple" :disabled="saving" @click="submit">{{ saving ? '저장 중...' : '저장하기' }}</button>
      </div>
    </div>

    <modal-course-select :isOpen="courseOpen" :tournamentno="0" :selected="course.maincourseno" @update:isOpen="courseOpen = $event" @apply="onCourse" />
    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
    <toast-modal :isOpen="doneOpen" :toastMessage="doneMessage" @update:isOpen="onDoneClose" />
    <toast-confirm-modal :isOpen="shopConfirmOpen" toastConfirmMessage="매장을 변경할까요?" :toastConfirmDescription="shopConfirmDesc" @confirm="confirmShop" @update:isOpen="onShopConfirmClose" />
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useEventApi } from "~/api/event";
import { useTournamentApi } from "~/api/tournament";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import ModalCourseSelect from "~/components/tournament/modal-course-select.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastConfirmModal from "@/components/toast-ui/toast-confirm-modal.vue";

const route = useRoute();
const router = useRouter();
const api = useEventApi();
const tApi = useTournamentApi();
const L = useCompetitionLabels();
const eventNo = Number(route.params.slug) || 0;
const isEdit = eventNo > 0;
const typeOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const form = reactive({
  shopno: "0", status: 0, type: 9, title: "", message: "", successmessage: "", point: "",
  rankno: 3, rankprize: ["", "", ""], distance: 200, entrylimit: 0, hole: "",
  isteebox: 0, teeboxman: 2, teeboxwoman: 3, level_fk: 4, greenspeed_fk: 4, greengravity_fk: 4,
});
const startDate = ref(null);
const endDate = ref(null);
const isRank = computed(() => L.isRankAward(form.type));
const isLongest = computed(() => [9, 11].includes(Number(form.type)));
const hasDistance = computed(() => [9, 10, 11, 12].includes(Number(form.type)));
watch(() => form.rankno, (n) => { const a = form.rankprize.slice(0, n); while (a.length < n) a.push(""); form.rankprize = a; });

// ── 매장(수정 중 변경 확인) ──
const shops = ref([]);
const originalShop = ref("");
const pendingShop = ref("");
const shopConfirmOpen = ref(false);
const shopLabel = (no) => (String(no) === "0" ? "전체 매장" : shops.value.find((s) => String(s.shopno) === String(no))?.shopname || "-");
const shopConfirmDesc = computed(() => `'${shopLabel(form.shopno)}' → '${shopLabel(pendingShop.value)}' 로 바뀝니다. 저장하면 이 미니게임은 바뀐 매장 기준으로 진행됩니다.`);
const onShopChange = (e) => {
  const v = e.target.value;
  if (!isEdit || v === originalShop.value) { form.shopno = v; return; }
  pendingShop.value = v;
  e.target.value = form.shopno;
  shopConfirmOpen.value = true;
  document.querySelector("body")?.classList.add("is-hidden");
};
const confirmShop = () => { if (pendingShop.value !== "") form.shopno = pendingShop.value; shopConfirmOpen.value = false; document.querySelector("body")?.classList.remove("is-hidden"); };
// 확인창은 '닫힘'을 '확인'보다 먼저 보냄 → 닫힐 때 대기 값을 지우면 확인 시 매장이 빈 값이 되므로 지우지 않음(취소 = select 는 이미 원래 값)
const onShopConfirmClose = (v) => { shopConfirmOpen.value = v; };

// ── 코스·홀 ──
const course = reactive({ maincourseno: 0, coursename: "" });
const subcourses = ref([]);
const courseOpen = ref(false);
const openCourse = () => { courseOpen.value = true; document.querySelector("body")?.classList.add("is-hidden"); };
// 홀 값 = '홀번호_코스타입코드'(백엔드가 tg_coursetype.type_code 로 찾음, type_code = type_fk − 1)
const holeGroups = computed(() => (subcourses.value || []).map((sc) => ({
  key: sc.subcourseno,
  title: `${sc.title} 코스`,
  // 서브코스마다 1번 홀이 있으므로 선택된 값만 보여도 구분되게 서브코스명을 앞에 붙임
  holes: (sc.subcoursehole || []).map((h) => ({ value: `${h.hole_no}_${Number(sc.type_fk) - 1}`, label: `${sc.title} ${h.hole_no}번 홀 · 파${h.par_score}${Number(h.distance) > 0 ? ` · ${h.distance}m` : ""}` })),
})));
const loadHoles = async (mainno) => {
  subcourses.value = [];
  if (!mainno) return;
  const r = (await api.courseView(mainno)) || {};
  subcourses.value = r.courseview?.subcourse || [];
};
const onCourse = async ({ maincourseno, coursename }) => { course.maincourseno = maincourseno; course.coursename = coursename; form.hole = ""; await loadHoles(maincourseno); };

// ── 알림 ──
const warnOpen = ref(false);
const warnMessage = ref("");
const warn = (m) => { warnMessage.value = m; warnOpen.value = true; document.querySelector("body")?.classList.add("is-hidden"); return false; };
const doneOpen = ref(false);
const doneMessage = ref("");
const onDoneClose = (v) => { doneOpen.value = v; if (!v) router.push(isEdit ? `/event/mini-game/${eventNo}` : "/event/mini-game"); };

// ── 저장 ──
const saving = ref(false);
const len = (s) => String(s || "").trim().length;
const validate = () => {
  if (len(form.title) < 2) return warn("이벤트명을 2~50자로 입력해 주세요.");
  if (len(form.message) < 2) return warn("안내 문구를 2~50자로 입력해 주세요.");
  if (len(form.successmessage) < 2) return warn("달성 문구를 2~50자로 입력해 주세요.");
  if (!startDate.value || !endDate.value) return warn("기간(시작일·종료일)을 선택해 주세요.");
  if (startDate.value > endDate.value) return warn("시작일은 종료일보다 이전이어야 합니다.");
  if (hasDistance.value && !(Number(form.distance) > 0)) return warn("기준 거리를 입력해 주세요.");
  if (!isRank.value && len(form.point) < 2) return warn("경품을 2~50자로 입력해 주세요.");
  if (isRank.value) for (let i = 0; i < form.rankno; i++) if (!len(form.rankprize[i])) return warn(`${i + 1}위 상품을 입력해 주세요.`);
  if (!course.maincourseno) return warn("코스를 선택해 주세요.");
  if (!form.hole) return warn("홀을 선택해 주세요.");
  return true;
};
const submit = async () => {
  if (validate() !== true) return;
  const payload = {
    shopno: Number(form.shopno) || 0,
    status: form.status, type: form.type,
    title: form.title.trim(), message: form.message.trim(), successmessage: form.successmessage.trim(),
    startdate: L.apiDate(startDate.value), enddate: L.apiDate(endDate.value),
    entrylimit: Number(form.entrylimit) || 0,
    courseno: course.maincourseno, hole: form.hole,
    isteebox: form.isteebox,
    level_fk: form.level_fk, greenspeed_fk: form.greenspeed_fk, greengravity_fk: form.greengravity_fk,
    gender: "",
  };
  if (form.isteebox === 1) { payload.teeboxman = form.teeboxman; payload.teeboxwoman = form.teeboxwoman; }
  if (hasDistance.value) payload.distance = Number(form.distance);
  if (isRank.value) payload.rankprize = form.rankprize.slice(0, form.rankno).map((s) => String(s).trim());
  payload.point = isRank.value ? "" : form.point.trim(); // 랭킹형은 경품을 순위별 상품으로 받음(points 는 빈 값)
  saving.value = true;
  try {
    const res = await api.write(payload, eventNo);
    if (Number(res?.code) === 200) {
      doneMessage.value = isEdit ? "수정되었습니다." : "등록되었습니다.";
      doneOpen.value = true;
      document.querySelector("body")?.classList.add("is-hidden");
    } else warn(res?.message || "저장하지 못했습니다. 입력값을 확인해 주세요.");
  } catch (e) {
    console.error(e);
    warn("저장 중 오류가 발생했습니다.");
  } finally { saving.value = false; }
};

// ── 수정: 기존 값 ──
const parseDate = (s) => { if (!s) return null; const d = new Date(String(s).slice(0, 10).replace(/-/g, "/")); return isNaN(d.getTime()) ? null : d; };
const inRange = (v, lo, hi, dflt) => { const n = Number(v); return n >= lo && n <= hi ? n : dflt; };
const loadForEdit = async () => {
  const d = (await api.view(eventNo)) || {};
  const e = d.eventinfo || {};
  form.shopno = String(Number(e.shopno ?? e.owner_fk) || 0);
  originalShop.value = form.shopno;
  form.status = inRange(e.status, 0, 3, 0);
  form.type = inRange(e.type, 1, 12, 9);
  form.title = e.title || ""; form.message = e.message || ""; form.successmessage = e.successmessage || "";
  form.point = e.point || "";
  form.distance = Number(e.distance) || form.distance;
  form.entrylimit = Number(e.entrylimit) || 0;
  form.isteebox = Number(e.isteebox) === 1 ? 1 : 0;
  form.teeboxman = inRange(e.teeboxman, 1, 4, 2); form.teeboxwoman = inRange(e.teeboxwoman, 1, 4, 3);
  form.level_fk = inRange(e.level_fk, 1, 5, 4);
  form.greenspeed_fk = inRange(e.greenspeed_fk, 1, 6, 4); form.greengravity_fk = inRange(e.greengravity_fk, 1, 6, 4);
  startDate.value = parseDate(e.timezone_startdate || e.startdate);
  endDate.value = parseDate(e.timezone_enddate || e.enddate);
  const ranks = d.awardprizerank || [];
  if (ranks.length) { form.rankno = Math.min(10, ranks.length); await nextTick(); form.rankprize = ranks.slice(0, 10).map((r) => r.prize || ""); }
  course.maincourseno = Number(e.courseno) || 0;
  course.coursename = e.coursename || "";
  await loadHoles(course.maincourseno);
  form.hole = e.hole || ""; // '홀번호_코스타입코드'
};

onMounted(async () => {
  const r = (await tApi.shopList()) || {};
  shops.value = (r.tournamentshoplist2 || []).slice().sort((a, b) => String(a.shopname).localeCompare(String(b.shopname), "ko"));
  if (isEdit) await loadForEdit();
});

definePageMeta({ layout: "default" });
useHead({ htmlAttrs: { lang: "ko" }, title: isEdit ? "미니게임 수정" : "미니게임 등록" });
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';

.hint { font-size: 12px; color: #6e6e6e; font-weight: 400; }
td > p.hint { margin: 6px 0 0; }
.input-wrap { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.input-text.narrow { width: 120px; }
.period { display: flex; align-items: center; gap: 8px; max-width: 520px; :deep(.dp__main) { flex: 1 1 0; min-width: 0; } :deep(.dp__input) { height: 40px; } .wave { color: #6c7174; } }
.multi { display: flex; flex-wrap: wrap; gap: 10px 20px; }
.multi-item { display: flex; align-items: center; gap: 8px; .multi-lbl { min-width: 44px; font-size: 13px; color: #6e6e6e; white-space: nowrap; } .select-default { width: 180px; } }
.prize-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 240px)); gap: 8px 10px; }
/* 공통 select/input 고정 폭이 좁은 칸을 넘지 않게 */
.multi-item .select-default select { width: 100% !important; min-width: 0 !important; }
.prize-grid .input-text input, .input-text.narrow input { width: 100% !important; min-width: 0 !important; }
@media (max-width: 1024px) { .prize-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 768px) {
  .prize-grid { grid-template-columns: minmax(0, 1fr); }
  .multi-item { width: 100%; .select-default { flex: 1; width: auto; } }
  .period { max-width: none; }
}
</style>
