<template>
    <div class="swing-list detail">
      <!-- 2026-09-16: 상세 페이지에 불필요한 날짜검색(filter-box) 제거 — 제목 중복처럼 보이던 목업 잔재 -->
      <div class="detail-wrap">
        <div class="head">
          <div class="title">{{ swingInfo.title || '스윙영상' }}</div>
          <div class="date">{{ swingInfo.timezone_regdate || swingInfo.regdate || '-' }}</div>
        </div>
        <div class="cont">
           <div class="video-area">
              <div class="video-area-list">
                <videoPlayer
                  v-if="swingInfo?.video_file?.[0]"
                  ref="player1"
                  @time="onVideoTime"
                  @state="onVideoState"
                  :videoinfo="swingInfo.video_file[0]"
                />
                <div class="no-data" v-else>영상이 없습니다.</div>
              </div>
              <div class="video-area-list">
                <videoPlayer
                  v-if="swingInfo?.video_file?.[1]"
                  ref="player2"
                  :videoinfo="swingInfo.video_file[1]"
                />
                <div class="no-data" v-else>영상이 없습니다.</div>
              </div>
           </div>
           <div class="tab type03 box">
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_address, 'address')" :class="{ 'is-active': currentTab == 'address' }">
                <span class="icon">
                  <svg-address />
                </span>
                <span class="text">address</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_takeback, 'backswing')" :class="{ 'is-active': currentTab == 'backswing' }">
                <span class="icon">
                  <svg-back-swing />
                </span>
                <span class="text">Backswing</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_top_swing, 'topswing')" :class="{ 'is-active': currentTab == 'topswing' }">
                <span class="icon">
                  <svg-top-swing />
                </span>
                <span class="text">Topswing</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_down_swing, 'downswing')" :class="{ 'is-active': currentTab == 'downswing' }">
                <span class="icon">
                  <svg-down-swing />
                </span>
                <span class="text">Downswing</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_impact, 'impact')" :class="{ 'is-active': currentTab == 'impact' }">
                <span class="icon">
                  <svg-impact />
                </span>
                <span class="text">Impact</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_follow, 'follow-through')" :class="{ 'is-active': currentTab == 'follow-through' }">
                <span class="icon">
                  <svg-follow-through />
                </span>
                <span class="text">Follow-through</span>
              </div>
              <div class="tab-list" @click="onStageSync(swingInfo?.fit_finish, 'finish')" :class="{ 'is-active': currentTab == 'finish' }">
                <span class="icon">
                  <svg-finish />
                </span>
                <span class="text">Finish</span>
              </div>
           </div>
           <div class="step-balance">
            <div class="foot-area">
              <span></span>
              <span class="foot-area-list">
                <span class="point teal">L</span>
                {{ animated.Left }}
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point yellow">B</span>
                {{ animated.Back }}
              </span>
              <span>
                <img
                  src="/images/default/img_human_footprints.png"
                  alt="발 밸런스"
                />
              </span>
              <span class="foot-area-list">
                <span class="point yellow">F</span>
                {{ animated.Front }}
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point teal">R</span>
                {{ animated.Right }}
              </span>
              <span></span>
            </div>
            <!-- 2026-09-16: 체중 그래프 aimember 정본 컴포넌트로 교체(chart-line-type-1).
                 자동 루프가 세로바(markLine)를 움직이며 발 밸런스 값 연동, 구분동작 클릭 시 markIndex로 해당 프레임에 고정. -->
            <div class="chart">
              <chart-line-type-1
                :list="swingInfo?.shotweight_info?.list || []"
                :totalFrames="Number(swingInfo?.fit_total_frames || 0)"
                :playTime="Number(swingInfo?.fit_play_time || 0)"
                :markIndex="stageFrame"
                :currentTime="videoTime"
                :follow="true"
                @seek="onSeekSync"
                @balance="onBalance" />
            </div>
           </div>
           <div class="col-2">
            <div class="cont-section">
              <div class="table-section">
                <div class="table-section-wrap">
                  <div class="row">
                    <!-- 2026-09-16: 값 포맷/필드 정본화 (aishop coaching/golf 상세 참조).
                         소숫점 2자리(common.toFixed)+단위(common.suffix). 스핀류는 정수 그대로.
                         클럽진입각/구질/티높이는 swingview 응답에 필드 자체가 없어(근거: fit_shotdata 171 응답 키 확인)
                         aishop과 동일하게 체공시간/미트율/수직최고점으로 대체. -->
                    <div class="row-item">
                      <div class="tit">클럽정보</div>
                      <!-- 2026-09-16: 클럽코드(101 등) → 클럽명(DR 등). 근거: aiadmin common.getClubcodeToClubname, aimember myswing 상세 동일 사용 -->
                      <div class="info">{{ common.getClubcodeToClubname(String(swingInfo.fit_club_code ?? '')) }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">볼속도</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.ballspeed), 'm/s') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">백스핀</div>
                      <div class="info">{{ common.suffix(swingInfo.backspin, 'rpm') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">캐리</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.carry), 'm') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">클럽속도</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.headspeed), 'm/s') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">볼방향</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.balldirection), '°') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">사이드스핀</div>
                      <div class="info">{{ common.suffix(swingInfo.sidespin, 'rpm') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">비거리</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.distance), 'm') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">체공시간</div>
                      <div class="info">{{ common.suffix(common.n2(swingInfo.duration), 's') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">탈출각</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.launchangle), '°') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">미트율</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.smashfactor), '') }}</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">수직최고점</div>
                      <div class="info">{{ common.suffix(common.toFixed(swingInfo.peakvertical), 'm') }}</div>
                    </div>
                  </div>
              </div>
              </div>
            </div>
            <div class="cont-section">
                <div class="col-wrap">
                  <!-- 2026-09-16: 목업(월별 mock) 제거 → 실제 fit_ball_trajectory([lateral,height,downrange] 3D좌표) 사용.
                       측면 뷰=EChart3(x:다운레인지, y:높이), 상단 뷰=EChart2(x:다운레인지, y:좌우편차). aishop coaching 상세 정본 참조. -->
                  <div class="col-list">
                    <div class="col-list-title">궤적 측면 뷰</div>
                    <div class="col-list-cont">
                      <div class="chart" style="height:300px;">
                        <EChart3 :raw="swingInfo?.fit_ball_trajectory || []" />
                      </div>
                    </div>
                  </div>
                  <div class="col-list">
                    <div class="col-list-title">궤적 상단 뷰</div>
                    <div class="col-list-cont">
                      <div class="chart" style="height:300px;">
                        <EChart2 :raw="swingInfo?.fit_ball_trajectory || []" />
                      </div>
                    </div>
                  </div>
                  <!-- 2026-10-20: 클럽 패스 = 피팅 기록의 실제 이미지(fit_image 유형 2), aimember 나의 스윙과 같은 방식. 없으면 안내 -->
                  <div class="col-list">
                    <div class="col-list-title">클럽 패스</div>
                    <div class="col-list-cont">
                      <div class="image club-path" v-if="clubPathImage" :style="{ backgroundImage: `url(${clubPathImage})` }"></div>
                      <div class="no-data" v-else>이미지가 없습니다.</div>
                    </div>
                  </div>
                </div>
            </div>
           </div>
           <div class="review">
              <div class="review-top">
                <span class="text">전체댓글</span>
                <span class="count">({{ commentList.length }})</span>
              </div>

              <!-- 댓글/답글 영역 -->
              <div class="review-reply">
                <div class="no-data" v-if="!commentList.length">등록된 댓글이 없습니다.</div>
                <div class="review-reply-list" v-for="(item, index) in commentList" :key="index">
                  <div class="review-reply-list-depth">
                    
                    <!-- 댓글(보기) -->
                    <template v-if="editingId !== index">
                      <div class="img-area no-depth">
                        <div class="img-area-inner" :style="{ backgroundImage: `url('${item.avatar}')` }"></div>
                      </div>
                      <div class="info-area">
                        <div class="tit">{{ item.nickname }}</div>
                        <div class="date">{{ item.date }}</div>
                        <div class="desc">{{ item.text }}</div>
                        <div class="btn-wrap align-left">
                          <button type="button" class="btn-comment" @click="handleComment(index)">
                            <span class="text">답글쓰기</span>
                          </button>
                        </div>
                      </div>
                      <div class="more-area">
                        <button type="button" class="btn-more" @click="handleTooltip(index)">
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
                        <transition name="fade">
                          <div class="tooltip-container" v-if="tooltipShow === index" :ref="(el) => setTooltipRef(el, index)">
                            <div class="tooltip-body">
                              <div class="cont">
                                <template v-if="item.is_candelete">
                                  <div class="cont-list">
                                    <button type="button" class="btn-edit" @click="handleEdit(index)">수정</button>
                                  </div>
                                  <div class="cont-list">
                                    <button type="button" class="btn-delete" @click="handleDelete(index)">삭제</button>
                                  </div>
                                </template>
                                <div class="cont-list" v-else>
                                  <span class="text">관리자가 작성한 댓글만 수정·삭제할 수 있습니다.</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </transition>
                      </div>
                    </template>

                    <!-- 댓글(수정) -->
                    <div class="review-writing" v-else>
                      <div class="name-area">
                        <span class="text">이름</span>
                      </div>
                      <div class="text-area">
                        <textarea v-model="editText" placeholder="댓글을 입력해 주세요."></textarea>
                      </div>
                      <div class="attach-area">
                        <div class="btn-area">
                          <button type="button" class="btn-default btn-md-line" @click="handleCancel(index)">취소</button>
                          <button type="button" class="btn-primary-purple btn-md-fill" @click="handleSave(index)">등록</button>
                        </div>
                      </div>
                    </div> 
                  </div>

                  <!-- 답글 -->
                  <div class="review-reply-depth" v-if="item.replies.length !== 0">
                    <div class="review-reply-list-depth" v-for="(reply, k) in item.replies" :key="k">

                      <!-- 보기 모드 -->
                      <template v-if="
                          editingReplyId.parentIndex !== index ||
                          editingReplyId.replyIndex !== k
                        ">
                        <div class="img-area">
                          <div class="img-area-inner" :style="{ backgroundImage: `url('${reply.avatar}')` }"></div>
                        </div>
                        <div class="info-area">
                          <div class="tit">{{ reply.nickname }}</div>
                          <div class="date">{{ reply.date }}</div>
                          <div class="desc">{{ reply.text }}</div>
                        </div>
                        <div class="more-area">
                          <button type="button" class="btn-more" @click="handleReplyTooltip(k)">
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
                          <transition name="fade">
                            <div class="tooltip-container" v-if="tooltipDepthShow === k" :ref="(el) => setTooltipDepthRef(el, k)">
                              <div class="tooltip-body">
                                <div class="cont">
                                  <template v-if="reply.is_candelete">
                                    <div class="cont-list">
                                      <button type="button" class="btn-edit" @click="handleReplyEdit(index, k)">수정</button>
                                    </div>
                                    <div class="cont-list">
                                      <button type="button" class="btn-delete" @click="handleReplyDelete(index, k)">삭제</button>
                                    </div>
                                  </template>
                                  <div class="cont-list" v-else>
                                    <span class="text">관리자가 작성한 댓글만 수정·삭제할 수 있습니다.</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </transition>
                        </div>
                      </template>

                      <!-- 수정 모드 -->
                      <div class="review-writing" v-else>
                        <div class="name-area">
                          <span class="text">이름</span>
                        </div>
                        <div class="text-area">
                          <textarea v-model="replyText" placeholder="댓글을 입력해 주세요."></textarea>
                        </div>
                        <div class="attach-area">
                          <div class="btn-area">
                            <button type="button" class="btn-default btn-md-line" @click="handleReplyCancel(k)">취소</button>
                            <button type="button" class="btn-primary-purple btn-md-fill" @click="handleReplySave(index, k)">등록</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 답글 작성 -->
                  <div class="review-reply-depth review-reply-list" v-if="replyBoxFor === index">
                    <div class="review-writing">
                      <div class="name-area">
                        <span class="text">nickname</span>
                      </div>
                      <div class="text-area">
                        <textarea v-model="replyText" placeholder="답글을 입력해주세요."></textarea>
                      </div>
                      <div class="attach-area">
                        <div class="btn-area">
                          <button type="button" class="btn-default btn-md-line" @click="handleReplyCancel">취소</button>
                          <button type="button" class="btn-primary-purple btn-md-fill" @click="handleReplySubmit(index)">등록</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- 댓글 작성 -->
              <div class="review-writing">
                <div class="name-area">
                  <span class="text">관리자 댓글</span>
                </div>
                <div class="text-area">
                  <textarea v-model="commentText" placeholder="댓글을 입력해 주세요."></textarea>
                </div>
                <div class="attach-area"> 
                  <div class="btn-area">
                    <button type="button" class="btn-primary-purple btn-md-fill" @click="handleSubmit">등록</button>
                  </div>
                </div>
              </div> 
           </div>
           <div class="btn-wrap">
              <div class="btn-group align-left">
                <nuxt-link to="/swing/list" class="btn-md-line">목록</nuxt-link>
              </div>
           </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useSwingApi } from "~/api/swing";
