<template>
    <div class="academy">
        <div class="mob-show">
            <div class="info-area">
                <h2 class="title">싱글로 가는 가장 빠른 길. 강골프의 '숏게임 마스터 클래스'</h2>
                <ul class="label">
                    <li class="label-list">중급</li>
                    <li class="label-list">김코치</li>
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
                        <span class="text">2</span>
                    </button>
                    <div class="state type01">
                        <nuxt-link to="/publish/coaching/golf/final-report" class="state-list color-teal">최종 코칭 리포트</nuxt-link>
                    </div>
                </div>
            </div>
            <ul class="tab type01-b">
                <li class="tab-list"
                    :class="{ 'is-active': currentClass == item.class_pk }"
                    :data-section-id="item.link"
                    v-for="item in tabList" 
                    :key="item.class_pk" 
                    @click="tabMenuClick(item)">
                    <span>{{ item.title }}</span>
                </li>
            </ul>
            <div class="tab-cont">
                <div class="tab-cont-list">
                    <div class="tab-cont-list-link" :class="{ 'is-active': tabIndex !== -1 }" @click="handleMobAccordion">
                        <span class="circle">
                            <img src="/public/images/icon/icon_check_white.png" alt="icon_check_white" />
                        </span>
                        <span class="text">
                            <span>비거리 연습1 (0/1) </span>
                            <img
                                src="/public/images/icon/icon_arrow_down.png"
                                alt="icon_arrow_down"
                            />
                        </span>
                    </div>
                    <transition                                
                            @before-enter="beforeEnter"
                            @enter="enter"
                            @before-leave="beforeLeave"
                            @leave="leave">
                        <div class="tab-cont-list-depth" v-if="tabIndex !== -1">

                            <!-- 아카데미 -->
                            <section class="academy-content" v-if="!swingPage">
                                <div class="board">
                                    <div class="title">
                                        <h2 class="text">김코치</h2>
                                        <div class="state type01">
                                            <div class="state-list color-grey">수강완료</div>
                                        </div>
                                    </div>
                                    <div class="cont">
                                        <h3 class="tit">학습 목표</h3>
                                        <p class="desc">
                                            1998년 US Women`s Open에서 우승하며 IMF로 어려움을 겪고 있는 우리 국민들에게 큰 희망과 위안을 주었고 젊은 나이에 LPGA 명예의 전당에 오를 정도로 수많은 대회에서 우승을 했던 한국 스포츠의 레전드입니다. 현재 세계 골프계를 정복하고 있는 박세리 키드들에게 골프에 대한 도전과 위기극복이라는 영감을 전해줬고 2016년을 끝으로 프로 생활을 마무리하면서 리우 올림픽 여자 골프 국가대표팀 감독을 맡으며 지도자의 길을 가고 있습니다. 화려했던 골프 선수생활을 마무리 하면서 후배들을 지도하고 예능 프로그램을 통해서 대중들에게 친근하게 다가온 박세리 감독은 언제나 새로운 도전을 하면서 어려움과 위기를 극복하고 있습니다. 박세리 감독은 선수 생활 시절 언제 찾아올지 모르는 슬럼프에 대한 두려움이 있었고 그것에 대한 대비를 했지만 막상 현실로 슬럼프가 찾아왔을 땐 어떻게 극복해야 할지 몰랐다고 합니다.
                                        </p>
                                    </div>
                                    <div class="cont">
                                        <h3 class="tit">미션 조건</h3>
                                        <ul class="cont-wrap">
                                            <li class="cont-wrap-list">
                                                <span class="text">드라이브 220m 이상 1회 성공</span>
                                                <div class="progress">
                                                    <span class="progress-bar">
                                                        <span class="progress-bar-inner" style></span>
                                                    </span>
                                                    <span class="progress-num">
                                                        <strong>0</strong>/1회(총 0회 시도)
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                        <div class="table">
                                            <div class="table-head">
                                                <div class="table-head-col col-1"></div>
                                                <div class="table-head-col">거리</div>
                                                <div class="table-head-col">결과</div>
                                                <div class="table-head-col is-mob">클럽</div>
                                                <div class="table-head-col is-mob">날짜</div>
                                                <div class="table-head-col is-mob">스윙영상</div>
                                            </div>
                                            <div class="table-body">
                                                <div class="no-info">내역이 없습니다.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cont">
                                        <h3 class="tit">미션 조건</h3>
                                        <ul class="cont-wrap">
                                            <li class="cont-wrap-list">
                                                <span class="text">아이언 150m 이상 3회 성공</span>
                                                <div class="progress">
                                                    <span class="progress-bar">
                                                        <span class="progress-bar-inner" style></span>
                                                    </span>
                                                    <span class="progress-num">
                                                        <strong>0</strong>/1회(총 0회 시도)
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <!-- 스윙화면 -->
                            <div class="swing" v-else>
                                <div class="swing-wrap">
                                    <div class="head">
                                        <ul class="category">
                                            <li class="category-list">Step 1</li>
                                            <li class="category-list">title</li>
                                        </ul>
                                        <h2 class="title">
                                            <span class="title-depth">
                                                <span class="text">title</span>
                                            </span>
                                            <span class="title-depth">
                                                <span class="text">#1</span>
                                                <span class="date">날짜</span>
                                                <span class="label">
                                                    <span class="label-list is-green">성공</span>
                                                    <span class="label-list">실패</span>
                                                </span>
                                            </span>
                                        </h2>
                                        <div class="date is-mob-show">
                                            날짜
                                        </div>
                                        <div class="profile">
                                            <div class="profile-image"></div>
                                            <div class="text">
                                                <button type="button" class="btn-more">수강생 이름</button>
                                            </div>
                                        </div>
                                        <div class="form-box">
                                            <select>
                                                <option>1</option>
                                            </select>
                                            <select>
                                                <option>1</option>
                                            </select>
                                            <select>
                                                <option>1</option>
                                            </select>
                                            <button type="button" class="btn-default btn-sm-fill">이동</button>
                                        </div>
                                    </div>
                                    <div class="cont">
                                        <div class="col-1">
                                            <div class="cont-section">
                                                <div class="cont-box">
                                                    <div class="cont-box-list">
                                                        <div class="video-area">
                                                            <videoPlayer></videoPlayer>
                                                        </div>
                                                        <div class="no-data" />
                                                    </div>
                                                    <div class="cont-box-list">
                                                        <div class="video-area">
                                                            <videoPlayer></videoPlayer>
                                                        </div>
                                                        <div class="no-data" />
                                                    </div>
                                                </div>
                                                <ul class="tab type03 box">
                                                    <li
                                                        class="tab-list"
                                                        :class="{ 'is-active': currentTab == 'address' }"
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
                                                    >
                                                        <span class="icon">
                                                        <svg-back-swing />
                                                        </span>
                                                        <span class="text">backswing</span>
                                                    </li>

                                                    <li
                                                        class="tab-list"
                                                        :class="{ 'is-active': currentTab == 'topswing' }"
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
                                                    >
                                                        <span class="icon">
                                                        <svg-down-swing />
                                                        </span>
                                                        <span class="text">downswing</span>
                                                    </li>

                                                    <li
                                                        class="tab-list"
                                                        :class="{ 'is-active': currentTab == 'impact' }"
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
                                                    >
                                                        <span class="icon">
                                                        <svg-follow-through />
                                                        </span>
                                                        <span class="text">follow-through</span>
                                                    </li>
                                                    <li
                                                        class="tab-list"
                                                        :class="{ 'is-active': currentTab == 'finish' }"
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
                                                            >animated.Left</span
                                                        >
                                                        <span></span>
                                                        <span class="foot-area-list"
                                                            ><span class="point yellow">B</span
                                                            >animated.Back</span
                                                        >
                                                        <span>
                                                            <img
                                                            src="/public/images/default/img_human_footprints.png"
                                                            alt="img_human_footprints"
                                                            />
                                                        </span>
                                                        <span class="foot-area-list"
                                                            ><span class="point yellow">F</span
                                                            >animated.Front</span
                                                        >
                                                        <span></span>
                                                        <span class="foot-area-list"
                                                            ><span class="point teal">R</span
                                                            >animated.Right</span
                                                        >
                                                        <span></span>
                                                        </div>
                                                        <EChart/>
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
                                                            swingView.fit_club_code
                                                            </div>
                                                        </li>
                                                        <li class="row-list">
                                                            <p class="tit">볼속도</p>
                                                            <div class="info">
                                                            km/h
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">백스핀</p>
                                                            <div class="info">
                                                            rpm
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">캐리</p>
                                                            <div class="info">
                                                            m
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">클럽속도</p>
                                                            <div class="info">
                                                            km/h
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">볼방향</p>
                                                            <div class="info">
                                                            deg
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">사이드스핀</p>
                                                            <div class="info">
                                                            rpm
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">비거리</p>
                                                            <div class="info">
                                                            m
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">체공시간</p>
                                                            <div class="info">
                                                            s
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">탈출각</p>
                                                            <div class="info">
                                                            deg
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">미트율</p>
                                                            <div class="info">
                                                            %
                                                            </div>
                                                        </li>

                                                        <li class="row-list">
                                                            <p class="tit">수직최고점</p>
                                                            <div class="info">
                                                            m
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
                                                        <div class="image"></div>
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
        <div class="academy-wrap">
            <div class="academy-left">
                <div class="academy-left-head">
                    <nuxt-link to="/publish/coaching/golf" class="btn-back">
                        <img
                        src="/public/images/icon/icon_arrow_left_white.png" 
                        alt="icon_arrow_left_white"
                        />
                        <span class="text">코칭 리스트 돌아가기</span>
                    </nuxt-link>
                    <div class="label">
                        <div class="label-list">중급 골퍼</div>
                        <div class="label-list">2개의 클래스</div>
                    </div>
                    <h2 class="title">스윙 테스트</h2>
                    <div class="profile">
                        <div class="profile-image" :style="{
                          backgroundImage: `url('/images/button/btn_profile.png')`,
                        }"></div>
                        <div class="text">
                            <span>김코치</span>
                        </div>
                    </div>
                </div>
                <div class="academy-left-btn"> 
                    <ul class="info">
                        <li class="info-list">
                            <span class="info-list-inner">
                                <span>좋아요</span>
                            </span>
                            <span class="point">0</span>
                        </li>
                        <li class="info-list">
                            <span>수강생</span>
                            <span class="point">1</span>
                        </li>
                    </ul>
                </div>
                <div class="academy-left-cont">
                    <ul class="accordion">
                        <li class="accordion-list">
                            <nuxt-link class="accordion-list-link">
                                <span 
                                    class="text" 
                                    :class="{ 'is-active': setDepthList.includes(index) }" 
                                    @click="handleAccordion(index)">
                                    <span>클래스1.</span>
                                    <img
                                        src="/public/images/icon/icon_chevron_down.png"
                                        alt="icon_chevron_down"
                                    />
                                </span>
                                <transition
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @before-leave="beforeLeave"
                                @leave="leave">
                                    <div class="depth" v-if="setDepthList.includes(index)">
                                        <div class="depth-title">클래스 1</div>
                                        <div class="depth-list" 
                                            :class="{ 
                                                'is-active': activeDepth.accIndex === index && activeDepth.depthIndex === j, 
                                                'is-current-complete': activeDepth.accIndex === index && activeDepth.depthIndex === j }">
                                            <nuxt-link class="depth-list-link" @click="handleDepthClick(index, j)"> 
                                                <span class="circle">
                                                    <img
                                                        src="/public/images/icon/icon_check_white.png"
                                                        alt="icon_check_white"
                                                    />
                                                </span>
                                                <span class="txt">스탭 1 (0/1)</span>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </transition>
                            </nuxt-link>
                        </li>
                        <li class="accordion-list">
                            <nuxt-link to="/publish/coaching/golf/final-report" class="accordion-list-link">
                                <span class="text">
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
                                    <span>최종 코칭 리포트</span>
                                </span>
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="academy-content is-pc">

                <!-- 아카데미 -->
                <div class="board">
                    <div class="title">
                        <h2 class="text">스탭 1</h2>
                    </div>
                    <div class="cont">
                        <h3 class="tit">학습 목표</h3>
                        <p class="desc">이번 스탭에서는高尔夫 기초 기술을 배우고 연습합니다.</p>
                    </div>
                    <div class="cont">
                        <div class="tit">미션 조건</div>
                        <div class="cont-wrap">
                            <div class="cont-wrap-list">
                                <span class="text">비거리</span>
                                <div class="progress">
                                    <span class="progress-bar">
                                        <span class="progress-bar-inner" style="width: 0%;"></span>
                                    </span>
                                    <span class="progress-num">
                                        <strong>0</strong>/1회(총 0회 시도)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="table-head">
                                <div class="table-head-col">남은거리</div>
                                <div class="table-head-col">결과</div>
                                <div class="table-head-col is-mob">클럽</div>
                                <div class="table-head-col is-mob">날짜</div>
                                <div class="table-head-col is-mob">스윙영상</div>
                            </div>
                            <div class="table-body">
                                <div class="no-info">내역이 없습니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="review">
                    <div class="review-count">
                        <span>전체질문</span>
                        <span class="num">(0)</span>
                    </div>
                    <div class="review-reply">
                        <div class="review-reply-list">

                            <!-- 댓글 -->
                            <div class="review-reply-list-wrap">

                                <!-- 보기 모드 -->
                                <template v-if="!inputShow">
                                    <div class="img-area">
                                        <img
                                            src="/public/images/button/btn_profile.png"
                                            alt="profile"
                                        />
                                    </div>
                                    <div class="info-area">
                                        <div class="tit">골프맨</div>
                                        <div class="date">2025.12.03</div>
                                        <div class="desc">test</div>
                                        <div class="btn-wrap">
                                            <button type="button" class="btn-comment" @click="handleComment">
                                                <span class="text">답글쓰기</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="more-area">
                                        <transition name="fade">
                                            <div class="tooltip-container" v-if="tooltipShow">
                                                <div class="tooltip-body">
                                                    <div class="cont">
                                                        <div class="cont-list">
                                                            <button type="button" class="btn-edit" @click="handleEdit">수정</button>
                                                        </div>
                                                        <div class="cont-list">
                                                            <button type="button" class="btn-delete">삭제</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                        <button type="button" class="btn-more" @click="toggleTooltip">
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
                                </template>
                                
                                <!-- 수정 모드 -->
                                <template v-else>
                                    <div class="review-writing">
                                        <div class="name-area">
                                            <span class="text">김코치</span>
                                        </div>
                                        <div class="text-area">
                                            <textarea placeholder="댓글을 입력해주세요"></textarea>
                                        </div>
                                        <div class="attach-area">
                                            <div class="btn-area">
                                                <button type="button" class="btn-default btn-md-line" @click="handleCancel">취소</button>
                                                <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>

                            <!-- 답글 -->
                            <div class="review-reply-depth children">
                                <div class="review-reply-list-depth">

                                    <!-- 보기 모드 -->
                                    <template v-if="!replyInputShow">
                                        <div class="img-area">
                                            <img
                                                src="/public/images/button/btn_profile.png"
                                                alt="profile"
                                            />
                                        </div>
                                        <div class="info-area">
                                            <div class="tit">골프맨</div>
                                            <div class="date">2025.12.03</div>
                                            <div class="desc">test</div>
                                        </div>
                                        <div class="more-area">
                                            <transition name="fade">
                                                <div class="tooltip-container" v-if="replyTooltipShow">
                                                    <div class="tooltip-body">
                                                        <div class="cont">
                                                            <div class="cont-list">
                                                                <button type="button" class="btn-edit" @click="replyHandleEdit">수정</button>
                                                            </div>
                                                            <div class="cont-list">
                                                                <button type="button" class="btn-delete">삭제</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </transition>
                                            <button type="button" class="btn-more" @click="replyToggleTooltip">
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
                                    </template>

                                    <!-- 수정 모드 -->
                                    <template v-else>
                                        <div class="review-writing">
                                            <div class="name-area">
                                                <span class="text">김코치</span>
                                            </div>
                                            <div class="text-area">
                                                <textarea placeholder="댓글을 입력해주세요"></textarea>
                                            </div>
                                            <div class="attach-area">
                                                <div class="btn-area">
                                                    <button type="button" class="btn-default btn-md-line" @click="handleReplyCancel">취소</button>
                                                    <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            
                            <!-- 답글쓰기 -->
                            <div class="review-reply-depth review-reply-list" v-if="inputComment">
                                <div class="review-writing">
                                    <div class="name-area">
                                        <span class="text">김코치</span>
                                    </div>
                                    <div class="text-area">
                                        <textarea placeholder="댓글을 입력해주세요"></textarea>
                                    </div>
                                    <div class="attach-area">
                                        <div class="btn-area">
                                            <button type="button" class="btn-default btn-md-line" @click="handleCommentCancel">취소</button>
                                            <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="review-writing">
                        <div class="name-area">
                            <span class="text">김코치</span>
                        </div>
                        <div class="text-area">
                            <textarea placeholder="댓글을 입력해주세요"></textarea>
                        </div>
                        <div class="attach-area">
                            <div class="btn-area">
                                <button type="button" class="btn-primary-yellow btn-md-fill">등록</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 영상보기 -->
                <div class="swing" v-if="swingPage">
                    <div class="swing-wrap">
                        <div class="head">
                            <ul class="category">
                                <li class="category-list">Step 1</li>
                                <li class="category-list">title</li>
                            </ul>
                            <h2 class="title">
                                <span class="title-depth">
                                    <span class="text">title</span>
                                </span>
                                <span class="title-depth">
                                    <span class="text">#1</span>
                                    <span class="date">날짜</span>
                                    <span class="label">
                                        <span class="label-list is-green">성공</span>
                                        <span class="label-list">실패</span>
                                    </span>
                                </span>
                            </h2>
                            <div class="date is-mob-show">
                                날짜
                            </div>
                            <div class="profile">
                                <div class="profile-image" :style="{
                                backgroundImage: `url('/images/button/btn_profile.png')`,
                                }"></div>
                                <div class="text">
                                    <button type="button" class="btn-more">수강생 이름</button>
                                </div>
                            </div>
                            <div class="form-box">
                                <select>
                                    <option>1</option>
                                </select>
                                <select>
                                    <option>1</option>
                                </select>
                                <select>
                                    <option>1</option>
                                </select>
                                <button type="button" class="btn-default btn-sm-fill">이동</button>
                            </div>
                        </div>
                        <div class="cont">
                            <div class="col-1">
                                <div class="cont-section">
                                    <div class="cont-box">
                                        <div class="cont-box-list">
                                            <div class="video-area">
                                                <videoPlayer></videoPlayer>
                                            </div>
                                            <div class="no-data" />
                                        </div>
                                        <div class="cont-box-list">
                                            <div class="video-area">
                                                <videoPlayer></videoPlayer>
                                            </div>
                                            <div class="no-data" />
                                        </div>
                                    </div>
                                    <ul class="tab type03 box">
                                        <li
                                            class="tab-list"
                                            :class="{ 'is-active': currentTab == 'address' }"
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
                                        >
                                            <span class="icon">
                                            <svg-back-swing />
                                            </span>
                                            <span class="text">backswing</span>
                                        </li>

                                        <li
                                            class="tab-list"
                                            :class="{ 'is-active': currentTab == 'topswing' }"
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
                                        >
                                            <span class="icon">
                                            <svg-down-swing />
                                            </span>
                                            <span class="text">downswing</span>
                                        </li>

                                        <li
                                            class="tab-list"
                                            :class="{ 'is-active': currentTab == 'impact' }"
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
                                        >
                                            <span class="icon">
                                            <svg-follow-through />
                                            </span>
                                            <span class="text">follow-through</span>
                                        </li>
                                        <li
                                            class="tab-list"
                                            :class="{ 'is-active': currentTab == 'finish' }"
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
                                                >animated.Left</span
                                            >
                                            <span></span>
                                            <span class="foot-area-list"
                                                ><span class="point yellow">B</span
                                                >animated.Back</span
                                            >
                                            <span>
                                                <img
                                                src="/public/images/default/img_human_footprints.png"
                                                alt="img_human_footprints"
                                                />
                                            </span>
                                            <span class="foot-area-list"
                                                ><span class="point yellow">F</span
                                                >animated.Front</span
                                            >
                                            <span></span>
                                            <span class="foot-area-list"
                                                ><span class="point teal">R</span
                                                >animated.Right</span
                                            >
                                            <span></span>
                                            </div>
                                            <EChart/>
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
                                                swingView.fit_club_code
                                                </div>
                                            </li>
                                            <li class="row-list">
                                                <p class="tit">볼속도</p>
                                                <div class="info">
                                                km/h
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">백스핀</p>
                                                <div class="info">
                                                rpm
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">캐리</p>
                                                <div class="info">
                                                m
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">클럽속도</p>
                                                <div class="info">
                                                km/h
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">볼방향</p>
                                                <div class="info">
                                                deg
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">사이드스핀</p>
                                                <div class="info">
                                                rpm
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">비거리</p>
                                                <div class="info">
                                                m
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">체공시간</p>
                                                <div class="info">
                                                s
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">탈출각</p>
                                                <div class="info">
                                                deg
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">미트율</p>
                                                <div class="info">
                                                %
                                                </div>
                                            </li>

                                            <li class="row-list">
                                                <p class="tit">수직최고점</p>
                                                <div class="info">
                                                m
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
                                            <div class="image"></div>
                                            </div>
                                        </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="academy-btn">
            <div class="btn-wrap">
                <button type="button" class="btn-out">
                <img src="/public/images/icon/icon_exit_to.png" alt="icon_exit_to" />
                <span class="text">나가기</span>
                </button>
                <button type="button" class="btn btn-prev" aria-label="이전">
                <img
                    src="/public/images/icon/icon_arrow_backward.png"
                    alt="icon_arrow_backward"
                />
                </button>
                <button type="button" class="btn btn-next" aria-label="다음">
                <img
                    src="/public/images/icon/icon_arrow_forward.png"
                    alt="icon_arrow_forward"
                />
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>

const tabList = [
    {
        title: '싱글로 가는 숏게임 마스터 클래스 1',
        class_pk: 0
    },
    {
        title: '싱글로 가는 숏게임 마스터 클래스 2',
        class_pk: 1
    }
]

const currentClass = ref(0);
const tabMenuClick = (item) => {
    currentClass.value = Number(item.class_pk);
    tabIndex.value = -1;
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

// 아코디언 클릭 이벤트
const setDepthList = ref([]);
const handleAccordion = (index) => {
  const idx = setDepthList.value.indexOf(index);
  if (idx > -1) {
    setDepthList.value.splice(idx, 1);
  } else {
    setDepthList.value.push(index);
  }
};

// 최종 코칭 리포트 유무
const finalReport = ref(false);

// 스윙 화면 유무
const swingPage = ref(false);

// 좌메뉴 클릭 이벤트
const activeDepth = ref({ accIndex: -1, depthIndex: -1 });
const handleDepthClick = (accIndex, depthIndex) => {
  finalReport.value = false;
  swingPage.value = false;

  if (
    activeDepth.value.accIndex === accIndex &&
    activeDepth.value.depthIndex === depthIndex
  ) {
    activeDepth.value = { accIndex: -1, depthIndex: -1 };
  } else {

    activeDepth.value = { accIndex, depthIndex };
  }
};


const inputShow = ref(false); // 인풋창 여부(댓글)
const tooltipShow = ref(false); // 툴팁 여부(댓글)

const replyInputShow = ref(false); // 인풋창 여부(답글)
const replyTooltipShow = ref(false); // 툴팁 여부(답글) 

// 댓글(보기모드) 수정
const handleEdit = () => {
  inputShow.value = true;
};

// 댓글(보기모드) 취소
const handleCancel = () => {
    inputShow.value = false;
    tooltipShow.value = false;
}

// 답글(수정모드) 수정
const replyHandleEdit = () => {
  replyInputShow.value = true;
};

// 답글(수정모드) 취소
const handleReplyCancel = () => {
    replyTooltipShow.value = false;
    replyInputShow.value = false;
}

// 답글쓰기
const inputComment = ref(false);
const handleComment = () => {
  inputComment.value = !inputComment.value;
};

// 답글쓰기 취소
const handleCommentCancel = () => {
    inputComment.value = false;
}

// 댓글 더보기 툴팁
const toggleTooltip = () => {
  tooltipShow.value = !tooltipShow.value;
};

// 답글 더보기 툴팁
const replyToggleTooltip = () => {
  replyTooltipShow.value = !replyTooltipShow.value;
};

// 모바일 탭 클릭 이벤트
const tabIndex = ref(-1);
const handleMobAccordion = (item) => {
  tabIndex.value = (tabIndex.value === item.step_pk) ? -1 : item.step_pk
  swingPage.value = false
};

definePageMeta({
  layout: "publish-detail",
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/coaching-detail.scss";
@use "@/assets/scss/pages/swing.scss";
</style>