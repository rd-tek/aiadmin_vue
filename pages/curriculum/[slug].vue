<template>
  <div class="my-coaching">
    <div class="my-coaching-wrap">
      <div class="curriculum">
        <div class="my-coaching-head">아카데미</div>
        <div class="my-coaching-list">
          <div class="content">
            <p class="sub">
              <span class="level">{{ coachingView.target_audience }}</span>
              <span class="text"
                >{{ coachingView.class_list?.length }}개의 클래스</span
              >
            </p>
            <h1 class="title">{{ coachingView.title }}</h1>
            <!-- <ul class="tag">
              <li
                class="tag-list"
                v-for="(item, index) in coachingView.tag_csv
                  ? coachingView.tag_csv.split(',')
                  : []"
                :key="index"
              >
                {{ item.trim() }}
              </li>
            </ul> -->
            <div class="desc">{{ coachingView.intro }}</div>
            <ul class="tab type01-a">
              <Swiper
                :modules="modules"
                :slides-per-view="'auto'"
                :navigation="navigationOptions"
              >
                <swiper-slide v-for="(item, index) in menuList" :key="index">
                  <li
                    class="tab-list"
                    :class="{ 'is-active': currentTab === index }"
                    :data-section-id="item.link"
                    @click.stop="tabClick(item.link, index)"
                  >
                    <span>{{ item.name }}</span>
                    <span class="num" v-if="item.count"
                      >({{ reviewData.listcnt }})</span
                    >
                  </li>
                </swiper-slide>
              </Swiper>
              <button type="button" class="swiper-prev" aria-label="이전">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 31.5C7.43959 31.5 0.500004 24.5604 0.500005 16C0.500006 7.43959 7.43959 0.499999 16 0.499999C24.5604 0.500001 31.5 7.43959 31.5 16C31.5 24.5604 24.5604 31.5 16 31.5Z"
                    fill="rgba(256,256,256,0.5)"
                    stroke="#E5E7E8"
                  />
                  <path
                    d="M18 11L13 16L18 21"
                    stroke="#676D73"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button type="button" class="swiper-next" aria-label="다음">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M16 31.5C24.5604 31.5 31.5 24.5604 31.5 16C31.5 7.43959 24.5604 0.499999 16 0.499999C7.43959 0.500001 0.500001 7.43959 0.500001 16C0.500002 24.5604 7.43959 31.5 16 31.5Z"
                    fill="rgba(256,256,256,0.5)"
                    stroke="#E5E7E8"
                  />
                  <path
                    d="M14 11L19 16L14 21"
                    stroke="#676D73"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </ul>
            <!-- <ul class="tab type01-a">
                            <li class="tab-list" 
                                :class="{ 'is-active': currentTab === index }"
                                :data-section-id="item.link"
                                v-for="(item, index) in menuList" :key="index" 
                                @click="tabClick(item.link, index)">
                                <span>{{ item.name }}</span>
                                <span class="num" v-if="item.count">(45)</span>
                            </li>
                        </ul> -->
            <div class="tab-cont">
              <section class="tab-cont-section">
                <h2 class="tit" id="list">학습목차</h2>
                <div class="cont">
                  <ul class="accordion">
                    <li
                      class="accordion-list"
                      v-for="(item, i) in coachingView.class_list || []"
                      :key="i"
                    >
                      <div
                        class="accordion-list-link"
                        @click="handleAccordion(i)"
                      >
                        <span
                          class="image"
                          :class="{ 'is-active': setDepthList.includes(i) }"
                        >
                          <img
                            src="/images/icon/icon_chevron_down.png"
                            alt="icon_chevron_down"
                          />
                        </span>
                        <span class="text">{{ item.title }}</span>
                      </div>
                      <transition
                        @before-enter="beforeEnter"
                        @enter="enter"
                        @before-leave="beforeLeave"
                        @leave="leave"
                      >
                        <ul
                          class="accordion-list-cont"
                          v-if="setDepthList.includes(i)"
                        >
                          <li
                            class="depth-list"
                            v-for="(depth, j) in item.step_list || []"
                            :key="j"
                          >
                            <!-- 비로그인 -->
                            <button
                              type="button"
                              class="depth-list-link"
                              @click="handleDepthList"
                            >
                              STEP{{ j + 1 }}. {{ depth.title }}
                            </button>
                            <!-- <transition name="fade">
                                                        <div class="toast-modal" ref="toastRef" v-if="toastShow">
                                                            <i class="icon" />
                                                            <p class="txt">로그인을 해주세요.</p>
                                                        </div>
                                                    </transition> -->
                          </li>
                        </ul>
                      </transition>
                    </li>
                  </ul>
                </div>
              </section>
              <section class="tab-cont-section">
                <h2 class="tit" id="introduce">코치 소개</h2>
                <div class="cont">
                  <div class="profile">
                    <div
                      class="profile-image"
                      :class="{
                        'no-data': coachingView.expert_master?.binary_filepath,
                      }"
                      :style="{
                        backgroundImage: `url(${common.getImg(
                          coachingView.expert_master?.binary_filepath,
                        )})`,
                      }"
                    ></div>
                    <strong class="text">{{
                      coachingView.expert_master?.nickname
                    }}</strong>
                  </div>
                  <article class="article" v-if="coachingView.expert_master">
                    <p v-if="coachingView.expert_master?.intro">
                      {{ coachingView.expert_master?.intro }}
                    </p>
                    <ul v-if="coachingView.expert_master?.record">
                      <li>{{ coachingView.expert_master?.record }}</li>
                    </ul>
                  </article>
                </div>
              </section>
              <section class="tab-cont-section">
                <h2 class="tit" id="review">수강평</h2>
                <div class="cont">
                  <div class="review">
                    <div class="review-box">
                      <p class="num">{{ coachingView.rating_avg }}</p>
                      <ul class="star">
                        <li class="star-list" v-for="i in 5" :key="i">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                          >
                            <defs>
                              <linearGradient
                                id="half-gradient"
                                x1="0"
                                y1="0"
                                x2="1"
                                y2="0"
                              >
                                <stop offset="50%" stop-color="#298097" />
                                <stop offset="50%" stop-color="#E0E0E0" />
                              </linearGradient>
                            </defs>
                            <path
                              d="M24.9338 8.97621C24.8552 8.74479 24.7106 8.54145 24.5178 8.39128C24.325 8.24112 24.0924 8.15071 23.8488 8.13121L16.7225 7.56496L13.6388 0.73871C13.5406 0.51885 13.3808 0.332111 13.1788 0.201031C12.9768 0.0699515 12.7412 0.000132349 12.5004 1.87973e-07C12.2596 -0.000131973 12.024 0.0694285 11.8218 0.200287C11.6197 0.331145 11.4597 0.517708 11.3613 0.73746L8.27753 7.56496L1.15128 8.13121C0.911852 8.15018 0.682955 8.23772 0.491977 8.38337C0.300998 8.52902 0.156024 8.72661 0.0743993 8.9525C-0.00722547 9.17838 -0.0220449 9.423 0.031714 9.65709C0.0854729 9.89118 0.205534 10.1048 0.377533 10.2725L5.64378 15.4062L3.78128 23.4712C3.72473 23.7153 3.74285 23.9708 3.83331 24.2045C3.92376 24.4382 4.08236 24.6393 4.28854 24.7818C4.49471 24.9242 4.73893 25.0014 4.98951 25.0033C5.24009 25.0052 5.48546 24.9317 5.69378 24.7925L12.5 20.255L19.3063 24.7925C19.5192 24.9338 19.7703 25.0066 20.0258 25.001C20.2813 24.9954 20.529 24.9117 20.7355 24.7611C20.942 24.6105 21.0975 24.4004 21.181 24.1588C21.2645 23.9172 21.272 23.6559 21.2025 23.41L18.9163 15.41L24.5863 10.3075C24.9575 9.97246 25.0938 9.44996 24.9338 8.97621Z"
                              :fill="getStarFill(i, coachingView.rating_avg)"
                            />
                          </svg>
                        </li>
                      </ul>
                      <div class="text">
                        {{ reviewData.listcnt }}개의 수강평
                      </div>
                    </div>

                    <ul class="review-wrap">
                      <li
                        class="review-list comment"
                        v-for="item in reviewData.list"
                        :key="item.review_pk"
                      >
                        <div class="review-list-info">
                          <div class="star-wrap">
                            <strong class="num">{{ item.rating }}.0</strong>
                            <ul class="star">
                              <li
                                class="star-list"
                                :class="{
                                  'is-active': v <= item.rating,
                                }"
                                v-for="(v, i) in 5"
                                :key="i"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none"
                                >
                                  <path
                                    d="M27.4338 11.4733C27.3552 11.2419 27.2106 11.0385 27.0178 10.8884C26.825 10.7382 26.5924 10.6478 26.3488 10.6283L19.2225 10.062L16.1388 3.23578C16.0406 3.01592 15.8808 2.82918 15.6788 2.6981C15.4768 2.56702 15.2412 2.4972 15.0004 2.49707C14.7596 2.49694 14.524 2.5665 14.3218 2.69736C14.1197 2.82822 13.9597 3.01478 13.8613 3.23453L10.7775 10.062L3.65128 10.6283C3.41185 10.6472 3.18296 10.7348 2.99198 10.8804C2.801 11.0261 2.65602 11.2237 2.5744 11.4496C2.49277 11.6755 2.47796 11.9201 2.53171 12.1542C2.58547 12.3882 2.70553 12.6019 2.87753 12.7695L8.14378 17.9033L6.28128 25.9683C6.22473 26.2124 6.24285 26.4679 6.33331 26.7016C6.42376 26.9353 6.58236 27.1364 6.78854 27.2788C6.99471 27.4213 7.23893 27.4984 7.48951 27.5003C7.74009 27.5023 7.98546 27.4288 8.19378 27.2895L15 22.752L21.8063 27.2895C22.0192 27.4309 22.2703 27.5037 22.5258 27.4981C22.7813 27.4925 23.029 27.4088 23.2355 27.2582C23.442 27.1076 23.5975 26.8974 23.681 26.6559C23.7645 26.4143 23.772 26.153 23.7025 25.907L21.4163 17.907L27.0863 12.8045C27.4575 12.4695 27.5938 11.947 27.4338 11.4733Z"
                                    fill="#E5E7E8"
                                  />
                                </svg>
                              </li>
                            </ul>
                          </div>
                          <div class="name">{{ item.nickname }}</div>
                          <p class="date">
                            {{ common.dateformat(item.regdate) }}
                          </p>
                        </div>
                        <div class="review-list-desc">{{ item.comment }}</div>
                      </li>
                    </ul>
                    <div
                      class="review-btn"
                      v-if="reviewData.listcnt > reviewData.list.length"
                    >
                      <button
                        type="button"
                        class="btn-more"
                        @click="handleMore"
                      >
                        <img
                          src="/public/images/icon/icon_arrow_down.png"
                          alt="icon_arrow_down"
                        />
                        <span class="text">더보기</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div class="floating-box">
            <div class="floating-box-image" v-if="coachingView.thumbnail">
              <img
                :src="common.getImg(coachingView.thumbnail)"
                alt="데니스 강 프로"
              />
              <span class="label">NEW</span>
            </div>
            <div class="floating-box-image" v-else>
              <div class="no-data"></div>
            </div>
            <div class="floating-box-info">
              <p class="category">
                <span class="level">{{ coachingView.target_audience }}</span>
                <span class="text"
                  >{{ coachingView.class_list?.length }}개의 클래스</span
                >
              </p>
              <h2 class="title">
                {{ coachingView.title }}
              </h2>
              <div class="mob-show">
                <!-- <ul class="tag">
                  <li
                    class="tag-list"
                    v-for="(item, index) in coachingView.tag_csv
                      ? coachingView.tag_csv.split(',')
                      : []"
                    :key="index"
                  >
                    {{ item.trim() }}
                  </li>
                </ul> -->
                <div class="desc">
                  {{ coachingView.intro }}
                </div>
              </div>
              <div class="cont">
                <dl class="cont-list">
                  <dt class="cont-list-tit">코치</dt>
                  <dd class="cont-list-desc">
                    {{ coachingView.expert_master?.nickname }}
                  </dd>
                </dl>
                <dl class="cont-list">
                  <dt class="cont-list-tit">난이도</dt>
                  <dd class="cont-list-desc">
                    {{ coachingView.target_audience }}
                  </dd>
                </dl>
                <dl class="cont-list">
                  <dt class="cont-list-tit">커리큘럼</dt>
                  <dd class="cont-list-desc">
                    클래스 {{ coachingView.class_list?.length }}개, 스탭
                    {{
                      coachingView.class_list?.reduce(
                        (a, c) => a + (c.step_list?.length || 0),
                        0,
                      )
                    }}
                    개
                  </dd>
                </dl>
              </div>
              <ul class="btn-wrap">
                <li class="btn-list">
                  <button type="button" class="btn-like">
                    <span class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <mask
                          id="mask0_662_2462"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect width="24" height="24" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_662_2462)">
                          <path
                            d="M12 20.3271L10.8963 19.3349C9.23858 17.8311 7.86775 16.5388 6.78375 15.4581C5.69975 14.3773 4.84075 13.4154 4.20675 12.5724C3.57275 11.7296 3.12983 10.9606 2.878 10.2656C2.626 9.57081 2.5 8.86572 2.5 8.15039C2.5 6.73122 2.9785 5.54306 3.9355 4.58589C4.89267 3.62889 6.08083 3.15039 7.5 3.15039C8.373 3.15039 9.198 3.35456 9.975 3.76289C10.752 4.17122 11.427 4.75681 12 5.51964C12.573 4.75681 13.248 4.17122 14.025 3.76289C14.802 3.35456 15.627 3.15039 16.5 3.15039C17.9192 3.15039 19.1073 3.62889 20.0645 4.58589C21.0215 5.54306 21.5 6.73122 21.5 8.15039C21.5 8.86572 21.374 9.57081 21.122 10.2656C20.8702 10.9606 20.4272 11.7296 19.7932 12.5724C19.1592 13.4154 18.3018 14.3773 17.221 15.4581C16.1403 16.5388 14.7679 17.8311 13.1038 19.3349L12 20.3271Z"
                            fill="#EF2B49"
                          />
                        </g>
                      </svg>
                    </span>
                    <span class="text">{{ coachingView.academy_like }}</span>
                  </button>
                </li>
                <!-- <li class="btn-list">
                                <button type="button" class="btn-save" @click="handleSave">
                                    <span class="icon" v-if="hasSave">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <mask id="mask0_662_2537" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                                <rect width="24" height="24" fill="#D9D9D9"/>
                                            </mask>
                                            <g mask="url(#mask0_662_2537)">
                                                <path d="M4 20V2.15851C4 1.55532 4.21538 1.04478 4.64615 0.626866C5.07692 0.208955 5.60318 0 6.22492 0H17.7751C18.3968 0 18.9231 0.208955 19.3538 0.626866C19.7846 1.04478 20 1.55532 20 2.15851V20L12 16.6704L4 20ZM5.84615 17.2537L12 14.6866L18.1538 17.2537V2.15851C18.1538 2.06657 18.1144 1.98239 18.0354 1.90597C17.9566 1.82935 17.8698 1.79104 17.7751 1.79104H6.22492C6.13015 1.79104 6.04339 1.82935 5.96462 1.90597C5.88564 1.98239 5.84615 2.06657 5.84615 2.15851V17.2537Z" fill="#1C1B1F"/>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="icon" v-else>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <mask id="mask0_1172_26574" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                                            <rect x="0.5" width="24" height="24" fill="#298097"/>
                                            </mask>
                                            <g mask="url(#mask0_1172_26574)">
                                            <path d="M4.5 2.15851V20L12.5 16.6704L20.5 20V2.15851C20.5 1.55532 20.2846 1.04478 19.8538 0.626866C19.4231 0.208955 18.8968 0 18.2751 0H6.72492C6.10318 0 5.57692 0.208955 5.14615 0.626866C4.71538 1.04478 4.5 1.55532 4.5 2.15851Z" fill="#298097"/>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="text">380</span>
                                </button>
                            </li> -->
                <li class="btn-list">
                  <button type="button" class="btn-share" @click="handleShare">
                    <div class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="10"
                        viewBox="0 0 20 10"
                        fill="none"
                      >
                        <path
                          d="M9 10H5C3.61667 10 2.4375 9.5125 1.4625 8.5375C0.4875 7.5625 0 6.38333 0 5C0 3.61667 0.4875 2.4375 1.4625 1.4625C2.4375 0.4875 3.61667 0 5 0H9V2H5C4.16667 2 3.45833 2.29167 2.875 2.875C2.29167 3.45833 2 4.16667 2 5C2 5.83333 2.29167 6.54167 2.875 7.125C3.45833 7.70833 4.16667 8 5 8H9V10ZM6 6V4H14V6H6ZM11 10V8H15C15.8333 8 16.5417 7.70833 17.125 7.125C17.7083 6.54167 18 5.83333 18 5C18 4.16667 17.7083 3.45833 17.125 2.875C16.5417 2.29167 15.8333 2 15 2H11V0H15C16.3833 0 17.5625 0.4875 18.5375 1.4625C19.5125 2.4375 20 3.61667 20 5C20 6.38333 19.5125 7.5625 18.5375 8.5375C17.5625 9.5125 16.3833 10 15 10H11Z"
                          fill="#1C1B1F"
                        />
                      </svg>
                    </div>
                    <span class="text">URL복사</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="my-coaching-slide">
          <h2 class="tit" id="recommend">관련학습</h2>
          <div class="cont">
            <div class="swiper is-move">
              <Swiper
                :slides-per-view="2.2"
                :space-between="20"
                :breakpoints="{
                  768: {
                    slidesPerView: 4.5,
                  },
                }"
              >
                <swiper-slide
                  v-for="(item, index) in relatedData.list"
                  :key="index"
                >
                  <nuxt-link
                    class="cont-list-link"
                    :to="`/academy/${item.academy_pk}`"
                  >
                    <div class="slide-list">
                      <div class="img-area" v-if="item.thumbnail">
                        <img :src="common.getImg(item.thumbnail)" />
                        <!-- <div class="img-area-inner" :style="{ backgroundImage: `url(${common.getImg(item.thumbnail)})` }"></div> -->
                      </div>
                      <div class="img-area" v-else>
                        <div class="no-data" />
                      </div>
                      <div class="info-area">
                        <div class="label">
                          <span class="label-list">{{
                            item.target_audience
                          }}</span>
                          <span class="label-list">{{
                            item.expert_master?.nickname
                          }}</span>
                        </div>
                        <div class="desc">{{ item.title }}</div>
                      </div>
                    </div>
                  </nuxt-link>
                </swiper-slide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <transition name="toast-fade">
          <div class="toast-modal type02" ref="toastRef" v-if="messageShow">
            <div class="toast-modal-body">
                <div class="icon-area">
                    <i class="icon">✅</i>
                </div>
                <div class="cont-area">
                    복사되었습니다.
                </div>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="toast-bg" v-if="messageShow"></div>
        </transition> -->

    <toast-modal
      :isOpen="modals.toastModal"
      :toastMessage="toastMessage"
      @update:isOpen="modals.toastModal = $event"
    />
  </div>
