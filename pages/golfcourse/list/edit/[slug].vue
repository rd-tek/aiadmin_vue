<template>
    <div class="golf-course edit">
        <div class="table-wrap">
            <div class="table type02" :class="{ 'is-move': tableMove }" ref="tableRef">
                <table>
                    <colgroup>
                        <col width="18%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>코스명</th>
                            <td>
                                <div class="input-text">
                                    <input aria-label="코스명"
                                        type="text"
                                        v-model="form.coursename"
                                        required
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>코드</th>
                            <td>
                                <div class="input-text">
                                    <input aria-label="코드"
                                        type="text"
                                        v-model="form.coursecode"
                                        required
                                    />
                                </div>
                            </td> 
                        </tr>
                        <tr>
                            <th>홀 수</th>
                            <td>
                                <div class="input-text">
                                    <input aria-label="홀 수"
                                        type="number"
                                        v-model="form.holesum"
                                        required
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>파 수</th>
                            <td>
                                <div class="input-text">
                                    <input aria-label="파 수"
                                        type="number"
                                        v-model="form.parsum"
                                        required
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 수</th>
                            <td>
                                <div class="select-default">
                                    <select aria-label="서브 코스 수 선택" v-model="form.subcourselistcnt">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr v-for="(anc, i) in subcoursecnt" :key="i">
                            <template v-if="i < form.subcourselistcnt">
                                <th>서브 코스 {{ anc }}</th>
                                <td>
                                    <div class="course-wrap">
                                        <div class="input-text">
                                            <input aria-label="서브 코스"
                                                type="text"
                                                v-model="form.subcourse.subcoursename[i]"
                                            />
                                        </div>
                                        <div class="table-area type02">
                                            <div class="table-list">
                                                <div class="table-wrap">
                                                    <table class="table type02 is-move">
                                                        <tbody>
                                                            <tr>
                                                                <th>홀</th>
                                                                <td v-for="(item, j) in form.subcourse.subcoursehole[i].hole" :key="j">
                                                                    <button type="button" @click="modalOpen(item, i)" class="link">{{ item }}</button>
                                                                </td>
                                                                <td>합계</td>
                                                            </tr>
                                                            <tr>
                                                                <th>파</th>
                                                                <td v-for="(item, j) in form.subcourse.subcoursehole[i]?.par" :key="j">
                                                                    <div class="input-text">
                                                                        <input :aria-label="`${j + 1}번 홀 파`" type="text" v-model="form.subcourse.subcoursehole[i].par[j]">
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="input-text">
                                                                        <input aria-label="파 합계" type="text" :value="(form.subcourse.subcoursehole[i]?.par || []).reduce((a, b) => a + Number(b || 0), 0)" disabled>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>핸디캡</th>
                                                                <td v-for="(item, j) in form.subcourse.subcoursehole[i]?.handicap" :key="j">
                                                                    <div class="input-text">
                                                                        <input :aria-label="`${j + 1}번 홀 핸디캡`" type="text" v-model="form.subcourse.subcoursehole[i].handicap[j]">
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="input-text">
                                                                        <input aria-label="핸디캡 합계" type="text" :value="(form.subcourse.subcoursehole[i]?.handicap || []).reduce((a, b) => a + Number(b || 0), 0)" disabled>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </template>
                        </tr>
                        <tr>
                            <th>코스 이미지</th>
                            <td>
                                <div class="input-wrap">
                                    <div class="input-text">
                                        <input aria-label="코스 이미지 파일 선택"
                                            type="file"
                                            ref="fileInput"
                                            @change="onFileChange"
                                            placeholder="파일을 선택하거나 여기에 드롭하세요."  
                                        />
                                        <button type="button" class="btn-file" @click="triggerFile">파일선택</button>
                                        <span class="name" v-if="fileName">{{ fileName }}</span>
                                        <span class="name placeholder" v-else>파일을 선택하거나 여기에 드롭하세요.</span>
                                    </div>
                                </div>
                                <div class="desc">
                                    <div class="desc-list">* 파일 총 용량은 최대 26MB까지 (파일당 최대 4MB 등록 가능)</div>
                                    <div class="desc-list">* JPG, JPEG, PNG, ZIP 유형만 가능</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>코스 사용 여부</th>
                            <td>
                                <div class="checkbox-list">
                                    <div class="check-box">
                                        <input 
                                            type="checkbox" 
                                            id="chk_0" 
                                            name="chk_0" 
                                            v-model="form.status" 
                                            true-value="0" 
                                            false-value="1"> 
                                        <label for="chk_0">
                                            <span class="check-box-item">
                                                <i class="item-line" />
                                            </span>
                                            <span class="check-box-txt">사용</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="checkbox-list">
                                    <div class="check-box">
                                        <input 
                                            type="checkbox" 
                                            id="chk_1" 
                                            name="chk_1" 
                                            v-model="form.viewflag" 
                                            true-value="0" 
                                            false-value="1">
                                        <label for="chk_1">
                                            <span class="check-box-item">
                                                <i class="item-line" />
                                            </span>
                                            <span class="check-box-txt">표시</span>
                                        </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>난이도</th>
                            <td>
                                <div class="select-wrap">
                                    <div class="select-list">
                                        <span class="label">필드</span>
                                        <!-- 2026-09-14: 난이도 1~5 select → 클릭 별점 UI (상세 view와 동일 마크업) -->
                                        <ul class="star">
                                            <li class="star-list type-yellow" :class="{ 'is-active': index <= Number(form.field) }" v-for="index in 5" :key="index" @click="form.field = index" style="cursor:pointer"></li>
                                        </ul>
                                    </div>
                                    <div class="select-list">
                                        <span class="label">그린</span>
                                        <ul class="star">
                                            <li class="star-list type-teal" :class="{ 'is-active': index <= Number(form.green) }" v-for="index in 5" :key="index" @click="form.green = index" style="cursor:pointer"></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td>
                                <div class="input-text">
                                    <input aria-label="지역" 
                                        type="text" 
                                        v-model="form.area"
                                        placeholder="지역명을 입력해주세요." 
                                        required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>국가</th>
                            <td>
                                <div class="select-default m-w-100">
                                    <select aria-label="국가 선택" v-model="form.country" required>
                                        <!-- 2026-09-14: 국가 정본=tm_country(country_pk→국가). 기존엔 5(대한민국) 1개뿐이라 타국가 코스 국가 미표시 -->
                                        <option value="1">미국</option>
                                        <option value="2">호주</option>
                                        <option value="3">중국</option>
                                        <option value="4">일본</option>
                                        <option value="5">대한민국</option>
                                        <option value="6">캐나다</option>
                                        <option value="7">영국</option>
                                        <option value="8">프랑스</option>
                                        <option value="9">기타</option>
                                        <option value="10">뉴질랜드</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td>
                                <div class="text-area">
                                    <textarea aria-label="설명" 
                                        v-model="form.contents"
                                        placeholder="설명을 입력해주세요." 
                                        required />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/golfcourse/list" class="btn-md-line">목록 보기</nuxt-link>
                <button type="button" class="btn-md-fill btn-primary-purple" @click="handleSave">저장하기</button>
            </div>
        </div>

        <!-- 코스 홀 정보 등록/수정 모달 -->
        <modal-course-write 
            :isOpen="modals.modalCourseWrite"
            :item="selectedItem"
            @update:isOpen="modals.modalCourseWrite = $event"/>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCourseApi } from "~/api/course";

