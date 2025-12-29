<template>
  <div class="academy">
    <!-- 최종 코칭 리포트(모바일) -->
    <div class="mob-show">
      <div class="info-area">
        <h2 class="title">{{ academyView.title }}</h2>
        <ul class="label">
          <li class="label-list">{{ academyView.target_audience }}</li>
          <li class="label-list">{{ academyView.expert_master?.nickname }}</li>
        </ul>
        <div class="btn-area">
          <button type="button" class="btn-like" aria-label="좋아요">
            <div class="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <mask
                  id="mask0_867_3907"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_867_3907)">
                  <path
                    d="M16.5 3.65039C17.7128 3.65039 18.7195 4.0287 19.5479 4.7832L19.7109 4.93945C20.5692 5.7979 21 6.85667 21 8.15039C21 8.80549 20.8851 9.45287 20.6523 10.0947V10.0957C20.4229 10.7287 20.0092 11.453 19.3936 12.2715C18.7784 13.0895 17.9381 14.0336 16.8672 15.1045C15.7948 16.1769 14.4295 17.4628 12.7695 18.9629L12 19.6543L11.2305 18.9629C9.57714 17.463 8.21285 16.1773 7.13672 15.1045C6.06272 14.0336 5.22143 13.0892 4.60645 12.2715C3.99082 11.453 3.57707 10.7287 3.34766 10.0957V10.0947C3.11493 9.45287 3 8.80549 3 8.15039C3 6.93755 3.37831 5.93093 4.13281 5.10254L4.28906 4.93945C5.14751 4.08117 6.20628 3.65039 7.5 3.65039C8.29137 3.65039 9.03662 3.83435 9.74219 4.20508C10.4481 4.57603 11.0682 5.11149 11.6006 5.82031L12 6.35254L12.3994 5.82031C12.9318 5.11149 13.5519 4.57603 14.2578 4.20508C14.9634 3.83435 15.7086 3.65039 16.5 3.65039Z"
                    stroke="#35383B"
                  />
                </g>
              </svg>
            </div>
            <span class="text">{{ academyView.enroll_cnt }}</span>
          </button>
          <div class="state type01">
            <nuxt-link to="/coaching/final-report" class="state-list color-teal"
              >코치리포트 등록</nuxt-link
            >
          </div>
        </div>
      </div>
      <ul class="tab type01-b">
        <li
          class="tab-list"
          :class="{ 'is-active': currentClass == item.class_pk }"
          :data-section-id="item.link"
          v-for="item in academyView.class_list"
          :key="item.class_pk"
          @click="tabMenuClick(item)"
        >
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <div class="tab-cont">
        <div
          class="tab-cont-list"
          :class="{
            'is-complete': item.completed_yn == '1',
          }"
          v-for="item in currentClassData.step_list || []"
          :key="item.step_pk"
        >
          <a
            class="tab-cont-list-link"
            :class="{
              'is-active': tabIndex === item.step_pk,
              'is-complete':
                item.mission_list?.[0]?.required_success_cnt ==
                item.mission_list?.[0]?.success_cnt,
              'is-current-complete':
                item.mission_list?.[0]?.required_success_cnt ==
                  item.mission_list?.[0]?.success_cnt &&
                tabIndex === item.step_pk,
            }"
            @click="handleMobAccordion(item)"
          >
            <span class="circle">
              <img src="/public/images/icon/icon_check_white.png" alt="icon_check_white" />
            </span>
            <span class="text">
              <span
                >{{ item.title }} ({{ item.mission_list?.[0]?.success_cnt }}/{{
                  item.mission_list?.[0]?.required_success_cnt
                }})
              </span>
              <img
                src="/images/icon/icon_arrow_down.png"
                alt="icon_arrow_down"
                v-if="item.step_pk"
              />
            </span>
          </a>
          <transition name="slide">
            <div class="tab-cont-list-depth" v-if="tabIndex === item.step_pk">
              <section class="academy-content" v-if="!swingPage">
                <div class="board">
                  <div class="title">
                    <h2 class="text">
                      {{ academyView.expert_master?.nickname }}
                    </h2>
                    <div class="state type01">
                      <div class="state-list color-grey">수강완료</div>
                    </div>
                  </div>
                  <div class="cont">
                    <h3 class="tit">학습 목표</h3>
                    <p class="desc">
                      {{ academyView.intro }}
                    </p>
                  </div>

                  <div
                    class="cont"
                    v-for="(item_, index_) in item.mission_list"
                    :key="index_"
                  >
                    <h3 class="tit">미션 조건</h3>
                    <ul class="cont-wrap">
                      <li class="cont-wrap-list">
                        <span class="text">{{ item_.title }}</span>
                        <div class="progress">
                          <span class="progress-bar">
                            <span
                              class="progress-bar-inner"
                              :style="{
                                width:
                                  Math.round(
                                    ((item_.success_cnt ?? 0) /
                                      (item_.required_success_cnt || 1)) *
                                      100,
                                  ) + '%',
                              }"
                            ></span>
                          </span>
                          <span class="progress-num"
                            ><strong>{{ item_.success_cnt }}</strong
                            >/{{ item_.required_success_cnt }}회(총
                            {{ item_.attempt_cnt }}회 시도)</span
                          >
                        </div>
                      </li>
                      <!-- <li class="cont-wrap-list">거리 10m</li>
                      <li class="cont-wrap-list">남은거리 4m</li> -->
                    </ul>
                    <div class="table">
                      <div class="table-head">
                        <div class="table-head-col col-1"></div>
                        <div class="table-head-col">거리</div>
                        <div class="table-head-col">결과</div>
                        <!-- <div class="table-head-col is-mob">매장</div> -->
                        <div class="table-head-col is-mob">클럽</div>
                        <div class="table-head-col is-mob">날짜</div>
                        <div class="table-head-col is-mob">스윙영상</div>
                      </div>
                      <div class="table-body">
                        <div
                          class="table-body-row"
                          v-for="(item__, index__) in item_.result_list"
                          :key="index__"
                        >
                          <div
                            class="table-body-flex"
                            @click="handleMobList(index__)"
                          >
                            <div class="table-body-col col-1">
                              #{{ item__.attempt_no }}
                            </div>
                            <div class="table-body-col">
                              <strong>{{ item__.measured_value }}m</strong>
                            </div>
                            <div class="table-body-col">
                              <span
                                class="color"
                                :class="{ point: item__.passed_yn == '1' }"
                                >{{
                                  item__.passed_yn == "1" ? "성공" : "실패"
                                }}</span
                              >
                              <button
                                type="button"
                                class="btn-arrow"
                                :class="{ 'is-active': mobListIndex === index__ }"
                              >
                                <img
                                  src="/public/images/icon/icon_arrow_down.png"
                                  alt="icon_arrow_down"
                                />
                              </button>
                            </div>
                            <!-- <div class="table-body-col is-mob">
                              {{ item.shop }}
                            </div> -->
                            <div class="table-body-col is-mob">
                              {{ item__.metric_code }}
                            </div>
                            <div class="table-body-col is-mob">
                              <span class="color">{{
                                common.dateformat(item__.regdate)
                              }}</span>
                            </div>
                            <div class="table-body-col is-mob">
                              <button
                                type="button"
                                class="btn-sm-line"
                                @click="goToSwing(item__.result_pk)"
                              >
                                영상
                              </button>
                            </div>
                          </div>
                          <transition
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @before-leave="beforeLeave"
                            @leave="leave"
                          >
                            <div
                              class="table-body-mob"
                              v-if="mobListIndex === index__"
                            >
                              <!-- <dl class="list">
                                <dt class="tit">매장</dt>
                                <dd class="cnt">{{ item.shop }}</dd>
                              </dl> -->
                              <dl class="list">
                                <dt class="tit">클럽</dt>
                                <dd class="cnt">{{ item__.metric_code }}</dd>
                              </dl>
                              <dl class="list">
                                <dt class="tit">날짜</dt>
                                <dd class="cnt">
                                  {{ common.dateformat(item__.regdate) }}
                                </dd>
                              </dl>
                              <dl class="list">
                                <dt class="tit">스윙영상</dt>
                                <dd class="cnt">
                                  <button
                                    type="button"
                                    class="btn-sm-line"
                                    @click="goToSwing(item__.result_pk)"
                                  >
                                    영상
                                  </button>
                                </dd>
                              </dl>
                            </div>
                          </transition>
                        </div>
                        <div class="no-info" v-if="item_.result_list.length === 0">내역이 없습니다.</div>
                      </div>
                    </div>
                    <!-- <div class="btn-wrap">
                      <button type="button" class="btn-sm-line btn-share" aria-label="공유">
                        <span class="icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <mask
                              id="mask0_867_3899"
                              style="mask-type: alpha"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                            >
                              <rect width="24" height="24" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_867_3899)">
                              <path
                                d="M17 22C16.1667 22 15.4583 21.7083 14.875 21.125C14.2917 20.5417 14 19.8333 14 19C14 18.9 14.025 18.6667 14.075 18.3L7.05 14.2C6.78333 14.45 6.475 14.6458 6.125 14.7875C5.775 14.9292 5.4 15 5 15C4.16667 15 3.45833 14.7083 2.875 14.125C2.29167 13.5417 2 12.8333 2 12C2 11.1667 2.29167 10.4583 2.875 9.875C3.45833 9.29167 4.16667 9 5 9C5.4 9 5.775 9.07083 6.125 9.2125C6.475 9.35417 6.78333 9.55 7.05 9.8L14.075 5.7C14.0417 5.58333 14.0208 5.47083 14.0125 5.3625C14.0042 5.25417 14 5.13333 14 5C14 4.16667 14.2917 3.45833 14.875 2.875C15.4583 2.29167 16.1667 2 17 2C17.8333 2 18.5417 2.29167 19.125 2.875C19.7083 3.45833 20 4.16667 20 5C20 5.83333 19.7083 6.54167 19.125 7.125C18.5417 7.70833 17.8333 8 17 8C16.6 8 16.225 7.92917 15.875 7.7875C15.525 7.64583 15.2167 7.45 14.95 7.2L7.925 11.3C7.95833 11.4167 7.97917 11.5292 7.9875 11.6375C7.99583 11.7458 8 11.8667 8 12C8 12.1333 7.99583 12.2542 7.9875 12.3625C7.97917 12.4708 7.95833 12.5833 7.925 12.7L14.95 16.8C15.2167 16.55 15.525 16.3542 15.875 16.2125C16.225 16.0708 16.6 16 17 16C17.8333 16 18.5417 16.2917 19.125 16.875C19.7083 17.4583 20 18.1667 20 19C20 19.8333 19.7083 20.5417 19.125 21.125C18.5417 21.7083 17.8333 22 17 22ZM17 20C17.2833 20 17.5208 19.9042 17.7125 19.7125C17.9042 19.5208 18 19.2833 18 19C18 18.7167 17.9042 18.4792 17.7125 18.2875C17.5208 18.0958 17.2833 18 17 18C16.7167 18 16.4792 18.0958 16.2875 18.2875C16.0958 18.4792 16 18.7167 16 19C16 19.2833 16.0958 19.5208 16.2875 19.7125C16.4792 19.9042 16.7167 20 17 20ZM5 13C5.28333 13 5.52083 12.9042 5.7125 12.7125C5.90417 12.5208 6 12.2833 6 12C6 11.7167 5.90417 11.4792 5.7125 11.2875C5.52083 11.0958 5.28333 11 5 11C4.71667 11 4.47917 11.0958 4.2875 11.2875C4.09583 11.4792 4 11.7167 4 12C4 12.2833 4.09583 12.5208 4.2875 12.7125C4.47917 12.9042 4.71667 13 5 13ZM17 6C17.2833 6 17.5208 5.90417 17.7125 5.7125C17.9042 5.52083 18 5.28333 18 5C18 4.71667 17.9042 4.47917 17.7125 4.2875C17.5208 4.09583 17.2833 4 17 4C16.7167 4 16.4792 4.09583 16.2875 4.2875C16.0958 4.47917 16 4.71667 16 5C16 5.28333 16.0958 5.52083 16.2875 5.7125C16.4792 5.90417 16.7167 6 17 6Z"
                                fill="#35383B"
                              />
                            </g>
                          </svg>
                        </span>
                        <span>공유</span>
                      </button>
                    </div> -->
                  </div>
                </div>
                <div class="review">
                  <div class="review-count">
                    <span>전체질문</span>
                    <span class="num">({{ qnaData.listcnt }})</span>
                  </div>
                  <template>
                    <!-- 댓글 영역 -->
                    <!-- 모바일용 Q&A 댓글 리스트 -->
                    <div class="review-reply">
                      <div
                        class="review-reply-list"
                        v-for="(th, i) in threads"
                        :key="'t' + (th.top?.comment_pk || i)"
                      >
                        <!-- ✅ 최상위 댓글 -->
                        <div class="review-reply-list-wrap" v-if="th.top">
                          <!-- 보기 모드 -->
                          <template v-if="inputShow !== th.top.comment_pk">
                            <div class="img-area">
                              <img
                                :src="
                                  th.top.member_photo_url
                                    ? common.getImg(th.top.member_photo_url)
                                    : '/images/button/btn_profile.png'
                                "
                                alt="profile"
                              />
                            </div>
                            <div class="info-area">
                              <div class="tit">{{ th.top.nickname }}</div>
                              <div class="date">
                                {{ common.dateformat(th.top.regdate) }}
                              </div>
                              <div class="desc">{{ th.top.content }}</div>

                              <div class="btn-wrap">
                                <button
                                  type="button"
                                  class="btn-comment"
                                  @click="handleComment(th.top)"
                                >
                                  <span class="text">답글쓰기</span>
                                </button>
                              </div>
                            </div>
                          </template>

                          <!-- 수정 모드 (원글) -->
                          <div class="review-writing" v-else>
                            <div class="name-area">
                              <span class="text">{{ th.top.nickname }}</span>
                            </div>
                            <div class="text-area">
                              <textarea
                                v-model="commentEditText"
                                placeholder="내용을 입력해주세요."
                              ></textarea>
                            </div>
                            <div class="attach-area">
                              <div class="btn-area">
                                <button
                                  type="button"
                                  class="btn-default btn-md-line"
                                  @click="handleCancel"
                                >
                                  취소
                                </button>
                                <button
                                  type="button"
                                  class="btn-primary-yellow btn-md-fill"
                                  @click="handleEditSubmit(th.top.comment_pk)"
                                >
                                  등록
                                </button>
                              </div>
                            </div>
                          </div>

                          <!-- 더보기 (원글) -->
                          <div
                            class="more-area"
                            v-if="inputShow !== th.top.comment_pk"
                          >
                            <transition name="fade">
                              <div
                                class="tooltip-container"
                                v-if="tooltipShow == th.top.comment_pk"
                              >
                                <div class="tooltip-body">
                                  <div class="cont">
                                    <div class="cont-list">
                                      <button
                                        type="button"
                                        class="btn-edit"
                                        @click="handleEdit(th.top.comment_pk)"
                                      >
                                        수정
                                      </button>
                                    </div>
                                    <div class="cont-list">
                                      <button
                                        type="button"
                                        class="btn-delete"
                                        @click="_qnaDrop(th.top.comment_pk)"
                                      >
                                        삭제
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </transition>
                            <button
                              type="button"
                              class="btn-more"
                              @click="toggleTooltip(th.top)"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <mask
                                  id="mask0"
                                  style="mask-type: alpha"
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="24"
                                  height="24"
                                >
                                  <rect width="24" height="24" fill="#ADB0B3" />
                                </mask>
                                <g mask="url(#mask0)">
                                  <path
                                    d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                                    fill="#ADB0B3"
                                  />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>

                        <!-- ✅ 대댓글 리스트 -->
                        <div
                          class="review-reply-depth"
                          v-if="th.replies && th.replies.length"
                        >
                          <div
                            class="review-reply-list-depth"
                            v-for="reply in th.replies"
                            :key="'r' + reply.comment_pk"
                          >
                            <!-- 보기 모드 (대댓글) -->
                            <template
                              v-if="replyInputShow !== reply.comment_pk"
                            >
                              <div class="img-area">
                                <img
                                  :src="
                                    reply.member_photo_url
                                      ? common.getImg(reply.member_photo_url)
                                      : '/images/button/btn_profile.png'
                                  "
                                  alt="profile"
                                />
                              </div>
                              <div class="info-area">
                                <div class="tit">{{ reply.nickname }}</div>
                                <div class="date">
                                  {{ common.dateformat(reply.regdate) }}
                                </div>
                                <div class="desc">{{ reply.content }}</div>
                              </div>
                            </template>

                            <!-- 수정 모드 (대댓글) -->
                            <div class="review-writing" v-else>
                              <div class="name-area">
                                <span class="text">{{ reply.nickname }}</span>
                              </div>
                              <div class="text-area">
                                <textarea
                                  v-model="commentEditText"
                                  placeholder="댓글을 입력해주세요."
                                ></textarea>
                              </div>
                              <div class="attach-area">
                                <div class="btn-area">
                                  <button
                                    type="button"
                                    class="btn-default btn-md-line"
                                    @click="replyHandleCancel"
                                  >
                                    취소
                                  </button>
                                  <button
                                    type="button"
                                    class="btn-primary-yellow btn-md-fill"
                                    @click="handleEditSubmit(reply.comment_pk)"
                                  >
                                    등록
                                  </button>
                                </div>
                              </div>
                            </div>

                            <!-- 더보기 (대댓글) -->
                            <div
                              class="more-area"
                              v-if="replyInputShow !== reply.comment_pk"
                            >
                              <transition name="fade">
                                <div
                                  class="tooltip-container"
                                  v-if="replyTooltipShow == reply.comment_pk"
                                >
                                  <div class="tooltip-body">
                                    <div class="cont">
                                      <div class="cont-list">
                                        <button
                                          type="button"
                                          class="btn-edit"
                                          @click="
                                            replyHandleEdit(reply.comment_pk)
                                          "
                                        >
                                          수정
                                        </button>
                                      </div>
                                      <div class="cont-list">
                                        <button
                                          type="button"
                                          class="btn-delete"
                                          @click="_qnaDrop(reply.comment_pk)"
                                        >
                                          삭제
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </transition>
                              <button
                                type="button"
                                class="btn-more"
                                @click="replyToggleTooltip(reply)"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <mask
                                    id="mask0"
                                    style="mask-type: alpha"
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="#ADB0B3"
                                    />
                                  </mask>
                                  <g mask="url(#mask0)">
                                    <path
                                      d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                                      fill="#ADB0B3"
                                    />
                                  </g>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>

                        <!-- ✅ 답글 입력창(해당 최상위에만 표시) -->
                        <div
                          class="review-reply-depth review-reply-list"
                          v-if="inputComment === th.top.comment_pk"
                        >
                          <div class="review-writing">
                            <div class="name-area">
                              <span class="text">{{ th.top.nickname }}</span>
                            </div>
                            <div class="text-area">
                              <textarea
                                v-model="replyNewText"
                                placeholder="답글을 입력해주세요."
                              ></textarea>
                            </div>
                            <div class="attach-area">
                              <div class="btn-area">
                                <button
                                  type="button"
                                  class="btn-default btn-md-line"
                                  @click="handleCommentCancel"
                                >
                                  취소
                                </button>
                                <button
                                  type="button"
                                  class="btn-primary-yellow btn-md-fill"
                                  @click="handleReplySubmit(th.top.comment_pk)"
                                >
                                  등록
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- 글쓰기 영역 -->
                    <div class="review-writing">
                      <div class="name-area">
                        <span class="text">{{ nickname }}</span>
                      </div>
                      <div class="text-area">
                        <textarea
                          v-model="commentText"
                          placeholder="댓글을 입력해주세요"
                        ></textarea>
                      </div>
                      <div class="attach-area">
                        <div class="btn-area">
                          <button
                            type="button"
                            class="btn-primary-yellow btn-md-fill"
                            @click="submitComment"
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </section>
              <div class="swing" v-else>
                <!-- <div class="header">
                  <button type="button" class="btn-back" @click="goBack" aria-label="이전">
                    <img
                      src="/public/images/icon/icon_arrow_prev.png"
                      alt="icon_arrow_prev"
                    />
                  </button>
                  <div class="title">나의 스윙</div>
                  <button
                    type="button"
                    class="btn-profile"
                    @click="handleProfile"
                  >
                    <div
                      class="image"
                      :style="{
                        backgroundImage: `url('/images/default/img_profile_01.png')`,
                      }"
                    />
                  </button>
                  <nav
                    class="nav my-menu"
                    :class="{ 'is-active': showMobMenu }"
                  >
                    <div class="nav-wrap">
                      <div class="header">
                        <button
                          type="button"
                          class="btn-prev"
                          @click="menuClose"
                        >
                          <img
                            src="/public/images/icon/icon_arrow_prev.png"
                            alt="icon_arrow_prev"
                          />
                        </button>
                      </div>
                      <div class="content">
                        <div class="profile">
                          <div
                            class="profile-image"
                            :style="{
                              backgroundImage: `url('/images/button/btn_profile.png')`,
                            }"
                          />
                          <div class="profile-name">Koong_golferm</div>
                          <p class="profile-email">ssadasdhaasjkdh@naver.com</p>
                        </div>
                        <ul class="menu">
                          <li
                            class="menu-list"
                            v-for="(item, i) in mobMenuList"
                            :key="i"
                          >
                            <a
                              class="menu-list-item"
                              :class="{
                                'is-active':
                                  profileGnbIndex === i && item.children,
                              }"
                              @click="handleProfileGnb(i)"
                            >
                              <span class="text">{{ item.name }}</span>
                              <img
                                src="/public/images/icon/icon_arrow_down_black.png"
                                alt="icon_arrow_down_black"
                              />
                            </a>
                            <transition
                              @before-enter="beforeEnter"
                              @enter="enter"
                              @before-leave="beforeLeave"
                              @leave="leave"
                            >
                              <div
                                class="slide"
                                v-if="profileGnbIndex === i && item.children"
                              >
                                <ul class="depth">
                                  <li
                                    class="depth-list"
                                    v-for="(depth, j) in item.children"
                                    :key="j"
                                  >
                                    <a
                                      class="depth-list-item"
                                      :class="{
                                        'is-active': gnbProfileDepthIndex === j,
                                      }"
                                      @click="handleProfileGnbDepth(depth, j)"
                                      >{{ depth.name }}</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </transition>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>
                </div> -->
                <div class="swing-wrap">
                  <div class="head">
                    <ul class="category">
                      <li class="category-list">Step {{ targetStep?.seq }}</li>
                      <li class="category-list">{{ targetStep?.title }}</li>
                    </ul>
                    <h2 class="title">
                      <span class="title-depth"
                        ><span class="text"
                          >{{ targetStep?.title }}
                        </span></span
                      >
                      <span class="title-depth">
                        <span class="text"
                          >#{{
                            targetStep?.mission_list
                              ?.find(
                                (m) =>
                                  Number(m.mission_pk) ===
                                  Number(selectedMission),
                              )
                              ?.result_list?.find(
                                (r) =>
                                  Number(r.result_pk) ===
                                  Number(selectedResult),
                              )?.attempt_no || ""
                          }}</span
                        >
                        <span class="date"
                          >({{
                            targetStep?.mission_list
                              ?.find(
                                (m) =>
                                  Number(m.mission_pk) ===
                                  Number(selectedMission),
                              )
                              ?.result_list?.find(
                                (r) =>
                                  Number(r.result_pk) ===
                                  Number(selectedResult),
                              )?.regdate || ""
                          }})</span
                        >
                        <span class="label">
                          <span
                            class="label-list"
                            :class="{
                              'is-green':
                                targetStep?.mission_list
                                  ?.find(
                                    (m) =>
                                      Number(m.mission_pk) ===
                                      Number(selectedMission),
                                  )
                                  ?.result_list?.find(
                                    (r) =>
                                      Number(r.result_pk) ===
                                      Number(selectedResult),
                                  )?.passed_yn == '1',
                            }"
                            v-if="
                              targetStep?.mission_list
                                ?.find(
                                  (m) =>
                                    Number(m.mission_pk) ===
                                    Number(selectedMission),
                                )
                                ?.result_list?.find(
                                  (r) =>
                                    Number(r.result_pk) ===
                                    Number(selectedResult),
                                )?.passed_yn == '1'
                            "
                            >성공
                          </span>
                          <span class="label-list" v-else>실패</span>
                        </span>
                      </span>
                    </h2>
                    <div class="date is-mob-show">
                      ({{
                        targetStep?.mission_list
                          ?.find(
                            (m) =>
                              Number(m.mission_pk) === Number(selectedMission),
                          )
                          ?.result_list?.find(
                            (r) =>
                              Number(r.result_pk) === Number(selectedResult),
                          )?.regdate || ""
                      }})
                    </div>
                    <div class="profile">
                      <div
                        class="profile-image"
                        :style="{
                        backgroundImage: `url(${
                          swingView.binary_filepath
                            ? common.getImg(swingView.binary_filepath)
                            : '/images/button/btn_profile.png'
                        })`,
                      }"
  
                      ></div>
                      <div class="text">
                        <button
                          type="button"
                          class="btn-more"
                          @click="modalMemberInfo(swingView?.player_pk)"
                        >
                          수강생 {{ swingView.nickname }}
                        </button>
                      </div>
                    </div>
                    <div class="form-box">
                      <select v-model="selectedStep">
                        <option
                          v-for="v in targetClass?.step_list ?? []"
                          :key="v.step_pk"
                          :value="Number(v.step_pk)"
                        >
                          {{ v.title }}
                        </option>
                      </select>
                      <select v-model="selectedMission">
                        <option
                          v-for="m in targetClass?.step_list?.find(
                            (s) => Number(s.step_pk) === Number(selectedStep),
                          )?.mission_list ?? []"
                          :key="m.mission_pk"
                          :value="Number(m.mission_pk)"
                        >
                          {{ m.title }}
                        </option>
                      </select>
                      <select v-model="selectedResult" @change="resultChange">
                        <option
                          v-for="(r, i) in targetClass?.step_list
                            ?.find(
                              (s) => Number(s.step_pk) === Number(selectedStep),
                            )
                            ?.mission_list?.find(
                              (m) =>
                                Number(m.mission_pk) ===
                                Number(selectedMission),
                            )?.result_list ?? []"
                          :key="r.result_pk"
                          :value="Number(r.result_pk)"
                        >
                          #{{ i + 1 }}번째 시도 ({{ r.measured_value
                          }}{{ r.unit }})
                        </option>
                      </select>
                      <button type="button" class="btn-default btn-sm-fill">
                        이동
                      </button>
                    </div>
                  </div>
                  <div class="cont">
                    <div class="col-1">
                      <div class="cont-section">
                        <div class="cont-box">
                          <div class="cont-box-list">
                            <div
                              class="video-area"
                              v-if="swingView?.video_file?.[0]"
                            >
                              <videoPlayer
                                ref="player1"
                                :videoinfo="swingView?.video_file?.[0]"
                              />
                            </div>
                            <div class="no-data" v-else />
                          </div>
                          <div class="cont-box-list">
                            <div
                              class="video-area"
                              v-if="swingView?.video_file?.[1]"
                            >
                              <videoPlayer
                                ref="player2"
                                :videoinfo="swingView?.video_file?.[1]"
                              />
                            </div>
                            <div class="no-data" v-else />
                          </div>
                        </div>
                        <ul class="tab type03 box">
                          <li
                            class="tab-list"
                            :class="{ 'is-active': currentTab == 'address' }"
                            @click="
                              onClickStage(swingView?.fit_address, 'address')
                            "
                          >
                            <span class="icon">
                              <svg-address />
                            </span>
                            <span class="text">address</span>
                          </li>
                          <li
                            class="tab-list"
                            :class="{
                              'is-active': currentTab == 'backswing',
                            }"
                            @click="
                              onClickStage(swingView?.fit_takeback, 'backswing')
                            "
                          >
                            <span class="icon">
                              <svg-back-swing />
                            </span>
                            <span class="text">backswing</span>
                          </li>

                          <li
                            class="tab-list"
                            :class="{ 'is-active': currentTab == 'topswing' }"
                            @click="
                              onClickStage(swingView?.fit_top_swing, 'topswing')
                            "
                          >
                            <span class="icon">
                              <svg-top-swing />
                            </span>
                            <span class="text">topswing</span>
                          </li>

                          <li
                            class="tab-list"
                            :class="{
                              'is-active': currentTab == 'downswing',
                            }"
                            @click="
                              onClickStage(
                                swingView?.fit_down_swing,
                                'downswing',
                              )
                            "
                          >
                            <span class="icon">
                              <svg-down-swing />
                            </span>
                            <span class="text">downswing</span>
                          </li>

                          <li
                            class="tab-list"
                            :class="{ 'is-active': currentTab == 'impact' }"
                            @click="
                              onClickStage(swingView?.fit_impact, 'impact')
                            "
                          >
                            <span class="icon">
                              <svg-impact />
                            </span>
                            <span class="text">impact</span>
                          </li>
                          <li
                            class="tab-list"
                            :class="{
                              'is-active': currentTab == 'follow-through',
                            }"
                            @click="
                              onClickStage(
                                swingView?.fit_follow,
                                'follow-through',
                              )
                            "
                          >
                            <span class="icon">
                              <svg-follow-through />
                            </span>
                            <span class="text">follow-through</span>
                          </li>
                          <li
                            class="tab-list"
                            :class="{ 'is-active': currentTab == 'finish' }"
                            @click="
                              onClickStage(swingView?.fit_finish, 'finish')
                            "
                          >
                            <span class="icon">
                              <svg-finish />
                            </span>
                            <span class="text">finish</span>
                          </li>
                        </ul>
                        <div class="cont-wrap">
                          <div class="title">Step Balance</div>
                          <div class="cont-box">
                            <div class="foot-area">
                              <span></span>
                              <span class="foot-area-list"
                                ><span class="point teal">L</span
                                >{{ animated.Left }}</span
                              >
                              <span></span>
                              <span class="foot-area-list"
                                ><span class="point yellow">B</span
                                >{{ animated.Back }}</span
                              >
                              <span>
                                <img
                                  src="/public/images/default/img_human_footprints.png"
                                  alt="img_human_footprints"
                                />
                              </span>
                              <span class="foot-area-list"
                                ><span class="point yellow">F</span
                                >{{ animated.Front }}</span
                              >
                              <span></span>
                              <span class="foot-area-list"
                                ><span class="point teal">R</span
                                >{{ animated.Right }}</span
                              >
                              <span></span>
                            </div>
                            <EChart
                              :list="swingView?.shotweight_info?.list || []"
                              :totalFrames="
                                Number(swingView?.fit_total_frames || 0)
                              "
                              :playTime="Number(swingView?.fit_play_time || 0)"
                              @seek="onSeek"
                              @balance="onBalance"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="cont-section">
                        <div class="table-area">
                          <div class="table" ref="tableRef">
                                <ul class="row">
                                  <li class="row-list">
                                    <p class="tit">클럽 정보</p>
                                    <div class="info">
                                      {{ swingView.fit_club_code }}
                                    </div>
                                  </li>
                                  <li class="row-list">
                                    <p class="tit">볼속도</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.ballspeed),
                                          "km/h",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">백스핀</p>
                                    <div class="info">
                                      {{
                                        common.suffix(swingView.backspin, "rpm")
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">캐리</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.carry),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">클럽속도</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.headspeed),
                                          "km/h",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">볼방향</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.balldirection),
                                          "deg",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">사이드스핀</p>
                                    <div class="info">
                                      {{
                                        common.suffix(swingView.sidespin, "rpm")
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">비거리</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.distance),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">체공시간</p>
                                    <div class="info">
                                      {{ common.suffix(swingView.duration, "s") }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">탈출각</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.launchangle),
                                          "deg",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">미트율</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.smashfactor),
                                          "%",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">수직최고점</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.peakvertical),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                        </div>
                      </div>
                      <div class="cont-section">
                            <div class="col-wrap">
                              <div class="col-list">
                                <div class="col-list-title">
                                  궤적 상단 뷰
                                </div>
                                <div class="col-list-cont">
                                  <EChart2
                                    :raw="swingView?.fit_ball_trajectory || []"
                                  />
                                </div>
                              </div>
                              <div class="col-list">
                                <div class="col-list-title">
                                  궤적 측면 뷰
                                </div>
                                <div class="col-list-cont">
                                  <EChart3
                                    :raw="swingView?.fit_ball_trajectory || []"
                                  />
                                </div>
                              </div>
                              <div class="col-list">
                                <div class="col-list-title">클럽 패스</div>
                                <div class="col-list-cont">
                                  <div class="image" :style="{ backgroundImage: `url(${getFitImagePath()})` }"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- 아카데미 -->
    <div class="academy-wrap">
      <div class="academy-left">
        <div class="academy-left-head">
          <button type="button" class="btn-back" @click="goBack">
            <img
              src="/public/images/icon/icon_arrow_left_white.png"
              alt="icon_arrow_left_white"
            />
            <span class="text">코칭 리스트 돌아가기</span>
          </button>
          <ul class="label">
            <li class="label-list">{{ academyView.target_audience }}</li>
            <li class="label-list">
              {{ academyView.class_list?.length }}개의 클래스
            </li>
          </ul>
          <h2 class="title">{{ academyView.title }}</h2>
          <div class="profile">
            <div class="profile-image" :class="{ 'no-data': !academyView.expert_master?.binary_filepath }" :style="{ backgroundImage: `url(${common.getImg(academyView.expert_master?.binary_filepath)})` }"></div>
            <div class="text">
              <span>
                {{ academyView.expert_master?.nickname }}
              </span>
            </div>
          </div>
        </div>
        <div class="academy-left-btn">
          <ul class="info">
            <li class="info-list">
              <span class="info-list-inner">
                <span>좋아요</span>
              </span>
              <span class="point">{{ academyView.academy_like }}</span>
            </li>
            <li class="info-list">
              <span>수강생</span>
              <span class="point">{{ academyView.enroll_cnt }}</span>
            </li>
          </ul>
        </div>
        <div class="academy-left-cont">
          <ul class="accordion">
            <li
              class="accordion-list"
              v-for="(item, index) in academyView.class_list"
              :key="index"
            >
              <a class="accordion-list-link">
                <span
                  class="text"
                  :class="{ 'is-active': setDepthList.includes(index) }"
                  @click="handleAccordion(item, index)"
                >
                  <span>클래스{{ index + 1 }}. {{ item.title }}</span>
                  <img
                    src="/images/icon/icon_chevron_down.png"
                    alt="icon_chevron_down"
                    v-if="item.step_list?.length"
                  />
                </span>
                <transition
                  @before-enter="beforeEnter"
                  @enter="enter"
                  @before-leave="beforeLeave"
                  @leave="leave"
                >
                  <div class="depth" v-if="setDepthList.includes(index)">
                    <div class="depth-title">{{ item.title }}</div>
                    <div
                      class="depth-list"
                      :class="{
                        'is-complete':
                          depth.mission_list?.[0]?.required_success_cnt ==
                          depth.mission_list?.[0]?.success_cnt,
                        'is-active':
                          activeDepth.accIndex === index &&
                          activeDepth.depthIndex === j,
                        'is-current-complete':
                          depth.mission_list?.[0]?.required_success_cnt ==
                            depth.mission_list?.[0]?.success_cnt &&
                          activeDepth.accIndex === index &&
                          activeDepth.depthIndex === j,
                      }"
                      v-for="(depth, j) in item.step_list"
                      :key="j"
                    >
                      <a
                        class="depth-list-link"
                        @click="handleDepthClick(index, depth, j, item)"
                      >
                        <span class="circle">
                          <img
                            src="/public/images/icon/icon_check_white.png"
                            alt="icon_check_white"
                          />
                        </span>
                        <span class="txt"
                          >{{ depth.title }} ({{
                            depth.mission_list?.[0]?.success_cnt
                          }}/{{
                            depth.mission_list?.[0]?.required_success_cnt
                          }})</span
                        >
                      </a>
                    </div>
                  </div>
                </transition>
              </a>
            </li>
            <li class="accordion-list">
              <nuxt-link
                :to="'/coaching/final-report/' + enroll_pk || 0"
                class="accordion-list-link"
              >
                <span class="text" :class="{ 'is-active': accordionLastIndex }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_599_26768"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_599_26768)">
                      <path
                        d="M2 21V19H22V21H2ZM3 18V11H6V18H3ZM8 18V6H11V18H8ZM13 18V9H16V18H13ZM18 18V3H21V18H18Z"
                        fill="#000"
                      />
                    </g>
                  </svg>
                  <span>최종 코칭 리포트 쓰기</span>
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <section class="academy-content is-pc">
        <!-- 아카데미 -->
        <template v-if="!finalReport && !swingPage">
          <div class="board" v-if="!isMobile">
            <div class="title">
              <h2 class="text">{{ currentStepData.title }}</h2>
              <span
                class="state type01"
                v-if="
                  currentStepData.mission_list?.[0]?.success_cnt ==
                  currentStepData.mission_list?.[0]?.required_success_cnt
                "
              >
                <span class="state-list color-grey">완료</span>
                <!-- <span class="state-list color-green">진행</span> -->
              </span>
            </div>
            <div class="cont">
              <h3 class="tit">학습 목표</h3>
              <p class="desc">
                {{ currentStepData.content }}
              </p>
            </div>
            <div
              class="cont"
              v-for="(item_, index_) in currentStepData.mission_list?.slice(
                0,
                1,
              ) || {}"
              :key="index_"
            >
              <h3 class="tit">미션 조건</h3>
              <ul class="cont-wrap">
                <li class="cont-wrap-list">
                  <span class="text">{{ item_.title }}</span>
                  <div class="progress">
                    <span class="progress-bar">
                      <span
                        class="progress-bar-inner"
                        :style="{
                          width:
                            Math.round(
                              ((item_.success_cnt ?? 0) /
                                (item_.required_success_cnt || 1)) *
                                100,
                            ) + '%',
                        }"
                      ></span>
                    </span>
                    <span class="progress-num"
                      ><strong>{{ item_.success_cnt }}</strong
                      >/{{ item_.required_success_cnt }}회(총
                      {{ item_.attempt_cnt }}회 시도)</span
                    >
                  </div>
                </li>
                <!-- <li class="cont-wrap-list">거리 10m</li>
                <li class="cont-wrap-list">남은거리 4m</li> -->
              </ul>
              <div class="table">
                <div class="table-head">
                  <div class="table-head-col col-1"></div>
                  <div class="table-head-col">남은거리</div>
                  <div class="table-head-col">결과</div>
                  <!-- <div class="table-head-col is-mob">매장</div> -->
                  <div class="table-head-col is-mob">클럽</div>
                  <div class="table-head-col is-mob">날짜</div>
                  <div class="table-head-col is-mob">스윙영상</div>
                </div>
                <div class="table-body">
                  <div
                    class="table-body-row"
                    v-for="(item__, index__) in item_.result_list"
                    :key="index__"
                  >
                    <div class="table-body-flex">
                      <div class="table-body-col col-1">
                        #{{ item__.attempt_no }}
                      </div>
                      <div class="table-body-col">
                        <strong>{{ item__.measured_value }}m</strong>
                      </div>
                      <div class="table-body-col"  @click="handleMobList(index__)">
                        <span
                          class="color"
                          :class="{ point: item__.passed_yn == '1' }"
                          >{{ item__.passed_yn == "1" ? "성공" : "실패" }}</span
                        >
                        <button
                          type="button"
                          class="btn-arrow"
                          :class="{ 'is-active': mobListIndex === index__ }"
                        >
                          <img
                            src="/public/images/icon/icon_arrow_down.png" alt="icon_arrow_down"
                          />
                        </button>
                      </div>
                      <!-- <div class="table-body-col is-mob">{{ item.shop }}</div> -->
                      <div class="table-body-col is-mob">
                        {{ item__.metric_code }}
                      </div>
                      <div class="table-body-col is-mob">
                        <span class="color">{{
                          common.dateformat(item__.regdate)
                        }}</span>
                      </div>
                      <div class="table-body-col is-mob">
                        <button
                          type="button"
                          class="btn-sm-line"
                          @click="goToSwing(item__.result_pk)"
                        >
                          영상보기
                        </button>
                      </div>
                    </div>
                    <transition
                      @before-enter="beforeEnter"
                      @enter="enter"
                      @before-leave="beforeLeave"
                      @leave="leave">
                      <div class="table-body-mob" v-if="mobListIndex === index__">
                        <dl class="list">
                          <dt class="tit">클럽</dt>
                          <dd class="cnt">{{ item__.metric_code }}</dd>
                        </dl> 
                        <dl class="list">
                          <dt class="tit">날짜</dt>
                          <dd class="cnt">
                            <span class="color">{{
                              common.dateformat(item__.regdate)
                            }}</span>
                          </dd>
                        </dl> 
                        <dl class="list align-center">
                          <dt class="tit">스윙영상</dt>
                          <dd class="cnt">
                            <button
                              type="button"
                              class="btn-sm-line"
                              @click="goToSwing(item__.result_pk)"
                            >
                              영상보기
                            </button>
                          </dd>
                        </dl> 
                      </div>
                      
                    </transition>
                  </div>
                  <div class="no-info" v-if="item_.result_list.length === 0">
                    내역이 없습니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="review">
            <div class="review-count">
              <span>전체질문</span>
              <span class="num">({{ qnaData.listcnt }})</span>
            </div>

            <!-- 댓글 영역 -->
            <div class="review-reply">
              <div
                class="review-reply-list"
                v-for="(th, i) in threads"
                :key="'t' + (th.top?.comment_pk || i)"
              >
                <!-- ✅ 최상위 댓글 -->
                <div class="review-reply-list-wrap" v-if="th.top">
                  <!-- 보기 모드 -->
                  <template v-if="inputShow !== th.top.comment_pk">
                    <div class="img-area">
                      <img
                        :src="
                          th.top.member_photo_url
                            ? common.getImg(th.top.member_photo_url)
                            : '/images/button/btn_profile.png'
                        "
                        alt="profile"
                      />
                    </div>
                    <div class="info-area">
                      <div class="tit">{{ th.top.nickname }}</div>
                      <div class="date">
                        {{ common.dateformat(th.top.regdate) }}
                      </div>
                      <div class="desc">{{ th.top.content }}</div>

                      <div class="btn-wrap">
                        <button
                          type="button"
                          class="btn-comment"
                          @click="handleComment(th.top)"
                        >
                          <span class="text">답글쓰기</span>
                        </button>
                      </div>
                    </div>
                  </template>

                  <!-- 수정 모드 (원글) -->
                  <div class="review-writing" v-else>
                    <div class="name-area">
                      <span class="text">{{ th.top.nickname }}</span>
                    </div>
                    <div class="text-area">
                      <textarea
                        v-model="commentEditText"
                        placeholder="내용을 입력해주세요."
                      ></textarea>
                    </div>
                    <div class="attach-area">
                      <div class="btn-area">
                        <button
                          type="button"
                          class="btn-default btn-md-line"
                          @click="handleCancel"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          class="btn-primary-yellow btn-md-fill"
                          @click="handleEditSubmit(th.top.comment_pk)"
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- 더보기 (원글) -->
                  <div class="more-area" v-if="inputShow !== th.top.comment_pk">
                    <transition name="fade">
                      <div
                        class="tooltip-container"
                        v-if="tooltipShow == th.top.comment_pk"
                      >
                        <div class="tooltip-body">
                          <div class="cont">
                            <div class="cont-list">
                              <button
                                type="button"
                                class="btn-edit"
                                @click="handleEdit(th.top.comment_pk)"
                              >
                                수정
                              </button>
                            </div>
                            <div class="cont-list">
                              <button
                                type="button"
                                class="btn-delete"
                                @click="_qnaDrop(th.top.comment_pk)"
                              >
                                삭제
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                    <button
                      type="button"
                      class="btn-more"
                      @click="toggleTooltip(th.top)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <mask
                          id="mask0"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="0"
                          y="0"
                          width="24"
                          height="24"
                        >
                          <rect width="24" height="24" fill="#ADB0B3" />
                        </mask>
                        <g mask="url(#mask0)">
                          <path
                            d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                            fill="#ADB0B3"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- ✅ 대댓글 리스트 -->
                <div
                  class="review-reply-depth children"
                  v-if="th.replies && th.replies.length"
                >
                  <div
                    class="review-reply-list-depth"
                    v-for="reply in th.replies"
                    :key="'r' + reply.comment_pk"
                  >
                    <!-- 보기 모드 (대댓글) -->
                    <template v-if="replyInputShow !== reply.comment_pk">
                      <div class="img-area">
                        <img
                          :src="
                            reply.member_photo_url
                              ? common.getImg(reply.member_photo_url)
                              : '/images/button/btn_profile.png'
                          "
                          alt="profile"
                        />
                      </div>
                      <div class="info-area">
                        <div class="tit">{{ reply.nickname }}</div>
                        <div class="date">
                          {{ common.dateformat(reply.regdate) }}
                        </div>
                        <div class="desc">{{ reply.content }}</div>
                      </div>
                    </template>

                    <!-- 수정 모드 (대댓글) -->
                    <div class="review-writing" v-else>
                      <div class="name-area">
                        <span class="text">{{ reply.nickname }}</span>
                      </div>
                      <div class="text-area">
                        <textarea
                          v-model="commentEditText"
                          placeholder="댓글을 입력해주세요."
                        ></textarea>
                      </div>
                      <div class="attach-area">
                        <div class="btn-area">
                          <button
                            type="button"
                            class="btn-default btn-md-line"
                            @click="replyHandleCancel"
                          >
                            취소
                          </button>
                          <button
                            type="button"
                            class="btn-primary-yellow btn-md-fill"
                            @click="handleEditSubmit(reply.comment_pk)"
                          >
                            등록
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- 더보기 (대댓글) -->
                    <div
                      class="more-area"
                      v-if="replyInputShow !== reply.comment_pk"
                    >
                      <transition name="fade">
                        <div
                          class="tooltip-container"
                          v-if="replyTooltipShow == reply.comment_pk"
                        >
                          <div class="tooltip-body">
                            <div class="cont">
                              <div class="cont-list">
                                <button
                                  type="button"
                                  class="btn-edit"
                                  @click="replyHandleEdit(reply.comment_pk)"
                                >
                                  수정
                                </button>
                              </div>
                              <div class="cont-list">
                                <button
                                  type="button"
                                  class="btn-delete"
                                  @click="_qnaDrop(reply.comment_pk)"
                                >
                                  삭제
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                      <button
                        type="button"
                        class="btn-more"
                        @click="replyToggleTooltip(reply)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <mask
                            id="mask0"
                            style="mask-type: alpha"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <rect width="24" height="24" fill="#ADB0B3" />
                          </mask>
                          <g mask="url(#mask0)">
                            <path
                              d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z"
                              fill="#ADB0B3"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- ✅ 답글 입력창(해당 최상위에만 표시) -->
                <div
                  class="review-reply-depth review-reply-list"
                  v-if="inputComment === th.top.comment_pk"
                >
                  <div class="review-writing">
                    <div class="name-area">
                      <span class="text">{{ th.top.nickname }}</span>
                    </div>
                    <div class="text-area">
                      <textarea
                        v-model="replyNewText"
                        placeholder="답글을 입력해주세요."
                      ></textarea>
                    </div>
                    <div class="attach-area">
                      <div class="btn-area">
                        <button
                          type="button"
                          class="btn-default btn-md-line"
                          @click="handleCommentCancel"
                        >
                          취소
                        </button>
                        <button
                          type="button"
                          class="btn-primary-yellow btn-md-fill"
                          @click="handleReplySubmit(th.top.comment_pk)"
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 글쓰기 영역 -->
            <div class="review-writing">
              <div class="name-area">
                <span class="text">{{ nickname }}</span>
              </div>
              <div class="text-area">
                <textarea
                  v-model="commentText"
                  placeholder="댓글을 입력해주세요"
                ></textarea>
              </div>
              <div class="attach-area">
                <div class="btn-area">
                  <button
                    type="button"
                    class="btn-primary-yellow btn-md-fill"
                    @click="submitComment"
                  >
                    등록
                  </button>
                </div>
              </div>
            </div>
          </div>
          <client-only>
            <VueAwesomePaginate
              :items-per-page="5"
              :max-pages-shown="3"
              v-model="qnaPageno"
              :total-items="qnaData.listcnt || 1"
              @click="onClickHandler"
              pagination-container-class="pagination-container type02"
              paginate-buttons-class="paginate-buttons"
              active-page-class="active"
              back-button-class="paginate-buttons"
              next-button-class="paginate-buttons"
            >
              <template #prev-button>
                <img src="/images/icon/icon_prev.png" alt="icon_prev" />
              </template>
              <template #next-button>
                <img src="/images/icon/icon_next.png" alt="icon_next" />
              </template>
            </VueAwesomePaginate>
          </client-only>
        </template>

        <!-- 영상보기 화면 -->
        <template v-else-if="!finalReport && swingPage">
          <div class="swing">
            <!-- <div class="header">
              <button type="button" class="btn-back" @click="goBack" aria-label="이전">
                <img
                  src="/public/images/icon/icon_arrow_prev.png"
                  alt="icon_arrow_prev"
                />
              </button>
              <div class="title">나의 스윙</div>
              <button type="button" class="btn-profile" @click="handleProfile" aria-label="프로필">
                <div
                  class="image"
                  :style="{
                    backgroundImage: `url('/images/default/img_profile_01.png')`,
                  }"
                />
              </button>
              <nav class="nav my-menu" :class="{ 'is-active': showMobMenu }">
                <div class="nav-wrap">
                  <div class="header">
                    <button type="button" class="btn-prev" @click="menuClose" aria-label="닫기">
                      <img
                        src="/public/images/icon/icon_arrow_prev.png"
                        alt="icon_arrow_prev"
                      />
                    </button>
                  </div>
                  <div class="content">
                    <div class="profile">
                      <div
                        class="profile-image"
                        :style="{
                          backgroundImage: `url('/images/button/btn_profile.png')`,
                        }"
                      />
                      <div class="profile-name">Koong_golferm</div>
                      <p class="profile-email">ssadasdhaasjkdh@naver.com</p>
                    </div>
                    <ul class="menu">
                      <li
                        class="menu-list"
                        v-for="(item, i) in mobMenuList"
                        :key="i"
                      >
                        <a
                          class="menu-list-item"
                          :class="{
                            'is-active': profileGnbIndex === i && item.children,
                          }"
                          @click="handleProfileGnb(i)"
                        >
                          <span class="text">{{ item.name }}</span>
                          <img
                            src="/public/images/icon/icon_arrow_down_black.png"
                            alt="icon_arrow_down_black"
                          />
                        </a>
                        <transition
                          @before-enter="beforeEnter"
                          @enter="enter"
                          @before-leave="beforeLeave"
                          @leave="leave"
                        >
                          <div
                            class="slide"
                            v-if="profileGnbIndex === i && item.children"
                          >
                            <ul class="depth">
                              <li
                                class="depth-list"
                                v-for="(depth, j) in item.children"
                                :key="j"
                              >
                                <a
                                  class="depth-list-item"
                                  :class="{
                                    'is-active': gnbProfileDepthIndex === j,
                                  }"
                                  @click="handleProfileGnbDepth(depth, j)"
                                  >{{ depth.name }}</a
                                >
                              </li>
                            </ul>
                          </div>
                        </transition>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div> -->
            <div class="swing-wrap" v-if="!isMobile">
              <div class="head">
                <ul class="category">
                  <li class="category-list">
                            Step {{ targetStep?.seq }}
                          </li>
                  <li class="category-list">{{ targetStep?.title }}</li>
                </ul>
                <h2 class="title">
                          <span class="title-depth"
                            ><span class="text"
                              >{{ targetStep?.title }}
                            </span></span
                          >
                          <span class="title-depth">
                            <span class="text"
                              >#{{
                                targetStep?.mission_list
                                  ?.find(
                                    (m) =>
                                      Number(m.mission_pk) ===
                                      Number(selectedMission),
                                  )
                                  ?.result_list?.find(
                                    (r) =>
                                      Number(r.result_pk) ===
                                      Number(selectedResult),
                                  )?.attempt_no || ""
                              }}</span
                            >
                            <span class="date"
                              >({{
                                targetStep?.mission_list
                                  ?.find(
                                    (m) =>
                                      Number(m.mission_pk) ===
                                      Number(selectedMission),
                                  )
                                  ?.result_list?.find(
                                    (r) =>
                                      Number(r.result_pk) ===
                                      Number(selectedResult),
                                  )?.regdate || ""
                              }})</span
                            >
                            <span class="label">
                              <span
                                class="label-list"
                                :class="{
                                  'is-green':
                                    targetStep?.mission_list
                                      ?.find(
                                        (m) =>
                                          Number(m.mission_pk) ===
                                          Number(selectedMission),
                                      )
                                      ?.result_list?.find(
                                        (r) =>
                                          Number(r.result_pk) ===
                                          Number(selectedResult),
                                      )?.passed_yn == '1',
                                }"
                                v-if="
                                  targetStep?.mission_list
                                    ?.find(
                                      (m) =>
                                        Number(m.mission_pk) ===
                                        Number(selectedMission),
                                    )
                                    ?.result_list?.find(
                                      (r) =>
                                        Number(r.result_pk) ===
                                        Number(selectedResult),
                                    )?.passed_yn == '1'
                                "
                                >성공
                              </span>
                              <span class="label-list" v-else>실패</span>
                            </span>
                          </span>
                        </h2>
                <div class="date is-mob-show">
                          ({{
                            targetStep?.mission_list
                              ?.find(
                                (m) =>
                                  Number(m.mission_pk) ===
                                  Number(selectedMission),
                              )
                              ?.result_list?.find(
                                (r) =>
                                  Number(r.result_pk) === Number(selectedResult),
                              )?.regdate || ""
                          }})
                        </div>
                <div class="profile">
                  <div
                    class="profile-image"
                    :style="{
                      backgroundImage: `url(${
                        swingView.binary_filepath
                          ? common.getImg(swingView.binary_filepath)
                          : '/images/button/btn_profile.png'
                      })`,
                    }"
                  ></div>
                  <div class="text">
                    <button
                      type="button"
                      class="btn-more"
                      @click="modalMemberInfo(swingView?.player_pk)"
                      
                    >
                      수강생 {{swingView.nickname}} 
                    </button>
                  </div>
                </div>
                <div class="form-box">
                          <!-- 스텝 -->
                          <select v-model="selectedStep">
                            <option
                              v-for="v in targetClass?.step_list ?? []"
                              :key="v.step_pk"
                              :value="Number(v.step_pk)"
                            >
                              {{ v.title }}
                            </option>
                          </select>

                          <!-- 미션 (선택된 스텝 기준) -->
                          <select v-model="selectedMission">
                            <option
                              v-for="m in targetClass?.step_list?.find(
                                (s) => Number(s.step_pk) === Number(selectedStep),
                              )?.mission_list ?? []"
                              :key="m.mission_pk"
                              :value="Number(m.mission_pk)"
                            >
                              {{ m.title }}
                            </option>
                          </select>

                          <!-- 결과 (선택된 미션 기준) -->
                          <select v-model="selectedResult" @change="resultChange">
                            <option
                              v-for="(r, i) in targetClass?.step_list
                                ?.find(
                                  (s) =>
                                    Number(s.step_pk) === Number(selectedStep),
                                )
                                ?.mission_list?.find(
                                  (m) =>
                                    Number(m.mission_pk) ===
                                    Number(selectedMission),
                                )?.result_list ?? []"
                              :key="r.result_pk"
                              :value="Number(r.result_pk)"
                            >
                              #{{ i + 1 }}번째 시도 ({{ r.measured_value
                              }}{{ r.unit }})
                            </option>
                          </select>
                          <button type="button" class="btn-default btn-sm-fill">
                            이동
                          </button>
                        </div>
              </div>
              <div class="cont">
                        <div class="col-1">
                          <div class="cont-section">
                            <div class="cont-box">
                              <div class="cont-box-list">
                                <div
                                  class="video-area"
                                  v-if="swingView?.video_file?.[0]"
                                >
                                  <videoPlayer
                                    ref="player1"
                                    :videoinfo="swingView?.video_file?.[0]"
                                  />
                                </div>
                                <div class="no-data" v-else />
                              </div>
                              <div class="cont-box-list">
                                <div
                                  class="video-area"
                                  v-if="swingView?.video_file?.[1]"
                                >
                                  <videoPlayer
                                    ref="player2"
                                    :videoinfo="swingView?.video_file?.[1]"
                                  />
                                </div>
                                <div class="no-data" v-else />
                              </div>
                            </div>
                            <ul class="tab type03 box">
                              <li
                                class="tab-list"
                                :class="{ 'is-active': currentTab == 'address' }"
                                @click="
                                  onClickStage(swingView?.fit_address, 'address')
                                "
                              >
                                <span class="icon">
                                  <svg-address />
                                </span>
                                <span class="text">address</span>
                              </li>
                              <li
                                class="tab-list"
                                :class="{
                                  'is-active': currentTab == 'backswing',
                                }"
                                @click="
                                  onClickStage(
                                    swingView?.fit_takeback,
                                    'backswing',
                                  )
                                "
                              >
                                <span class="icon">
                                  <svg-back-swing />
                                </span>
                                <span class="text">backswing</span>
                              </li>

                              <li
                                class="tab-list"
                                :class="{ 'is-active': currentTab == 'topswing' }"
                                @click="
                                  onClickStage(
                                    swingView?.fit_top_swing,
                                    'topswing',
                                  )
                                "
                              >
                                <span class="icon">
                                  <svg-top-swing />
                                </span>
                                <span class="text">topswing</span>
                              </li>

                              <li
                                class="tab-list"
                                :class="{
                                  'is-active': currentTab == 'downswing',
                                }"
                                @click="
                                  onClickStage(
                                    swingView?.fit_down_swing,
                                    'downswing',
                                  )
                                "
                              >
                                <span class="icon">
                                  <svg-down-swing />
                                </span>
                                <span class="text">downswing</span>
                              </li>

                              <li
                                class="tab-list"
                                :class="{ 'is-active': currentTab == 'impact' }"
                                @click="
                                  onClickStage(swingView?.fit_impact, 'impact')
                                "
                              >
                                <span class="icon">
                                  <svg-impact />
                                </span>
                                <span class="text">impact</span>
                              </li>
                              <li
                                class="tab-list"
                                :class="{
                                  'is-active': currentTab == 'follow-through',
                                }"
                                @click="
                                  onClickStage(
                                    swingView?.fit_follow,
                                    'follow-through',
                                  )
                                "
                              >
                                <span class="icon">
                                  <svg-follow-through />
                                </span>
                                <span class="text">follow-through</span>
                              </li>
                              <li
                                class="tab-list"
                                :class="{ 'is-active': currentTab == 'finish' }"
                                @click="
                                  onClickStage(swingView?.fit_finish, 'finish')
                                "
                              >
                                <span class="icon">
                                  <svg-finish />
                                </span>
                                <span class="text">finish</span>
                              </li>
                            </ul>
                            <div class="cont-wrap">
                              <div class="title">Step Balance</div>
                              <div class="cont-box">
                                <div class="foot-area">
                                  <span></span>
                                  <span class="foot-area-list"
                                    ><span class="point teal">L</span
                                    >{{ animated.Left }}</span
                                  >
                                  <span></span>
                                  <span class="foot-area-list"
                                    ><span class="point yellow">B</span
                                    >{{ animated.Back }}</span
                                  >
                                  <span>
                                    <img
                                      src="/public/images/default/img_human_footprints.png"
                                      alt="img_human_footprints"
                                    />
                                  </span>
                                  <span class="foot-area-list"
                                    ><span class="point yellow">F</span
                                    >{{ animated.Front }}</span
                                  >
                                  <span></span>
                                  <span class="foot-area-list"
                                    ><span class="point teal">R</span
                                    >{{ animated.Right }}</span
                                  >
                                  <span></span>
                                </div>
                                <EChart
                                    :list="swingView?.shotweight_info?.list || []"
                                    :totalFrames="Number(swingView?.fit_total_frames || 0)"
                                    :playTime="Number(swingView?.fit_play_time || 0)"
                                    @seek="onSeek"
                                    @balance="onBalance"   
                                  />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-2">
                          <div class="cont-section">
                            <div class="table-area">
                              <div class="table" ref="tableRef">
                                <ul class="row">
                                  <li class="row-list">
                                    <p class="tit">클럽 정보</p>
                                    <div class="info">
                                      {{ swingView.fit_club_code }}
                                    </div>
                                  </li>
                                  <li class="row-list">
                                    <p class="tit">볼속도</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.ballspeed),
                                          "km/h",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">백스핀</p>
                                    <div class="info">
                                      {{
                                        common.suffix(swingView.backspin, "rpm")
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">캐리</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.carry),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">클럽속도</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.headspeed),
                                          "km/h",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">볼방향</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.balldirection),
                                          "deg",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">사이드스핀</p>
                                    <div class="info">
                                      {{
                                        common.suffix(swingView.sidespin, "rpm")
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">비거리</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.distance),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">체공시간</p>
                                    <div class="info">
                                      {{ common.suffix(swingView.duration, "s") }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">탈출각</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.launchangle),
                                          "deg",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">미트율</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.smashfactor),
                                          "%",
                                        )
                                      }}
                                    </div>
                                  </li>

                                  <li class="row-list">
                                    <p class="tit">수직최고점</p>
                                    <div class="info">
                                      {{
                                        common.suffix(
                                          common.toFixed(swingView.peakvertical),
                                          "m",
                                        )
                                      }}
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="cont-section">
                            <div class="col-wrap">
                              <div class="col-list">
                                <div class="col-list-title">
                                  궤적 상단 뷰
                                </div>
                                <div class="col-list-cont">
                                  <EChart2
                                    :raw="swingView?.fit_ball_trajectory || []"
                                  />
                                </div>
                              </div>
                              <div class="col-list">
                                <div class="col-list-title">
                                  궤적 측면 뷰
                                </div>
                                <div class="col-list-cont">
                                  <EChart3
                                    :raw="swingView?.fit_ball_trajectory || []"
                                  />
                                </div>
                              </div>
                              <div class="col-list">
                                <div class="col-list-title">클럽 패스</div>
                                <div class="col-list-cont">
                                  <div class="image" :style="{ backgroundImage: `url(${getFitImagePath()})` }"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
            </div>
          </div>
        </template>
      </section>
    </div>
    <div class="academy-btn">
      <div class="btn-wrap">
        <button type="button" class="btn-out" @click="goBack">
          <img src="/public/images/icon/icon_exit_to.png" alt="icon_exit_to" />
          <span class="text">나가기</span>
        </button>
        <button type="button" class="btn btn-prev" @click="prevPage" aria-label="이전">
          <img
            src="/public/images/icon/icon_arrow_backward.png"
            alt="icon_arrow_backward"
          />
        </button>
        <button type="button" class="btn btn-next" @click="nextPage" aria-label="다음">
          <img
            src="/public/images/icon/icon_arrow_forward.png"
            alt="icon_arrow_forward"
          />
        </button>
      </div>
    </div>
  </div>

  <modal-member-info-view
    :isOpen="modals.modalMemberInfoView"
    @update:isOpen="modals.modalMemberInfoView = $event"
    :item="selectedItem"
  />
  <modal-callback
    :isOpen="modals.modalCallback"
    @update:isOpen="modals.modalCallback = $event"
  />

  <!-- 토스트 알림 모달 -->
  <toast-modal
      :isOpen="modals.toastModal"
      :toastMessage="toastMessage"
      @update:isOpen="modals.toastModal = $event"
  />

  <!-- 토스트 삭제 모달 -->
  <toast-delete-modal
    :isOpen="modals.toastDeleteModal"
    :toastDeleteMessage="toastDeleteMessage"
    @delete="handleDelete"
    @update:isOpen="modals.toastDeleteModal = $event"
  />

  <!-- 토스트 경고 모달 -->
  <toast-warn-modal
    :isOpen="modals.toastWarnModal"
    :toastWarnMessage="toastWarnMessage"
    @update:isOpen="modals.toastWarnModal = $event"
  />

  <!-- 토스트 에러 모달 -->
  <toast-error-modal
    :isOpen="modals.toastErrorModal"
    :toastErrorMessage="toastErrorMessage"
    @update:isOpen="modals.toastErrorModal = $event"
  />

</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useCoachingApi } from "~/api/coaching";
import { useMembersApi } from "~/api/members";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "@/utils/common";
import EChart from "~/components/chart/EChart.vue";
import EChart2 from "~/components/chart/EChart2.vue";
import EChart3 from "~/components/chart/EChart3.vue";
import VideoPlayer from "~/components/video/videoPlayer.vue";
import { useWindowSize } from "@vueuse/core";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastDeleteModal from "@/components/toast-ui/toast-delete-modal.vue";
import toastErrorModal from "@/components/toast-ui/toast-error-modal.vue";
import toastWarnModal from "@/components/toast-ui/toast-warn-modal.vue";
import { useHead } from '#app'

