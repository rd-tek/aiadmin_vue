<template>
    <div class="swing-list detail">
      <div class="filter-box">
        <div class="col-2 flex-end">
            <div class="col d-flex">
                <div class="d-flex">
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="month"
                      :format="formatMonth" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </div>
                  <span class="wave">~</span>
                  <div class="datepicker">
                    <VueDatePicker 
                      v-model="month"
                      :format="formatMonth" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </div>
                </div>
                <button type="button" class="btn" @click="handleSearch">검색</button>
            </div>
        </div>
      </div>
      <div class="detail-wrap">
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
                <div class="text">Address</div>
              </div>
              <div class="tab-list" @click="onClickStage('backswing')" :class="{ 'is-active': currentTab == 'backswing' }">
                <div class="text">Backswing</div>
              </div>
              <div class="tab-list" @click="onClickStage('topswing')" :class="{ 'is-active': currentTab == 'topswing' }">
                <div class="text">Topswing</div>
              </div>
              <div class="tab-list" @click="onClickStage('downswing')" :class="{ 'is-active': currentTab == 'downswing' }">
                <div class="text">Downswing</div>
              </div>
              <div class="tab-list" @click="onClickStage('impact')" :class="{ 'is-active': currentTab == 'impact' }">
                <div class="text">Impact</div>
              </div>
              <div class="tab-list" @click="onClickStage('follow-through')" :class="{ 'is-active': currentTab == 'follow-through' }">
                <div class="text">Follow-through</div>
              </div>
              <div class="tab-list" @click="onClickStage('finish')" :class="{ 'is-active': currentTab == 'finish' }">
                <div class="text">Finish</div>
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
                <span class="count">(36)</span>
              </div>
              <div class="review-reply">
                <div class="review-reply-list">
                  <div class="review-reply-list-depth">
                    <div class="img-area" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }" />
                    <div class="info-area">
                      <div class="tit">타이틀</div>
                      <div class="date">날짜</div>
                      <div class="desc">내용</div>
                      <div class="btn-wrap align-left">
                        <button type="button" class="btn-comment">
                          <span class="text">답글쓰기</span>
                        </button>
                      </div>
                    </div>
                    <div class="more-area">
                      <div class="tooltip-container">
                        <div class="tooltip-body">
                          <div class="cont">
                            <div class="cont-list">
                              <button type="button" class="btn-edit">수정</button>
                            </div>
                            <div class="cont-list">
                              <button type="button" class="btn-delete">삭제</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn-more">
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
                  <div class="review-reply-depth">
                    <div class="review-reply-list-depth">
                      <div class="img-area" :style="{ backgroundImage: `url('/images/default/img_coach_01.png')` }" />
                      <div class="info-area">
                        <div class="tit">타이틀</div>
                        <div class="date">날짜</div>
                        <div class="desc">내용</div>
                      </div>
                    </div>
                  </div>
                  <div class="review-reply-depth review-reply-list">
                    <div class="review-writing">
                      <div class="name-area">
                        <span class="text">nickname</span>
                      </div>
                      <div class="text-area">
                        <textarea placeholder="답글을 입력해주세요."></textarea>
                      </div>
                      <div class="attach-area">
                        <div class="btn-area">
                          <button type="button" class="btn-default btn-md-line">취소</button>
                          <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="review-writing">
                <div class="name-area">
                  <span class="text">이름</span>
                </div>
                <div class="text-area">
                  <textarea placeholder="댓글을 입력해 주세요."></textarea>
                </div>
                <div class="attach-area"> 
                  <div class="btn-area">
                    <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                  </div>
                </div>
              </div> 
           </div>
           <div class="btn-wrap">
              <div class="btn-group align-left">
                <button type="button" class="btn-md-line">목록</button>
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
const currentTab = ref('address');

// 탭 클릭 시 특정 프레임으로 이동
const onClickStage = (tabName) => {
  currentTab.value = tabName;
};

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>