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
                                    <input type="text" v-model="form.coursename" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>코드</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" v-model="form.coursecode" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>홀 수</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" v-model="holenum" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>파 수</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" v-model="form.par" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 수</th>
                            <td>
                                <div class="select-default">
                                    <select v-model="form.subcoursecnt">
                                        <option value="1">1</option>
                                        <option value="1">2</option>
                                        <option value="1">3</option>
                                        <option value="1">4</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 1</th>
                            <td>
                                <div class="course-wrap">
                                    <div class="input-text">
                                        <input type="text" value="Hill course">
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
                                        <input type="text" value="Hill course">
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
import { useIntersectionObserver } from "@vueuse/core";
import { reactive } from "vue";
import { useCourseApi } from "~/api/course";

const { _courseWrite } = useCourseApi();
const form = reactive({
  coursename: "",
  coursecode: "",
  holesum: "",
  parsum: "",
  subcourselistcnt: 2,

  subcourse: {
    subcoursename: ["", "", "", ""],
    subcourseparsum: ["", "", "", ""],
    subcoursehole: [
      {
        hole: [1,2,3,4,5,6,7,8,9],
        par: [0,0,0,0,0,0,0,0,0],
        handicap: [0,0,0,0,0,0,0,0,0],
      },
      {
        hole: [1,2,3,4,5,6,7,8,9],
        par: [0,0,0,0,0,0,0,0,0],
        handicap: [0,0,0,0,0,0,0,0,0],
      },
      {
        hole: [1,2,3,4,5,6,7,8,9],
        par: [0,0,0,0,0,0,0,0,0],
        handicap: [0,0,0,0,0,0,0,0,0],
      },
      {
        hole: [1,2,3,4,5,6,7,8,9],
        par: [0,0,0,0,0,0,0,0,0],
        handicap: [0,0,0,0,0,0,0,0,0],
      },
    ],
  },

  filename: null,

  status: "0",
  viewflag: "0",

  field: "",
  green: "",

  area: "",
  country: "",

  contents: "",
});

// 파일 관련
const fileInput = ref(null);
const previewImage = ref(null);
const fileName = ref("");
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

const handleSave = async () => {
  try {
    const formData = new FormData();

    formData.append("coursename", form.coursename);
    formData.append("coursecode", form.coursecode);
    formData.append("holesum", form.holesum);
    formData.append("parsum", form.parsum);
    formData.append("subcourselistcnt", form.subcourselistcnt);

    // 서브코스
    for (let i = 0; i < Number(form.subcourselistcnt); i++) {
      formData.append(
        `subcoursename[${i}]`,
        form.subcourse.subcoursename[i] || ""
      );

      formData.append(
        `subcourseparsum[${i}]`,
        form.subcourse.subcourseparsum[i] || ""
      );

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

    // 파일
    if (form.filename) {
      formData.append("filename", form.filename);
    }

    formData.append("status", form.status);
    formData.append("viewflag", form.viewflag);
    formData.append("field", form.field);
    formData.append("green", form.green);
    formData.append("country", form.country);
    formData.append("area", form.area);
    formData.append("contents", form.contents);

    const res = await _courseWrite(formData);

    if (res.code === 200) {
      alert(res.message || "등록되었습니다.");
      navigateTo("/golfcourse/list");
    } else {
      alert(res.message || "등록에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    alert("저장 중 오류가 발생했습니다.");
  }
};

const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>