<template>
  <div class="swing-list detail">
    <div class="detail-wrap">
      <div class="head">
        <div class="title">{{ swingInfo.title || '-' }}</div>
        <div class="date">{{ swingInfo.timezone_regdate || swingInfo.regdate || '-' }}</div>
      </div>
      <div class="cont">
        <!-- 영상 영역 -->
        <div class="video-area">
          <div class="video-area-list" v-for="(video, idx) in swingInfo.video_file" :key="idx">
            <videoPlayer
              :ref="el => { if (el) videoRefs[idx] = el }"
              :videoinfo="video"
              :autoplay="true"
            />
          </div>
          <div class="video-area-list" v-if="!swingInfo.video_file?.length">
            <div class="no-data">영상이 없습니다.</div>
          </div>
        </div>

        <!-- 탭 -->
        <div class="tab type03 box">
          <div class="tab-list" :class="{ 'is-active': currentTab == 'address' }" @click="onClickStage(swingInfo.fit_address, 'address')">
            <span class="icon"><svg-address /></span>
            <span class="text">address</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'backswing' }" @click="onClickStage(swingInfo.fit_takeback, 'backswing')">
            <span class="icon"><svg-back-swing /></span>
            <span class="text">Backswing</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'topswing' }" @click="onClickStage(swingInfo.fit_top_swing, 'topswing')">
            <span class="icon"><svg-top-swing /></span>
            <span class="text">Topswing</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'downswing' }" @click="onClickStage(swingInfo.fit_down_swing, 'downswing')">
            <span class="icon"><svg-down-swing /></span>
            <span class="text">Downswing</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'impact' }" @click="onClickStage(swingInfo.fit_impact, 'impact')">
            <span class="icon"><svg-impact /></span>
            <span class="text">Impact</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'follow-through' }" @click="onClickStage(swingInfo.fit_follow, 'follow-through')">
            <span class="icon"><svg-follow-through /></span>
            <span class="text">Follow-through</span>
          </div>
          <div class="tab-list" :class="{ 'is-active': currentTab == 'finish' }" @click="onClickStage(swingInfo.fit_finish, 'finish')">
            <span class="icon"><svg-finish /></span>
            <span class="text">Finish</span>
          </div>
        </div>

        <!-- Step Balance -->
        <div class="step-balance">
          <div class="foot-area">
            <span></span>
            <span class="foot-area-list"><span class="point teal">L</span>{{ animated.Left }}</span>
            <span></span>
            <span class="foot-area-list"><span class="point yellow">B</span>{{ animated.Back }}</span>
            <span>
              <img src="/images/default/img_human_footprints.png" alt="img_human_footprints" />
            </span>
            <span class="foot-area-list"><span class="point yellow">F</span>{{ animated.Front }}</span>
            <span></span>
            <span class="foot-area-list"><span class="point teal">R</span>{{ animated.Right }}</span>
            <span></span>
          </div>
          <div class="chart">
            <chart-line-type-1
              :list="swingInfo?.shotweight_info?.list || []"
              :totalFrames="Number(swingInfo?.fit_total_frames || 0)"
              :playTime="Number(swingInfo?.fit_play_time || 0)"
              @seek="onSeek"
              @balance="onBalance"
            />
          </div>
        </div>

        <!-- 샷 데이터 + 궤적 -->
        <div class="col-2">
          <!-- 샷 데이터 테이블 -->
          <div class="cont-section">
            <div class="table-section">
              <div class="table-section-wrap">
                <div class="row">
                  <div class="row-item">
                    <div class="tit">클럽정보</div>
                    <div class="info">{{ common.getClubcodeToClubname(swingInfo.fit_club_code) || '-' }}</div>
                  </div>
                  <div class="row-item">
                    <div class="tit">볼속도</div>
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.ballspeed), 'km/h') }}</div>
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
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.headspeed), 'km/h') }}</div>
                  </div>
                  <div class="row-item">
                    <div class="tit">볼방향</div>
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.balldirection), 'deg') }}</div>
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
                    <div class="info">{{ common.suffix(swingInfo.duration, 's') }}</div>
                  </div>
                  <div class="row-item">
                    <div class="tit">탈출각</div>
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.launchangle), 'deg') }}</div>
                  </div>
                  <div class="row-item">
                    <div class="tit">미트율</div>
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.smashfactor), '%') }}</div>
                  </div>
                  <div class="row-item">
                    <div class="tit">수직최고점</div>
                    <div class="info">{{ common.suffix(common.toFixed(swingInfo.peakvertical), 'm') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 궤적 차트 -->
          <div class="cont-section">
            <div class="col-wrap">
              <div class="col-list">
                <div class="col-list-title">궤적 측면 뷰</div>
                <div class="col-list-cont" style="height: 200px;">
                  <div class="chart" v-if="!swingInfo.fit_ball_trajectory">내역이 없습니다.</div>
                  <chart-line-type-2 v-else :raw="swingInfo.fit_ball_trajectory" />
                </div>
              </div>
              <div class="col-list">
                <div class="col-list-title">궤적 상단 뷰</div>
                <div class="col-list-cont" style="height: 200px;">
                  <div class="chart" v-if="!swingInfo.fit_ball_trajectory">내역이 없습니다.</div>
                  <chart-line-type-3 v-else :raw="swingInfo.fit_ball_trajectory" />
                </div>
              </div>
              <div class="col-list">
                <div class="col-list-title">클럽 패스</div>
                <div class="col-list-cont">
                  <div class="image" :style="{ backgroundImage: `url(${getFitImagePath()})` }" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 댓글 영역 -->
        <div class="review">
          <div class="review-top">
            <span class="text">전체댓글</span>
            <span class="count">({{ swingReplyData.listcnt }})</span>
          </div>

          <div class="review-reply">
            <div class="review-reply-list" v-for="(th, tIdx) in threads" :key="'t' + (th.top?.comment_pk || tIdx)">
              <div class="review-reply-list-depth">

                <!-- 댓글 보기 -->
                <template v-if="editingId !== th.top?.comment_pk">
                  <div class="img-area no-depth">
                    <div class="img-area-inner" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
                  </div>
                  <div class="info-area">
                    <div class="tit">{{ th.top?.nickname }}</div>
                    <div class="date">{{ th.top?.timezone_date }}</div>
                    <div class="desc">{{ th.top?.text }}</div>
                    <div class="btn-wrap align-left">
                      <button type="button" class="btn-comment" @click="handleComment(th.top)">
                        <span class="text">답글쓰기</span>
                      </button>
                    </div>
                  </div>
                  <div class="more-area">
                    <button type="button" class="btn-more" @click="toggleMenu(th.top)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z" fill="#ADB0B3"/>
                      </svg>
                    </button>
                    <transition name="fade">
                      <div class="tooltip-container" v-if="menuFor === th.top?.comment_pk">
                        <div class="tooltip-body">
                          <div class="cont">
                            <div class="cont-list">
                              <button type="button" class="btn-delete" @click="_swingReplyDrop(th.top?.comment_pk)">삭제</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition>
                  </div>
                </template>

                <!-- 댓글 수정 모드 (미사용 - 필요시 활성화) -->
                <div class="review-writing" v-else>
                  <div class="name-area"><span class="text">{{ userNickname }}</span></div>
                  <div class="text-area">
                    <textarea v-model="editText" placeholder="댓글을 입력해 주세요."></textarea>
                  </div>
                  <div class="attach-area">
                    <div class="btn-area">
                      <button type="button" class="btn-default btn-md-line" @click="handleCancel">취소</button>
                      <button type="button" class="btn-primary-purple btn-md-fill" @click="handleSave(th.top)">등록</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 답글 목록 -->
              <div class="review-reply-depth" v-if="th.replies.length">
                <div class="review-reply-list-depth" v-for="r in th.replies" :key="'r' + r.comment_pk">
                  <template v-if="editingId !== r.comment_pk">
                    <div class="img-area">
                      <div class="img-area-inner" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
                    </div>
                    <div class="info-area">
                      <div class="tit">{{ r.nickname }}</div>
                      <div class="date">{{ r.timezone_date }}</div>
                      <div class="desc">{{ r.text }}</div>
                    </div>
                    <div class="more-area">
                      <button type="button" class="btn-more" @click="toggleMenu(r)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M6 14C5.45 14 4.97917 13.8042 4.5875 13.4125C4.19583 13.0208 4 12.55 4 12C4 11.45 4.19583 10.9792 4.5875 10.5875C4.97917 10.1958 5.45 10 6 10C6.55 10 7.02083 10.1958 7.4125 10.5875C7.80417 10.9792 8 11.45 8 12C8 12.55 7.80417 13.0208 7.4125 13.4125C7.02083 13.8042 6.55 14 6 14ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.02083 13.8042 12.55 14 12 14ZM18 14C17.45 14 16.9792 13.8042 16.5875 13.4125C16.1958 13.0208 16 12.55 16 12C16 11.45 16.1958 10.9792 16.5875 10.5875C16.9792 10.1958 17.45 10 18 10C18.55 10 19.0208 10.1958 19.4125 10.5875C19.8042 10.9792 20 11.45 20 12C20 12.55 19.8042 13.0208 19.4125 13.4125C19.0208 13.8042 18.55 14 18 14Z" fill="#ADB0B3"/>
                        </svg>
                      </button>
                      <transition name="fade">
                        <div class="tooltip-container" v-if="menuFor === r.comment_pk">
                          <div class="tooltip-body">
                            <div class="cont">
                              <div class="cont-list">
                                <button type="button" class="btn-delete" @click="_swingReplyDrop(r.comment_pk)">삭제</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </transition>
                    </div>
                  </template>
                </div>
              </div>

              <!-- 답글 작성 -->
              <div class="review-reply-depth review-reply-list" v-if="replyBoxFor === th.top?.comment_pk">
                <div class="review-writing">
                  <div class="name-area"><span class="text">{{ userNickname }}</span></div>
                  <div class="text-area">
                    <textarea v-model="replyCommentText" placeholder="답글을 입력해주세요."></textarea>
                  </div>
                  <div class="attach-area">
                    <div class="btn-area">
                      <button type="button" class="btn-default btn-md-line" @click="handleReplyCancel">취소</button>
                      <button type="button" class="btn-primary-purple btn-md-fill" @click="handleReplySubmit(th.top)">등록</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 댓글 작성 -->
          <div class="review-writing">
            <div class="name-area"><span class="text">{{ userNickname }}</span></div>
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

        <!-- 하단 버튼 -->
        <div class="btn-wrap">
          <div class="btn-group align-left">
            <nuxt-link to="/swing/list" class="btn-md-line">목록</nuxt-link>
            <client-only>
              <VueAwesomePaginate
                :items-per-page="10"
                :max-pages-shown="3"
                v-model="replyPageno"
                :total-items="swingReplyData.listcnt || 1"
                @click="onClickPageHandler"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useSwingApi } from "~/api/swing";
import { useCommon } from "@/utils/common";
import VideoPlayer from "~/components/video/videoPlayer.vue";

const route = useRoute();
const common = useCommon();
const { _swingView, _swingReplyList: _swingReplyListApi, _swingReplyWrite, _swingReplyDelete } = useSwingApi();

const fit_shotdata_pk = computed(() => route.params.slug);

// ─── 데이터 ───
const swingInfo = ref({});
const swingReplyData = ref({ listcnt: 0, list: [] });
const replyPageno = ref(1);
const userNickname = ref('');

// ─── 댓글 상태 ───
const commentText = ref('');
const replyCommentText = ref('');
const editText = ref('');
const editingId = ref(-1);
const replyBoxFor = ref(-1);
const menuFor = ref(-1);

// ─── threads computed ───
const threads = computed(() => {
  const list = swingReplyData.value.list || [];
  const map = new Map();

  for (const it of list) {
    const isTop = String(it.comment_pk) === String(it.top_pk);
    const topPk = isTop ? it.comment_pk : it.top_pk;

    if (!map.has(topPk)) map.set(topPk, { top: null, replies: [] });

    if (isTop) map.get(topPk).top = it;
    else map.get(topPk).replies.push(it);
  }

  const result = [...map.values()];
  result.forEach((v) =>
    v.replies.sort(
      (a, b) => new Date(a.date) - new Date(b.date) || a.comment_pk - b.comment_pk,
    ),
  );
  result.sort(
    (a, b) =>
      new Date(a.top?.date || 0) - new Date(b.top?.date || 0) ||
      a.top?.comment_pk - b.top?.comment_pk,
  );
  return result;
});

// ─── API 호출 ───
const getDetail = async () => {
  try {
    const res = await _swingView(fit_shotdata_pk.value);
    if (res.code === 200) {
      swingInfo.value = res.swingview;
    }
  } catch (err) {
    console.error(err.message);
  }
};

const onClickPageHandler = () => {
  _swingReplyList();
};

const _swingReplyList = async () => {
  try {
    const res = await _swingReplyListApi(fit_shotdata_pk.value, replyPageno.value);
    console.log('replyList res:', res);
    swingReplyData.value.list = res.swingreplylist || [];       // ← 키 수정
    swingReplyData.value.listcnt = Number(res.swingreplylistcnt || 0); // ← 키 수정
  } catch (err) {
    console.error(err.message);
  }
};

// ─── 댓글 등록 ───
const handleSubmit = async () => {
  if (!commentText.value.trim()) {
    alert('내용을 입력해 주세요.');
    return;
  }
  try {
    const res = await _swingReplyWrite(fit_shotdata_pk.value, commentText.value, 0);
    if (res.code === 200) {
      commentText.value = '';
      alert(res.message );
      await _swingReplyList();
    } else {
      alert(res.message || '등록에 실패했습니다.');
    }
  } catch (err) {
    alert(err.message || '서버 오류가 발생했습니다.');
  }
};

// ─── 댓글 수정 ───
const handleEdit = (item) => {
  menuFor.value = -1;
  editingId.value = editingId.value === item.comment_pk ? -1 : item.comment_pk;
  editText.value = item.text;
};

const handleSave = async (item) => {
  if (!editText.value.trim()) return;
  // TODO: 수정 API 연동 (_swingTitleWrite 또는 별도 API)
  editingId.value = -1;
  editText.value = '';
};

const handleCancel = () => {
  editingId.value = -1;
  editText.value = '';
};

// ─── 댓글/답글 삭제 ───
const _swingReplyDrop = async (comment_pk) => {
  menuFor.value = -1;
  try {
    await _swingReplyDelete( comment_pk);
    await _swingReplyList();
  } catch (err) {
    console.error(err.message);
  }
};

// ─── 답글 ───
const handleComment = (topItem) => {
  replyBoxFor.value = replyBoxFor.value === topItem.comment_pk ? -1 : topItem.comment_pk;
  replyCommentText.value = '';
};
// 답글 등록
const handleReplySubmit = async (topItem) => {
  if (!replyCommentText.value.trim()) {
    alert('내용을 입력해 주세요.');
    return;
  }
  try {
    const res = await _swingReplyWrite(fit_shotdata_pk.value, replyCommentText.value, topItem.comment_pk);
    if (res.code === 200) {
      replyCommentText.value = '';
      replyBoxFor.value = -1;
      await _swingReplyList();
    } else {
      alert(res.message || '등록에 실패했습니다.');
    }
  } catch (err) {
    alert(err.message || '서버 오류가 발생했습니다.');
  }
};

const handleReplyCancel = () => {
  replyBoxFor.value = -1;
  replyCommentText.value = '';
};

// ─── 더보기 토글 ───
const toggleMenu = (item) => {
  menuFor.value = menuFor.value === item.comment_pk ? -1 : item.comment_pk;
};

// ─── 클럽 패스 이미지 ───
const getFitImagePath = () => {
  const list = swingInfo.value?.fit_image;
  if (!Array.isArray(list)) return '';
  const match = list.find(v => v.fit_image_type_fk == '2');
  return match?.fit_image_path || '';
};

// ─── 탭 ───
const currentTab = ref('address');

// ─── 비디오 ref ───
const videoRefs = ref([]);

// ─── 프레임 계산 ───
const totalFrames = computed(() => Number(swingInfo.value?.fit_total_frames) || 600);
const playTime = computed(() => Number(swingInfo.value?.fit_play_time) || 5);
const frameRate = computed(() => totalFrames.value / playTime.value);

const onClickStage = (frameIndex, tabName) => {
  currentTab.value = tabName;
  if (!frameRate.value || frameIndex === null || frameIndex === undefined) return;

  const sec = Number(frameIndex) / frameRate.value;
  videoRefs.value.forEach(player => {
    if (player) {
      player.pause();
      player.setCurrentTime(sec);
    }
  });
};

// ─── Step Balance ───
const animated = reactive({ Left: 0, Right: 0, Back: 0, Front: 0 });

const onSeek = (time) => {
  if (time == null) return;
};

const onBalance = ({ pct }) => {
  animated.Left  = Math.round(pct.L || 0);
  animated.Right = Math.round(pct.R || 0);
  animated.Front = Math.round(pct.F || 0);
  animated.Back  = Math.round(pct.B || 0);
};

// ─── 외부 클릭 시 메뉴 닫기 ───
onMounted(async () => {
  userNickname.value = sessionStorage.getItem('nickname') || '';
  await getDetail();
  await _swingReplyList();

  window.addEventListener('click', (event) => {
    if (!event.target.closest('.btn-more')) {
      menuFor.value = -1;
    }
  });
});

definePageMeta({
  layout: "default",
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>