// 2026-09-14: 스윙 영상/밸런스 배선 (aishop coaching/golf 상세 정본 참고)
import videoPlayer from "~/components/video/videoPlayer.vue";
// 2026-09-16: 궤적 측면/상단 뷰 실데이터 차트 (aishop coaching 상세 정본과 동일 컴포넌트)
import EChart2 from "~/components/chart/EChart2.vue";
import EChart3 from "~/components/chart/EChart3.vue";
import { useCommon } from "@/utils/common";

// 2026.06.17[cgnoh]: 라우터 관련
const route = useRoute();
const swingPk = computed(() => route.params.slug);
const {
  _swingView,
  _swingReplyList,
  _swingReplyWrite,
  _swingReplyModify,
  _swingReplyDelete,
} = useSwingApi();
const swingInfo = ref({});
// 2026-09-16: 값 표기 헬퍼(toFixed/suffix)
const common = useCommon();
// 2026-10-20: 클럽 패스 이미지(fit_image 중 유형 2) — aimember getFitImagePath 와 같은 기준
const clubPathImage = computed(() => {
  const list = swingInfo.value?.fit_image;
  if (!Array.isArray(list)) return '';
  const m = list.find((v) => String(v.fit_image_type_fk) === '2');
  return m?.fit_image_path || '';
});

