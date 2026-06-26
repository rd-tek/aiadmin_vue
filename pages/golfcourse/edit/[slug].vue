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
                                    <input
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
                                    <input
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
                                    <input
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
                                    <input
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
                                    <select v-model="form.subcourselistcnt">
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
                                            <input
                                                type="text"
                                                v-model="form.subcourse.subcoursename[index]"
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
                                                                    <button type="button" @click="modalOpen(form)" class="link">{{ item }}</button>
                                                                </td>
                                                                <td>합계</td>
                                                            </tr>
                                                            <tr>
                                                                <th>파</th>
                                                                <!-- <td v-for="(item, j) in form.subcourse.subcoursehole[i].par" :key="j">
                                                                     <div class="input-text">
                                                                        <input type="text" :value="item" disabled>
                                                                    </div>
                                                                </td> -->
                                                                <td v-for="(item, j) in subcourse[i]?.subcoursehole" :key="j">
                                                                    {{ item.par_score }}
                                                                </td>
                                                                <td>
                                                                    <div class="input-text">
                                                                        <input type="text" value="-" disabled>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>핸디캡</th>
                                                                <!-- <td v-for="(item, index) in form.subcourse.subcoursehole[0].handicap" :key="index">
                                                                    <div class="input-text">
                                                                        <input type="text" :value="item" disabled>
                                                                    </div>
                                                                </td> -->
                                                                <td v-for="(item, j) in subcourse[i]?.subcoursehole" :key="j">
                                                                    {{ item.handicap }}
                                                                </td>
                                                                <td>
                                                                    <div class="input-text">
                                                                        <input type="text" value="-" disabled>
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
                                        <input
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
                                        <div class="select-default">
                                            <select v-model="form.field" required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <span class="label">그린</span>
                                        <div class="select-default">
                                            <select v-model="form.green" required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td>
                                <div class="input-text">
                                    <input 
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
                                    <select v-model="form.country" required>
                                        <option value="5">대한민국</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td>
                                <div class="text-area">
                                    <textarea 
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
const modalOpen = async (item) => {
    selectedItem.value = item;
    modals['modalCourseWrite'] = true;
    document.querySelector('body').classList.add('is-hidden');
}

// 2026.06.16[cgnoh]: 라우터 관련
const route = useRoute();

// 2026.06.16[cgnoh]: api 관련
const {
  _courseView,
  _courseEdit,
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
    console.log(res.subcourse)
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
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>