// 2026.06.16[cgnoh]: 선택된 홀 정보
const selectedItem = ref(null);

// 2026.06.16[cgnoh]: 모달 관련
const modals = reactive({ modalCourseWrite: false });
// 2026-09-14: kradmin CourseEdit.showModal 참고 — 홀 클릭 시 courseholeview를 fetch해 홀 이미지/정보 표시.
// 기존엔 form 전체를 넘겨(홀 데이터 없이) 팝업이 비어 있었음.
const modalOpen = async (holeno, subIdx) => {
    // coursubtype = 서브코스 type_code(tg_coursetype: 1=1-9,2=10-18...). 서브코스 순번(1-based)과 일치. kradmin은 anc(1-based) 사용.
    const coursubtype = form.subcourse.type_fk?.[subIdx] ?? (subIdx + 1);
    try {
        const res = await _courseHoleView(route.params.slug, holeno, coursubtype);
        const chv = res?.courseholeview || {};
        selectedItem.value = {
            ...chv,
            courseno: route.params.slug,
            coursubtype: coursubtype,
            hole_no: holeno,
            coursename: form.coursename,
            subcoursename: form.subcourse.subcoursename[subIdx] || chv.subcoursename || "",
            // 백엔드는 *_name/*_url 반환 → 모달 existingKey(*_filename)에 매핑
            minimap_filename: chv.minimap_name || "",
            grnmap1_filename: chv.grnmap1_name || "",
            grnmap2_filename: chv.grnmap2_name || "",
            movie_filename: chv.movie_name || "",
        };
    } catch (err) {
        console.error(err);
        selectedItem.value = { courseno: route.params.slug, coursubtype: coursubtype, hole_no: holeno, coursename: form.coursename };
    }
    modals['modalCourseWrite'] = true;
    document.querySelector('body').classList.add('is-hidden');
}