const common = useCommon();
const route = useRoute();
const router = useRouter();
const coachingApi = useCoachingApi();
const membersApi = useMembersApi();


const enroll_pk = Number(route.params.slug);
const finalReport = ref(false);
const accordionIndex = ref(-1);
const currentTabMenu = ref(0);
const currentClass = ref(0);
const currentStep = ref(0);

const swingView = ref({});
const classList = ref([]);
const selectedStep = ref(null);
const selectedMission = ref(null);
const selectedResult = ref(null);
const targets = {
  Left: ref(55),
  Right: ref(65),
  Back: ref(75),
  Front: ref(85),
};

const animated = {
  Left: ref(0),
  Right: ref(0),
  Back: ref(0),
  Front: ref(0),
};

const academyView = ref({});
const resultAnalysisView = ref({});
const setDepthList = ref([]);
const qnaData = ref({
  listcnt: 0,
  list: [],
});

const relatedData = ref({
  list: [],
});

const _coachingView = async () => {
  try {
    const res = await coachingApi._coachingview(enroll_pk);

    academyView.value = res.view;
    const len = Array.isArray(academyView.value.class_list)
      ? academyView.value.class_list.length
      : 0;

    // ✅ 처음부터 전부 "열림" 상태로 하고 싶으면:
    setDepthList.value = Array.from({ length: len }, (_, i) => i);

    relatedData.value.list = res.relatedcoachinglist;
    currentClass.value = academyView.value.class_list?.[0]?.class_pk;
    currentStep.value =
      academyView.value.class_list?.[0]?.step_list?.[0]?.step_pk;
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 토스트 삭제 모달
const modals = reactive({});
const delKey = ref(null);
const toastDeleteMessage = ref();
const handleDeleteToast = (message, key) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastDeleteModal"] = true;
  toastDeleteMessage.value = message;
  delKey.value = key;
};

// 삭제 로직
const handleDelete = async () => {
  tooltipShow.value = -1;
  replyTooltipShow.value = -1;
  if (!delKey.value) return;
  try {
    const { message } = await coachingApi._qnadrop({
      comment_pk: delKey.value,
    });

    await _qnaList();
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 토스트 확인 모달
const toastMessage = ref();
const handleToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 토스트 에러 모달
const toastErrorMessage = ref();
const handleErrorToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastErrorModal"] = true;
  toastErrorMessage.value = message;
};

// 토스트 경고 모달
const toastWarnMessage = ref();
const handleWarnToast = (message) => {
  document.querySelector("body").classList.add("is-hidden");
  modals["toastWarnModal"] = true;
  toastWarnMessage.value = message;
};

const modalOpen = (modalName) => {
  modals[modalName] = !modals[modalName];
  document.querySelector("body").classList.add("is-hidden");
};


const selectedItem = ref({});
const modalMemberInfo = async (val) => {

  try {
    const res = await membersApi._playerview({ player_pk: val });

    const data = res.view;

    // 🔥 2) selectedItem에 filtered_memo 추가
    selectedItem.value = {
      ...data,
    };

    modals["modalMemberInfoView"] = true;
  } catch (err) {
    handleErrorToast(err.message);
  }
  
};

// 스윙 화면 유무
const swingPage = ref(false);

// 로그인 유무
const isLogin = ref(false);

// 아코디언 클릭 이벤트

const handleAccordion = (item, index) => {
  const idx = setDepthList.value.indexOf(index);
  if (idx > -1) {
    setDepthList.value.splice(idx, 1);
  } else {
    setDepthList.value.push(index);
  }

  // currentClass.value = item.class_pk;
};

const currentClassData = computed(() => {
  return (
    academyView.value.class_list?.find(
      (v) => v.class_pk == currentClass.value, // 숫자/문자 구분 문제 예방 위해 == 권장
    ) || {}
  );
});

const currentStepData = computed(() => {
  const cls = currentClassData.value; // 반드시 .value
  return (
    cls?.step_list?.find(
      (v) => v.step_pk == currentStep.value, // == OK
    ) || {}
  );
});

// 최종 코칭 리포트 클릭 이벤트
const accordionLastIndex = ref(false);
const handleFinalReport = (e) => {
  finalReport.value = true;
  accordionLastIndex.value = true;
  swingPage.value = false;
};

// 트랜지션 효과
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

const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
  }
};

