<template>
    <div class="golf-course detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">{{ courseData.coursename || '-' }}</div>
                <div class="sub">코드: {{ courseData.coursecode || '-' }}</div>
            </div>
            <div class="view-area">
                <div class="img-area" :style="{
                    backgroundImage: `url('${common.getImg(
                        courseData.imgurl,
                    )}')`,
                    }">
                    <span class="label">T</span>
                </div>
                <div class="info-area">
                    <div class="info-area-list">
                        <div class="info-area-tit">코스난이도</div>
                        <div class="info-area-cnt">
                            <ul class="star">
                                <li class="star-list type-yellow" :class="{ 'is-active': index <= Number(courseData.field) }" v-for="index in 5" :key="index"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="info-area-list">
                        <div class="info-area-tit">그린난이도</div>
                        <div class="info-area-cnt">
                            <ul class="star">
                                <li class="star-list type-teal" :class="{ 'is-active': index <= Number(courseData.green) }" v-for="index in 5" :key="index"></li>
                            </ul>
                        </div>
                    </div>
                    <div class="info-area-list">
                        <div class="info-area-tit">홀/파</div>
                        <div class="info-area-cnt">{{ courseData.hole || '-' }}H/PAR {{ courseData.par || '-' }}</div>
                    </div>
                    <div class="info-area-list">
                        <div class="info-area-tit">거리</div>
                        <div class="info-area-cnt">{{common.n2(courseData.distance) || '-' }}m</div>
                    </div>
                </div>
            </div>
            <div class="table-area">
                <div
                class="table-list"
                v-for="(course, idx) in subCourseList"
                :key="course.subcourseno"
                >
                <div class="table-caption">
                    <span>서브 코스 {{ idx + 1 }}</span>
                    <strong>{{ course.title }}</strong>
                </div>

                <div class="table-wrap">
                    <table class="table type02">
                    <tbody>
                        <!-- 홀 -->
                        <tr>
                        <th>홀</th>
                        <td
                            v-for="hole in course.subcoursehole"
                            :key="hole.hole_no"
                            @click="modalOpen(hole.hole_no, idx + 1)">
                        {{ hole.hole_no }}
                        </td>
                        <td>{{ course.subparcnt }}</td>
                        </tr>

                        <!-- 파 -->
                        <tr>
                        <th>파</th>
                        <td
                            v-for="hole in course.subcoursehole"
                            :key="`par-${hole.hole_no}`"
                            @click="modalOpen(hole.hole_no, idx + 1)"
                        >
                            {{ hole.par_score }}
                        </td>
                        <td>{{ course.base_par }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/golfcourse/list" class="btn-md-line">목록보기</nuxt-link>
                <button type="button" class="btn-md-fill btn-primary-purple" @click="handleEdit">수정하기</button>
            </div>
        </div>

        <!-- 골프 코스 모달 -->
        <modal-golf-course 
            :isOpen="modals.modalGolfCourse" 
            @update:isOpen="modals.modalGolfCourse = $event"
            :holeData="holeData"
            :eventList="eventList"
        />
    </div>
</template> 
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useCourseApi } from "~/api/course";
import { useCommon } from "@/utils/common";

// 2026.06.18[cgnoh]: 공통 함수
const common = useCommon();

// 2026.06.18[cgnoh]: 라우터 관련
const route = useRoute();
const router = useRouter();

// 2026.06.18[cgnoh]: api 관련
const { _courseView, _courseHoleView } = useCourseApi();

// 2026.06.18[cgnoh]: 홀 데이터
const holeData = ref({});

// 2026.06.18[cgnoh]: 이벤트 리스트
const eventList = ref([]);

// 2026.06.18[cgnoh]: 코스 기본 정보
const courseData = ref({});

// 2026.06.18[cgnoh]: 서브코스 목록
const subCourseList = ref([]);

// 2026.06.18[cgnoh]: 통합관리코스 상세 조회
const getCourseDetail = async () => {
    try {
        const res = await _courseView(route.params.slug);
        const info = res.coursebasicinfo || {};
        courseData.value = {
            coursename: info.coursename || "", // 코스이름
            coursecode: info.coursecode || "", // 코스코드
            // 2026-09-14: course_image_url이 "/"(사진없음)이면 기본이미지로. getImg가 s3BucketUrl 베이스를 붙이므로 path 접두 불필요
            imgurl: (info.course_image_url && info.course_image_url !== "/") ? info.course_image_url : "",
            field: info.field || 0, // 코스 난이도
            green: info.green || 0, // 그린 난이도 
            hole: info.holesum || 0, // 홀
            par: info.parsum || 0,  // 파
            distance: info.distance || 0, // 거리
        }; 
        subCourseList.value = res.subcourse || [];
    } catch (err) {
        console.error(err);
    }
};

// 2026.06.18[cgnoh]: 통합관리코스홀 상세 조회
const getCourseHoleDetail = async (params) => {
  try {
    const res = await _courseHoleView(
      params.courseno,
      params.hole_pk,
      params.subcourseseq
    );

    holeData.value = {
      ...res.courseholeview,
      hole: params.hole_pk,
      coursubtype: params.subcourseseq,
    };
    eventList.value = res.eventlist;
    eventList.value = res.eventlist || [];
  } catch (err) {
    console.error(err);
  }
};

// 2026.06.18[cgnoh]: 인터렉션 관련
const detailRef  = ref();
const detailMove = ref(false);
useIntersectionObserver(detailRef, ([{ isIntersecting }]) => {
    if (isIntersecting) detailMove.value = true;
}, { threshold: 0 });

// 2026.06.18[cgnoh]: 수정 페이지 이동
const handleEdit = () => {
    router.push(`/golfcourse/list/edit/${route.params.slug}`);
};


// 2026.06.18[cgnoh]: 모달 관련
// 2026-09-16: subcourseseq(=백엔드 coursubtype)는 par_score가 아니라 코스타입코드(1=1~9,2=10~18).
//   서브코스는 type_fk ASC로 정렬되고 type_code=type_fk-1 이므로 idx+1이 코스타입코드와 일치(근거: tg_coursetype, courseholeview_get CT.type_code)
const modals = reactive({});
const modalOpen = async (hole_pk, subcourseseq) => {
  modals.modalGolfCourse = true;

  document.body.classList.add("is-hidden");

  await getCourseHoleDetail({
    courseno: route.params.slug,
    hole_pk,
    subcourseseq,
  });
};

onMounted(() => {
    getCourseDetail();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '코스 상세',
  meta: [
    { name: 'description', content: '코스관리 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>