</template>
<script setup>
import { useAcademyApi } from "~/api/academy";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "~/utils/common";
import { useHead } from "#app";

const route = useRoute();
const common = useCommon();
const academyApi = useAcademyApi();

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toastModal from "@/components/toast-ui/toast-modal.vue";

const academy_pk = Number(route.params.slug);

const coachingView = ref({});
// 네비게이션
const modules = [Navigation];
const navigationOptions = {
  prevEl: ".swiper-prev",
  nextEl: ".swiper-next",
};

const setDepthList = ref([]);
const reviewData = ref({
  listcnt: 0,
  list: [],
});
const relatedData = ref({
  list: [],
});

const currentTab = ref(0);
const menuList = [
  {
    name: "학습목차",
    link: "list",
  },
  {
    name: "코치 소개",
    link: "introduce",
  },
  {
    name: "수강평",
    link: "review",
    count: 30,
  },
  {
    name: "관련학습",
    link: "recommend",
  },
];

const tabClick = (sectionId, index) => {
  currentTab.value = index; // 탭 상태를 변경

  const targetSection = document.getElementById(sectionId); // 해당 id를 가진 DOM 요소 찾기

  if (targetSection) {
    const offset = 80; // 상단 여백 보정 (예: 고정된 헤더 높이)
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth", // 부드러운 스크롤 효과
    });
  }
};

