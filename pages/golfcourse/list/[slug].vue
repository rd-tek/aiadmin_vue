<template>
    <div class="golf-course detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">{{ courseData.coursename }}</div>
                <div class="sub">코드: {{ courseData.coursecode }}</div>
            </div>
            <div class="view-area">
                <div class="img-area" :style="{
                    backgroundImage: `url('${common.getImg(
                        courseData.path + '/' + courseData.imgurl,
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
                        <div class="info-area-cnt">{{ courseData.hole }}H/PAR {{ courseData.par }}</div>
                    </div>
                    <div class="info-area-list">
                        <div class="info-area-tit">거리</div>
                        <div class="info-area-cnt">{{courseData.distance}}m</div>
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
                            @click="modalOpen(hole.hole_no, hole.par_score)">
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
                            @click="modalOpen(hole.hole_no, hole.par_score)"
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

const common = useCommon();
const route = useRoute();
const router = useRouter();
const { _courseView, _courseHoleView } = useCourseApi();
const holeData = ref({});
const eventList = ref([]);

// 코스 기본 정보
const courseData = ref({});

// 서브코스 목록
const subCourseList = ref([]);

// 상세 조회
const getCourseDetail = async () => {
    try {
        const res = await _courseView(route.params.slug);
        console.log(res, 'res')
        const info = res.coursebasicinfo || {};
        courseData.value = {
            coursename: info.coursename || "",
            coursecode: info.coursecode || "",
            imgurl: info.course_image_url || "",
            field: info.field || 0,
            green: info.green || 0,
            hole: info.holesum || 0,
            par: info.parsum || 0, 
            distance: info.distance || 0,
        }; 
        subCourseList.value = res.subcourse || [];
    } catch (err) {
        console.error(err);
    }
};

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

// 홀 점수에 따른 CSS 클래스 반환
const getHoleClass = (score, par) => {
    if (score == null || par == null) return "";
    const diff = Number(score) - Number(par);
    if (diff <= -2) return "is-eagle";
    if (diff === -1) return "is-birdie";
    if (diff === 0) return "";
    if (diff === 1) return "is-bogey";
    if (diff === 2) return "is-double-bogey";
    return "is-triple-bogey-over";
};

const detailRef  = ref();
const detailMove = ref(false);
useIntersectionObserver(detailRef, ([{ isIntersecting }]) => {
    if (isIntersecting) detailMove.value = true;
}, { threshold: 0 });

// 수정 페이지 이동
const handleEdit = () => {
    router.push(`/golfcourse/edit/${route.params.slug}`);
};


// 모달 관련
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
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>