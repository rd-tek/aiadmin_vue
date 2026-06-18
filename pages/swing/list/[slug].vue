<template>
    <div class="swing-list detail">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <div class="datepicker">
                    <client-only>
                      <VueDatePicker 
                        v-model="startDate"
                        :format="formatDate" 
                        date-picker
                        auto-apply
                        @open="isFocused = true"
                        @closed="isFocused = false"
                      />
                    </client-only>
                  </div>
                  <span class="wave">~</span>
                  <div class="datepicker">
                    <client-only>
                      <VueDatePicker 
                        v-model="endDate"
                        :format="formatDate" 
                        date-picker
                        auto-apply
                        @open="isFocused = true"
                        @closed="isFocused = false"
                      />
                    </client-only>
                  </div>
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="detail-wrap">{{ swingInfo }}
        <div class="head">
          <div class="title">202610120910 스윙영상</div>
          <div class="date">2026-10-01 18:13:13</div>
        </div>
        <div class="cont">
           <div class="video-area">
              <div class="video-area-list">
                <video
                  ref="videoRef"
                  id="my-video"
                  class="video-js vjs-default-skin"
                  controls
                  preload="auto"
                  width="100%"
                  height="auto"
                  poster="/images/default/img_coach_09.png"
                >
                  <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                </video>
              </div>
              <div class="video-area-list">
                <video
                  ref="videoRef"
                  id="my-video"
                  class="video-js vjs-default-skin"
                  controls
                  preload="auto"
                  width="100%"
                  height="auto"
                  poster="/images/default/img_coach_09.png"
                >
                  <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
                </video>
              </div>
           </div>
           <div class="tab type03 box">
              <div class="tab-list" @click="onClickStage('address')" :class="{ 'is-active': currentTab == 'address' }">
                <span class="icon">
                  <svg-address />
                </span>
                <span class="text">address</span>
              </div>
              <div class="tab-list" @click="onClickStage('backswing')" :class="{ 'is-active': currentTab == 'backswing' }">
                <span class="icon">
                  <svg-back-swing />
                </span>
                <span class="text">Backswing</span>
              </div>
              <div class="tab-list" @click="onClickStage('topswing')" :class="{ 'is-active': currentTab == 'topswing' }">
                <span class="icon">
                  <svg-top-swing />
                </span>
                <span class="text">Topswing</span>
              </div>
              <div class="tab-list" @click="onClickStage('downswing')" :class="{ 'is-active': currentTab == 'downswing' }">
                <span class="icon">
                  <svg-down-swing />
                </span>
                <span class="text">Downswing</span>
              </div>
              <div class="tab-list" @click="onClickStage('impact')" :class="{ 'is-active': currentTab == 'impact' }">
                <span class="icon">
                  <svg-impact />
                </span>
                <span class="text">Impact</span>
              </div>
              <div class="tab-list" @click="onClickStage('follow-through')" :class="{ 'is-active': currentTab == 'follow-through' }">
                <span class="icon">
                  <svg-follow-through />
                </span>
                <span class="text">Follow-through</span>
              </div>
              <div class="tab-list" @click="onClickStage('finish')" :class="{ 'is-active': currentTab == 'finish' }">
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
                58
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point yellow">B</span>
                62
              </span>
              <span>
                <img
                  src="/images/default/img_human_footprints.png"
                  alt="img_human_footprints"
                />
              </span>
              <span class="foot-area-list">
                <span class="point yellow">F</span>
                19
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point teal">R</span>
                15
              </span>
              <span></span>
            </div>
            <div class="chart">
              <chart-step-balance
                :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
                :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]" />
            </div>
           </div>
           <div class="col-2">
            <div class="cont-section">
              <div class="table-section">
                <div class="table-section-wrap">
                  <div class="row">
                    <div class="row-item">
                      <div class="tit">클럽정보</div>
                      <div class="info">I7</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">볼속도</div>
                      <div class="info">97.5km/h</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">백스핀</div>
                      <div class="info">3244rpm</div>
                    </div> 
                    <div class="row-item">
                      <div class="tit">캐리</div>
                      <div class="info">188m</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">클럽속도</div>
                      <div class="info">77.5km/h</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">볼방향</div>
                      <div class="info">0.2deg</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">사이드스핀</div>
                      <div class="info">-29rpm</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">비거리</div>
                      <div class="info">210m</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">클럽진입각</div>
                      <div class="info">10.5deg</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">탈출각</div>
                      <div class="info">20.5deg</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">구질</div>
                      <div class="info">Push Straight</div>
                    </div>
                    <div class="row-item">
                      <div class="tit">티높이</div>
                      <div class="info">55mm</div>
                    </div>
                  </div>
              </div>
              </div>
            </div>
            <div class="cont-section">
                <div class="col-wrap">
                  <div class="col-list">
                    <div class="col-list-title">궤적 측면 뷰</div>
                    <div class="col-list-cont">
                      <div class="chart">
                        <chart-side-view
                          :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
                          :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]" />
                      </div>
                    </div>
                  </div>
                  <div class="col-list">
                    <div class="col-list-title">궤적 상단 뷰</div>
                    <div class="col-list-cont">
                      <div class="chart">
                        <chart-top-view
                          :labels="['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']"
                          :values1="[80, 100, 140, 200, 280, 360, 420, 380, 300, 220, 150, 100]" />
                      </div>
                    </div>
                  </div>
                  <div class="col-list">
                    <div class="col-list-title">클럽 패스</div>
                    <div class="col-list-cont">
                      <div class="image" :style="{ backgroundImage: `url('/images/default/img_club_path.JPEG')` }"/>
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
                <div class="review-reply-list" v-for="(item, index) in commentList" :key="index">
                  <div class="review-reply-list-depth">
                    
                    <!-- 댓글(보기) -->
                    <template v-if="editingId !== index">
                      <div class="img-area no-depth">
                        <div class="img-area-inner" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
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
                                <div class="cont-list">
                                  <button type="button" class="btn-edit" @click="handleEdit(index)">수정</button>
                                </div>
                                <div class="cont-list">
                                  <button type="button" class="btn-delete" @click="handleDelete(index)">삭제</button>
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
                          <div class="img-area-inner" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }"></div>
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
                                  <div class="cont-list">
                                    <button type="button" class="btn-edit" @click="handleReplyEdit(index, k)">수정</button>
                                  </div>
                                  <div class="cont-list">
                                    <button type="button" class="btn-delete" @click="handleReplyDelete(index, k)">삭제</button>
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
                  <span class="text">이름</span>
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
                <ul class="pagination-container type02">
                  <li>
                      <button type="button" class="paginate-buttons" aria-label="이전">
                          <img src="/images/icon/icon_prev.png" alt="icon_prev"/>
                      </button>
                  </li>
                  <li>
                      <button type="button" class="paginate-buttons active">1</button>
                  </li>
                  <li>
                      <button type="button" class="paginate-buttons">2</button>
                  </li>
                  <li>
                      <button type="button" class="paginate-buttons">3</button>
                  </li> 
                  <li>
                      <button type="button" class="paginate-buttons" aria-label="더보기">
                          <img src="/images/icon/icon_more_horiz.png" alt="icon_more_horiz" />
                      </button>
                  </li>
                  <li>
                      <button type="button" class="paginate-buttons" aria-label="다음">
                          <img src="/images/icon/icon_next.png" alt="icon_next"/>
                      </button>
                  </li>
                </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useSwingApi } from "~/api/swing";