const reviewPagenoRef = ref(1);

const reviewPageno = computed({
  get: () => Number(reviewPagenoRef.value) || 1,
  set: (v) => {
    reviewPagenoRef.value = v;
  },
});

const _coachingView = async () => {
  try {
    const res = await academyApi._coachingview(academy_pk);

    coachingView.value = res.view;

    const len = Array.isArray(coachingView.value.class_list)
      ? coachingView.value.class_list.length
      : 0;

    // ✅ 처음부터 전부 "열림" 상태로 하고 싶으면:
    setDepthList.value = Array.from({ length: len }, (_, i) => i);

    relatedData.value.list = res.relatedcoachinglist;
  } catch (err) {
    alert(err.message);
  }
};

const _reviewList = async () => {
  try {
    const res = await academyApi._reviewlist(academy_pk, {
      pageno: reviewPageno.value,
    });

    if (reviewPageno.value === 1) {
      // 첫 페이지 → 갈아끼우기
      reviewData.value.list = res.list;
    } else {
      // 2페이지 이후 → 누적
      reviewData.value.list = [...reviewData.value.list, ...res.list];
    }

    reviewData.value.listcnt = Number(res.listcnt);
  } catch (err) {
    alert(err.message);
  }
};

const handleAccordion = (index) => {
  const idx = setDepthList.value.indexOf(index);
  if (idx > -1) {
    setDepthList.value.splice(idx, 1);
  } else {
    setDepthList.value.push(index);
  }
};

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.transition = "all .4s ease";
  el.style.height = "0";
};