// 탭 리스트

// 모바일 탭 클릭 이벤트
const tabIndex = ref(-1);
const handleMobAccordion = (item) => {
  tabIndex.value = (tabIndex.value === item.step_pk) ? -1 : item.step_pk
  swingPage.value = false
};

// 최종 코칭 리포트(원포인트레슨) 리스트
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

// 미션 조건 테이블 리스트



// 좋아요 클릭 이벤트 관련
const isLike = ref(false);
const count = ref(55);
const handleLike = () => {
  if (isLike.value) {
    isLike.value = false;
    count.value--;
  } else {
    isLike.value = true;
    count.value++;
  }
};

// 답글 좋아요 클릭 이벤트
const isReplyLike = ref(false);
const replyCounts = ref(1);
const handleReplyLike = () => {
  if (isReplyLike.value) {
    isReplyLike.value = false;
    replyCounts.value--;
  } else {
    isReplyLike.value = true;
    replyCounts.value++;
  }
};

// 좋아요 클릭 이벤트
const isCommentLike = ref(false);
const commentCounts = ref(1);
const handleCommentLike = () => {
  if (isCommentLike.value) {
    isCommentLike.value = false;
    commentCounts.value--;
  } else {
    isCommentLike.value = true;
    commentCounts.value++;
  }
};

