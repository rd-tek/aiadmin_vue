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
                        <tr>
                            <th>서브 코스 1</th>
                            <td>
                                <div class="course-wrap">
                                    <div class="input-text">
                                        <input
                                            type="text"
                                            v-model="form.subcourse.subcoursename"
                                        />
                                    </div>
                                    <div class="table-area type02">
                                        <div class="table-list">
                                            <div class="table-wrap">
                                                <table class="table type02 is-move">
                                                    <tbody>
                                                        <tr>
                                                            <th>홀</th>
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[0].hole" :key="index">{{ item }}</td>
                                                            <td>합계</td>
                                                        </tr>
                                                        <tr>
                                                            <th>파</th>
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[0].par" :key="index">
                                                                <div class="input-text">
                                                                    <input type="text" :value="item" disabled>
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
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[0].handicap" :key="index">
                                                                <div class="input-text">
                                                                    <input type="text" :value="item" disabled>
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
                        </tr>
                        <tr>
                            <th>서브 코스 2</th>
                            <td>
                                <div class="course-wrap">
                                    <div class="input-text">
                                        <input
                                            type="text"
                                            v-model="form.city"
                                        />
                                    </div>
                                    <div class="table-area type02">
                                        <div class="table-list">
                                            <div class="table-wrap">
                                                <table class="table type02 is-move">
                                                    <tbody>
                                                        <tr>
                                                            <th>홀</th>
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[1].hole" :key="index">{{ item }}</td>
                                                            <td>합계</td>
                                                        </tr>
                                                        <tr>
                                                            <th>파</th>
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[1].par" :key="index">
                                                                <div class="input-text">
                                                                    <input type="text" :value="item" disabled>
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
                                                            <td v-for="(item, index) in form.subcourse.subcoursehole[1].handicap" :key="index">
                                                                <div class="input-text">
                                                                    <input type="text" :value="item" disabled>
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
                        </tr>
                        <tr>
                            <th>코스이미지</th>
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
                                        <input type="checkbox" id="chk_0" name="chk_0" v-model="form.status"> 
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
                                        <input type="checkbox" id="chk_1" name="chk_1" v-model="form.viewflag">
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
                                    <input type="text" v-model="form.area" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>국가</th>
                            <td>
                                <div class="select-default m-w-100">
                                    <select v-model="form.country" required>
                                        <option value="7">대한민국</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" v-model="form.contents" required>
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
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCourseApi } from "~/api/course";

const route = useRoute();

const {
  _courseView,
  _courseEdit,
} = useCourseApi();

const tableRef = ref();
const tableMove = ref(false);

useIntersectionObserver(
  tableRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
  },
  { threshold: 0 }
);

const fileInput = ref(null);
const previewImage = ref(null);
const fileName = ref("");

const form = reactive({
        coursename: "",
        coursecode: "",
        holesum: "",
        parsum: "",
        subcourselistcnt: "2",
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
        filename: "",
        status: "0",
        viewflag: "",
        field: "",
        green: "",
        country: "",
        area: "",
        contents: "",
        path: "",
        image: "",
});

const subCourseList = ref([]);

const triggerFile = () => {
  fileInput.value?.click();
};

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

// 상세조회
const getCourseDetail = async () => {
  try {
    const res = await _courseView(route.params.slug);

    const info = res.coursebasicinfo || {};

    Object.assign(form, {
      coursename: info.coursename || "",
      coursecode: info.coursecode || "",
      holesum: info.holesum || 0,
      parsum: info.parsum || 0,
      subcoursecnt: info.subcoursecnt || 0,
      field: info.field || 0,
      green: info.green || 0,
      city: info.city || "",
      country: info.country || "",
      description: info.description || "",
      useyn: info.useyn || "Y",
      displayyn: info.displayyn || "Y",
    });

    subCourseList.value = res.subcourse || [];
  } catch (err) {
    console.error(err);
  }
};

// 저장
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
  formData.append("country", form.country);
  formData.append("area", form.area);
  formData.append("contents", form.contents);

  // 서브코스 정보
  formData.append("type_fk[]", 1);
  formData.append("subcoursename[]", "OUT");
  formData.append("subcourseparsum[]", 36);

  // 홀정보
  formData.append("hole[0][0]", 1);
  formData.append("par[0][0]", 4);
  formData.append("handicap[0][0]", 1);

  await _courseEdit(route.params.slug, formData);
};

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