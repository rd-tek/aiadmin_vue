<template>
    <div class="game-data">
      <div class="game-data-wrap">
        <div class="game-data-cont">
          <div class="game-data-grid">
            <div class="game-data-item">
              <div class="game-data-title">시작시간</div>
              <div class="game-data-value">
                <div class="datepicker">
                  <client-only>
                    <VueDatePicker 
                      v-model="startDate"
                      :format="formatStartDate" 
                      date-picker
                      auto-apply
                      @update:model-value="getGameList(true)"
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </client-only>
                  <client-only>
                    <VueDatePicker 
                      v-model="startTime"
                      :format="formatStartTime" 
                      time-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </client-only>
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
                  <input type="text" v-model="searchForm.playername" />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">종료시간</div>
              <div class="game-data-value">
                <div class="datepicker">
                  <client-only>
                    <VueDatePicker 
                      v-model="endDate"
                      :format="formatEndDate" 
                      date-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </client-only>
                  <client-only>
                    <VueDatePicker 
                      v-model="endTime"
                      :format="formatEndTime" 
                      time-picker
                      auto-apply
                      @open="isFocused = true"
                      @closed="isFocused = false"
                    />
                  </client-only>
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">코스명</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input
                      type="text"
                      v-model="searchForm.coursename"
                    />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">회원 닉네임</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input
                    type="text"
                    v-model="searchForm.playernickname"
                    />
                </div>
              </div>
            </div>
            <div class="game-data-item">
              <div class="game-data-title">매장명 / 매장 번호</div>
              <div class="game-data-value">
                <div class="input-wrap">
                  <div class="input-text">
                    <input type="text" v-model="searchForm.shopname">
                  </div>
                  <div class="input-text">
                    <input type="text" v-model="searchForm.shopno">
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
                        <input type="radio" id="radio_0" name="radio_0" value="" v-model="searchForm.membertype">
                        <label for="radio_0">
                            <span class="check-box-item" />
                            <span class="check-box-txt">전체</span>
                        </label>
                    </div> 
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_1" name="radio_0" value="1" v-model="searchForm.membertype"> 
                        <label for="radio_1">
                            <span class="check-box-item" />
                            <span class="check-box-txt">비회원</span>
                        </label>
                    </div>
                  </div>
                  <div class="radio-list">
                    <div class="radio-box">
                        <input type="radio" id="radio_2" name="radio_0" value="2" v-model="searchForm.membertype">
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
              <div class="game-data-title">회원번호</div>
              <div class="game-data-value">
                <div class="input-text">
                  <input type="text" v-model="searchForm.playerno">
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
                        <input 
                          type="radio"
                          id="radio_3"
                          name="gameStatus"
                          :checked="searchForm.gamestatus0"
                          @change="setGameStatus(0)"
                        >
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
                          <input
                            type="radio"
                            id="radio_4"
                            name="gameStatus"
                            @change="setGameStatus(1)"
                          >
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
                          <input
                            type="radio"
                            id="radio_5"
                            name="gameStatus"
                            @change="setGameStatus(2)"
                          >
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
                          <input
                            type="radio"
                            id="radio_6"
                            name="gameStatus"
                            @change="setGameStatus(3)"
                          >
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
            <button type="button" class="btn-md-line" @click="resetSearch">초기화</button>
            <button type="button" class="btn-md-fill btn-primary-purple" @click="getGameList">검색</button>
          </div>
        </div>
      </div>

      <!-- 게임 조회 -->
      <div class="game-data-wrap">
        <div class="game-data-cont is-mob">
          <div class="game-data-title">게임 조회</div>
          <template v-if="tableList.length > 0">
              <div class="game-data-list" :class="{ 'is-move': tableMove }" ref="tableRef" v-for="(item, index) in tableList" :key="index">
                  <div class="game-data-item">
                  <div class="num">{{ item.gameno || '-' }}</div>
                  <div class="nickname">{{ item.playername || '-' }}</div>
                  <div class="name">({{ item.gameplayername || '-' }})</div>
                  </div>
                  <div class="game-data-item align-left">
                  <div class="title">{{ item.shopname || '-' }}</div>
                  <div class="room-wrap">
                      <span class="room">{{ item.roomno || '-' }}번방</span>
                      <span class="people">{{ item.cnt || '-' }}명</span>
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
                      <span class="text">{{ item.timezone_regdate || '-' }}</span>
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
                      <span class="text">{{ item.playhole || '-' }}H/{{ item.hole || '-' }}H</span>
                  </div>
                  <div class="icon-list">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
                      <path d="M1.5 13.5C1.09722 13.5 0.746528 13.3507 0.447917 13.0521C0.149306 12.7535 0 12.4028 0 12V3C0 2.59722 0.149306 2.24653 0.447917 1.94792C0.746528 1.64931 1.09722 1.5 1.5 1.5H4V0H5.5V1.5H10.5V0H12V1.5H14.5C14.9125 1.5 15.2656 1.64931 15.5594 1.94792C15.8531 2.24653 16 2.59722 16 3V12C16 12.4028 15.8531 12.7535 15.5594 13.0521C15.2656 13.3507 14.9125 13.5 14.5 13.5H1.5ZM7.5 12H8.5V11H7.5V12ZM10.5 9.5H12.5C12.6417 9.5 12.7604 9.45208 12.8562 9.35625C12.9521 9.26042 13 9.14167 13 9V6C13 5.85833 12.9521 5.73958 12.8562 5.64375C12.7604 5.54792 12.6417 5.5 12.5 5.5H10.5C10.3583 5.5 10.2396 5.54792 10.1438 5.64375C10.0479 5.73958 10 5.85833 10 6V9C10 9.14167 10.0479 9.26042 10.1438 9.35625C10.2396 9.45208 10.3583 9.5 10.5 9.5ZM3 9.5H6V8.5H4V8H5.5C5.64167 8 5.76042 7.95208 5.85625 7.85625C5.95208 7.76042 6 7.64167 6 7.5V6C6 5.85833 5.95208 5.73958 5.85625 5.64375C5.76042 5.54792 5.64167 5.5 5.5 5.5H3V6.5H5V7H3.5C3.35833 7 3.23958 7.04792 3.14375 7.14375C3.04792 7.23958 3 7.35833 3 7.5V9.5ZM7.5 9.33333H8.5V8.33333H7.5V9.33333ZM11 8.5V6.5H12V8.5H11ZM7.5 6.66667H8.5V5.66667H7.5V6.66667ZM7.5 4H8.5V3H7.5V4Z" fill="#72777A"/>
                    </svg>
                    <span class="text">{{ item.shot || '-' }}점</span>
                  </div>
                  </div>
                  <div class="game-data-item">
                  <div class="label" 
                      :class="{ 
                          'color-blue': item.status === '6', 
                          'color-grey': item.status === '1', 
                          'color-red': item.status === '5' }">{{ item.status === '6' ? '완료' : item.status === '1' ? '대기' : item.status === '5' ? '중단' : '-' }}</div>
                  </div>
                  <div class="game-data-item">
                  <div class="teebox">
                    {{ teeboxText[item.teebox] || '-' }}
                  </div>
                  <div class="wind">
                    {{ windText[item.wind] || '-' }}
                  </div>
                  </div>
                  <div class="game-data-item">
                  <div class="level">
                    {{ levelText[item.level] || '-' }}
                  </div>
                  <div class="mulligan">멀리건: ({{ item.mulligan || '-' }})</div>
                  </div>
                  <div class="game-data-item">
                  <div class="btn-group">
                      <button type="button" class="btn-sm-line" @click="handleScoreboard(item.gameno)">스코어보드</button>
                      <button type="button" class="btn-sm-line" @click="handleOneshotInfo(item.gameno)">원샷정보</button>
                      <button type="button" class="btn-sm-line" @click="handleGameInfo(item.gameno)">게임정보</button>
                  </div>
                  </div>
              </div>
          </template>
          <div class="game-data-list is-move" v-else>
              <div class="no-data">데이터가 없습니다.</div>
          </div>
          <ul
            class="pagination-container type02"
            v-if="totalPages > 1"
          >
            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="searchForm.pageno === 1"
                @click="changePage(searchForm.pageno - 1)"
              >
                <img
                  src="/images/icon/icon_prev.png"
                  alt="prev"
                />
              </button>
            </li>

            <li
              v-for="page in pageNumbers"
              :key="page"
            >
              <button
                type="button"
                class="paginate-buttons"
                :class="{ active: page === searchForm.pageno }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>

            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="searchForm.pageno === totalPages"
                @click="changePage(searchForm.pageno + 1)"
              >
                <img
                  src="/images/icon/icon_next.png"
                  alt="next"
                />
              </button>
            </li>
          </ul>
        </div>
        <div class="table type03 mob-type02 is-mob">
          <div class="table-title">게임 조회</div>
          <div class="table-head">
            <div class="table-head-col col-1">No</div>
            <div class="table-head-col">이름(닉네임)</div>
          </div>
          <div class="table-body">
            <template v-if="tableList.length > 0">
              <div class="table-body-row" v-for="(item, index) in tableList" :key="index">
                <div class="table-body-flex">
                  <div class="table-body-col col-1">
                    {{ item.no }}
                  </div>
                  <div class="table-body-col" @click="handleMobList(index)">
                    <span class="no-wrap">{{ item.playername || '-' }}({{ item.gameplayername || '-' }})</span>
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
                      <dd class="cnt">{{ item.coursename || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">진행 홀수(홀모드)</dt>
                      <dd class="cnt">{{ item.playhole || '-' }}H({{ item.hole || '-' }}H)</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">매장</dt>
                      <dd class="cnt">{{ item.shopname || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">점수</dt>
                      <dd class="cnt">{{ item.shot || '-' }}점</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">상태</dt>
                      <dd class="cnt">
                        <div class="label" 
                          :class="{ 
                              'color-blue': item.status === '6', 
                              'color-grey': item.status === '1', 
                              'color-red': item.status === '5' }">{{ item.status === '6' ? '완료' : item.status === '1' ? '대기' : item.status === '5' ? '중단' : '-' }}</div>
                      </dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">시작시간</dt>
                      <dd class="cnt">{{ item.timezone_regdate || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">멀리건</dt>
                      <dd class="cnt">{{ item.mulligan || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">등급</dt>
                      <dd class="cnt">{{ item.level || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">바람</dt>
                      <dd class="cnt">{{ item.wind || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">티박스</dt>
                      <dd class="cnt">{{ item.teebox  || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">회원유형</dt>
                      <dd class="cnt">{{ item.membertype || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">방번호</dt>
                      <dd class="cnt">{{ item.roomno || '-' }}</dd>
                    </dl>
                    <dl class="list">
                      <dt class="tit">플레이어수</dt>
                      <dd class="cnt">{{ item.playerno || '-' }}</dd>
                    </dl>
                    <div class="btn-wrap">
                      <button type="button" class="btn-md-line" @click="handleScoreboard(item.gameno)">스코어보드</button>
                      <button type="button" class="btn-md-line" @click="handleOneshotInfo(item.gameno)">원샷정보</button>
                      <button type="button" class="btn-md-line" @click="handleGameInfo(item.gameno)">게임정보</button>
                    </div>
                  </div>
                </transition>
              </div>
            </template>
            <div class="table-body-row is-move" v-else>
              <div class="no-data">데이터가 없습니다.</div>
            </div>
          </div>
          <ul
            class="pagination-container type02"
            v-if="totalPages > 1"
          >
            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="searchForm.pageno === 1"
                @click="changePage(searchForm.pageno - 1)"
              >
                <img
                  src="/images/icon/icon_prev.png"
                  alt="prev"
                />
              </button>
            </li>

            <li
              v-for="page in pageNumbers"
              :key="page"
            >
              <button
                type="button"
                class="paginate-buttons"
                :class="{ active: page === searchForm.pageno }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
            </li>

            <li>
              <button
                type="button"
                class="paginate-buttons"
                :disabled="searchForm.pageno === totalPages"
                @click="changePage(searchForm.pageno + 1)"
              >
                <img
                  src="/images/icon/icon_next.png"
                  alt="next"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>

    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";
import { useGameDataApi } from "@/api/gamedata";
import { useRouter } from "vue-router";

// 2026.06.16[cgnoh]: 라우터 관련
const router = useRouter();

// 2026.06.16[cgnoh]: api 관련
const { _gameDataList } = useGameDataApi();

// 2026.06.16[cgnoh]: 난이도 타입
const levelText = {
  1: "매우쉬움",
  2: "쉬움",
  3: "보통",
  4: "일반",
  5: "어려움",
};

// 2026.06.16[cgnoh]: 티박스 타입
const teeboxText = {
  1: "레드",
  2: "일반(화이트)",
  3: "블루",
  4: "블랙",
};

// 2026.06.16[cgnoh]: 바람 타입
const windText = {
  1: "무풍",
  2: "약풍",
  3: "중풍",
  4: "강풍",
};

// 2026.06.16[cgnoh]: 날짜 관련
const startDate = ref(new Date());
const endDate = ref(new Date());
const startTime = ref(new Date());
const endTime = ref(new Date());

// 2026.06.16[cgnoh]: 시작 날짜 포맷
const formatStartDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

// 2026.06.16[cgnoh]: 종료 날짜 포맷
const formatEndDate = (date) => {
  if (!date) return "";
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, "0")
  const day = `${date.getDate()}`.padStart(2, "0")
  return `${year}.${month}.${day}`
};

// 2026.06.16[cgnoh]: 시작 시간 포맷
const formatStartTime = (date) => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 || 12;

  return `${period} ${displayHour}:${minutes}`;
};

// 2026.06.16[cgnoh]: 종료 시간 포맷
const formatEndTime = (date) => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const period = hours < 12 ? "오전" : "오후";
  const displayHour = hours % 12 || 12;

  return `${period} ${displayHour}:${minutes}`;
};

// 2026.06.17[cgnoh]: 총 갯수
const totalCount = ref(0);

// 2026.06.17[cgnoh]: 게임리스트 조회
const tableList = ref([]);
const getGameList = async (resetPage = false) => {
  try {
    if (resetPage) {
      searchForm.pageno = 1;
    }

    searchForm.startdate = formatApiDate(startDate.value);
    searchForm.enddate = formatApiDate(endDate.value);

    const res = await _gameDataList({ ...searchForm });

    if (res.code === 200) {
      tableList.value = res.gamelist || [];
      totalCount.value = Number(res.gamelistcnt || 0);
    }
  } catch (err) {
    console.error(err);
  }
};

const setGameStatus = (type) => {
  searchForm.gamestatus0 = false;
  searchForm.gamestatus1 = false;
  searchForm.gamestatus2 = false;
  searchForm.gamestatus3 = false;

  switch (type) {
    case 0:
      searchForm.gamestatus0 = true;
      break;

    case 1:
      searchForm.gamestatus1 = true;
      break;

    case 2:
      searchForm.gamestatus2 = true;
      break;

    case 3:
      searchForm.gamestatus3 = true;
      break;
  }
};

const formatApiDate = (date) => {
  if (!date) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 2026.06.17[cgnoh]: 검색 폼
const searchForm = reactive({
  startdate: "", // 시작날짜
  enddate: "", // 종료날짜
  playername: "", // 회원이름
  playernickname: "", // 회원 닉네임
  shopname: "", // 매장명
  shopno: "", // 매장 번호
  coursename: "", // 코스명
  membertype: "", 
  playerno: "", // 회원번호
  gameno: "", // 게임번호
  gamestatus0: true,  // 전체
  gamestatus1: false, // 진행
  gamestatus2: false, // 중단
  gamestatus3: false, // 완료

  pageno: 1,
});

// 2026.06.17[cgnoh]: 스코어보드
const handleScoreboard = (item) => {
  mobListIndex.value = -1;
  router.push(`/manager/game-data/game-score/${item}`);
}

// 2026.06.17[cgnoh]: 원샷정보
const handleOneshotInfo = (item) => {
  mobListIndex.value = -1;
  router.push(`/manager/game-data/game-oneshot/${item}`);
}

// 2026.06.17[cgnoh]: 게임정보
const handleGameInfo = (item) => {
  mobListIndex.value = -1;
  router.push(`/manager/game-data/game-info/${item}`);
}

// 2026.06.17[cgnoh]: 게밍 조회 인터렉션
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 스코어보드(홀) 인터렉션
const scoreBoardListRef = ref();
const scoreBoardListMove = ref(false);
useIntersectionObserver(scoreBoardListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 스코어보드(게임) 인터렉션
const scoreBoardGameRef = ref();
const scoreBoardGameMove = ref(false);
useIntersectionObserver(scoreBoardGameRef, ([{ isIntersecting }]) => {
    if (isIntersecting) scoreBoardGameMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 원샷정보 인터렉션
const oneshotListRef = ref();
const oneshotListMove = ref(false);
useIntersectionObserver(oneshotListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) oneshotListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 게임정보 인터렉션
const gameinfoListRef = ref();
const gameinfoListMove = ref(false);
useIntersectionObserver(gameinfoListRef, ([{ isIntersecting }]) => {
    if (isIntersecting) gameinfoListMove.value = true;
}, { threshold: 0 });

// 2026.06.17[cgnoh]: 게임조회 아코디언
const mobListIndex = ref(-1);
const handleMobList = (index) => {
  if (window.innerWidth <= 768) {
    mobListIndex.value = mobListIndex.value === index ? -1 : index;
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

// 2026.06.18[cgnoh]: 스토리지 관련
const STORAGE_KEY = "gameDataSearch";
const saveSearchState = () => {
  sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      searchForm: { ...searchForm },
      startDate: startDate.value,
      endDate: endDate.value,
      startTime: startTime.value,
      endTime: endTime.value,
      tableList: tableList.value,
      totalCount: totalCount.value,
    })
  );
};

watch(
  [
    searchForm,
    startDate,
    endDate,
    startTime,
    endTime,
    tableList,
  ],
  () => {
    saveSearchState();
  },
  {
    deep: true,
  }
);

// 2026.06.18[cgnoh]: 페이지 재진입시 복원
const restoreSearchState = () => {
  const saved = sessionStorage.getItem(STORAGE_KEY);

  if (!saved) return false;

  const state = JSON.parse(saved);

  Object.assign(searchForm, state.searchForm);

  startDate.value = state.startDate
    ? new Date(state.startDate)
    : new Date();

  endDate.value = state.endDate
    ? new Date(state.endDate)
    : new Date();

  startTime.value = state.startTime
    ? new Date(state.startTime)
    : new Date();

  endTime.value = state.endTime
    ? new Date(state.endTime)
    : new Date();

  tableList.value = state.tableList || [];
  totalCount.value = state.totalCount || 0;

  return true;
};

// 2026.06.18[cgnoh]: 초기화 핸들러
const resetSearch = () => {
  sessionStorage.removeItem(STORAGE_KEY);

  Object.assign(searchForm, {
    startdate: "",
    enddate: "",
    playername: "",
    playernickname: "",
    shopname: "",
    shopno: "",
    coursename: "",
    membertype: "",
    playerno: "",
    gameno: "",
    gamestatus0: true,
    gamestatus1: false,
    gamestatus2: false,
    gamestatus3: false,
    pageno: 1,
  });

  startDate.value = new Date();
  endDate.value = new Date();
  startTime.value = new Date();
  endTime.value = new Date();

  tableList.value = [];
  
  getGameList();
};

// 2026.06.18[cgnoh]: 페이지당 개수
const pageSize = 10;

// 2026.06.18[cgnoh]: 전체 페이지 수
const totalPages = computed(() =>
  Math.ceil(totalCount.value / pageSize)
);

// 2026.06.18[cgnoh]: 페이지 번호 목록
const pageNumbers = computed(() => {
  const blockSize = 8;

  const start =
    Math.floor((searchForm.pageno - 1) / blockSize) *
      blockSize +
    1;

  const end = Math.min(
    start + blockSize - 1,
    totalPages.value
  );

  return Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );
});

// 2026.06.18[cgnoh]: 페이지 전환
const changePage = async (page) => {
  if (
    page < 1 ||
    page > totalPages.value ||
    page === searchForm.pageno
  ) {
    return;
  }

  searchForm.pageno = page;
  await getGameList();

};

onMounted(() => {
  const restored = restoreSearchState();

  if (!restored) {
    getGameList();
  }
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '게임데이터 관리',
  meta: [
    { name: 'description', content: '게임데이터 관리 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/game-data.scss';
</style>