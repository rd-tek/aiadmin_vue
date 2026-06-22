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
                                             <input type="text" v-model="form.subcourse.subcoursename[i]" />
                                        </div>
                                        <div class="table-area type02">
                                            <div class="table-list">
                                                <div class="table-wrap">
                                                    <table class="table type02 is-move">
                                                        <tbody>
                                                            <tr>
                                                                <th>홀</th>
                                                                <td v-for="(item, j) in subcourse[i]?.subcoursehole" :key="j">
                                                                    <button type="button" @click="modalOpen(i, item)" class="link">{{ item.hole_no }}</button>
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
                                                                    <div class="input-text">
                                                                        <input type="number" v-model="subcourse[i].subcoursehole[j].par_score" />
                                                                    </div>
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
                                                                    <div class="input-text">
                                                                        <input type="number" v-model="subcourse[i].subcoursehole[j].handicap" />
                                                                    </div>
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
                                <div v-if="previewImage || form.course_image_url" style="margin-bottom: 8px;">
                                    <img 
                                        :src="previewImage || common.getImg(form.course_image_url)" 
                                        style="max-height: 80px; max-width: 200px; object-fit: contain;" 
                                    />
                                </div>
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

import { useCommon } from "@/utils/common";

const common = useCommon();

// 2026.06.16[cgnoh]: 선택된 홀 정보
const selectedItem = ref(null);

// 2026.06.16[cgnoh]: 모달 관련
const modals = reactive({ modalCourseWrite: false });
// modalOpen 수정
const modalOpen = async (subcourseIdx, holeItem) => {
    selectedItem.value = {
        coursename: form.coursename,
        subcoursename: form.subcourse.subcoursename[subcourseIdx],
        courseno: route.params.slug,                        
        coursubtype: subcourse.value[subcourseIdx].type_fk, 
        hole_no: holeItem.hole_no,
        contents: holeItem.contents,
        minimap_filename: holeItem.minimap_filename,
        grnmap1_filename: holeItem.grnmap1_filename,
        grnmap2_filename: holeItem.grnmap2_filename,
        movie_filename: holeItem.movie_filename,
    };
    modals['modalCourseWrite'] = true;
    document.querySelector('body').classList.add('is-hidden');
};

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
    const info = res.coursebasicinfo || {};
    subcourse.value = res.subcourse;

    Object.assign(form, {
        coursename: info.coursename || "",
        coursecode: info.coursecode || "",
        holesum: info.holesum || 0,
        parsum: info.parsum || 0,
        subcourselistcnt: String(res.subcourse?.length || 1),
        field: info.field || 0,
        green: info.green || 0,
        area: info.area || "",
        country: info.country || "",
        contents: info.contents || "",
        status: info.status ?? "0",
        viewflag: info.viewflag ?? "0",
        course_image_url: info.course_image_url || "", // 코스 이미지 경로
    });

    // 서브코스명/type_fk/parsum 매핑
    res.subcourse?.forEach((sc, i) => {
        form.subcourse.subcoursename[i] = sc.title || "";
        form.subcourse.type_fk[i] = sc.type_fk || "";
        form.subcourse.subcourseparsum[i] = sc.base_par || "";
    });

    subCourseList.value = res.subcourse || [];

  } catch (err) {
    console.error(err);
  }
};

// 2026.06.16[cgnoh]: 저장 핸들링
const handleSave = async () => {
    const formData = new FormData();

    formData.append("coursename", form.coursename);
    formData.append("coursecode", form.coursecode);
    formData.append("holesum", form.holesum);
    formData.append("subcourselistcnt", form.subcourselistcnt);
    formData.append("status", form.status);
    formData.append("viewflag", form.viewflag);
    formData.append("field", form.field);
    formData.append("green", form.green);
    formData.append("area", form.area);
    formData.append("country", form.country);
    formData.append("contents", form.contents);
    formData.append("parsum", form.parsum);

    if (form.filename instanceof File) {
        formData.append("filename", form.filename);
    }

    for (let i = 0; i < Number(form.subcourselistcnt); i++) {
        formData.append("type_fk[]", form.subcourse.type_fk[i]);
        formData.append("subcoursename[]", form.subcourse.subcoursename[i]);
        formData.append("subcourseparsum[]", form.subcourse.subcourseparsum[i]);

        for (let j = 0; j < 9; j++) {
            formData.append(`hole[${i}][${j}]`, subcourse.value[i].subcoursehole[j].hole_no);
            formData.append(`par[${i}][${j}]`, subcourse.value[i].subcoursehole[j].par_score);
            formData.append(`handicap[${i}][${j}]`, subcourse.value[i].subcoursehole[j].handicap);
        }
    }

    try {
        const res = await _courseEdit(route.params.slug, formData);
        if (res?.code === 200) {
            alert(res.message || '저장되었습니다.');
            await getCourseDetail(); // 저장 후 데이터 갱신
        } else {
            alert(res?.message || '저장에 실패했습니다.');
        }
    } catch (err) {
        console.error(err);
        alert('저장 중 오류가 발생했습니다.');
    }
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