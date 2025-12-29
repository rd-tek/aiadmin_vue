<template>
  <div
    class="modal modal-preview"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">추천운동 등록</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="board final-report">
          <ul class="tab type06">
            <li
              class="tab-list"
              :class="{ 'is-active': currentTab === item.link }"
              :data-section-id="item.link"
              v-for="(item, index) in tabList"
              :key="index"
              @click="tabClick(item.link, index)"
            >
              {{ item.name }}
            </li>
          </ul>

          <!-- 코칭결과분석 -->
          <div class="cont" v-if="currentTab === 'report'">
            <div class="title" id="report">
              <h2 class="text">코칭 결과 분석</h2>
            </div>
            <div class="section">
              <div class="top-area">
                <div class="title">{{form.analysis?.nickname}}님의 코칭 결과입니다</div>
                <span class="sub">(Driver 기준)</span>
              </div>
              <p class="desc-area">
                {{ form.analysis?.coaching_result }}
              </p>
              <div class="chart-area">
                <div class="chart-box">
                  <p class="title">코칭 구질분석</p>
                  <div class="chart">
                    <chart-radar-2 :analysis="form.analysis" />
                  </div>
                </div>
                <div class="chart-box">
                  <div class="chart-box-list">
                    <p class="title">평균 비거리(m)</p>
                    <ul class="progress">
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.mine?.fit_distance
                              }}</span>
                          <span class="text">나의평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-orange"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.others?.fit_distance
                              }}</span>
                          <span class="text">전체평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-cyan"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="chart-box-list">
                    <p class="title">평균 캐리(m)</p>
                    <ul class="progress">
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.mine?.fit_carry
                              }}</span>
                          <span class="text">나의평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-orange"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.others?.fit_carry
                              }}</span>
                          <span class="text">전체평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-cyan"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="chart-box-list">
                    <p class="title">평균 볼속도(km/h )</p>
                    <ul class="progress">
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.mine?.fit_ball_speed
                              }}</span>
                          <span class="text">나의평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-orange"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                      <li class="progress-list">
                        <div class="progress-num">
                          <span class="num">{{
                                form.stats?.others?.fit_ball_speed
                              }}</span>
                          <span class="text">전체평균</span>
                        </div>
                        <div class="progress-bar">
                          <div
                            class="progress-bar-inner is-cyan"
                            :style="{ width: animatedProgress + '%' }"
                          ></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 원포인트레슨 -->
          <div class="cont" v-else-if="currentTab === 'lesson'">
            <div class="title" id="lesson">
              <h2 class="text">원포인트레슨</h2>
            </div>
            <div class="section">
              <div class="table-area" v-if="!isMobile">
                <table class="type01">
                  <colgroup>
                    <col width="12%" />
                    <col width="10%" />
                    <col width="*" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>구분동작</th>
                      <th>평가</th>
                      <th>내용</th>
                    </tr>
                  </thead>
                   <tbody>
                        <tr>
                          <td>
                            <span class="color-point">Address</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel1 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson1"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Back Swing</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel2 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson2"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Top Swing</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel3 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson3"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Down Swing</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel4 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson4"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Impact</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel5 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson5"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Follow Throw </span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel6 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson6"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">Finish</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{ form.analysis?.lessonlevel7 }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lesson7"
                            ></textarea>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <span class="color-point">총평</span>
                          </td>
                          <td>
                            <div class="border-box">
                              {{
                                (Number(
                                  form.analysis.lessonlevel1,
                                ) +
                                  Number(
                                    form.analysis.lessonlevel2,
                                  ) +
                                  Number(
                                    form.analysis.lessonlevel3,
                                  ) +
                                  Number(
                                    form.analysis.lessonlevel4,
                                  ) +
                                  Number(
                                    form.analysis.lessonlevel5,
                                  ) +
                                  Number(
                                    form.analysis.lessonlevel6,
                                  ) +
                                  Number(
                                    form.analysis.lessonlevel7,
                                  )) /
                                7
                              }}
                            </div>
                          </td>
                          <td>
                            <textarea
                              disabled
                              :value="form.analysis?.lessontotal"
                            ></textarea>
                          </td>
                        </tr>
                      </tbody>
                </table>
              </div>

              <div class="table-area" v-else>
                <table class="type01">
                  <thead>
                    <tr>
                      <th>
                        <div class="head-wrap">
                          <span class="text">구분동작</span>
                          <span class="text">평가</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Address</span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel1 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson1">
                              <textarea
                                :value="form.analysis?.lesson1"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>
                              내역이 없습니다.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Back Swing </span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel2 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson2">
                              <textarea
                                :value="form.analysis?.lesson2"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Top Swing </span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel3 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson3">
                              <textarea
                                :value="form.analysis?.lesson3"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>
                              내역이 없습니다.
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Down Swing </span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel4 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson4">
                              <textarea
                                :value="form.analysis?.lesson4"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Impact</span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel5 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson5">
                              <textarea
                                :value="form.analysis?.lesson5"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Follow Throw</span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel6 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson6">
                              <textarea
                                :value="form.analysis?.lesson6"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">Finish</span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">{{
                                  form.analysis?.lessonlevel7 || '-'
                                }}</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lesson7">
                              <textarea
                                :value="form.analysis?.lesson7"
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <div class="info-area">
                              <span class="info-area-list">
                                <span class="color-point">총평</span>
                              </span>
                              <span class="info-area-list">
                                <span class="border-box">-</span>
                              </span>
                            </div>
                            <div class="text-area" v-if="form.analysis?.lessontotal">
                              <textarea
                                :value="
                                  form.analysis?.lessontotal
                                "
                              ></textarea>
                            </div>
                            <div class="no-info" v-else>내역이 없습니다.</div>
                          </td>
                        </tr>
                      </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- 추천운동 -->
          <div class="cont" v-else-if="currentTab === 'recommend'">
            <div class="title" id="recommend">
              <h2 class="text">추천운동</h2>
            </div>
             <div class="section">
                  <div
                    class="img-area"
                    :style="{
                      backgroundImage: `url(${
                        common.getImg(
                          form.recommendations?.[0]
                            ?.thumbnail_url,
                        ) || '/images/default/img_recommend_01.png'
                      })`,
                    }"
                    @click="
                      openVideo(
                        form.recommendations?.[0]?.video_url,
                      )
                    "
                  />
                  <div class="table-area">
                    <table class="type02">
                      <tbody>
                        <tr>
                          <th>제목</th>
                          <td>
                            {{ form.recommendations?.[0]?.title || '-' }}
                          </td>
                        </tr>
                        <tr>
                          <th>추천 대상</th>
                          <td>
                            {{
                              form.recommendations?.[0]
                                ?.match_reason || '-'
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th>목적</th>
                          <td>
                            {{
                              form.recommendations?.[0]?.objective || '-'
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th>내용</th>
                          <td>
                            {{
                              form.recommendations?.[0]?.content || '-'
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="modalClose">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useCommon } from "@/utils/common";
import { useWindowSize } from "@vueuse/core";

const common = useCommon();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
  },
  item: {
    type: Object,
    default: () => ({}),
  },
});


// 이거 하나만 선언
const form = computed(() => props.item || {});


const emit = defineEmits(["update:isOpen"]);
const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

// 모바일 반응형 업데이트
const { width } = useWindowSize();
const isMobile = ref(false);
watch(
  width,
  (newWidth) => {
    isMobile.value = newWidth <= 1024;
  },
  { immediate: true },
);

const tabList = ref([
  {
    name: "리포트",
    link: "report",
  },
  {
    name: "원포인트레슨",
    link: "lesson",
  },
  {
    name: "추천 운동",
    link: "recommend",
  },
]);

const onePointLessonList = ref([
  {
    name: "Address",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Back Swing",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Top Swing",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Down Swing",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Impact",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Follow Throw",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "Finish",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
  {
    name: "총평",
    state: "A",
    desc: "1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. ",
  },
]);

const currentTab = ref("report");
const tabClick = (index) => {
  currentTab.value = index;
};

const targetProgress = ref(30);
const animatedProgress = ref(0);

onMounted(() => {
  const duration = 1000;
  const frameRate = 60;
  const totalFrames = Math.round(duration / (1000 / frameRate));
  let currentFrame = 0;

  const easeOutQuad = (t) => t * (2 - t);

  const animate = () => {
    currentFrame++;
    const progressRatio = currentFrame / totalFrames;
    const easedRatio = easeOutQuad(progressRatio);
    animatedProgress.value = Math.round(easedRatio * targetProgress.value);

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      animatedProgress.value = targetProgress.value;
    }
  };

  requestAnimationFrame(animate);

  //   const childIndex = Number(route.query.child);
  //   if (!isNaN(childIndex) && childIndex >= 0) {
  //     accordionIndex.value = childIndex;
  //   }
});

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
    window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});

</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