// 2026.10.15: 댓글 목록 조회 — 평면 목록(is_top/top_pk)을 댓글+답글 트리로 묶는다
const getCommentList = async () => {
  const res = await _swingReplyList(swingPk.value, 1, 100);
  if (res.code !== 200) return;

  const rows = res.swingreplylist || [];
  const toItem = (r) => ({
    comment_pk: Number(r.comment_pk),
    nickname: r.nickname,
    date: r.timezone_date || r.date,
    text: r.text,
    is_candelete: !!r.is_candelete,
    delete_flag: Number(r.delete_flag) === 1,
    // 2026-10-20: 작성자 프로필 사진(없으면 관리자·코치 = 코치 기본, 회원 = 회원 기본)
    avatar: r.binary_filepath ? common.getImg(r.binary_filepath) : (Number(r.regtype) === 3 ? '/images/default/img_profile_01.png' : '/images/default/img_coach_01.png'),
  });

  const tops = [];
  const byPk = {};
  rows.forEach((r) => {
    if (Number(r.is_top) === 1) {
      const item = { ...toItem(r), replies: [] };
      byPk[item.comment_pk] = item;
      tops.push(item);
    }
  });
  rows.forEach((r) => {
    if (Number(r.is_top) === 1) return;
    const parent = byPk[Number(r.top_pk)];
    if (parent) parent.replies.push(toItem(r));
  });

  commentList.value = tops;
};

