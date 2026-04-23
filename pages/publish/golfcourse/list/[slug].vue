<template>
    <div class="golf-course detail">
        <div class="detail-wrap" :class="{ 'is-move': detailMove }" ref="detailRef">
            <div class="top-area">
                <div class="title">XGUK-St. Andrews Links Old</div>
                <div class="sub">코드: C_1001</div>
            </div>
            <div class="view-area">
                <div class="img-area" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }">
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
                        <div class="info-area-cnt">18H/PAR72</div>
                    </div>
                    <div class="info-area-list">
                        <div class="info-area-tit">거리</div>
                        <div class="info-area-cnt">5830m</div>
                    </div>
                </div>
            </div>
            <div class="table-area">
                <div class="table-list">
                    <div class="table-caption">
                        <span>서브 코스 1</span>
                        <strong>Vally</strong>
                    </div>
                    <div class="table-wrap">
                        <table class="table type02">
                            <caption>서브 코스 1 Valley</caption>
                            <tbody>
                                <tr>
                                    <th>홀</th>
                                    <td>
                                        <span class="is-event">E</span>
                                        <span class="is-par">1</span>
                                    </td>
                                    <td>
                                        <span class="is-eagle">10</span>
                                    </td>
                                    <td>
                                        <span class="is-birdie">3</span>
                                    </td>
                                    <td>
                                        <span class="is-double-bogey">4</span>
                                    </td>
                                    <td>
                                        <span class="is-triple-bogey-over">5</span>
                                    </td>
                                    <td>
                                        <span class="bg-white">6</span>
                                    </td>
                                    <td>
                                        <span class="is-bogey">7</span>
                                    </td>
                                    <td>8</td>
                                    <td>9</td>
                                    <td>36</td>
                                </tr>
                                <tr>
                                    <th>파</th>
                                    <td></td>
                                    <td>1</td>
                                    <td></td>
                                    <td>0</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <th>타수</th>
                                    <td>1</td>
                                    <td>10</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                    <td>8</td>
                                    <td>9</td>
                                    <td>-1</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                <div class="table-list">
                    <div class="table-caption">
                        <span>서브 코스 2</span>
                        <strong>Vally</strong>
                    </div>
                    <div class="table-wrap">
                        <table class="table type02">
                            <caption>서브 코스 2 Valley</caption>
                            <tbody>
                                <tr>
                                    <th>홀</th>
                                    <th>1</th>
                                    <th>10</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>36</th>
                                </tr>
                                <tr>
                                    <th>파</th>
                                    <th></th>
                                    <th>1</th>
                                    <th></th>
                                    <th>0</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>0</th>
                                </tr>
                                <tr>
                                    <th>타수</th>
                                    <th>1</th>
                                    <th>10</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>-1</th>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
                <div class="table-list">
                    <div class="table-caption">
                        <span>서브 코스 3</span>
                        <strong>Vally</strong>
                    </div>
                    <div class="table-wrap">
                        <table class="table type02">
                            <caption>서브 코스 3 Valley</caption>
                            <tbody>
                                <tr>
                                    <th>홀</th>
                                    <th>1</th>
                                    <th>10</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>36</th>
                                </tr>
                                <tr>
                                    <th>파</th>
                                    <th></th>
                                    <th>1</th>
                                    <th></th>
                                    <th>0</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>1</th>
                                    <th>0</th>
                                </tr>
                                <tr>
                                    <th>타수</th>
                                    <th>1</th>
                                    <th>10</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>9</th>
                                    <th>-1</th>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                </div>
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/publish/golfcourse/list" class="btn-md-line">목록</nuxt-link>
                <button type="button" class="btn-md-fill btn-primary-purple" @click="handleEdit">수정</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";

const detailRef  = ref();
const detailMove = ref(false);
useIntersectionObserver(detailRef, ([{ isIntersecting }]) => {
    if (isIntersecting) detailMove.value = true;
}, { threshold: 0 });
const router = useRouter();

const courseData = {
    field: 2,
    green: 3,
    par: 72,
    distance: 5830
}

const handleEdit = () => {
    router.push(`/publish/golfcourse/edit/0`)
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>