// 미션 조건(프로그레스 관련)
const targetProgress = ref(30);
const animatedProgress = ref(0);
const totalAttempts = 10;
const currentAttempt = computed(() => {
  return Math.min(
    Math.round((animatedProgress.value / 100) * totalAttempts),
    totalAttempts,
  );
});

// 답글 리스트
const replyList = [
  {
    name: "회원",
    date: "2025.3.15 12:15",
    desc: "비거리를 늘리기 위해서는 하체의 회전과 지면 반별력을 통해 헤드 스피드를 최대치로 끌어올려야 합니까?",
    children: [
      {
        name: "코치",
        date: "2025.3.15 12:15",
        desc: "비거리를 늘리기 위해서는 하체의 회전과 지면 반별력을 통해 헤드 스피드를 최대치로 끌어올려야 합니까?",
      },
    ],
  },
  {
    name: "회원",
    date: "2025.3.15 12:15",
    desc: "비거리를 늘리기 위해서는 하체의 회전과 지면 반별력을 통해 헤드 스피드를 최대치로 끌어올려야 합니까?",
  },
];

// 등록 이벤트
const commentText = ref("");
const replyNewText = ref("");
const comments = ref([
  {
    id: 1,
    name: "John Doe",
    date: "2025. 10. 13. 오후 5:31:03",
    text: "ㄴㅇ",
    likes: 0,
    isLiked: false,
    replies: [],
  },
  {
    id: 2,
    name: "John Doe",
    date: "2025. 10. 13. 오후 5:31:03",
    text: "ㄴㅇ",
    likes: 0,
    isLiked: false,
    replies: [],
  },
]);
const submitComment = async () => {
  if (commentText.value.trim() === "") {
    handleWarnToast("내용을 입력해 주세요");
    return false;
  }

  try {
    const { message } = await coachingApi._qnawrite({
      enroll_pk,
      currentClass: currentClass.value,
      currentStep: currentStep.value,
      content: commentText.value,
    });

    commentText.value = "";
    await _qnaList();
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const handleReplySubmit = async (comment_pk) => {
  if (replyNewText.value.trim() === "") {
    handleWarnToast("내용을 입력해 주세요");
    return false;
  }

  try {
    const { message } = await coachingApi._qnawrite({
      comment_pk,
      enroll_pk,
      currentClass: currentClass.value,
      currentStep: currentStep.value,
      content: replyNewText.value,
    });

    replyNewText.value = "";
    inputComment.value = -1;
    await _qnaList();
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 코칭 페이지 가기 클릭 이벤트
const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

// 현재 페이지 상태 (숫자)
const currentPage = ref(0);

// 초기값: URL param에서 가져오기
const initPage = Number(route.params.slug);
if (!isNaN(initPage)) currentPage.value = initPage;

// 좌메뉴 클릭 이벤트

const activeDepth = ref({ accIndex: -1, depthIndex: -1 });

const handleDepthClick = (accIndex, depth, depthIndex, item) => {
  finalReport.value = false;
  swingPage.value = false;
  currentStep.value = depth.step_pk;
  currentClass.value = item.class_pk;
  // 같은 걸 클릭하면 해제
  if (
    activeDepth.value.accIndex === accIndex &&
    activeDepth.value.depthIndex === depthIndex
  ) {
    activeDepth.value = { accIndex: -1, depthIndex: -1 };
  } else {
    // 새로운 걸 클릭하면 활성화
    activeDepth.value = { accIndex, depthIndex };

    // depth.state = "Y";
    //router.push({ path: `/academy/${accIndex}`, query: { child: depthIndex } })

    // // 모든 step_list Y이면 item.state도 Y로 변경
    // if (item.step_list.every((child) => child.completed_yn == "1")) {
    //   item.state = "Y";
    // }
  }
};

// 탭 메뉴 클릭 이벤트(최종 코칭 리포트) - 모바일
const currentTab = ref("report");

const tabMenuClick = (item) => {
  currentClass.value = Number(item.class_pk);
  finalReport.value = item.title === "최종 코칭 리포트";

  // ✅ 클래스 바꾸면 아코디언/스윙 상태 초기화
  tabIndex.value = -1;
  swingPage.value = false;
};

// 영상 보기 클릭 이벤트
const goToSwing = async (data) => {
  swingPage.value = true;
  await _playerswingview(data);
};

const resultChange = async () => {
  await _playerswingview(selectedResult.value);
};

const _playerswingview = async (val) => {
  try {
    const res = await coachingApi._playerswingview(val);

    swingView.value = res.view;
    classList.value = res.classlist;

    if (classList.value.connected_paths) {
      selectedStep.value = Number(classList.value.connected_paths.step_pk);
      selectedMission.value = Number(
        classList.value.connected_paths.mission_pk,
      );
      selectedResult.value = Number(classList.value.connected_paths.result_pk);
    }
  } catch (err) {
    handleErrorToast(err.message);
  }
};

// 탭 메뉴 클릭 이벤트(최종 코칭 리포트) - pc
const tabClick = (index) => {
  currentTab.value = index;
};

// 스윙 리스트
const swingList = [
  "address",
  "backswing",
  "topswing",
  "downswing",
  "impact",
  "follow-through",
  "finish",
];

// 스윙 정보 리스트
const swingInfo = [
  {
    name: "클럽정보",
    info: "I7",
  },
  {
    name: "볼속도",
    info: "97.5km/h",
  },
  {
    name: "백스핀",
    info: "3244rpm",
  },
  {
    name: "캐리",
    info: "188m",
  },
  {
    name: "클럽속도",
    info: "77.5km/h",
  },
  {
    name: "볼방향",
    info: "0.2deg",
  },
  {
    name: "사이드스핀",
    info: "-29rpm",
  },
  {
    name: "비거리",
    info: "210m",
  },
  {
    name: "클럽진입각",
    info: "10.5deg",
  },
  {
    name: "탈출각",
    info: "20.5deg",
  },
  {
    name: "구질",
    info: "Push Straight",
  },
  {
    name: "티높이",
    info: "55mm",
  },
];

// 모바일 메뉴 리스트
const mobMenuList = [
  {
    name: "나의 기록실",
    children: [
      {
        name: "대시보드",
        link: "/myrecord",
      },
      {
        name: "나의 라운드",
        link: "/myrecord/myround",
      },
      {
        name: "나의 토너먼트",
        link: "/myrecord/mytournament",
      },
      {
        name: "나의 이벤트",
        link: "/myrecord/myevent",
      },
      {
        name: "나의 스윙",
        link: "/myrecord/myswing",
      },
    ],
  },
  {
    name: "나의코칭",
    children: [
      {
        name: "스마트매칭",
        link: "/mycoaching/smartmatching",
      },
      {
        name: "나의 강좌",
        link: "/mycoaching/mylecture",
      },
    ],
  },
  {
    name: "나의정보",
    children: [
      {
        name: "개인정보",
        link: "/membership/info",
      },
      {
        name: "단골매장",
        link: "/membership/shop",
      },
    ],
  },
];

// 프로필 클릭 이벤트
const showMobMenu = ref(false);
const handleProfile = () => {
  showMobMenu.value = true;
  document.querySelector("body").classList.add("is-hidden");
};

// 메뉴 닫기 클릭 이벤트
const menuClose = () => {
  showMobMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

// 모바일 메뉴 아코디언 클릭 이벤트
const profileGnbIndex = ref(-1);
const handleProfileGnb = (i) => {
  profileGnbIndex.value = profileGnbIndex.value === i ? -1 : i;
};

// 모바일 하위 메뉴 아코디언 클릭 이벤트
const gnbProfileDepthIndex = ref(-1);
const handleProfileGnbDepth = (depth, j) => {
  gnbProfileDepthIndex.value = gnbProfileDepthIndex.value === j ? -1 : j;
  router.push(depth.link);
  showMobMenu.value = false;
  document.querySelector("body").classList.remove("is-hidden");
};

const targetClass = computed(() => {
  const classes = classList.value?.academy_master?.class_list;
  if (!Array.isArray(classes) || classes.length === 0) return null;

  // 1) connected_paths[0].class_pk 매칭
  const cp = classList.value?.connected_paths;
  if (cp?.class_pk != null) {
    const byCp = classes.find(
      (c) => Number(c.class_pk) === Number(cp.class_pk),
    );
    if (byCp) return byCp;
  }

  // 2) selectedStep이 속한 클래스 찾기
  const stepPk = Number(selectedStep.value);
  if (!Number.isNaN(stepPk)) {
    const byStep = classes.find(
      (c) =>
        Array.isArray(c.step_list) &&
        c.step_list.some((s) => Number(s.step_pk) === stepPk),
    );
    if (byStep) return byStep;
  }

  // 3) 폴백: 첫 클래스
  return classes[0];
});

// ✅ 선택 스텝 (selectedStep 매칭 → 첫 스텝)
const targetStep = computed(() => {
  const cls = targetClass.value;
  const steps = cls?.step_list;
  if (!Array.isArray(steps) || steps.length === 0) return null;

  const stepPk = Number(selectedStep.value);
  if (!Number.isNaN(stepPk)) {
    const found = steps.find((s) => Number(s.step_pk) === stepPk);
    if (found) return found;
  }

  // 폴백: 첫 스텝
  return steps[0];
});

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

// 페이지 변경 시 URL 업데이트 (양방향 동기화)
watch(currentPage, (page) => {
  if (page !== Number(route.params.slug)) {
    router.push({ name: route.name, params: { slug: page } });
  }
});

// URL param 변경 시 currentPage 업데이트
watch(
  () => route.params.slug,
  (slug) => {
    const page = Number(slug);
    if (!isNaN(page) && page !== currentPage.value) {
      currentPage.value = page;
    }
  },
);

const commentEditText = ref("");
const handleSubmit = async (comment_pk) => {
  if (commentEditText.value.trim() === "") {
    handleWarnToast("내용을 입력해 주세요");
    return false;
  }

  try {
    const { message } = await memberApi._qnawrite({
      comment_pk,
      enroll_pk,
      currentClass: currentClass.value,
      currentStep: currentStep.value,
      content: commentEditText.value,
    });

    commentEditText.value = "";
    inputShow.value = -1;
    await _qnaList();
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const handleEditSubmit = async (comment_pk) => {
  if (commentEditText.value.trim() === "") {
    handleWarnToast("내용을 입력해 주세요");
    return false;
  }

  try {
    const { message } = await coachingApi._qnamodify({
      comment_pk,
      enroll_pk,
      currentClass: currentClass.value,
      currentStep: currentStep.value,
      content: commentEditText.value,
    });

    commentEditText.value = "";
    inputShow.value = -1;
    replyInputShow.value = -1;
    await _qnaList();
    handleToast(message);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const _qnaDrop = async (comment_pk) => {
  handleDeleteToast('댓글이 삭제됩니다', comment_pk)
};

const getFitImagePath = () => {
  const imageList = swingView.value?.fit_image;

  if (Array.isArray(imageList)) {
    const match = imageList.find((v) => v.fit_image_type_fk == "2");
    return match && match.fit_image_path ? match.fit_image_path : "";
  }

  return "";
};

// 댓글 더보기 툴팁
const tooltipShow = ref(-1);
const toggleTooltip = (item) => {
  tooltipShow.value =
    tooltipShow.value === item.comment_pk ? -1 : item.comment_pk;
};

/// 답글 더보기 툴팁
const replyTooltipShow = ref(-1);
const replyToggleTooltip = (item) => {
  replyTooltipShow.value =
    replyTooltipShow.value === item.comment_pk ? -1 : item.comment_pk;
};

// 댓글 수정
const inputShow = ref(-1);
const handleEdit = (comment_pk) => {
  commentEditText.value = qnaData.value.list.find(
    (c) => c.comment_pk === comment_pk,
  )?.content;
  if (tooltipShow.value === comment_pk) {
    tooltipShow.value = -1;
    inputShow.value = comment_pk;
  } else {
    inputShow.value = comment_pk;
    tooltipShow.value = -1;
  }
};

// 답글 수정
const replyInputShow = ref(-1);
const replyHandleEdit = (comment_pk) => {
  commentEditText.value = qnaData.value.list.find(
    (c) => c.comment_pk === comment_pk,
  )?.content;
  if (replyInputShow.value === comment_pk) {
    replyTooltipShow.value = -1;
    replyInputShow.value = comment_pk;
  } else {
    replyInputShow.value = comment_pk;
    replyTooltipShow.value = -1;
  }
};

// 댓글 취소
const handleCancel = () => {
  inputShow.value = -1;
};

// 답글 취소
const replyHandleCancel = () => {
  replyInputShow.value = -1;
};

// 답글쓰기
const inputComment = ref(-1);
const handleComment = (item) => {
  inputComment.value = item.comment_pk;
};

// 답글쓰기 취소
const handleCommentCancel = () => {
  inputComment.value = -1;
};

const qnaPagenoRef = useRouteQuery("qnapageno", 1);

const qnaPageno = computed({
  get: () => Number(qnaPagenoRef.value) || 1,
  set: (v) => {
    qnaPagenoRef.value = v;
  },
});

const _qnaList = async () => {
  try {
    const res = await coachingApi._qnalist({
      enroll_pk,
      class_pk: currentClass.value,
      step_pk: currentStep.value,
      pageno: qnaPageno.value,
    });

    qnaData.value.list = res.list;
    qnaData.value.listcnt = Number(res.listcnt);
  } catch (err) {
    handleErrorToast(err.message);
  }
};

const threads = computed(() => {
  const list = qnaData.value.list || [];
  const map = new Map();
  const toDate = (it) => new Date(it?.regdate ?? 0);

  for (const it of list) {
    const isTop = it.parent_comment_fk == null; // ✅ 최상위
    const threadKey = isTop
      ? String(it.comment_pk)
      : String(it.parent_comment_fk);

    if (!map.has(threadKey)) map.set(threadKey, { top: null, replies: [] });
    const bucket = map.get(threadKey);

    if (isTop) bucket.top = it;
    else bucket.replies.push(it);
  }

  // top 없는 이상한 스레드는 버리기 (방어용)
  const result = [...map.values()].filter((v) => v.top);

  // 대댓글 정렬
  result.forEach((v) =>
    v.replies.sort(
      (a, b) => toDate(a) - toDate(b) || a.comment_pk - b.comment_pk,
    ),
  );

  // 스레드 정렬
  result.sort(
    (a, b) =>
      toDate(a.top) - toDate(b.top) || a.top.comment_pk - b.top.comment_pk,
  );

  return result;
});


// 동영상 플레이어 ref
const player1 = ref(null);
const player2 = ref(null);

// 총 프레임/플레이타임 숫자 변환
const totalFrames = computed(() => Number(swingView?.fit_total_frames) || 600);
const playTime = computed(() => Number(swingView?.fit_play_time) || 5);
const frameRate = computed(() => totalFrames.value / playTime.value);

// 탭 클릭 시 특정 프레임으로 이동
const onClickStage = (frameIndex, tabName) => {
  currentTab.value = tabName;
  if (!frameRate.value || !frameIndex) return;

  // 프레임 → 초 변환
  const sec = frameIndex / frameRate.value;

  // 두 비디오 플레이어 동시에 이동
  player1.value?.setCurrentTime?.(sec);
  player2.value?.setCurrentTime?.(sec);
};

const onSeek = (time) => {
  if (time == null) return;
  // 여기서 player1/player2 컨트롤
  // player.currentTime(time); player.pause();
};

const onBalance = ({ pct /*, raw*/ }) => {
  // 퍼센트 반영 (정수 반올림)
  animated.Left.value  = Math.round(pct.L || 0)
  animated.Right.value = Math.round(pct.R || 0)
  animated.Front.value = Math.round(pct.F || 0)
  animated.Back.value  = Math.round(pct.B || 0)

  // 원시값을 쓰고 싶으면 위 대신 raw.* 사용
  // animated.Left.value  = Math.round(raw.L || 0)
  // ...
}

const nickname = ref("");
// 애니메이션 관련
onMounted(async () => {
  await _coachingView();
  nickname.value = sessionStorage.getItem("nickname") || "";
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
});

const onClickHandler = (page) => {
  _qnaList();
  // const item = preferShop.value[page - 1];
  // if (item) emit("itemChg", item);
  // return false;
};

watch(
  () => [currentStep.value], // 두 값 같이 관찰
  ([newStep], [oldStep]) => {
    //console.log("newScoretype", newScoretype);
    // 필요하면 조건 체크
    if (newStep != null) {
      // 옵션: 페이지 리셋
      // searchData.subpageno = 1;
      _qnaList();
    }
  },
  { immediate: false }, // 처음 마운트 때도 호출하려면 true
);

definePageMeta({
  layout: "detail",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '코칭',
  meta: [
    { name: 'description', content: '코칭 상세 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/coaching-detail.scss";
@use "@/assets/scss/pages/swing.scss";
@use "@/assets/scss/components/modal.scss";
</style>