// 2026.06.16[cgnoh]: 라우터 관련
const route = useRoute();

// 2026.06.16[cgnoh]: api 관련
const {
  _courseView,
  _courseEdit,
  _courseHoleView,
} = useCourseApi();

// 2026.06.16[cgnoh]: 폼 형태
const form = reactive({
    coursename: "", // 코스명
    coursecode: "", // 코드
    holesum: "", // 홀 수
    parsum: "", // 파 수
    subcourselistcnt: "2", // 서브 코스 수

    // 서브 코스
    subcourse: {
        subcourseseq: [],
        type_fk: [],
        subcoursename: [],
        subcourseparsum: [],
        subcoursehole: [
        {
            hole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            par: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            hole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            par: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            hole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            par: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            hole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            par: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            handicap: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        ],
    },
    filename: "", // 코스 이미지
    status: "0", // 코스 사용 여부(사용)
    viewflag: "0", // 코스 사용 여부(표시)
    field: "", // 난이도(필드)
    green: "", // 난이도(그린)
    area: "", // 지역
    country: "7", // 국가
    contents: "", // 설명
});

// 2026.06.16[cgnoh]: 서브 코스 갯수
const subcoursecnt = ref([1,2,3,4])

// 2026.06.16[cgnoh]: 파일 관련
const fileInput = ref(null);
const previewImage = ref(null);
const fileName = ref("");

// 2026.06.16[cgnoh]: 서브 코스 리스트
const subCourseList = ref([]);

// 2026.06.16[cgnoh]: 파일 트리거 이벤트
const triggerFile = () => {
  fileInput.value?.click();
};

// 2026.06.16[cgnoh]: 이미지 업로드 핸들링
const onFileChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  form.filename = file;
  fileName.value = file.name;

  const reader = new FileReader();

  reader.onload = () => {
    previewImage.value = reader.result;
  };

  reader.readAsDataURL(file);
};

const subcourse = ref({});