// 2026.06.17[cgnoh]: 상세 조회
const getDetail = async () => {
  const res = await _swingView(swingPk.value);
  // 백엔드 응답 구조: { swingview: {...}, code:200 }
  if (res.code === 200) {
    swingInfo.value = res.swingview || {};
  }
};

// 2026-09-16: 상세는 날짜검색이 필요없어 filter-box와 함께 startDate/endDate/formatDate 제거

// 2026.06.17[cgnoh]: 현재 탭
const currentTab = ref('address');

// 2026-09-14: 스윙 영상/밸런스 배선 (aishop coaching/golf 상세 정본 참고)
const player1 = ref(null);
const player2 = ref(null);
const animated = { Left: ref(0), Right: ref(0), Back: ref(0), Front: ref(0) };
const totalFrames = computed(() => Number(swingInfo.value?.fit_total_frames) || 600);
const playTime = computed(() => Number(swingInfo.value?.fit_play_time) || 5);
const frameRate = computed(() => totalFrames.value / playTime.value);
// 2026-09-16: aimember 정본 방식 — 구분동작 클릭 시 세로바(markLine)를 해당 프레임에 고정. null이면 자동 루프가 세로바를 움직임.
const stageFrame = ref(null);
// chart-line-type-1 @balance 이벤트 → 발 밸런스(L/R/F/B) 반영(자동 루프 + markIndex 이동 모두 emit)
const onBalance = ({ pct }) => {
  animated.Left.value = Math.round(pct?.L || 0);
  animated.Right.value = Math.round(pct?.R || 0);
  animated.Front.value = Math.round(pct?.F || 0);
  animated.Back.value = Math.round(pct?.B || 0);
};
// 차트 클릭 → 영상 seek (aimember 정본 동일)
const onSeek = (sec) => {
  const t = Number(sec);
  if (!Number.isFinite(t)) return;
  player1.value?.setCurrentTime?.(t);
  player2.value?.setCurrentTime?.(t);
};




