<template>
    <div class="game-data">
      <div class="game-data-wrap">
        <div class="game-data-cont">
          <div class="game-data-grid">
            <div class="game-data-item">
              <div class="game-data-title">시작시간</div>
              <div class="game-data-value">
                <div class="datepicker">
                  <VueDatePicker 
                    v-model="startDate"
                    :format="formatStartDate" 
                    date-picker
                    auto-apply
                    @open="isFocused = true"
                    @closed="isFocused = false"
                  />
                  <VueDatePicker 
                    v-model="startTime"
                    :format="formatStartTime" 
                    time-picker
                    auto-apply
                    @open="isFocused = true"
                    @closed="isFocused = false"
                  />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">코스 종류</div>
              <div class="game-data-value">
                <div class="select-default">
                  <select>
                    <option>골프 코스</option>
                    <option>연습장</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">회원 이름</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input type="text" v-model="searchForm.username" />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">종료시간</div>
              <div class="game-data-value">
                <div class="datepicker">
                  <VueDatePicker 
                    v-model="endDate"
                    :format="formatEndDate" 
                    date-picker
                    auto-apply
                    @open="isFocused = true"
                    @closed="isFocused = false"
                  />
                  <VueDatePicker 
                    v-model="endTime"
                    :format="formatEndTime" 
                    time-picker
                    auto-apply
                    @open="isFocused = true"
                    @closed="isFocused = false"
                  />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">코스명</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input type="text">
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">회원 닉네임</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input
                    type="text"
                    v-model="searchForm.nickname"
                    />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">매장 이름 / 매장 번호</div>
              <div class="game-data-value">
                <div class="input-wrap">
                  <div class="input-text">
                    <input type="text">
                  </div>
                  <div class="input-text">
                    <input type="text">
                  </div>
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">회원유형</div>
              <div class="game-data-value">
                <div class="radio-wrap">
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_0" name="radio_0">
                        <label for="radio_0">
                            <span class="check-box-item" />
                            <span class="check-box-txt">전체</span>
                        </label>
                    </div> 
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_1" name="radio_0"> 
                        <label for="radio_1">
                            <span class="check-box-item" />
                            <span class="check-box-txt">비회원</span>
                        </label>
                    </div>
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_2" name="radio_0">
                        <label for="radio_2">
                            <span class="check-box-item" />
                            <span class="check-box-txt">회원</span>
                        </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">회원 번호</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input type="text">
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">게임 번호</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input
                        type="text"
                        v-model="searchForm.gameno"
                    />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">게임상태</div>
              <div class="game-data-value">
                <div class="radio-wrap">
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_3" name="radio_1" v-model="searchForm.status">
                        <label for="radio_3">
                            <span class="check-box-item">
                              <i class="item-line" />
                            </span>
                            <span class="check-box-txt">전체</span>
                        </label>
                    </div> 
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_4" name="radio_1" v-model="searchForm.status">
                        <label for="radio_4">
                            <span class="check-box-item">
                              <i class="item-line" />
                            </span>
                            <span class="check-box-txt">진행</span>
                        </label>
                    </div> 
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_5" name="radio_1" v-model="searchForm.status">
                        <label for="radio_5">
                            <span class="check-box-item">
                              <i class="item-line" />
                            </span>
                            <span class="check-box-txt">중단</span>
                        </label>
                    </div> 
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_6" name="radio_1" v-model="searchForm.status">
                        <label for="radio_6">
                            <span class="check-box-item">
                              <i class="item-line" />
                            </span>
                            <span class="check-box-txt">완료</span>
                        </label>
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn-md-line">초기화</button>
            <button type="button" class="btn-md-fill btn-primary-purple" @click="getGameList">검색</button>
          </div>
        </div>
      </div>

      <div class="game-data-wrap" v-if="boardType == ''">
        <div class="game-data-cont is-mob">
          <div class="game-data-title">게임 조회</div>
            <template v-if="tableList.length > 0">
                <div class="game-data-list" :class="{ 'is-move': tableMove }" ref="tableRef" v-for="(item, index) in tableList" :key="index">
                    <div class="game-data-item">
                    <div class="num">{{ item.no }}</div>
                    <div class="nickname">{{ item.nickname }}</div>
                    <div class="name">{{ item.name }}</div>
                    </div>
                    <div class="game-data-item align-left">
                    <div class="title">{{ item.title }}</div>
                    <div class="room-wrap">
                        <span class="room">{{ item.room }}</span>
                        <span class="people">{{ item.people }}</span>
                    </div>
                    </div>
                    <div class="game-data-item">
                    <div class="icon-list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <mask id="mask0_2178_3374" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                        <rect width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_2178_3374)">
                        <path d="M12.7917 13.5417L13.8542 12.4792L10.75 9.375V5H9.25V10L12.7917 13.5417ZM10 18C8.8975 18 7.86146 17.7917 6.89188 17.375C5.92229 16.9583 5.07292 16.3854 4.34375 15.6562C3.61458 14.9271 3.04167 14.0767 2.625 13.105C2.20833 12.1333 2 11.0951 2 9.99042C2 8.88569 2.20833 7.84722 2.625 6.875C3.04167 5.90278 3.61458 5.05556 4.34375 4.33333C5.07292 3.61111 5.92333 3.04167 6.895 2.625C7.86667 2.20833 8.90486 2 10.0096 2C11.1143 2 12.1528 2.21 13.1252 2.63C14.0974 3.05 14.9432 3.62 15.6625 4.34C16.3817 5.06 16.951 5.90667 17.3706 6.88C17.7902 7.85333 18 8.89333 18 10C18 11.1025 17.7917 12.1385 17.375 13.1081C16.9583 14.0777 16.3889 14.9271 15.6667 15.6562C14.9444 16.3854 14.0963 16.9583 13.1223 17.375C12.1483 17.7917 11.1075 18 10 18Z" fill="#72777A"/>
                        </g>
                        </svg>
                        <span class="text">{{ item.date }}</span>
                    </div>
                    <div class="icon-list">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <mask id="mask0_2178_3381" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                        <rect width="20" height="20" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_2178_3381)">
                        <path d="M15.75 17C15.4028 17 15.1076 16.8785 14.8646 16.6354C14.6215 16.3924 14.5 16.0972 14.5 15.75C14.5 15.4028 14.6215 15.1076 14.8646 14.8646C15.1076 14.6215 15.4028 14.5 15.75 14.5C16.0972 14.5 16.3924 14.6215 16.6354 14.8646C16.8785 15.1076 17 15.4028 17 15.75C17 16.0972 16.8785 16.3924 16.6354 16.6354C16.3924 16.8785 16.0972 17 15.75 17ZM8 18C6.61111 18 5.43056 17.8289 4.45833 17.4867C3.48611 17.1444 3 16.7331 3 16.2525C3 15.9175 3.24653 15.6146 3.73958 15.3438C4.23264 15.0729 4.90278 14.8611 5.75 14.7083V16.5H7.25V2L13.75 5.25L8.75 7.75V14.5208C10 14.5903 11.0208 14.7842 11.8125 15.1025C12.6042 15.4208 13 15.8021 13 16.2463C13 16.7349 12.5069 17.1493 11.5208 17.4896C10.5347 17.8299 9.36111 18 8 18Z" fill="#72777A"/>
                        </g>
                        </svg>
                        <span class="text">{{ item.hole }}</span>
                    </div>
                    </div>
                    <div class="game-data-item">
                    <div class="label color-blue">{{ item.status }}</div>
                    </div>
                    <div class="game-data-item">
                    <div class="teebox">{{ item.teebox }}</div>
                    <div class="wind">{{ item.wind }}</div>
                    </div>
                    <div class="game-data-item">
                    <div class="level">{{ item.level }}</div>
                    <div class="mulligan">({{ item.score }})</div>
                    </div>
                    <div class="game-data-item">
                    <div class="btn-group">
                        <button type="button" class="btn-sm-line" @click="handleScoreboard">스코어보드</button>
                        <button type="button" class="btn-sm-line" @click="handleOneshotInfo">원샷정보</button>
                        <button type="button" class="btn-sm-line" @click="handleGameInfo">게임정보</button>
                    </div>
                    </div>
                </div>
            </template>
            <div class="game-data-list is-move" v-else>
                <div class="no-data">데이터가 없습니다.</div>
            </div>
        </div>
        <div class="table type03 mob-type02 is-mob">
          <div class="table-title">게임 조회</div>
          <div class="table-head">
            <div class="table-head-col">No</div>
            <div class="table-head-col">이름</div>
          </div>
          <div class="table-body">
            <div class="table-body-row" v-for="(item, index) in tableList" :key="index">
              <div class="table-body-flex">
                <div class="table-body-col">
                  {{ item.no }}
                </div>
                <div class="table-body-col" @click="handleMobList(index)">
                  <span>{{ item.nickname }}</span>
                  <button type="button" class="btn-arrow" :class="{ 'is-active': mobListIndex === index }">
                    <img
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
                    />
                  </button>
                </div>
              </div>
              <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
                <div class="table-body-mob" v-if="mobListIndex === index">
                  <dl class="list">
                    <dt class="tit">골프코스</dt>
                    <dd class="cnt">{{ item.title }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">홀</dt>
                    <dd class="cnt">{{ item.hole }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">매장</dt>
                    <dd class="cnt">{{ item.room }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">점수</dt>
                    <dd class="cnt">-</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">상태</dt>
                    <dd class="cnt">
                      <span class="label color-blue">{{ item.status }}</span>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">시작시간</dt>
                    <dd class="cnt">{{ item.date }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">멀리건</dt>
                    <dd class="cnt">{{ item.mulligan }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">등급</dt>
                    <dd class="cnt">{{ item.level }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">바람</dt>
                    <dd class="cnt">{{ item.wind }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">티박스</dt>
                    <dd class="cnt">{{ item.teebox }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">회원유형</dt>
                    <dd class="cnt">{{ item.name }}</dd>
                  </dl>
                  <div class="btn-wrap">
                    <button type="button" class="btn-md-line" @click="handleScoreboard">스코어보드</button>
                    <button type="button" class="btn-md-line" @click="handleOneshotInfo">원샷정보</button>
                    <button type="button" class="btn-md-line" @click="handleGameInfo">게임정보</button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>

      <!-- 스코어보드(홀) -->
      <div class="game-data-wrap" v-if="boardType === 'scoreboard'">
        <div class="game-data-title">
          스코어보드(홀)
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">홀</div>
            <div class="table-head-col">파</div>
            <div class="table-head-col is-mob">타수</div>
            <div class="table-head-col is-mob">점수</div>
            <div class="table-head-col is-mob">날짜</div>
            <div class="table-head-col is-mob">완료</div>
          </div>
          <div class="table-body">
            <div class="table-body-row" :class="{ 'is-move': scoreBoardListMove }" ref="scoreBoardListRef" v-for="(item, index) in scoreboardList" :key="index">
              <div class="table-body-flex">
                <div class="table-body-col">
                  {{ item.nickname }}
                </div>
                <div class="table-body-col">
                  {{ item.hole }}
                </div>
                <div class="table-body-col" @click="handleMobHoleList(index)">
                  <span>{{ item.par }}</span>
                  <button type="button" class="btn-arrow" :class="{ 'is-active': mobHoleListIndex === index }">
                    <img
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
                    />
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  {{ item.stroke }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.score }}
                </div>
                <div class="table-body-col is-mob">
                  <span class="color-grey">{{ item.date }}</span>
                </div>
                <div class="table-body-col is-mob">
                  <span class="color-grey">{{ item.status }}</span>
                </div>
              </div>
              <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
                <div class="table-body-mob" v-if="mobHoleListIndex === index">
                  <dl class="list">
                    <dt class="tit">타수</dt>
                    <dd class="cnt">{{ item.stroke }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">점수</dt>
                    <dd class="cnt">{{ item.score }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">날짜</dt>
                    <dd class="cnt">
                      <span class="color-grey">{{ item.date }}</span>
                    </dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">완료</dt>
                    <dd class="cnt">
                      <span>{{ item.status }}</span>
                    </dd>
                  </dl>
                </div> 
              </transition>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- 스코어보드(게임) -->
      <div class="game-data-wrap" v-if="boardType === 'scoreboard'">
        <div class="game-data-title">
          스코어보드(게임)
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">매장명</div>
            <div class="table-head-col is-mob">홀</div>
            <div class="table-head-col is-mob">파</div>
            <div class="table-head-col is-mob">타수</div>
            <div class="table-head-col is-mob">점수</div>
            <div class="table-head-col is-mob">멀리건</div>
            <div class="table-head-col is-mob">날짜</div>
          </div>
          <div class="table-body">
            <div class="table-body-row" :class="{ 'is-move': scoreBoardGameMove }" ref="scoreBoardGameRef" v-for="(item, index) in scoreboardGameList" :key="index">
              <div class="table-body-flex">
                <div class="table-body-col">
                  {{ item.nickname }}
                </div>
                <div class="table-body-col" @click="handleMobGameList(index)">
                  <span>{{ item.shop }}</span>
                  <button type="button" class="btn-arrow" :class="{ 'is-active': mobGameListIndex === index }">
                    <img
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
                    />
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  {{ item.hole }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.par }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.stroke }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.score }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.mulligan }}
                </div>
                <div class="table-body-col is-mob">
                  <span class="color-grey">{{ item.date }}</span>
                </div>
              </div>
              <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
                <div class="table-body-mob" v-if="mobGameListIndex === index">
                  <dl class="list">
                    <dt class="tit">홀</dt>
                    <dd class="cnt">{{ item.hole }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">파</dt>
                    <dd class="cnt">{{ item.par }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">타수</dt>
                    <dd class="cnt">{{ item.stroke }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">점수</dt>
                    <dd class="cnt">{{ item.score }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">멀리건</dt>
                    <dd class="cnt">{{ item.mulligan }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">날짜</dt>
                    <dd class="cnt">
                      <span class="color-grey">{{ item.date }}</span>
                    </dd>
                  </dl>
                </div>
              </transition>
            </div>
          </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="boardType = ''">목록보기</button>
          </div>
        </div>
      </div>

      <!-- 원샷정보 -->
      <div class="game-data-wrap" v-else-if="boardType === 'oneshot'">
        <div class="game-data-title">
          원샷정보
        </div>
        <div class="game-data-cont">
          <div class="table type03 mob-type02">
          <div class="table-head">
            <div class="table-head-col">닉네임</div>
            <div class="table-head-col">홀번호</div>
            <div class="table-head-col">샷번호</div>
            <div class="table-head-col is-mob">클럽</div>
            <div class="table-head-col is-mob">비거리</div>
            <div class="table-head-col is-mob">남은거리</div>
            <div class="table-head-col is-mob">스코어</div>
            <div class="table-head-col is-mob">지형</div>
            <div class="table-head-col is-mob">등록일</div>
            <div class="table-head-col is-mob">멀리건</div>
          </div>
          <div class="table-body">
            <div class="table-body-row" :class="{ 'is-move': oneshotListMove }" ref="oneshotListRef" v-for="(item, index) in oneshotList" :key="index">
              <div class="table-body-flex">
                <div class="table-body-col">
                  {{ item.nickname }}
                </div>
                <div class="table-body-col">
                  {{ item.hole }}
                </div>
                <div class="table-body-col" @click="handleMobOneshotList(index)">
                  <span>{{ item.shot }}</span>
                  <button type="button" class="btn-arrow" :class="{ 'is-active': mobOneshotListIndex === index }">
                    <img
                      src="/public/images/icon/icon_arrow_down.png"
                      alt="icon_arrow_down"
                    />
                  </button>
                </div>
                <div class="table-body-col is-mob">
                  {{ item.club }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.distance }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.remain }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.score }}
                </div>
                <div class="table-body-col is-mob">
                  {{ item.type }}
                </div>
                <div class="table-body-col is-mob">
                  <span class="color-grey">{{ item.date }}</span>
                </div>
                <div class="table-body-col is-mob">
                  {{ item.mulligan }}
                </div>
              </div>
              <transition
                @before-enter="beforeEnter"
                @enter="enter"
                @before-leave="beforeLeave"
                @leave="leave">
                <div class="table-body-mob" v-if="mobOneshotListIndex === index">
                  <dl class="list">
                    <dt class="tit">클럽</dt>
                    <dd class="cnt">{{ item.club }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">비거리</dt>
                    <dd class="cnt">{{ item.distance }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">남은거리</dt>
                    <dd class="cnt">{{ item.remain }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">스코어</dt>
                    <dd class="cnt">{{ item.score }}</dd>
                  </dl> 
                  <dl class="list">
                    <dt class="tit">멀리건</dt>
                    <dd class="cnt">{{ item.mulligan }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">지형</dt>
                    <dd class="cnt">{{ item.type }}</dd>
                  </dl>
                  <dl class="list">
                    <dt class="tit">등록일</dt>
                    <dd class="cnt">{{ item.date }}</dd>
                  </dl>
                </div>
              </transition>
            </div>
          </div>
          </div>
          <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="boardType = ''">목록 보기</button>
          </div>
        </div>
      </div>

      <!-- 게임정보 -->
      <div class="game-data-wrap" v-else-if="boardType === 'gameinfo'">
        <div class="game-data-title">
          게임정보
        </div>
        <div class="game-data-cont">
          <table class="table type04" :class="{ 'is-move': gameinfoListMove }" ref="gameinfoListRef">
            <colgroup>
              <col width="120px">
              <col width="*%">
            </colgroup>
            <tbody>
              <tr v-for="(item, index) in gameinfoList" :key="index">
                <th>{{ item.title }}</th>
                <td>{{ item.value }}</td>
              </tr>
            </tbody>
          </table>
          <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="boardType = ''">목록 보기</button>
          </div>
        </div>
      </div>

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useGameDataApi } from "@/api/gamedata";

const { _gameDataList } = useGameDataApi();

const startDate = ref(new Date());
const endDate = ref(new Date());
const startTime = ref(new Date());
const endTime = ref(new Date());

const formatStartDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

const formatEndDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

const formatStartTime = (date) => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 || 12;

  return `${period} ${displayHour}:${minutes}`;
};

const formatEndTime = (date) => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 || 12;

  return `${period} ${displayHour}:${minutes}`;
};

const totalCount = ref(0);
const tableList = ref([]);
const getGameList = async () => {
  try {
    const res = await _gameDataList(searchForm);

    if (res.code === 200) {
      tableList.value = res.gamelist || [];
      totalCount.value = Number(res.gamelistcnt || 0);
    } else {
      tableList.value = [];
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
    tableList.value = [];
  }
};

onMounted(() => {
  getGameList();
});

const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

const scoreBoardListRef = ref();
const scoreBoardListMove = ref(false);
useIntersectionObserver(scoreBoardListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardListMove.value = true;
}, { threshold: 0 });

const scoreBoardGameRef = ref();
const scoreBoardGameMove = ref(false);
useIntersectionObserver(scoreBoardGameRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardGameMove.value = true;
}, { threshold: 0 });

const oneshotListRef = ref();
const oneshotListMove = ref(false);
useIntersectionObserver(oneshotListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) oneshotListMove.value = true;
}, { threshold: 0 });

const gameinfoListRef = ref();
const gameinfoListMove = ref(false);
useIntersectionObserver(gameinfoListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) gameinfoListMove.value = true;
}, { threshold: 0 });


const searchForm = reactive({
  startdate: "",
  enddate: "",
  coursetype: "",
  username: "",
  nickname: "",
  shopname: "",
  shopno: "",
  membertype: "",
  memberno: "",
  gameno: "",
  status: [],
  pageno: 1,
});

const scoreboardList = [
  {
    nickname: '골프원샷맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    date: '2026.12.12 18:14:33',
    status: '대기'
  },
  {
    nickname: '골프원샷맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    date: '2026.12.12 18:14:33',
    status: '대기'
  },
  {
    nickname: '골프원샷맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    date: '2026.12.12 18:14:33',
    status: '대기'
  }
]

const scoreboardGameList = [
  {
    nickname: '골프원샷맨',
    shop: '골프맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    mulligan: -1,
    date: '2026.12.12 18:14:33',
  },
  {
    nickname: '골프원샷맨',
    shop: '골프맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    mulligan: -1,
    date: '2026.12.12 18:14:33',
  },
  {
    nickname: '골프원샷맨',
    shop: '골프맨',
    hole: 18,
    par: 5,
    stroke: 6,
    score: -1,
    mulligan: -1,
    date: '2026.12.12 18:14:33',
  }
]

const oneshotList = [
  {
    nickname: '골프원샷맨',
    hole: 18,
    shot: 1,
    club: '드라이버',
    distance: 250,
    remain: 200,
    score: -1,
    type: '페어웨이',
    date: '2026.12.12 18:14:33',
    mulligan: -1
  },
  {
    nickname: '골프원샷맨',
    hole: 18,
    shot: 1,
    club: '드라이버',
    distance: 250,
    remain: 200,
    score: -1,
    type: '페어웨이',
    date: '2026.12.12 18:14:33',
    mulligan: -1
  },
  {
    nickname: '골프원샷맨',
    hole: 18,
    shot: 1,
    club: '드라이버',
    distance: 250,
    remain: 200,
    score: -1,
    type: '페어웨이',
    date: '2026.12.12 18:14:33',
    mulligan: -1
  },
  {
    nickname: '골프원샷맨',
    hole: 18,
    shot: 1,
    club: '드라이버',
    distance: 250,
    remain: 200,
    score: -1,
    type: '페어웨이',
    date: '2026.12.12 18:14:33',
    mulligan: -1
  }
]

const gameinfoList = [
  {
    title: '게임번호',
    value: '123123',
  },
  {
    title: '플레이어번호',
    value: '123123',
  },
  {
    title: '회원번호',
    value: '123123',
  },
  {
    title: '이름',
    value: '123123',
  },
  {
    title: '닉네임',
    value: '123123',
  },
  {
    title: '성별',
    value: '123123',
  },
  {
    title: '티박스',
    value: '123123',
  },
  {
    title: '멀리건',
    value: '123123',
  },
  {
    title: '등급',
    value: '123123',
  },
  {
    title: '홀당 퍼트 거리',
    value: '123123',
  },
  {
    title: '그린 적중률',
    value: '123123',
  },
  {
    title: '평균 비거리',
    value: '123123',
  },
  {
    title: '최대 비거리',
    value: '123123',
  },
  {
    title: '페어웨이 적중률',
    value: '123123',
  },
  {
    title: '파세이브율',
    value: '123123',
  },
  {
    title: '홀인원',
    value: '123123',
  },
  {
    title: '알바트로스',
    value: '123123',
  },
  {
    title: '이글',
    value: '123123',
  }, 
  {
    title: '버디',
    value: '123123',
  },
  {
    title: '파',
    value: '123123',
  },
  {
    title: '완료된 홀',
    value: '123123',
  },
  {
    title: '등록일',
    value: '123123',
  },
  {
    title: '중단/종료일',
    value: '123123',
  },
  {
    title: '매장명',
    value: '123123',
  },
  {
    title: '코스명',
    value: '123123',
  },
  {
    title: '코스 코드',
    value: '123123',
  }
]

// 스코어보드
const boardType = ref('');
const handleScoreboard = () => {
  boardType.value = 'scoreboard';
  mobListIndex.value = -1;
}

// 원샷정보
const handleOneshotInfo = () => {
  boardType.value = 'oneshot';
  mobListIndex.value = -1;
}

// 게임정보
const handleGameInfo = () => {
  boardType.value = 'gameinfo';
  mobListIndex.value = -1;
}

const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
  }
};

const mobOneshotListIndex = ref(-1);
const handleMobOneshotList = (index) => {
  if (window.innerWidth <= 768) {
    mobOneshotListIndex.value = mobOneshotListIndex.value === index ? -1 : index;
  }
};

const mobHoleListIndex = ref(-1);
const handleMobHoleList = (index) => {
  if (window.innerWidth <= 768) {
    mobHoleListIndex.value = mobHoleListIndex.value === index ? -1 : index;
  }
};

const mobGameListIndex = ref(-1);
const handleMobGameList = (index) => {
  if (window.innerWidth <= 768) {
    mobGameListIndex.value = mobGameListIndex.value === index ? -1 : index;
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

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';
</style>