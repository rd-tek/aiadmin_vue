<template>
  <!--
    2026-10-22: 대회 등록·수정(관리자) — 챔피언십(kind=championship) / 매장대회(kind=competition) 공용
    · 화면 형식: aiadmin 기존 등록 화면(membership/shop/write)과 같은 표 형태(table type02 + select-default/input-text + 아래 버튼)
    · 참고: kr_12/kradmin ShopTournamentWrite·TournamentWrite, aishop competition/edit (백엔드 계약 동일)
    · 챔피언십 = regtype 4 + shopno 0(전체 매장), 매장대회 = regtype 1 + 선택한 매장
    · 매장대회 수정 중 매장을 바꾸면 확인창(취소 시 원래 매장으로 되돌림). 저장 시 백엔드가 이전 매장 연결을 해제
    · 초청 대회: 백엔드가 기존 초청 회원을 지우고 보낸 목록만 다시 넣음 → 기존 초청 회원을 불러와 함께 전송
  -->
  <div class="membership-member write tour-form">
    <div class="write-wrap">
      <div class="table-wrap">
        <div class="table type02">
          <table>
            <colgroup><col width="18%" /><col width="*" /></colgroup>
            <tbody>
              <tr>
                <th><label for="tf-shop" v-if="isCompetition">매장</label><template v-else>참가 매장</template> <span class="required" v-if="isCompetition"></span></th>
                <td>
                  <div class="select-default" v-if="isCompetition">
                    <select id="tf-shop" :value="form.shopno" @change="onShopChange($event)">
                      <option value="" disabled>매장을 선택해 주세요</option>
                      <option v-for="s in shops" :key="s.shopno" :value="String(s.shopno)">{{ s.shopname }}</option>
                    </select>
                  </div>
                  <span class="static" v-else>전체 매장 <small class="hint">(챔피언십은 모든 매장이 참가)</small></span>
                </td>
              </tr>
              <tr>
                <th><label for="tf-status">진행 상태</label> <span class="required"></span></th>
                <td>
                  <div class="select-default">
                    <select id="tf-status" v-model.number="form.status">
                      <option :value="1">예정</option><option :value="2">진행중</option><option :value="3">완료</option><option :value="4">취소</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="tf-type">대회 구분</label> <span class="required"></span></th>
                <td>
                  <div class="select-default">
                    <select id="tf-type" v-model.number="form.tourtype_fk">
                      <option :value="1">공개</option><option :value="2">초청</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="tf-title">대회명</label> <span class="required"></span></th>
                <td><div class="input-text"><input id="tf-title" type="text" v-model="form.title" maxlength="50" placeholder="2~50자" /></div></td>
              </tr>
              <tr>
                <th><span id="tf-period">기간</span> <span class="required"></span></th>
                <td>
                  <div class="period" role="group" aria-labelledby="tf-period">
                    <ClientOnly><VueDatePicker v-model="startDate" :format="L.pickerFormat" :enable-time-picker="false" :clearable="false" auto-apply placeholder="시작일" aria-label="시작일" /></ClientOnly>
                    <span class="wave">~</span>
                    <ClientOnly><VueDatePicker v-model="endDate" :format="L.pickerFormat" :enable-time-picker="false" :clearable="false" auto-apply placeholder="종료일" aria-label="종료일" /></ClientOnly>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="tf-limit">참가 제한</label></th>
                <td>
                  <div class="input-wrap">
                    <div class="input-text narrow"><input id="tf-limit" type="number" min="0" v-model.number="form.entrylimit" /></div>
                    <span class="hint">1인 참가 횟수 · 0 = 제한 없음</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="tf-remark">대회 소개</label> <span class="required"></span></th>
                <td><div class="textarea"><textarea id="tf-remark" v-model="form.remark" rows="3" maxlength="300" placeholder="대회 소개를 입력해 주세요(2자 이상)."></textarea></div></td>
              </tr>

              <tr v-if="form.tourtype_fk === 2">
                <th>초청 회원 <span class="required"></span><br /><small class="hint">{{ invited.length }}명</small></th>
                <td>
                  <div class="chips" v-if="invited.length">
                    <span class="chip" v-for="p in invited" :key="p.playerno">
                      {{ p.nickname || p.id }}<small v-if="p.id"> ({{ p.id }})</small>
                      <button type="button" :aria-label="`${p.nickname || p.id} 초청 제외`" @click="removeInvite(p.playerno)">×</button>
                    </span>
                  </div>
                  <div class="input-wrap">
                    <div class="select-default small">
                      <select v-model="searchField" aria-label="회원 검색 구분"><option value="P.nickname">닉네임</option><option value="P.player_id">아이디</option></select>
                    </div>
                    <div class="input-text"><input type="text" v-model="searchKeyword" placeholder="초청할 회원 검색" aria-label="회원 검색어" @keyup.enter="searchPlayers" /></div>
                    <button type="button" class="btn-md-line" @click="searchPlayers">검색</button>
                  </div>
                  <ul class="search-result" v-if="searchResult.length">
                    <li v-for="p in searchResult" :key="p.playerno">
                      <span>{{ p.nickname || '-' }} <small>{{ p.id }}</small></span>
                      <button type="button" class="btn-sm-line" :disabled="isInvited(p.playerno)" @click="addInvite(p)">{{ isInvited(p.playerno) ? '추가됨' : '추가' }}</button>
                    </li>
                  </ul>
                  <p class="hint" v-else-if="searched">검색 결과가 없습니다.</p>
                </td>
              </tr>

              <tr>
                <th>코스 <span class="required"></span></th>
                <td>
                  <div class="input-wrap">
                    <div class="input-text"><input type="text" :value="course.coursename" readonly placeholder="코스를 선택해 주세요" aria-label="선택한 코스" /></div>
                    <button type="button" class="btn-md-line" @click="openCourse">코스 선택</button>
                  </div>
                  <p class="hint">한 대회에 골프 코스 하나만 선택할 수 있습니다.</p>
                </td>
              </tr>
              <tr v-if="subcourses.length">
                <th>서브코스 <span class="required"></span></th>
                <td>
                  <div class="multi">
                    <div class="multi-item" v-for="(sc, i) in subcourses" :key="sc.subcourseno">
                      <span class="multi-lbl">{{ sc.subcoursename }}</span>
                      <div class="select-default">
                        <select v-model.number="subcoursetype[i]" :aria-label="`서브코스 ${sc.subcoursename} 사용`">
                          <option :value="0">미사용</option><option :value="1">Out(전반)</option><option :value="2">In(후반)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>

              <tr>
                <th><label for="tf-rankno">시상 순위</label> <span class="required"></span></th>
                <td>
                  <div class="select-default">
                    <select id="tf-rankno" v-model.number="form.rankno"><option v-for="n in 50" :key="n" :value="n">{{ n }}위까지</option></select>
                  </div>
                </td>
              </tr>
              <tr>
                <th>순위별 상품 <span class="required"></span></th>
                <td>
                  <div class="prize-grid">
                    <div class="input-text" v-for="(p, i) in form.rankprize" :key="i">
                      <input type="text" v-model="form.rankprize[i]" :placeholder="`${i + 1}위 상품`" :aria-label="`${i + 1}위 상품`" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th><label for="tf-etc">기타 시상</label> <span class="required"></span></th>
                <td><div class="input-text wide"><input id="tf-etc" type="text" v-model="form.etcprize" maxlength="100" placeholder="순위 외 시상 또는 시상 안내(2~100자)" /></div></td>
              </tr>

              <tr>
                <th>게임 조건</th>
                <td>
                  <div class="multi">
                    <div class="multi-item"><span class="multi-lbl">레벨</span><div class="select-default"><select v-model.number="form.level" aria-label="레벨"><option v-for="v in [1,2,3,4,5]" :key="v" :value="v">{{ L.level(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">바람</span><div class="select-default"><select v-model.number="form.wind" aria-label="바람"><option v-for="v in [1,2,3,4,5]" :key="v" :value="v">{{ L.wind(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">멀리건</span><div class="select-default"><select v-model.number="form.mulligan" aria-label="멀리건"><option v-for="v in [0,1,2,3,4]" :key="v" :value="v">{{ L.mulligan(v) }}</option></select></div></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>그린</th>
                <td>
                  <div class="multi">
                    <div class="multi-item"><span class="multi-lbl">스피드</span><div class="select-default"><select v-model.number="form.greenspeed_fk" aria-label="그린 스피드"><option v-for="v in [1,2,3,4,5,6]" :key="v" :value="v">{{ L.greenSpeed(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">경사</span><div class="select-default"><select v-model.number="form.greengravity_fk" aria-label="그린 경사"><option v-for="v in [1,2,3,4,5,6]" :key="v" :value="v">{{ L.greenGravity(v) }}</option></select></div></div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>티박스</th>
                <td>
                  <div class="multi">
                    <div class="multi-item"><span class="multi-lbl">남성</span><div class="select-default"><select v-model.number="form.teeboxman" aria-label="남성 티박스"><option v-for="v in [1,2,3,4]" :key="v" :value="v">{{ L.tee(v) }}</option></select></div></div>
                    <div class="multi-item"><span class="multi-lbl">여성</span><div class="select-default"><select v-model.number="form.teeboxwoman" aria-label="여성 티박스"><option v-for="v in [1,2,3,4]" :key="v" :value="v">{{ L.tee(v) }}</option></select></div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="btn-wrap column-reverse">
        <nuxt-link :to="isEdit ? `/tournament/${kind}/${tourPk}` : `/tournament/${kind}`" class="btn-md-line">{{ isEdit ? '취소' : '목록 보기' }}</nuxt-link>
        <button type="button" class="btn-md-fill btn-primary-purple" :disabled="saving" @click="submit">{{ saving ? '저장 중...' : '저장하기' }}</button>
      </div>
    </div>

    <modal-course-select :isOpen="courseOpen" :tournamentno="tourPk" :selected="course.maincourseno" @update:isOpen="courseOpen = $event" @apply="onCourse" />
    <toast-warn-modal :isOpen="warnOpen" :toastWarnMessage="warnMessage" @update:isOpen="warnOpen = $event" />
    <toast-modal :isOpen="doneOpen" :toastMessage="doneMessage" @update:isOpen="onDoneClose" />
    <toast-confirm-modal :isOpen="shopConfirmOpen" :toastConfirmMessage="shopConfirmTitle" :toastConfirmDescription="shopConfirmDesc" @confirm="confirmShop" @update:isOpen="onShopConfirmClose" />
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useTournamentApi } from "~/api/tournament";
import { useCompetitionLabels } from "~/composables/useCompetitionLabels";
import ModalCourseSelect from "~/components/tournament/modal-course-select.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import toastModal from "@/components/toast-ui/toast-modal.vue";
import toastConfirmModal from "@/components/toast-ui/toast-confirm-modal.vue";

const props = defineProps({ kind: { type: String, default: "championship" } });
const isCompetition = computed(() => props.kind === "competition");
const route = useRoute();
const router = useRouter();
const api = useTournamentApi();
const L = useCompetitionLabels();
const tourPk = Number(route.params.slug) || 0;
const isEdit = tourPk > 0;

const form = reactive({
  shopno: "", status: 1, tourtype_fk: 1, title: "", remark: "", etcprize: "", entrylimit: 0,
  rankno: 3, rankprize: ["", "", ""],
  level: 1, wind: 1, mulligan: 2, teeboxman: 2, teeboxwoman: 3,
  greenspeed_fk: 4, greengravity_fk: 4, // 정본 기본값: 보통/중간(pk)
});
const startDate = ref(null);
const endDate = ref(null);
const course = reactive({ maincourseno: 0, coursename: "" });
const subcourses = ref([]);
const subcoursetype = ref([]);
watch(() => form.rankno, (n) => {
  const arr = form.rankprize.slice(0, n);
  while (arr.length < n) arr.push("");
  form.rankprize = arr;
});

// ── 매장(매장대회) ──
const shops = ref([]);
const originalShop = ref(""); // 수정 시 불러온 매장
const pendingShop = ref("");
const shopConfirmOpen = ref(false);
const shopName = (no) => shops.value.find((s) => String(s.shopno) === String(no))?.shopname || "-";
const shopConfirmTitle = computed(() => "매장을 변경할까요?");
const shopConfirmDesc = computed(() => `'${shopName(form.shopno)}' → '${shopName(pendingShop.value)}' 로 바뀝니다. 저장하면 이 대회는 새 매장의 대회가 되고, 기존 매장과의 연결은 해제됩니다.`);
const onShopChange = (e) => {
  const v = e.target.value;
  // 신규 등록이거나 원래 매장으로 되돌리는 경우는 바로 반영
  if (!isEdit || !originalShop.value || v === originalShop.value) { form.shopno = v; return; }
  pendingShop.value = v;
  e.target.value = form.shopno; // 확인 전에는 화면 값을 원래대로
  shopConfirmOpen.value = true;
  document.querySelector("body")?.classList.add("is-hidden");
};
const confirmShop = () => { if (pendingShop.value !== "") form.shopno = pendingShop.value; shopConfirmOpen.value = false; document.querySelector("body")?.classList.remove("is-hidden"); };
// 확인창은 '닫힘'을 '확인'보다 먼저 보냄 → 닫힐 때 대기 값을 지우면 확인 시 매장이 빈 값이 되므로 지우지 않음(취소 = select 는 이미 원래 값)
const onShopConfirmClose = (v) => { shopConfirmOpen.value = v; };

// ── 코스 ──
const courseOpen = ref(false);
const openCourse = () => { courseOpen.value = true; document.querySelector("body")?.classList.add("is-hidden"); };
const loadSub = async (mainno, preselect = []) => {
  subcourses.value = [];
  subcoursetype.value = [];
  if (!mainno) return;
  const res = await api.subCourseList(mainno);
  const list = res?.subcourselist || [];
  subcourses.value = list;
  subcoursetype.value = list.map((_, i) => (i === 0 ? 1 : i === 1 ? 2 : 0)); // 기본: 첫째 Out, 둘째 In
  if (preselect.length) {
    subcoursetype.value = list.map((s) => {
      const f = preselect.find((p) => Number(p.subcourseselectno ?? p.subcourseno) === Number(s.subcourseno));
      return f ? Number(f.subcourseselectseq ?? f.subcourseseq ?? 0) : 0;
    });
  }
};
const onCourse = async ({ maincourseno, coursename }) => { course.maincourseno = maincourseno; course.coursename = coursename; await loadSub(maincourseno); };

// ── 초청 회원 ──
const invited = ref([]);
const searchField = ref("P.nickname");
const searchKeyword = ref("");
const searchResult = ref([]);
const searched = ref(false);
const isInvited = (no) => invited.value.some((p) => Number(p.playerno) === Number(no));
const addInvite = (p) => { if (!isInvited(p.playerno)) invited.value.push({ playerno: p.playerno, nickname: p.nickname, id: p.id }); };
const removeInvite = (no) => { invited.value = invited.value.filter((p) => Number(p.playerno) !== Number(no)); };
const searchPlayers = async () => {
  const k = searchKeyword.value.trim();
  if (!k) return;
  const res = await api.playerSearch(k, searchField.value);
  searchResult.value = (res?.playerlist || []).map((x) => x.playerinfo || x);
  searched.value = true;
};

// ── 알림 ──
const warnOpen = ref(false);
const warnMessage = ref("");
const warn = (m) => { warnMessage.value = m; warnOpen.value = true; document.querySelector("body")?.classList.add("is-hidden"); return false; };
const doneOpen = ref(false);
const doneMessage = ref("");
const onDoneClose = (v) => { doneOpen.value = v; if (!v) router.push(isEdit ? `/tournament/${props.kind}/${tourPk}` : `/tournament/${props.kind}`); };

// ── 저장 ──
const saving = ref(false);
const validate = () => {
  if (isCompetition.value && !form.shopno) return warn("매장을 선택해 주세요.");
  const t = form.title.trim();
  if (t.length < 2 || t.length > 50) return warn("대회명을 2~50자로 입력해 주세요.");
  if (!startDate.value || !endDate.value) return warn("기간(시작일·종료일)을 선택해 주세요.");
  if (startDate.value > endDate.value) return warn("시작일은 종료일보다 이전이어야 합니다.");
  if (form.remark.trim().length < 2) return warn("대회 소개를 2자 이상 입력해 주세요.");
  if (form.tourtype_fk === 2 && !invited.value.length) return warn("초청 대회는 초청 회원을 한 명 이상 추가해 주세요.");
  if (!course.maincourseno) return warn("코스를 선택해 주세요.");
  if (!subcoursetype.value.some((v) => Number(v) !== 0)) return warn("서브코스를 하나 이상 사용으로 선택해 주세요.");
  for (let i = 0; i < form.rankno; i++) if (!String(form.rankprize[i] || "").trim()) return warn(`${i + 1}위 상품을 입력해 주세요.`);
  const e = form.etcprize.trim();
  if (e.length < 2 || e.length > 100) return warn("기타 시상을 2~100자로 입력해 주세요.");
  return true;
};
const submit = async () => {
  if (validate() !== true) return;
  const payload = {
    shopno: isCompetition.value ? Number(form.shopno) : 0,
    regtype: isCompetition.value ? 1 : 4,
    status: form.status,
    title: form.title.trim(),
    startdate: L.apiDate(startDate.value),
    enddate: L.apiDate(endDate.value),
    remark: form.remark.trim(),
    etcprize: form.etcprize.trim(),
    entrylimit: Number(form.entrylimit) || 0,
    tourtype_fk: form.tourtype_fk,
    rankprize: form.rankprize.slice(0, form.rankno).map((s) => String(s).trim()),
    courselist: [course.maincourseno],
    subcourseno: subcourses.value.map((s) => s.subcourseno),
    subcoursetype: subcoursetype.value.map((v) => Number(v) || 0),
    level: form.level, wind: form.wind, mulligan: form.mulligan,
    teeboxman: form.teeboxman, teeboxwoman: form.teeboxwoman,
    greenspeed_fk: form.greenspeed_fk, greengravity_fk: form.greengravity_fk,
  };
  if (form.tourtype_fk === 2) payload.tour_member_items = invited.value.map((p) => p.playerno);
  saving.value = true;
  try {
    const res = await api.write(payload, tourPk);
    if (Number(res?.code) === 200) {
      doneMessage.value = isEdit ? "수정되었습니다." : "등록되었습니다.";
      doneOpen.value = true;
      document.querySelector("body")?.classList.add("is-hidden");
    } else warn(res?.message || "저장하지 못했습니다. 입력값을 확인해 주세요.");
  } catch (e) {
    console.error(e);
    warn("저장 중 오류가 발생했습니다.");
  } finally {
    saving.value = false;
  }
};

// ── 수정: 기존 값 ──
const parseDate = (s) => { if (!s) return null; const d = new Date(String(s).slice(0, 10).replace(/-/g, "/")); return isNaN(d.getTime()) ? null : d; };
const inRange = (v, lo, hi, dflt) => { const n = Number(v); return n >= lo && n <= hi ? n : dflt; };
const loadForEdit = async () => {
  const d = (await api.condition(tourPk)) || {};
  const info = d.tournamentinfo || {};
  const regtype = Number(info.regtype);
  if (regtype && regtype !== (isCompetition.value ? 1 : 4)) return warn(isCompetition.value ? "매장대회만 여기서 수정할 수 있습니다." : "챔피언십(본사 대회)만 여기서 수정할 수 있습니다.");
  form.status = inRange(info.status, 1, 4, 1);
  form.tourtype_fk = Number(info.tourtype_fk) === 2 ? 2 : 1;
  form.title = info.title || "";
  form.remark = info.remark || "";
  form.etcprize = d.tournamentprizeetc?.etcprize || info.etcprize || "";
  form.entrylimit = Number(info.entrylimit) || 0;
  form.level = inRange(info.level, 1, 5, 1);
  form.wind = inRange(info.wind, 1, 5, 1); // 0(미설정) → 무풍
  form.mulligan = inRange(info.mulligan, 0, 4, 2);
  form.teeboxman = inRange(info.teeboxman, 1, 4, 2);
  form.teeboxwoman = inRange(info.teeboxwoman, 1, 4, 3);
  form.greenspeed_fk = inRange(info.greenspeed_fk, 1, 6, 4);
  form.greengravity_fk = inRange(info.greengravity_fk, 1, 6, 4);
  startDate.value = parseDate(info.timezone_startdate || info.startdate);
  endDate.value = parseDate(info.timezone_enddate || info.enddate);
  const ranks = d.tournamentprizerank || [];
  if (ranks.length) { form.rankno = ranks.length; await nextTick(); form.rankprize = ranks.map((r) => r.rankprize || ""); }
  const c = (d.tournamentcourse || [])[0];
  if (c) { course.maincourseno = Number(c.courseno || c.maincourseno || 0); course.coursename = c.coursename || ""; await loadSub(course.maincourseno, d.subcourselist || []); }
  if (isCompetition.value) {
    // 현재 매장: 등록 매장(register_fk) 우선, 없으면 연결 매장
    const reg = info.register_fk ?? info.shopno ?? (d.tournamentshop || [])[0]?.shopno;
    const byName = shops.value.find((s) => s.shopname === (d.tournamentshop || [])[0]?.shopname)?.shopno;
    const cur = String(reg ?? byName ?? "");
    form.shopno = shops.value.some((s) => String(s.shopno) === cur) ? cur : String(byName ?? "");
    originalShop.value = form.shopno;
  }
  if (form.tourtype_fk === 2) {
    const tp = (await api.tourPlayerList(tourPk)) || {};
    invited.value = (tp.tourplayerlist || []).map((x) => x.playerinfo || {}).map((p) => ({ playerno: p.playerno, nickname: p.nickname, id: p.id }));
  }
};

onMounted(async () => {
  if (isCompetition.value) {
    const r = (await api.shopList()) || {};
    shops.value = (r.tournamentshoplist2 || []).slice().sort((a, b) => String(a.shopname).localeCompare(String(b.shopname), "ko"));
  }
  if (isEdit) await loadForEdit();
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';

.static { display: inline-flex; align-items: center; min-height: 40px; color: #35383B; }
.hint { font-size: 12px; color: #6e6e6e; font-weight: 400; }
td > .hint, td > p.hint { margin: 6px 0 0; }
.input-wrap { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.input-text.narrow { width: 120px; }
.input-text.wide { width: 100%; max-width: 760px; }
.textarea textarea { width: 100%; max-width: 760px; min-height: 90px; padding: 10px 12px; border: 1px solid #E5E7E8; border-radius: 4px; line-height: 1.6; resize: vertical; }
.period { display: flex; align-items: center; gap: 8px; max-width: 520px; :deep(.dp__main) { flex: 1 1 0; min-width: 0; } .wave { color: #6c7174; } }
.multi { display: flex; flex-wrap: wrap; gap: 10px 20px; }
.multi-item { display: flex; align-items: center; gap: 8px; .multi-lbl { min-width: 44px; font-size: 13px; color: #6e6e6e; white-space: nowrap; } .select-default { width: 200px; } }
.select-default.small { width: 120px; }
/* 공통 select/input 고정 폭(260/250px)이 좁은 칸을 넘어 옆 이름표를 덮던 문제 → 칸 폭에 맞춤 */
.multi-item .select-default, .select-default.small { select { width: 100% !important; min-width: 0 !important; } }
.prize-grid .input-text input, .input-text.narrow input { width: 100% !important; min-width: 0 !important; }
.prize-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 240px)); gap: 8px 10px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 6px 4px 10px; border: 1px solid #D4CBFF; background: #F4F1FF; border-radius: 999px; font-size: 13px; color: #35383B;
    small { color: #6e6e6e; }
    button { width: 20px; height: 20px; min-height: 0; border: 0; border-radius: 50%; background: transparent; cursor: pointer; font-size: 15px; line-height: 1; color: #6e6e6e; padding: 0; &:hover { background: #E7E0FF; } } } }
.search-result { list-style: none; margin: 10px 0 0; padding: 0; border: 1px solid #F0F1F2; border-radius: 4px; max-width: 560px; max-height: 240px; overflow-y: auto;
  li { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid #F0F1F2; font-size: 14px; &:last-child { border-bottom: 0; } small { color: #6e6e6e; margin-left: 4px; } } }
@media (max-width: 1024px) { .prize-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 768px) {
  .prize-grid { grid-template-columns: minmax(0, 1fr); }
  .multi-item { width: 100%; .select-default { flex: 1; width: auto; } }
  .period { max-width: none; }
}
</style>