// 2026.06.17[cgnoh]: 답글 쓰기
const replyBoxFor = ref(-1);
const handleComment = (index) => {
  replyBoxFor.value = replyBoxFor.value === index ? -1 : index;
};

// 2026.06.17[cgnoh]: 툴팁 핸들링
const tooltipRefs = ref([]);
const setTooltipRef = (el, index) => {
  if (!el) return;

  tooltipRefs.value[index] = el;
}

// 2026.06.17[cgnoh]: 툴팁 핸들링
const tooltipDepthRefs = ref([]);
const setTooltipDepthRef = (el, index) => {
  if (!el) return;

  tooltipDepthRefs.value[index] = el;

  onClickOutside(el, () => {
    if (tooltipDepthShow.value === index) {
      tooltipDepthShow.value = -1;
    }
  });
}

// 2026.06.17[cgnoh]: 댓글 수정
const editText  = ref('');
const editingId = ref(-1);
const handleEdit = (index) => {
  if (editingId.value === index) {
    editingId.value = -1;
    editText.value = '';
    return;
  }

  editingId.value = index;
  editText.value = commentList.value[index].text;
}

// 2026.06.17[cgnoh]: 댓글 삭제
const handleDelete = async (index) => {
  const target = commentList.value[index];
  if (!target?.comment_pk) return;

  const res = await _swingReplyDelete(target.comment_pk);
  if (res.code === 200) await getCommentList();

  tooltipShow.value = -1;

  if (editingId.value === index) {
    editingId.value = -1;
    editText.value = '';
  }

  if (replyBoxFor.value === index) {
    replyBoxFor.value = -1;
    replyText.value = '';
  }
};

const editingReplyId = ref({
  parentIndex: -1,
  replyIndex: -1,
});

// 2026.06.17[cgnoh]: 답글 수정
const handleReplyEdit = (parentIndex, replyIndex) => {
  const isSame =
    editingReplyId.value.parentIndex === parentIndex &&
    editingReplyId.value.replyIndex === replyIndex;

  if (isSame) {
    editingReplyId.value = {
      parentIndex: -1,
      replyIndex: -1,
    };

    replyText.value = '';
    return;
  }

  editingReplyId.value = {
    parentIndex,
    replyIndex,
  };

  replyText.value =
    commentList.value[parentIndex].replies[replyIndex].text;
};

