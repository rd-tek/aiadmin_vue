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
                <video src=""></video>
              </div>
              <div class="video-area-list">
                <video src=""></video>
              </div>
           </div>
           <div class="tab type03 box">
              <div class="tab-list is-active">
                <div class="text">Address</div>
              </div>
              <div class="tab-list">
                <div class="text">Backswing</div>
              </div>
              <div class="tab-list">
                <div class="text">Topswing</div>
              </div>
              <div class="tab-list">
                <div class="text">Downswing</div>
              </div>
              <div class="tab-list">
                <div class="text">Impact</div>
              </div>
              <div class="tab-list">
                <div class="text">Follow-through</div>
              </div>
              <div class="tab-list">
                <div class="text">Finish</div>
              </div>
           </div>
           <div class="step-balance">
            <div class="foot-area">
              <span></span>
              <span class="foot-area-list">
                <span class="point teal">L</span>
                animated.Left
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point yellow">B</span>
                animated.Back
              </span>
              <span>
                <img
                  src="/images/default/img_human_footprints.png"
                  alt="img_human_footprints"
                />
              </span>
              <span class="foot-area-list">
                <span class="point yellow">F</span>
                animated.Front
              </span>
              <span></span>
              <span class="foot-area-list">
                <span class="point teal">R</span>
                animated.Right
              </span>
              <span></span>
            </div>
            <div class="chart">
              chart
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
                      <div class="chart">chart</div>
                    </div>
                  </div>
                  <div class="col-list">
                    <div class="col-list-title">궤적 상단 뷰</div>
                    <div class="col-list-cont">
                      <div class="chart">chart</div>
                    </div>
                  </div>
                  <div class="col-list">
                    <div class="col-list-title">클럽 패스</div>
                    <div class="col-list-cont">
                      <div class="image">image</div>
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
                    <div class="img-area">
                      <img src="" alt="">
                    </div>
                    <div class="info-area">
                      <div class="tit">타이틀</div>
                      <div class="date">날짜</div>
                      <div class="desc">내용</div>
                      <div class="btn-wrap">
                        <button type="button" class="btn-comment">
                          <span class="text">답글쓰기</span>
                        </button>
                        <button type="button" class="">

                        </button>
                      </div>
                    </div>
                    <div class="more-area">
                      <button type="button" class="btn-more">
                        더보기
                      </button>
                    </div>
                  </div>
                  <div class="review-reply-depth">
                    <div class="review-reply-list-depth">
                      <div class="img-area">
                        <img src="" alt="">
                      </div>
                      <div class="info-area">
                        <div class="tit">타이틀</div>
                        <div class="date">날짜</div>
                        <div class="desc">내용</div>
                        <div class="btn-wrap">
                          <button type="button" class="btn-comment">
                            <span class="text">답글쓰기</span>
                          </button>
                          <button type="button" class="">

                          </button>
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
              </div>
           </div>
        </div>
      </div>
    </div>
</template>
<script setup>
// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/swing-list.scss';
</style>