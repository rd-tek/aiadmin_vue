<template>
  <div
    class="modal modal-recommend-info"
    :class="{ 'is-active': isOpen }"
    @click.self="modalClose"
  >
    <div class="modal-container">
      <div class="modal-header">
        <p class="title">추천정보</p>
        <button type="button" class="btn-close" @click="modalClose" aria-label="닫기">
          <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey" />
        </button>
      </div>
      <div class="modal-body">
        <div class="content">
          <div class="select-default">
            <select v-model="localForm.gender">
              <option value="M">남성</option>
              <option value="F">여성</option>
            </select>
          </div>
          <div class="table-wrap">
            <table class="table type02">
              <colgroup>
                <col width="128px" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
                <col width="*" />
              </colgroup>
              <thead>
                <tr>
                  <th>클럽</th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <select v-model="localForm.club_code[colIndex]">
                        <option
                          v-for="(item, index) in selectList"
                          :key="index"
                          :value="item.value"
                        >
                          {{ item.value }}
                        </option>
                      </select>
                      <div class="btn-wrap">
                        <button
                          type="button"
                          class="btn-remove"
                          @click="handleRemove(colIndex)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <mask
                              id="mask0_508_7984"
                              style="mask-type: alpha"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="25"
                              height="24"
                            >
                              <rect
                                x="0.5"
                                width="24"
                                height="24"
                                fill="#D9D9D9"
                              />
                            </mask>
                            <g mask="url(#mask0_508_7984)">
                              <path
                                d="M7.5 13H17.5V11H7.5V13ZM12.5 22C11.1167 22 9.81667 21.7375 8.6 21.2125C7.38333 20.6875 6.325 19.975 5.425 19.075C4.525 18.175 3.8125 17.1167 3.2875 15.9C2.7625 14.6833 2.5 13.3833 2.5 12C2.5 10.6167 2.7625 9.31667 3.2875 8.1C3.8125 6.88333 4.525 5.825 5.425 4.925C6.325 4.025 7.38333 3.3125 8.6 2.7875C9.81667 2.2625 11.1167 2 12.5 2C13.8833 2 15.1833 2.2625 16.4 2.7875C17.6167 3.3125 18.675 4.025 19.575 4.925C20.475 5.825 21.1875 6.88333 21.7125 8.1C22.2375 9.31667 22.5 10.6167 22.5 12C22.5 13.3833 22.2375 14.6833 21.7125 15.9C21.1875 17.1167 20.475 18.175 19.575 19.075C18.675 19.975 17.6167 20.6875 16.4 21.2125C15.1833 21.7375 13.8833 22 12.5 22ZM12.5 20C14.7333 20 16.625 19.225 18.175 17.675C19.725 16.125 20.5 14.2333 20.5 12C20.5 9.76667 19.725 7.875 18.175 6.325C16.625 4.775 14.7333 4 12.5 4C10.2667 4 8.375 4.775 6.825 6.325C5.275 7.875 4.5 9.76667 4.5 12C4.5 14.2333 5.275 16.125 6.825 17.675C8.375 19.225 10.2667 20 12.5 20Z"
                                fill="#9B9FA3"
                              />
                            </g>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="btn-wrap">
                      <button type="button" class="btn-add" @click="handleAdd" aria-label="추가">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <mask
                            id="mask0_119_25561"
                            style="mask-type: alpha"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                          >
                            <rect width="24" height="24" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_119_25561)">
                            <path
                              d="M11 17H13V13H17V11H13V7H11V11H7V13H11V17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                              fill="#9B9FA3"
                            />
                          </g>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
              <tbody>
                <!-- 핸디캡 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_handicap"
                        v-model="localForm.usehandicap"
                      />
                      <label for="chk_handicap">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">핸디캡</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.handicap_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in handicapOptions"
                            :key="'hmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.handicap_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in handicapOptions"
                            :key="'hmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 중요성 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_important"
                        v-model="localForm.useimportant"
                      />
                      <label for="chk_important">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">중요성</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <select v-model="localForm.important[colIndex]">
                        <option
                          v-for="opt in importantOptions"
                          :key="opt"
                          :value="opt"
                        >
                          {{ opt }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 비거리 (carry) -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_carry"
                        v-model="localForm.usecarry"
                      />
                      <label for="chk_carry">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">비거리</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.carry_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in carryOptions"
                            :key="'cmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.carry_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in carryOptions"
                            :key="'cmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 볼속도 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_ball_speed"
                        v-model="localForm.useballspeed"
                      />
                      <label for="chk_ball_speed">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">볼속도</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.ball_speed_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in ballSpeedOptions"
                            :key="'bsmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.ball_speed_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in ballSpeedOptions"
                            :key="'bsmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 볼방향 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_ball_dir"
                        v-model="localForm.useballdir"
                      />
                      <label for="chk_ball_dir">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">볼방향</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.ball_dir_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in ballDirOptions"
                            :key="'bdmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.ball_dir_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in ballDirOptions"
                            :key="'bdmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 이격거리 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_offset"
                        v-model="localForm.useoffline"
                      />
                      <label for="chk_offset">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">이격거리</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.offline_dist_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in offsetOptions"
                            :key="'odmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.offline_dist_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in offsetOptions"
                            :key="'odmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 탈출각 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_launch"
                        v-model="localForm.uselaunch"
                      />
                      <label for="chk_launch">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">탈출각</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.launch_angle_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in launchAngleOptions"
                            :key="'lamin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.launch_angle_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in launchAngleOptions"
                            :key="'lamax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 백스핀 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_backspin"
                        v-model="localForm.usebackspin"
                      />
                      <label for="chk_backspin">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">백스핀</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.backspin_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in spinOptions"
                            :key="'bsmin2' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.backspin_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in spinOptions"
                            :key="'bsmax2' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 사이드스핀 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_sidespin"
                        v-model="localForm.usesidespin"
                      />
                      <label for="chk_sidespin">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">사이드스핀</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <div class="select-default-list">
                        <select v-model="localForm.sidespin_min[colIndex]">
                          <option disabled value="">최소</option>
                          <option
                            v-for="v in spinOptions"
                            :key="'ssmin' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                      <div class="select-default-list">
                        <select v-model="localForm.sidespin_max[colIndex]">
                          <option disabled value="">최대</option>
                          <option
                            v-for="v in spinOptions"
                            :key="'ssmax' + v"
                            :value="v"
                          >
                            {{ v }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>

                <!-- 구질 -->
                <tr>
                  <th>
                    <div class="check-box">
                      <input
                        type="checkbox"
                        id="chk_shotshape"
                        v-model="localForm.useshotshape"
                      />
                      <label for="chk_shotshape">
                        <span class="check-box-item">
                          <i class="item-line" />
                        </span>
                        <span class="check-box-txt">구질</span>
                      </label>
                    </div>
                  </th>
                  <td v-for="(col, colIndex) in colList" :key="col.id">
                    <div class="select-default">
                      <select v-model="localForm.shot_shape[colIndex]">
                        <option
                          v-for="opt in shotShapeOptions"
                          :key="opt"
                          :value="opt"
                        >
                          {{ opt }}
                        </option>
                      </select>
                    </div>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-wrap">
          <button type="button" class="btn-lg-line" @click="handleConfirm">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:isOpen", "update:form"]);

const handleConfirm = () => {
  // 🔥 여기서만 부모로 값 올림
  emit("update:form", localForm.value);

  modalClose();
};

const modalClose = () => {
  emit("update:isOpen", false);
  document.querySelector("body").classList.remove("is-hidden");
};

const selectList = ref([
  {
    value: "DR",
  },
  {
    value: "W3",
  },
  {
    value: "W4",
  },
  {
    value: "W5",
  },
  {
    value: "U3",
  },
  {
    value: "U4",
  },
  {
    value: "U5",
  },
  {
    value: "I3",
  },
  {
    value: "I4",
  },
  {
    value: "I5",
  },
  {
    value: "I6",
  },
  {
    value: "I7",
  },
  {
    value: "I8",
  },
  {
    value: "I9",
  },
  {
    value: "PW",
  },
  {
    value: "GW",
  },
  {
    value: "SW",
  },
]);

// 컬럼 수 관리
const colList = ref([
  { id: 1, value: "DR" },
  { id: 2, value: "DR" },
]);

const importantOptions = ["타구감", "방향", "거리"];
const shotShapeOptions = [
  "풀 훅",
  "풀 스트레이트",
  "풀 슬라이스",
  "훅",
  "스트레이트",
  "슬라이스",
  "푸시 훅",
  "푸시 스트레이트",
  "푸시 슬라이스",
];

const handicapOptions = [0, 5, 10, 15, 20, 25, 30, 36];
const carryOptions = [100, 150, 170, 190, 210, 230, 250, 270, 290];
const ballSpeedOptions = [30, 35, 40, 45, 50, 55, 60, 65];
const ballDirOptions = [-20, -10, -5, 0, 5, 10, 20];
const offsetOptions = [0, 2, 5, 10, 15, 20];
const launchAngleOptions = [5, 8, 10, 12, 14, 16, 18];
const spinOptions = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

// 컬럼 추가
const handleAdd = () => {
  const newId = Date.now();
  colList.value.push({ id: newId, value: "DR" });
  extendFormArraysForNewColumn();
};

const handleRemove = (colIndex) => {
  if (colList.value.length > 1) {
    colList.value.splice(colIndex, 1);
    removeFormColumnAt(colIndex);
  }
};
const createDefaultForm = () => ({
  gender: "M", // ⬅ 셀렉트 옵션값(M/F)에 맞게 변경

  usehandicap: true,
  useimportant: true,
  usecarry: true,
  useballspeed: true,
  useballdir: true,
  useoffline: true, // ⬅ useoffset → useoffline 로 통일
  uselaunch: true,
  usebackspin: true,
  usesidespin: true,
  useshotshape: true,

  club_code: ["DR", "DR"], // ⬅ 템플릿의 localForm.club_code[colIndex] 에 맞게 이름 변경
  important: ["타구감", "타구감"],

  handicap_min: ["", ""],
  handicap_max: ["", ""],
  carry_min: ["", ""],
  carry_max: ["", ""],
  ball_speed_min: ["", ""],
  ball_speed_max: ["", ""],
  ball_dir_min: ["", ""],
  ball_dir_max: ["", ""],

  // ⬇ 템플릿의 offline_dist_min / offline_dist_max 이름에 맞게 수정
  offline_dist_min: ["", ""],
  offline_dist_max: ["", ""],

  launch_angle_min: ["", ""],
  launch_angle_max: ["", ""],
  backspin_min: ["", ""],
  backspin_max: ["", ""],
  sidespin_min: ["", ""],
  sidespin_max: ["", ""],
  shot_shape: ["스트레이트", "스트레이트"],
});

const localForm = ref(createDefaultForm());
// 공통: 새 컬럼 추가시 form 배열도 같이 확장
const extendFormArraysForNewColumn = () => {
  const f = localForm.value;

  const pushEmpty = (key, defaultValue = "") => {
    if (!Array.isArray(f[key])) f[key] = [];
    f[key].push(defaultValue);
  };

  pushEmpty("club_code", "DR"); // clubs → club_code
  pushEmpty("important", "타구감");
  pushEmpty("handicap_min");
  pushEmpty("handicap_max");
  pushEmpty("carry_min");
  pushEmpty("carry_max");
  pushEmpty("ball_speed_min");
  pushEmpty("ball_speed_max");
  pushEmpty("ball_dir_min");
  pushEmpty("ball_dir_max");
  pushEmpty("offline_dist_min"); // offset_distance_* → offline_dist_*
  pushEmpty("offline_dist_max");
  pushEmpty("launch_angle_min");
  pushEmpty("launch_angle_max");
  pushEmpty("backspin_min");
  pushEmpty("backspin_max");
  pushEmpty("sidespin_min");
  pushEmpty("sidespin_max");
  pushEmpty("shot_shape", "스트레이트");
};

// 공통: 컬럼 삭제시 해당 인덱스 데이터도 제거
const removeFormColumnAt = (index) => {
  const f = localForm.value;

  const spliceAt = (key) => {
    if (Array.isArray(f[key])) {
      f[key].splice(index, 1);
    }
  };

  spliceAt("club_code"); // clubs → club_code
  spliceAt("important");
  spliceAt("handicap_min");
  spliceAt("handicap_max");
  spliceAt("carry_min");
  spliceAt("carry_max");
  spliceAt("ball_speed_min");
  spliceAt("ball_speed_max");
  spliceAt("ball_dir_min");
  spliceAt("ball_dir_max");
  spliceAt("offline_dist_min"); // offset_distance_* → offline_dist_*
  spliceAt("offline_dist_max");
  spliceAt("launch_angle_min");
  spliceAt("launch_angle_max");
  spliceAt("backspin_min");
  spliceAt("backspin_max");
  spliceAt("sidespin_min");
  spliceAt("sidespin_max");
  spliceAt("shot_shape");
};

watch(
  () => props.form,
  (val) => {
    if (val && Object.keys(val).length > 0) {
      // 부모에 기존 값 있으면 그걸로 세팅 (기본값이랑 머지)
      localForm.value = { ...createDefaultForm(), ...val };
    } else {
      // 없으면 기본값
      localForm.value = createDefaultForm();
    }
  },
  { immediate: true, deep: false },
);

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
})

onUnmounted(() => {
    window.addEventListener("keydown", (e) => {
    if(e.key === "Escape") {
      modalClose();
    }
  });
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/components/modal.scss";
</style>
