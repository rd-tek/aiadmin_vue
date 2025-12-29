<template>
  <div class="statistics">
    <div class="statistics-wrap">
      <div class="statistics-head">통계</div>
      <div class="statistics-section">
        <div class="cont">
          <ul class="tab type06">
            <li
              class="tab-list"
              :class="{ 'is-active': currentTab === item }"
              v-for="(item, index) in menuList"
              :key="index"
              @click="handleCurrentTab(item)"
            >
              {{ item }}
            </li>
          </ul>

          <div class="tab-cont">
            <div class="tab-cont-head">
              <div class="select-default">
                <template v-if="currentTab === '실적'">
                  <div class="form-list">
                    <div class="input-text type-select">
                      <input 
                        type="text"
                        :placeholder="optionPerformList[0].name"
                        class="lg"
                        :class="{ 'is-active': selectShow === true }"
                        readonly 
                        :value="selectPerformInput"  
                        @click="selectShow = !selectShow">
                    </div>
                    <img src="/images/icon/icon_arrow_down.png" alt="icon_arrow_down" :class="{ 'is-active' : selectShow }">
                    <transition name="slide">
                      <ul class="select-list" ref="inputContRef" v-if="selectShow">
                        <li class="select-list-item" v-for="(item, index) in optionPerformList" :key="index">
                          <div class="select-item">
                            <input type="radio" :id="`radio_${index}`" name="radio_custom" :value="item.value" v-model="sortOrder" @click="selectShow = false">
                            <label :for="`radio_${index}`">{{ item.name }}</label>
                          </div>
                        </li>
                      </ul>
                    </transition>
                  </div>
                </template>
                <template v-else-if="currentTab === '회원'">
                  <!-- <select v-model="sortOrder">
                    <option value="dashboard">대시보드</option>
                    <option value="gender">성별</option>
                    <option value="handicap">핸디캡별</option>
                    <option value="vip">VIP</option>
                  </select> -->
                  <div class="form-list">
                    <div class="input-text type-select">
                      <input 
                        type="text"
                        :placeholder="optionMemberList[0].name"
                        class="lg"
                        :class="{ 'is-active': selectShow === true }"
                        readonly 
                        :value="selectMemberInput"  
                        @click="selectShow = !selectShow">
                    </div>
                    <img src="/images/icon/icon_arrow_down.png" alt="icon_arrow_down" :class="{ 'is-active' : selectShow }">
                    <transition name="slide">
                      <ul class="select-list" ref="inputContRef" v-if="selectShow">
                        <li class="select-list-item" v-for="(item, index) in optionMemberList" :key="index">
                          <div class="select-item">
                            <input type="radio" :id="`radio_${index}`" name="radio_custom" :value="item.value" v-model="sortOrder" @click="selectShow = false">
                            <label :for="`radio_${index}`">{{ item.name }}</label>
                          </div>
                        </li>
                      </ul>
                    </transition>
                  </div>
                </template>
              </div>

              <DateController
                :displayDate="displayDate"
                @prev="handlePrev"
                @next="handleNext"
              >
                <template #picker>
                  <!-- ✅ 연별 / 월별: 둘 다 년도 선택 -->
                  <datepicker-year
                    v-if="currentVal === '연별' || currentVal === '월별'"
                    v-model="targetDate"
                  />

                  <!-- ✅ 일별: 월 선택 (연-월) -->
                  <datepicker-month
                    v-else-if="currentVal === '일별'"
                    v-model="targetDate"
                  />
                </template>
              </DateController>

              <ul class="tab type07">
                <li
                  class="tab-list"
                  :class="{ 'is-active': currentVal === item }"
                  v-for="(item, index) in tabList"
                  :key="index"
                  @click="tabClick(item)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <template v-if="currentTab === '실적'">
              <div class="tab-cont-section" v-if="sortOrder === 'dashboard'">
                <div class="tab-cont-list">
                  <div class="col-2">
                    <p class="tab-cont-title">총 코칭</p>
                      <div class="tab-cont-area">
                        <chart-line
                          v-if="chartData.labels.length > 0"
                          :labels="chartData.labels"
                          :values="chartData.values"
                        />

                        <div v-else class="no-info">데이터가 없습니다.</div>
                      </div>
                  </div>
                  <div class="col-2">
                    <p class="tab-cont-title">아카데미 별</p>
                    <div class="tab-cont-area">
                      <div class="chart-area">
                        <chart-doughnut
                          v-if="academyShareList.length > 0"
                          :data="academyShareList"
                        />
                        <div v-else class="no-info">데이터가 없습니다.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ================================================= -->
              <!-- 실적 > 코칭순 (연별/월별/일별 통합 리팩토링) -->
              <!-- ================================================= -->
              <template
                v-if="currentTab === '실적' && sortOrder === 'coaching'"
              >
                <div class="tab-cont-section">
                  <!-- 1. 차트 영역 -->
                  <div class="tab-cont-list">
                    <div class="tab-cont-area">
                      <div class="tab-cont-area">
                        <!-- 
                        chartData는 computed에서 연/월/일 및 sortOrder에 따라 
                        자동으로 데이터가 바뀌므로 v-if 분기가 필요 없습니다.
                      -->
                        <chart-bar
                          v-if="chartData.labels && chartData.labels.length > 0"
                          :labels="chartData.labels"
                          :values="chartData.values"
                        />
                        <div v-else class="no-info">데이터가 없습니다.</div>
                      </div>
                    </div>
                  </div>

                  <!-- 2. 요약 테이블 영역 (Summary Table) -->
                  <!-- 2. 요약 테이블 영역 (Summary Table) -->
                  <div class="tab-cont-list">
                    <div class="col-1">
                      <div class="tab-cont-area">
                        <p class="top-area">
                          <span class="sub">(단위 : 건)</span>
                        </p>
                        <div class="table type01">
                          <table>
                            <thead>
                              <tr>
                                <th>구분</th>
                                <!-- ✅ HEAD: labels 사용 -->
                                <template
                                  v-if="stats.summaryData?.labels?.length"
                                >
                                  <th
                                    v-for="label in stats.summaryData.labels"
                                    :key="label"
                                  >
                                    {{ label }}
                                  </th>
                                </template>
                                <!-- 로딩 전 or 데이터 없음 -->
                                <template v-else>
                                  <th>-</th>
                                  <th>-</th>
                                  <th>-</th>
                                </template>
                                <th>합계</th>
                              </tr>
                            </thead>
                            <tbody>
                              <!-- ✅ 데이터: summaryData + labels 존재할 때만 -->
                              <tr
                                v-if="
                                  stats.summaryData &&
                                  stats.summaryData.labels &&
                                  stats.summaryData.labels.length
                                "
                              >
                                <th class="align-center">총 수</th>
                                <!-- ✅ label + index 같이 받아서 values[index] 사용 -->
                                <td
                                  v-for="(label, idx) in stats.summaryData
                                    .labels"
                                  :key="label"
                                >
                                  {{
                                    Number(
                                      stats.summaryData.values?.[idx] || 0,
                                    ).toLocaleString()
                                  }}
                                </td>
                                <!-- 총 합계 -->
                                <td>
                                  <span class="total">
                                    {{
                                      Number(
                                        stats.summaryData.total || 0,
                                      ).toLocaleString()
                                    }}
                                  </span>
                                </td>
                              </tr>
                              <!-- 데이터 없음 -->
                              <tr v-else>
                                <td colspan="5" class="align-center">
                                  데이터가 없습니다.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <!-- 매장별 테이블 제거됨 -->
                  </div>
                </div>
              </template>

              <template
                v-if="currentTab === '실적' && sortOrder === 'curriculum'"
              >
                <div class="tab-cont-section">
                  <!-- 3-1. 멀티 라인 차트 영역 -->
                  <div class="tab-cont-list">
                    <div class="tab-cont-area">
                      <div class="tab-cont-area">
                        <!-- 멀티 시리즈 라인/스택 컴포넌트에 맞게 수정해서 사용 -->
                        <!-- 예시: chart-line-multi 가 있다고 가정 -->
                        <chart-line-type-1
                          v-if="
                            curriculumChartData.labels.length &&
                            curriculumChartData.series.length
                          "
                          :labels="curriculumChartData.labels"
                          :series="curriculumChartData.series"
                        />
                        <div v-else class="no-info">데이터가 없습니다.</div>
                      </div>
                    </div>
                  </div>

                  <!-- 3-2. 커리큘럼 요약 테이블 -->
                  <div class="tab-cont-list">
                    <div class="col-1">
                      <div class="tab-cont-area">
                        <p class="top-area">
                          <span class="sub">(단위 : 건)</span>
                        </p>
                        <div class="table type01">
                          <table>
                            <thead>
                              <tr>
                                <th>커리큘럼</th>
                                <!-- 기간 헤더 (연/월/일 공통) -->
                                <template
                                  v-if="curriculumSummary?.labels?.length"
                                >
                                  <th
                                    v-for="label in curriculumSummary.labels"
                                    :key="label"
                                  >
                                    {{ label }}
                                  </th>
                                </template>
                                <th>합계</th>
                              </tr>
                            </thead>
                            <tbody>
                              <!-- 각 아카데미별 row -->
                              <tr
                                v-for="row in curriculumSummary?.rows || []"
                                :key="row.name"
                              >
                                <th class="align-center">
                                  {{ row.name }}
                                </th>
                                <td v-for="(v, idx) in row.data" :key="idx">
                                  {{ Number(v || 0).toLocaleString() }}
                                </td>
                                <td>
                                  <span class="total">
                                    {{
                                      Number(row.total || 0).toLocaleString()
                                    }}
                                  </span>
                                </td>
                              </tr>

                              <!-- 기간별(연/월/일) 총합 row -->
                              <tr v-if="curriculumSummary">
                                <th class="align-center">기간합계</th>
                                <td
                                  v-for="(
                                    v, idx
                                  ) in curriculumSummary.colTotals"
                                  :key="'col-' + idx"
                                >
                                  {{ Number(v || 0).toLocaleString() }}
                                </td>
                                <td>
                                  <span class="total">
                                    {{
                                      Number(
                                        curriculumSummary.grandTotal || 0,
                                      ).toLocaleString()
                                    }}
                                  </span>
                                </td>
                              </tr>

                              <!-- 데이터 없음 -->
                              <tr
                                v-if="
                                  !curriculumSummary ||
                                  !curriculumSummary.rows.length
                                "
                              >
                              <th class="align-center">-</th>
                                <td class="align-center" colspan="6">
                                  데이터가 없습니다.
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <template v-else-if="currentTab === '코칭'">
              <div class="tab-cont-section">
                <!-- 3-1. 멀티 라인 차트 영역 -->
                <div class="tab-cont-list">
                  <div class="tab-cont-area">
                    <div class="tab-cont-area">
                      <!-- 멀티 시리즈 라인/스택 컴포넌트에 맞게 수정해서 사용 -->
                      <!-- 예시: chart-line-multi 가 있다고 가정 -->
                      <chart-bar02
                        v-if="
                          coachingChartData.labels.length &&
                          coachingChartData.series.length
                        "
                        :labels="coachingChartData.labels"
                        :series="coachingChartData.series"
                      />
                      <div v-else class="no-info">데이터가 없습니다.</div>
                    </div>
                  </div>
                </div>
                <div class="tab-cont-list">
                  <div class="col-1">
                    <div class="tab-cont-area">
                      <p class="top-area">
                        <span class="sub">(단위 : 건 / %)</span>
                      </p>

                      <div class="table type01">
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th
                                v-for="label in coachingSummary?.labels || []"
                                :key="label"
                              >
                                {{ label }}
                              </th>
                              <th>합계</th>
                            </tr>
                          </thead>
                          <tbody v-if="coachingSummary">
                            <!-- 진행중 -->
                            <tr>
                              <th class="align-center">진행중</th>
                              <td
                                v-for="(v, idx) in coachingSummary.inProgress"
                                :key="'ing-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      coachingSummary.totalInProgress || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>

                            <!-- 완료 -->
                            <tr>
                              <th class="align-center">완료</th>
                              <td
                                v-for="(v, idx) in coachingSummary.completed"
                                :key="'done-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      coachingSummary.totalCompleted || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>

                            <!-- ✅ 완료율 (하단 총계 대신) -->
                            <tr>
                              <th class="align-center">완료율(%)</th>
                              <td
                                v-for="(v, idx) in coachingSummary.rateByLabel"
                                :key="'rate-' + idx"
                              >
                                {{ Number(v || 0).toFixed(1) }}%
                              </td>
                              <td>
                                <span class="total">
                                  {{ coachingSummary.totalRate.toFixed(1) }}%
                                </span>
                              </td>
                            </tr>
                          </tbody>

                          <tbody v-else>
                            <tr>
                              <td colspan="100" class="align-center">
                                데이터가 없습니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="currentTab === '회원'">
              <!-- ======================== -->
              <!-- 1) 회원 > 대시보드 -->
              <!-- ======================== -->
              <div v-if="sortOrder === 'dashboard'" class="tab-cont-section">
                <!-- 차트 -->
                <div class="tab-cont-list">
                  <div class="tab-cont-area">
                    <div class="tab-cont-area">
                      <chart-bar
                        v-if="
                          memberChartData.type === 'single' &&
                          memberChartData.labels.length
                        "
                        :labels="memberChartData.labels"
                        :values="memberChartData.values"
                      />
                      <div v-else class="no-info">데이터가 없습니다.</div>
                    </div>
                  </div>
                </div>

                <!-- 요약 테이블 -->
                <div class="tab-cont-list">
                  <div class="col-1">
                    <div class="tab-cont-area">
                      <p class="top-area">
                        <span class="sub">(단위 : 명)</span>
                      </p>
                      <div class="table type01">
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th
                                v-for="label in memberDashboardSummary?.labels ||
                                []"
                                :key="label"
                              >
                                {{ label }}
                              </th>
                              <th>합계</th>
                            </tr>
                          </thead>
                          <tbody v-if="memberDashboardSummary">
                            <tr>
                              <th class="align-center">신청자 수</th>
                              <td
                                v-for="(
                                  v, idx
                                ) in memberDashboardSummary.values"
                                :key="'dash-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      memberDashboardSummary.total || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="100" class="align-center">
                                데이터가 없습니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ======================== -->
              <!-- 2) 회원 > 성별 -->
              <!-- ======================== -->
              <div v-else-if="sortOrder === 'gender'" class="tab-cont-section">
                <!-- 차트 (멀티 바 / 스택용) -->
                <div class="tab-cont-list">
                  <div class="tab-cont-area">
                    <div class="tab-cont-area">
                      <chart-bar-vertical-stack
                        v-if="
                          memberChartData.type === 'multi' &&
                          memberChartData.labels.length &&
                          memberChartData.series.length
                        "
                        :labels="memberChartData.labels"
                        :series="memberChartData.series"
                      />
                      <div v-else class="no-info">데이터가 없습니다.</div>
                    </div>
                  </div>
                </div>

                <!-- 성별 summary 테이블 -->
                <div class="tab-cont-list">
                  <div class="col-1">
                    <div class="tab-cont-area">
                      <p class="top-area">
                        <span class="sub">(단위 : 명)</span>
                      </p>
                      <div class="table type01">
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th
                                v-for="label in memberGenderSummary?.labels ||
                                []"
                                :key="label"
                              >
                                {{ label }}
                              </th>
                              <th>합계</th>
                            </tr>
                          </thead>
                          <tbody v-if="memberGenderSummary">
                            <!-- 각 성별별 row -->
                            <tr
                              v-for="row in memberGenderSummary.series"
                              :key="row.name"
                            >
                              <th class="align-center">{{ row.name }}</th>
                              <td
                                v-for="(v, idx) in row.data"
                                :key="row.name + '-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      memberGenderSummary.totalByGender?.[
                                        row.name
                                      ] || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>

                            <!-- 합계 -->
                            <tr>
                              <th class="align-center">합계</th>
                              <td
                                v-for="(v, idx) in memberGenderSummary.colSums"
                                :key="'gender-sum-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      memberGenderSummary.totalAll || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="100" class="align-center">
                                데이터가 없습니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ======================== -->
              <!-- 3) 회원 > 핸디캡별 -->
              <!-- ======================== -->
              <div
                v-else-if="sortOrder === 'handicap'"
                class="tab-cont-section"
              >
                <!-- 차트 (멀티 시리즈) -->
                <div class="tab-cont-list">
                  <div class="tab-cont-area">
                    <div class="tab-cont-area">
                      <chart-bar-vertical-stack
                        v-if="
                          memberChartData.type === 'multi' &&
                          memberChartData.labels.length &&
                          memberChartData.series.length
                        "
                        :labels="memberChartData.labels"
                        :series="memberChartData.series"
                      />
                      <div v-else class="no-info">데이터가 없습니다.</div>
                    </div>
                  </div>
                </div>

                <!-- 핸디캡 summary 테이블 -->
                <div class="tab-cont-list">
                  <div class="col-1">
                    <div class="tab-cont-area">
                      <p class="top-area">
                        <span class="sub">(단위 : 명)</span>
                      </p>
                      <div class="table type01">
                        <table>
                          <thead>
                            <tr>
                              <th>구분</th>
                              <th
                                v-for="label in memberHandicapSummary?.labels ||
                                []"
                                :key="label"
                              >
                                {{ label }}
                              </th>
                              <th>합계</th>
                            </tr>
                          </thead>
                          <tbody v-if="memberHandicapSummary">
                            <!-- 버킷별 row (79이하, 80-89, 90-99, 100+ 등) -->
                            <tr
                              v-for="row in memberHandicapSummary.series"
                              :key="row.name"
                            >
                              <th class="align-center">{{ row.name }}</th>
                              <td
                                v-for="(v, idx) in row.data"
                                :key="row.name + '-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      memberHandicapSummary.totalByBucket?.[
                                        row.name
                                      ] || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>

                            <!-- 합계 -->
                            <tr>
                              <th class="align-center">합계</th>
                              <td
                                v-for="(
                                  v, idx
                                ) in memberHandicapSummary.colSums"
                                :key="'hcp-sum-' + idx"
                              >
                                {{ Number(v || 0).toLocaleString() }}
                              </td>
                              <td>
                                <span class="total">
                                  {{
                                    Number(
                                      memberHandicapSummary.totalAll || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="100" class="align-center">
                                데이터가 없습니다.
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- ======================== -->
              <!-- 4) 회원 > VIP -->
              <!-- ======================== -->
              <div v-else-if="sortOrder === 'vip'" class="tab-cont-section">
                <!-- VIP 랭킹 카드 스타일 -->
                <div class="tab-cont-list type02" v-if="memberVipSummary">
                  <div
                    class="tab-cont-item"
                    v-for="(item, idx) in memberVipSummary.vipList"
                    :key="item.nickname + '-' + idx"
                  >
                    <div class="icon">
                      <img
                        :src="
                          item.binary_filepath
                            ? common.getImg(item.binary_filepath)
                            : '/public/images/default/img_profile_01.png'
                        "
                        alt="profile"
                      />
                    </div>
                    <div class="info">
                      <div class="info-wrap">
                        <span class="rank">{{ idx + 1 }}위</span>
                        <span class="text">{{ item.nickname }}</span>
                      </div>
                      <div class="num">{{ item.total }}</div>
                      <div class="label">
                        <div class="label-list">진행중</div>
                        <div class="label-list name">
                          {{ item.in_progress }}
                        </div>
                        <div class="label-list">완료</div>
                        <div class="label-list name">
                          {{ item.completed }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="no-info" v-if="memberVipSummary.vipList.length === 0">데이터가 없습니다.</div>
                </div>

                <!-- VIP summary 테이블 -->
                <div class="tab-cont-list" v-if="memberVipSummary">
                  <div class="col-1">
                    <div class="tab-cont-area">
                      <p class="top-area">
                        <span class="sub">(단위 : 건)</span>
                      </p>
                      <div class="table type01">
                        <table>
                          <colgroup>
                            <col width="65px">
                            <col width="*">
                          </colgroup>
                          <thead>
                            <tr>
                              <th>순위</th>
                              <th>회원명</th>
                              <th>진행중</th>
                              <th>완료</th>
                              <th>합계</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="(item, idx) in memberVipSummary.vipList"
                              :key="'vip-row-' + idx"
                            >
                              <th class="align-center">{{ idx + 1 }}</th>
                              <td>{{ item.nickname }}</td>
                              <td>
                                {{
                                  Number(item.in_progress || 0).toLocaleString()
                                }}
                              </td>
                              <td>
                                {{
                                  Number(item.completed || 0).toLocaleString()
                                }}
                              </td>
                              <td>
                                <span class="total">
                                  {{ Number(item.total || 0).toLocaleString() }}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <th class="align-center">총 합계</th>
                              <td colspan="4">
                                <span class="total">
                                  {{
                                    Number(
                                      memberVipSummary.totalAll || 0,
                                    ).toLocaleString()
                                  }}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-else class="no-info">데이터가 없습니다.</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStatsApi } from "~/api/stats";
import {
  format,
  addYears,
  subYears,
  addMonths,
  subMonths,
  addDays,
  subDays,
} from "date-fns";
import DateController from "@/components/datepicker/common.vue";
import { useRouteQuery } from "@vueuse/router";
import { useCommon } from "@/utils/common";
import { useRouter, useRoute } from "vue-router";
import { onClickOutside } from '@vueuse/core';

const selectShow = ref(false);
const inputContRef = ref();
onClickOutside(inputContRef, event => {
  const parent = event.target.closest('.input-text');
  if(parent === null) {
    selectShow.value = false;
  }
});

// 실적 셀렉트 값
const optionPerformList = [
  {
    name: '대시보드',
    value: 'dashboard'
  },
  {
    name: '코칭순',
    value: 'coaching'
  },
  {
    name: '커리큘럼',
    value: 'curriculum'
  }
]

const selectPerformInput = computed(() => {
  switch(sortOrder.value) {
    case 'dashboard':
      return '대시보드'

    case 'coaching':
      return '코칭순'

    case 'curriculum':
      return '커리큘럼'
  }
});

// 회원 셀렉트 값
const optionMemberList = [
  {
    name: '대시보드',
    value: 'dashboard'
  },
  {
    name: '성별',
    value: 'gender'
  },
  {
    name: '핸디캡별',
    value: 'handicap'
  },
  {
    name: 'VIP',
    value: 'vip'
  }
]
const selectMemberInput = computed(() => {
  switch(sortOrder.value) {
    case 'dashboard':
      return '대시보드'

    case 'gender':
      return '성별'

    case 'handicap':
      return '핸디캡별'

    case 'vip':
      return 'VIP'
  }
})

definePageMeta({ layout: "sub-page" });

const common = useCommon();
// ==========================================
// 1. 상태 변수 설정
// ==========================================
const statsApi = useStatsApi();
const stats = ref({}); // API 전체 응답 저장

const currentTab = ref("실적");
const menuList = ["실적", "코칭", "회원"];
const currentVal = ref("연별"); // 초기값 공백 (대시보드 모드)
const tabList = ["연별", "월별", "일별"];
const sortOrder = ref("dashboard");
const targetDate = ref(new Date());
const handleCurrentTab = (item) => {
  currentTab.value = item;
  sortOrder.value = 'dashboard'
}

// 라디오 버튼용 데이터
const rankRadios = ["전체매장", "상위 5위", "하위 5위"];

const tabClick = (index) => {
  currentVal.value = index;
};

// ==========================================
// 2. 날짜 관련 로직 (Computed & Handlers)
// ==========================================
const displayDate = computed(() => {
  // 연별, 월별 -> 연만 보여줌
  if (currentVal.value === "연별" || currentVal.value === "월별") {
    return format(targetDate.value, "yyyy");
  }

  // 일별 -> 연.월 (월 선택만 하니까)
  if (currentVal.value === "일별") {
    return format(targetDate.value, "yyyy.MM");
  }

  // 혹시 모르는 기본값
  return format(targetDate.value, "yyyy");
});

const handlePrev = () => {
  if (currentVal.value === "일별") {
    // ✅ 일별: 월 단위 이동
    targetDate.value = subMonths(targetDate.value, 1);
  } else {
    // ✅ 연별 / 월별: 연 단위 이동
    targetDate.value = subYears(targetDate.value, 1);
  }
};

const handleNext = () => {
  if (currentVal.value === "일별") {
    // ✅ 일별: 월 단위 이동
    targetDate.value = addMonths(targetDate.value, 1);
  } else {
    // ✅ 연별 / 월별: 연 단위 이동
    targetDate.value = addYears(targetDate.value, 1);
  }
};

// ==========================================
// 3. 데이터 가공 (Computed) - UI 바인딩용
// ==========================================

// [3-1] 차트 데이터 (Line/Bar)
// 대시보드일 땐 yearly_trend, 아닐 땐 일반 chartData 사용
const chartData = computed(() => {
  const s = stats.value || {};
  const tab = currentTab.value;
  const sort = sortOrder.value;

  // 기본 틀 (stack 차트 대비 series도 포함)
  const base = { labels: [], values: [], series: [] };

  // ──────────────────────────────
  // 1) 실적 탭
  // ──────────────────────────────
  if (tab === "실적") {
    // 실적 > 대시보드: yearly_trend 사용
    if (sort === "dashboard") {
      const trend = s.dashboard?.yearly_trend || {};
      return {
        ...base,
        labels: trend.labels || [],
        values: trend.values || [],
      };
    }

    // 실적 > 코칭순 / 커리큘럼
    const cd = s.chartData || {};
    return {
      ...base,
      labels: cd.labels || [],
      values: cd.values || [],
    };
  }

  // ──────────────────────────────
  // 2) 코칭 탭
  //    (백엔드 chartData.labels/values 기준)
  // ──────────────────────────────
  if (tab === "코칭") {
    const cd = s.chartData || {};
    return {
      ...base,
      labels: cd.labels || [],
      values: cd.values || [],
    };
  }

  // ──────────────────────────────
  // 3) 회원 탭
  // ──────────────────────────────
  if (tab === "회원") {
    // 회원 > 대시보드 : 단일 값(bar)
    if (sort === "dashboard") {
      const cd = s.chartData || {};
      return {
        ...base,
        labels: cd.labels || [],
        values: cd.values || [],
      };
    }

    // 회원 > 성별 / 핸디캡별 : stack 차트 (series 구조)
    if (sort === "gender" || sort === "handicap") {
      const cd = s.chartData || {};
      return {
        ...base,
        labels: cd.labels || [],
        series: cd.series || [],
      };
    }

    // 회원 > vip : 차트 없음
    if (sort === "vip") {
      return base;
    }
  }

  // 예외 기본값
  return base;
});
// 실적 > 커리큘럼 전용 멀티 시리즈 차트 데이터
const curriculumChartData = computed(() => {
  const cd = stats.value.chartData || {};
  return {
    labels: cd.labels || [],
    series: cd.series || [],
  };
});

// [3-2] 아카데미 점유율 (Pie Chart)
const academyShareList = computed(() => {
  return stats.value.dashboard?.academy_share || [];
});

// [3-3] 매장 TOP 5 (Table)
const topStoreList = computed(() => {
  // 대시보드용 top_stores가 있으면 쓰고, 없으면 tableData 사용
  return stats.value.dashboard?.top_stores || stats.value.tableData || [];
});

const curriculumSummary = computed(() => {
  const sd = stats.value.summaryData;
  if (!sd || !sd.labels || !sd.series) return null;

  const labelCount = sd.labels.length;

  // 1) 각 아카데미(타이틀)별 row 구성
  const rows = sd.series.map((s) => {
    const data = (s.data || []).map((v) => Number(v) || 0);
    const rowTotal =
      sd.totalByTitle && typeof sd.totalByTitle[s.name] !== "undefined"
        ? Number(sd.totalByTitle[s.name]) || 0
        : data.reduce((a, b) => a + b, 0);

    return {
      name: s.name,
      data,
      total: rowTotal,
    };
  });

  // 2) 라벨(연/월/일) 기준 컬럼 합계
  const colTotals = Array(labelCount).fill(0);
  rows.forEach((row) => {
    row.data.forEach((v, i) => {
      colTotals[i] += v;
    });
  });

  // 3) 전체 합계 (백엔드 제공이 우선)
  const grandTotal =
    typeof sd.totalAll !== "undefined"
      ? Number(sd.totalAll) || 0
      : colTotals.reduce((a, b) => a + b, 0);

  return {
    labels: sd.labels,
    rows,
    colTotals,
    grandTotal,
  };
});

const coachingSummary = computed(() => {
  if (currentTab.value !== "코칭") return null;

  const sd = stats.value.summaryData;
  if (!sd || !sd.labels || !sd.series) return null;

  const labels = sd.labels;

  // 시리즈에서 완료 / 진행중 찾기
  const completedSeries = sd.series.find((s) => s.name === "완료") || {
    data: [],
  };
  const ingSeries = sd.series.find((s) => s.name === "진행중") || { data: [] };

  const completed = labels.map((_, i) =>
    Number(completedSeries.data?.[i] || 0),
  );
  const inProgress = labels.map((_, i) => Number(ingSeries.data?.[i] || 0));

  // 라벨별 완료율
  const rateByLabel = labels.map((_, i) => {
    const done = completed[i];
    const ing = inProgress[i];
    const sum = done + ing;
    return sum > 0 ? Number(((done / sum) * 100).toFixed(1)) : 0;
  });

  // 전체 합계 (백엔드 total 우선 사용)
  const totalCompleted =
    sd.total && sd.total.completed !== undefined
      ? Number(sd.total.completed)
      : completed.reduce((a, b) => a + b, 0);

  const totalInProgress =
    sd.total && sd.total.in_progress !== undefined
      ? Number(sd.total.in_progress)
      : inProgress.reduce((a, b) => a + b, 0);

  const totalAll =
    sd.total && sd.total.all !== undefined
      ? Number(sd.total.all)
      : totalCompleted + totalInProgress;

  const totalRate =
    totalAll > 0 ? Number(((totalCompleted / totalAll) * 100).toFixed(1)) : 0;

  return {
    labels, // ["2021","2022",...]
    completed, // [0,0,0,0,0]
    inProgress, // [0,0,0,0,4]
    rateByLabel, // [0,0,0,0,100] 같은거
    totalCompleted, // 0
    totalInProgress, // 4
    totalAll, // 4
    totalRate, // 0/4 => 0.0 (%)
  };
});

const coachingChartData = computed(() => {
  if (currentTab.value !== "코칭") return { labels: [], series: [] };
  const cd = stats.value.chartData || {};
  return {
    labels: cd.labels || [],
    series: cd.series || [],
  };
});

// ==========================================
// 3-x. 회원 탭용 데이터 가공
// ==========================================
const memberChartData = computed(() => {
  if (currentTab.value !== "회원") {
    return { type: "none", labels: [], values: [], series: [] };
  }

  const cd = stats.value.chartData || {};

  // 대시보드: 단일 시리즈 (labels + values)
  if (sortOrder.value === "dashboard") {
    return {
      type: "single",
      labels: cd.labels || [],
      values: cd.values || [],
      series: [],
    };
  }

  // 성별 / 핸디캡: 멀티 시리즈 (labels + series)
  if (sortOrder.value === "gender" || sortOrder.value === "handicap") {
    return {
      type: "multi",
      labels: cd.labels || [],
      values: [],
      series: cd.series || [],
    };
  }

  // vip 는 차트 없음
  return {
    type: "none",
    labels: [],
    values: [],
    series: [],
  };
});

// ✅ 회원 > 대시보드 summary (단일 라인)
const memberDashboardSummary = computed(() => {
  if (currentTab.value !== "회원" || sortOrder.value !== "dashboard")
    return null;
  const sd = stats.value.summaryData;
  if (!sd) return null;
  return {
    labels: sd.labels || [],
    values: sd.values || [],
    total: sd.total || 0,
  };
});

// ✅ 회원 > 성별 summary
const memberGenderSummary = computed(() => {
  if (currentTab.value !== "회원" || sortOrder.value !== "gender") return null;
  const sd = stats.value.summaryData;
  if (!sd || !sd.labels || !sd.series) return null;

  const labels = sd.labels;
  const series = sd.series; // [{name:'M', data:[...]}, {name:'F', data:[...]}...]
  const colSums = labels.map((_, idx) =>
    series.reduce((sum, s) => sum + Number(s.data?.[idx] || 0), 0),
  );

  return {
    labels,
    series,
    colSums,
    totalAll: sd.totalAll || 0,
    totalByGender: sd.totalByGender || {}, // {M:2, F:1 ...}
  };
});

// ✅ 회원 > 핸디캡 summary
const memberHandicapSummary = computed(() => {
  if (currentTab.value !== "회원" || sortOrder.value !== "handicap")
    return null;
  const sd = stats.value.summaryData;
  if (!sd || !sd.labels || !sd.series) return null;

  const labels = sd.labels;
  const series = sd.series; // [{name:'79이하', data:[...]}, ...]
  const colSums = labels.map((_, idx) =>
    series.reduce((sum, s) => sum + Number(s.data?.[idx] || 0), 0),
  );

  return {
    labels,
    series,
    colSums,
    totalAll: sd.totalAll || 0,
    totalByBucket: sd.totalByBucket || {}, // {79이하:2, 80-89:0, ...}
  };
});

// ✅ 회원 > VIP summary
const memberVipSummary = computed(() => {
  if (currentTab.value !== "회원" || sortOrder.value !== "vip") return null;
  const sd = stats.value.summaryData;
  if (!sd) return null;

  return {
    vipList: sd.vipList || [], // [{nickname, completed, in_progress, total}, ...]
    totalAll: sd.totalAll || 0,
  };
});

// ==========================================
// 4. API 호출 및 Watcher
// ==========================================
const _statslist = async () => {
  let selectedDate = "";

  // 기간별 포맷팅
  if (currentVal.value === "연별" || currentVal.value === "월별") {
    // ✅ 둘 다 연도 기준
    selectedDate = format(targetDate.value, "yyyy");
  } else if (currentVal.value === "일별") {
    // ✅ 일별은 월 기준 (YYYY-MM)
    selectedDate = format(targetDate.value, "yyyy-MM");
  } else {
    selectedDate = format(targetDate.value, "yyyy");
  }

  const payload = {
    sortOrder: sortOrder.value,
    period: currentVal.value, // 공백이면 대시보드 데이터 호출됨
    tab: currentTab.value,
    date: selectedDate,
  };

  try {
    const res = await statsApi._statslist(payload);
    if (res.success) {
      stats.value = res.stats; // API 응답 통째로 저장
    }
  } catch (err) {
    console.error(err);
    // 에러 처리 (필요시 alert)
  }
};

// [중요] 변수 변경 감지하여 자동 호출
watch([currentTab, currentVal, targetDate, sortOrder], () => {
  _statslist();
});

onMounted(() => {
  _statslist();
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/pages/statistics.scss";
</style>