// 2026.06.16[cgnoh]: 상세조회
const getCourseDetail = async () => {
  try {
    const res = await _courseView(route.params.slug);
    const info = res.coursebasicinfo || {};
    subcourse.value = res.subcourse;
    

    Object.assign(form, {
        coursename: info.coursename || "", // 코스명
        coursecode: info.coursecode || "", // 코드
        holesum: info.holesum || 0, // 홀 수
        parsum: info.parsum || 0, // 파 수
        subcourselistcnt: String(
            info.subcoursecnt || res.subcourse?.length || 1
        ), // 서브 코스 수
        field: info.field || 0, // 난이도(필드)
        green: info.green || 0, // 난이도(그린)
        area: info.area || "", // 지역
        country: info.country || "", // 국가
        contents: info.contents || "", // 설명
        status: info.status ?? "0",
        viewflag: info.viewflag ?? "0",
    });

    // 2026-09-14: form.subcourse가 미채움(서브코스명 빈값, 파/핸디캡 편집불가)이던 것 → API(res.subcourse)로 채움.
    // 저장(handleSave)은 이미 form.subcourse.subcoursehole[i].par[j]를 전송하므로, 로드 시 채우면 편집·저장이 완성됨.
    if (Array.isArray(res.subcourse)) {
        form.subcourse.subcourseseq = res.subcourse.map((s) => s.subcourseseq);
        form.subcourse.type_fk = res.subcourse.map((s) => s.type_fk);
        form.subcourse.subcoursename = res.subcourse.map((s) => s.title || "");
        form.subcourse.subcourseparsum = res.subcourse.map((s) => s.subparcnt);
        form.subcourse.subcoursehole = res.subcourse.map((s) => ({
            hole: (s.subcoursehole || []).map((h) => Number(h.hole_no)),
            par: (s.subcoursehole || []).map((h) => Number(h.par_score)),
            handicap: (s.subcoursehole || []).map((h) => Number(h.handicap)),
        }));
    }

    subCourseList.value = res.subcourse || [];
    
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.16[cgnoh]: 저장 핸들링
const handleSave = async () => {
    const formData = new FormData();

    formData.append("coursename", form.coursename); // 코스명
    formData.append("coursecode", form.coursecode); // 코드
    formData.append("holesum", form.holesum); // 홀 수
    formData.append("subcourselistcnt", form.subcourselistcnt); // 파 수
    formData.append("status", form.status); // 
    formData.append("viewflag", form.viewflag);
    formData.append("field", form.field); // 난이도(필드)
    formData.append("green", form.green); // 난이도(그린)
    formData.append("area", form.area); // 지역
    formData.append("country", form.country); // 나라
    formData.append("contents", form.contents); // 설명
    formData.append("parsum", form.parsum);
    
    if (form.filename instanceof File) {
    formData.append("filename", form.filename);
    }

    // 서브코스
    for (
        let i = 0;
        i < Number(form.subcourselistcnt);
        i++
    ) {
    formData.append(
        "type_fk[]",
        form.subcourse.type_fk[i]
    );

    formData.append(
        "subcoursename[]",
        form.subcourse.subcoursename[i]
    );

    formData.append(
        "subcourseparsum[]",
        form.subcourse.subcourseparsum[i]
    );

    // 9홀 데이터
    for (let j = 0; j < 9; j++) {
        formData.append(
        `hole[${i}][${j}]`,
        form.subcourse.subcoursehole[i].hole[j]
        );

        formData.append(
        `par[${i}][${j}]`,
        form.subcourse.subcoursehole[i].par[j]
        );

        formData.append(
        `handicap[${i}][${j}]`,
        form.subcourse.subcoursehole[i].handicap[j]
        );
    }
    }

    await _courseEdit(route.params.slug, formData);
};

// 2026.06.16[cgnoh]: 인터렉션 관련
const tableRef = ref();
const tableMove = ref(false);
useIntersectionObserver(
  tableRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
  },
  { threshold: 0 }
);

onMounted(() => {
  getCourseDetail();
});

definePageMeta({
  layout: "default",
});

// 2026-10-06: 상세 탭 타이틀 (형제 상세와 같은 useHead 형식)
useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '코스 수정',
  meta: [
    { name: 'description', content: '코스관리 수정 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';

/* 2026-09-14: 난이도 별점 아이콘 — golf-course.scss는 .info-area-cnt 하위로만 스코프돼 수정폼 난이도(.select-list)엔 미적용이라 여기 재정의 */
.star {
  display: flex;
  align-items: center;
  gap: 5px;

  .star-list {
    background-image: url('/images/icon/icon_star_grey.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 22px;
    height: 22px;

    &.type-teal.is-active {
      background-image: url('/images/icon/icon_star_teal.png');
    }

    &.type-yellow.is-active {
      background-image: url('/images/icon/icon_star_yellow.png');
    }
  }
}
</style>