const getStarFill = (i, rating) => {
  rating = Number(rating);
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  if (i <= full) return "#298097";
  if (i === full + 1 && hasHalf) return "url(#half-gradient)"; // id 고정
  return "#E0E0E0";
};

// 토스트 이벤트
const toastShow = ref(false);
const toastRef = ref();
const handleDepthList = () => {
  toastShow.value = true;
  setTimeout(() => {
    toastShow.value = false;
  }, 1500);
};

const modals = reactive({ toastModal: false });
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastModal"] = true;
  toastMessage.value = message;
};

// 초기 보여줄 개수
const showCount = ref(5);

// 클릭 시 늘릴 개수
const step = 5;

// 더보기 버튼
const handleMore = () => {
  reviewPageno.value += 1;
  _reviewList();
};

const isStarActive = ref(0);
const handleReview = (item) => {
  if (item === 1) {
    isStarActive.value = 1;
  } else if (item === 2) {
    isStarActive.value = 2;
  } else if (item === 3) {
    isStarActive.value = 3;
  } else if (item === 4) {
    isStarActive.value = 4;
  } else if (item === 5) {
    isStarActive.value = 5;
  }
};

const hasLike = ref(false);
const handleLike = () => {
  hasLike.value = !hasLike.value;
};

const hasSave = ref(false);
const handleSave = () => {
  hasSave.value = !hasSave.value;
};

// 복사하기
const message = ref("");
const messageShow = ref(false);
const handleShare = async () => {
  if (!process.client) return; // SSR 방지

  const url = window.location.href; // 항상 현재 브라우저 URL 사용

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // 최신 브라우저
      await navigator.clipboard.writeText(url);
    } else {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    // 성공 메시지
    handleToast("복사가 완료되었습니다.");
  } catch (err) {
    // 실패 메시지
    handleToast("복사를 실패했습니다.");
  }
};

onMounted(async () => {
  await _coachingView();
  await _reviewList();
});

definePageMeta({
  layout: "sub-page",
});

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  title: "아카데미",
  meta: [{ name: "description", content: "아카데미 페이지 입니다." }],
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/my-coaching.scss";
</style>