// 2026.06.17[cgnoh]: 답글 삭제
const handleReplyDelete = async (parentIndex, replyIndex) => {
  const target = commentList.value[parentIndex]?.replies[replyIndex];
  if (!target?.comment_pk) return;

  const res = await _swingReplyDelete(target.comment_pk);
  if (res.code === 200) await getCommentList();

  tooltipDepthShow.value = -1;
};

// 2026.06.17[cgnoh]: 글 등록하기
const commentText = ref('')
const handleSubmit = async () => {
  if (!commentText.value.trim()) return;

  const res = await _swingReplyWrite(swingPk.value, commentText.value);
  if (res.code !== 200) return;

  commentText.value = '';
  await getCommentList();
};

// 2026.06.17[cgnoh]: 답글 등록하기
const handleSave = async (index) => {
  if (!editText.value.trim()) return;

  const target = commentList.value[index];
  if (!target?.comment_pk) return;

  const res = await _swingReplyModify(target.comment_pk, editText.value);
  if (res.code === 200) await getCommentList();

  // 초기화
  editingId.value = -1;
  editText.value = '';
  tooltipShow.value = -1;
}

// 2026.06.17[cgnoh]: 수정답글 등록하기
const handleReplySave = async (parentIndex, replyIndex) => {
  if (!replyText.value.trim()) return;

  const target = commentList.value[parentIndex]?.replies[replyIndex];
  if (!target?.comment_pk) return;

  const res = await _swingReplyModify(target.comment_pk, replyText.value);
  if (res.code === 200) await getCommentList();

  editingReplyId.value = {
    parentIndex: -1,
    replyIndex: -1,
  };

  replyText.value = '';
  tooltipDepthShow.value = -1;
};

// 2026.06.17[cgnoh]: 탭 클릭
// 탭 클릭 시 해당 스윙 단계 프레임으로 두 영상 동시 이동 (aishop 정본)
const onClickStage = (frameIndex, tabName) => {
  currentTab.value = tabName;
  // 2026-09-16: aimember 정본 — 단계 프레임을 markIndex(stageFrame)로 전달 → 세로바가 해당 프레임에 고정되고 발 밸런스 값도 그 프레임으로 갱신.
  const fi = Number(frameIndex);
  if (!Number.isFinite(fi)) return;
  stageFrame.value = fi;
  // 두 영상도 해당 프레임으로 이동
  if (frameRate.value) {
    const sec = fi / frameRate.value;
    player1.value?.setCurrentTime?.(sec);
    player2.value?.setCurrentTime?.(sec);
  }
};

// 2026.06.17[cgnoh]: 댓글 리스트 (서버 조회)
const commentList = ref([]);

// 2026.06.17[cgnoh]: 툴팁 핸들링
const tooltipShow = ref(-1);
const handleTooltip = (index) => {
  tooltipShow.value =
    tooltipShow.value === index ? -1 : index;
};

// 2026.06.17[cgnoh]: 답글 툴팁 핸들링
const tooltipDepthShow = ref(-1);
const handleReplyTooltip = (index) => {
  tooltipDepthShow.value = tooltipDepthShow.value === index ? -1 : index;
};

// 2026.06.17[cgnoh]: 댓글(수정) 취소
const handleCancel = () => {
  replyBoxFor.value = -1;
  editingId.value = -1;
  tooltipShow.value = -1;
}

// 2026.06.17[cgnoh]: 답글 취소
const replyText = ref('');
const handleReplyCancel = () => {
  replyBoxFor.value = -1;
  replyText.value = '';
  editingReplyId.value = { parentIndex: -1, replyIndex: -1 };
  tooltipDepthShow.value = -1;
};

// 2026.06.17[cgnoh]: 답글 등록
const handleReplySubmit = async (parentIndex) => {
  if (!replyText.value.trim()) return;

  const parent = commentList.value[parentIndex];
  if (!parent?.comment_pk) return;

  const res = await _swingReplyWrite(swingPk.value, replyText.value, parent.comment_pk);
  if (res.code !== 200) return;

  replyText.value = '';
  replyBoxFor.value = -1;
  await getCommentList();
};

onMounted(() => {
  getDetail();
  getCommentList();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '스윙영상 상세',
  meta: [
    { name: 'description', content: '스윙영상 페이지 입니다.' }
  ]
})