// 2026.06.17[cgnoh]: 라우터 관련
const route = useRoute();
const swingPk = computed(() => route.params.id);
const { _swingView } = useSwingApi();
const swingInfo = ref({});

// 2026.06.17[cgnoh]: 상세 조회
const getDetail = async () => {
  const res = await _swingView(swingPk.value);
  console.log(res)
  
  if (res.code === 200) {
    swingInfo.value = res.data;
  }
};

// 2026.06.16[cgnoh]: 날짜 관련
const startDate = ref(new Date());
startDate.value.setMonth(startDate.value.getMonth() - 14);
const endDate = ref(new Date());
const formatDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

// 2026.06.17[cgnoh]: 현재 탭
const currentTab = ref('address');


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
const handleDelete = (index) => {
  commentList.value.splice(index, 1);

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
const handleReplyDelete = (parentIndex, replyIndex) => {
  commentList.value[parentIndex].replies.splice(replyIndex, 1);
  tooltipDepthShow.value = -1;
};

// 2026.06.17[cgnoh]: 글 등록하기
const commentText = ref('')
const handleSubmit = () => {
  if (!commentText.value.trim()) return;

  commentList.value.push({
    nickname: '나',
    date: new Date().toLocaleDateString(),
    text: commentText.value,
    replies: []
  });

  commentText.value = '';
};

// 2026.06.17[cgnoh]: 답글 등록하기
const handleSave = (index) => {
  if (!editText.value.trim()) return;

  commentList.value[index].text = editText.value;

  // 초기화
  editingId.value = -1;
  editText.value = '';
  tooltipShow.value = -1;
}

// 2026.06.17[cgnoh]: 수정답글 등록하기
const handleReplySave = (parentIndex, replyIndex) => {
  if (!replyText.value.trim()) return;

  commentList.value[parentIndex]
    .replies[replyIndex]
    .text = replyText.value;

  editingReplyId.value = {
    parentIndex: -1,
    replyIndex: -1,
  };

  replyText.value = '';
  tooltipDepthShow.value = -1;
};

// 2026.06.17[cgnoh]: 탭 클릭
const onClickStage = (tabName) => {
  currentTab.value = tabName;
};

// 2026.06.17[cgnoh]: 댓글 리스트
const commentList = ref([
  {
    nickname: '홍길동',
    date: '2025.01.12',
    text: '답글 내용입니다.',
    replies: [
      {
        nickname: '홍길동',
        date: '2025.01.12',
        text: '답글 내용입니다.'
      }
    ]
  }
]);

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
const handleReplySubmit = (parentIndex) => {
  if (!replyText.value.trim()) return;

  commentList.value[parentIndex].replies.push({
    nickname: '나',
    date: new Date().toLocaleDateString(),
    text: replyText.value,
  });

  replyText.value = '';
  replyBoxFor.value = -1;
};

onMounted(() => {
  getDetail();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>