// ---------------------------------------------------------------------------
// 2026-10-21: 스윙 영상 ↔ 구분동작 ↔ Step Balance 동기화 (4앱 공통 적용)
//   - 정면 영상(player1)의 재생 위치를 따라 Step Balance 세로바·L/R/F/B 와 구분동작 탭이 움직임
//   - 측면 영상(player2)은 정면 영상의 재생·정지·위치에 맞춤
//   - 구분동작 클릭·그래프 클릭 → 두 영상이 그 프레임으로 이동 후 정지

const videoTime = ref(0);
const __pickRef = (r) => (Array.isArray(r) ? r.filter(Boolean).pop() : r) || null;
const __players = () => (false
  ? [__pickRef(player1.value), __pickRef(player2.value)]
  : [__pickRef(player1.value), __pickRef(player2.value)]);
const __fps = () => {
  const tf = Number(swingInfo.value?.fit_total_frames) || 0;
  const pt = Number(swingInfo.value?.fit_play_time) || 0;
  return tf > 0 && pt > 0 ? tf / pt : 0;
};
const __seekAll = (sec) => {
  for (const p of __players()) { p?.pause?.(); p?.setCurrentTime?.(sec); }
  videoTime.value = sec;
};
const __stageOrder = [
  ["fit_address", "address"], ["fit_takeback", "backswing"], ["fit_top_swing", "topswing"],
  ["fit_down_swing", "downswing"], ["fit_impact", "impact"], ["fit_follow", "follow-through"], ["fit_finish", "finish"],
];
const __syncTab = (sec) => {
  const fps = __fps(); if (!fps) return;
  const frame = Number(sec) * fps;
  let tab = "";
  for (const [key, name] of __stageOrder) {
    const fr = Number(swingInfo.value?.[key]);
    if (Number.isFinite(fr) && fr > 0 && frame + 0.5 >= fr) tab = name;
  }
  if (tab && currentTab.value !== tab) currentTab.value = tab;
};
const onStageSync = (frameIndex, tabName) => {
  currentTab.value = tabName;
  stageFrame.value = Number(frameIndex);
  const fps = __fps();
  if (!fps || !frameIndex) return;
  __seekAll(Number(frameIndex) / fps);
};
const onSeekSync = (sec) => {
  if (sec == null) return;
  __seekAll(Number(sec));
  __syncTab(sec);
};
const onVideoTime = (t) => {
  videoTime.value = t;
  const side = __players()[1]?.getPlayer?.();
  if (side && Math.abs(Number(side.currentTime?.() || 0) - t) > 0.08) { try { side.currentTime(t); } catch (err) {} }
  __syncTab(t);
};
const onVideoState = (state) => {
  const side = __players()[1];
  if (state === "play") side?.play?.(); else side?.pause?.();
};
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';

/* 2026-09-16: 발 밸런스 L/B/F/R 라벨과 값이 개행되지 않도록(특히 R 뒤 값) */
.foot-area .foot-area-list {
  white-space: nowrap;
}

/* 2026-09-16: 모바일에서 체중그래프가 발 영역과 너무 떨어져 아래로 처져 보이던 문제 정리
   - 세로 스택 간격 축소 + 그래프 높이 확보로 발 영역과 자연스럽게 연결 */
/* 2026-09-16: 모바일 한 줄 레이아웃(foot-area + 그래프)은 swing-list.scss에서 처리.
   여기선 그래프 높이만 한 줄에 어울리게 조정. */
@media screen and (max-width: 500px) {
  .step-balance .chart .line-chart {
    height: 110px;
  }
}

/* 2026-10-20: 댓글 없음 안내 */
.review .no-data { padding: 40px 0; text-align: center; color: #61666c; border-bottom: 1px solid #e5e7e8; }

/* 2026-10-20: 클럽 패스 이미지 */
.col-list-cont .image.club-path { width: 100%; aspect-ratio: 16 / 9; background: #000 center / contain no-repeat; border-radius: 12px; }
.col-list-cont .no-data { padding: 60px 0; text-align: center; color: #61666c; }
</style>