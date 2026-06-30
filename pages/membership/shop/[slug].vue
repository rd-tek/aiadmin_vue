<template>
    <div class="membership-member write">
      <div class="write-wrap">
        <div class="table-wrap">
          <div class="table type02" :class="{ 'is-move': tableMove }" ref="tableRef">
            <table>
              <colgroup>
                  <col width="18%">
                  <col width="*">
              </colgroup>
              <tbody>
                  <tr>
                      <th>상태 <span class="required"></span></th>
                      <td>
                        <div class="select-default m-w-100">
                          <select v-model="ownerinfo.status">
                            <option value="1">정상</option>
                            <option value="2">정지</option>
                          </select>
                        </div>
                      </td>
                  </tr> 
                  <tr>
                    <th>회원 ID <span class="required"></span></th>
                    <td>
                      <div class="input-wrap">
                        <div class="input-text">
                          <input type="text" v-model="ownerinfo.id">
                        </div>
                        
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <div class="input-text">
                        <input type="text">
                      </div>
                    </td>
                  </tr>
                  <tr>
                      <th>매장명<span class="required"></span></th>
                      <td>
                        <div class="input-wrap">
                          <div class="input-text">
                            <input type="text" v-model="ownerinfo.shopname">
                          </div>
                          <button type="button" class="btn-md-line" @click="checkDuplicate(2, ownerinfo.shopname)">중복체크</button>
                        </div>
                      </td>
                  </tr>
                  <tr>
                    <th>이메일 <span class="required"></span></th>
                    <td>
                      <div class="input-wrap">
                        <div class="input-text">
                          <input type="text" v-model="ownerinfo.email">
                        </div>
                        <button type="button" class="btn-md-line" @click="checkDuplicate(3, ownerinfo.email)">중복체크</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>인증</th>
                    <td>{{ ownerinfo.auth === '1' ? '인증' : '미인증' }}</td>
                  </tr>
                  <tr>
                    <th>매장 타입 <span class="required"></span></th>
                    <td>
                      <div class="select-default">
                        <select>
                          <option>합계</option>
                          <option>프랜차이즈</option>
                          <option>직영점</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>세팅 <span class="required"></span></th>
                    <td>
                      <div class="input-wrap">
                        <div class="select-wrap flex-start">
                          <div class="select-default">
                              <select>
                                  <option value="" disabled>페어웨이</option>
                                  <option value="1">M</option>
                                  <option value="2">Yard</option>
                                  <option value="3">Feet</option>
                              </select>
                          </div>
                          <div class="select-default">
                              <select>
                                  <option value="" disabled>Green</option>
                                  <option value="1">M</option>
                                  <option value="2">Yard</option>
                                  <option value="3">Feet</option>
                              </select>
                          </div>
                          <div class="select-default">
                              <select>
                                  <option value="" disabled>Speed</option>
                                  <option value="1">km/h</option>
                                  <option value="2">mile/h</option>
                                  <option value="3">m/s</option>
                              </select>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>이메일 수신</th>
                    <td>
                      <div class="check-box">
                          <input type="checkbox" id="chk_02" name="chk_02" v-model="ownerinfo.emailagree">
                          <label for="chk_02">
                              <span class="check-box-item">
                                  <i class="item-line" />
                              </span>
                              <span class="check-box-txt">동의</span>
                          </label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                      <th>대표자 <span class="required"></span></th>
                      <td>
                        <div class="input-text">
                          <input type="text" v-model="ownerinfo.firstname">
                        </div>
                      </td>
                  </tr>
                  <tr>
                    <th>주소 <span class="required"></span></th>
                    <td>
                        <div class="input-wrap mb-10">
                            <div class="input-text">
                                <input type="text" v-model="ownerinfo.zipcode">
                            </div>
                            <button type="button" class="btn-md-line"  @click="openAddressSearch">주소찾기</button>
                        </div>
                        <div class="input-text mb-10 m-w-100">
                            <input type="text" v-model="ownerinfo.address1">
                        </div>
                        <div class="input-text m-w-100">
                            <input type="text" v-model="ownerinfo.address2">
                        </div>
                    </td>
                  </tr>
                  <tr>
                      <th>전화번호 <span class="required"></span></th>
                      <td>
                        <div class="input-text">
                          <input type="text" v-model="ownerinfo.phone">
                        </div>
                      </td>
                  </tr>
                  <tr>
                    <th>팩스</th>
                    <td>
                      <div class="input-text">
                        <input type="text" v-model="ownerinfo.fax">
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>홈페이지</th>
                    <td>
                      <div class="input-text">
                        <input type="text" v-model="ownerinfo.website">
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>장비 수</th>
                    <td>
                      <div class="input-text">
                        <input type="text" v-model="ownerinfo.roomcnt">
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>기타정보</th>
                    <td>
                      <div class="input-text">
                        <input type="text" v-model="ownerinfo.etcinfo">
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>라커 수</th>
                    <td>
                      <div class="input-text">
                        <input type="text" v-model="ownerinfo.lockercnt">
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
            <div class="btn-wrap">
              <button type="button" class="btn-md-line" @click="handleList">목록보기</button>
              <button type="button" class="btn-primary-purple btn-md-fill" @click="handleSave">저장</button>
            </div>
          </div>
        </div>
      </div>

    <!-- 토스트 알림 모달 -->
    <toast-modal
      :isOpen="modals.toastModal"
      :toastMessage="toastMessage"
      @update:isOpen="modals.toastModal = $event"
    />

    <!-- 토스트 경고 모달 -->
    <toast-warn-modal 
      :isOpen="modals.toastWarnModal"
      :toastWarnMessage="toastWarnMessage"
      @update:isOpen="modals.toastWarnModal = $event"/>

    <!-- 토스트 에러 모달 -->
    <toast-error-modal 
      :isOpen="modals.toastErrorModal"
      :toastErrorMessage="toastErrorMessage"
      @update:isOpen="modals.toastErrorModal = $event"/>

    </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";
import { useMembersApi } from "~/api/member";
import toastModal from '@/components/toast-ui/toast-modal.vue';
import toastWarnModal from '@/components/toast-ui/toast-warn-modal.vue';
import toastErrorModal from '@/components/toast-ui/toast-error-modal.vue';

// 2026.06.12[cgnoh]: api 관련
const membersApi = useMembersApi();

// 2026.06.12[cgnoh]: 라우터 관련
const router = useRouter();
const route = useRoute();

// 2026.06.12[cgnoh]: 회원 정보 조회
const ownerinfo = ref({});

// 2026.06.12[cgnoh]: 상세 정보 조회
const getDetail = async () => {
  try {
    const ownerno = route.params.slug;
    const res = await membersApi._ownerview(ownerno);

    console.log("상세조회", res);

    if (res.code !== 200) {
      console.error(res.message);
      return;
    }
    
    ownerinfo.value = {
      ...res.ownerinfo,
      ownerno,
      emailagree: res.ownerinfo.emailagree === "1",
    };
    

    console.log("ownerinfo", ownerinfo.value);
  } catch (err) {
    console.error("매장회원 상세 조회 실패:", err);
  }
};

// 2026.05.22[cgnoh]: 인터렉션 관련
const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.05.22[cgnoh]: 목록보기 이벤트
const handleList = () => {
  router.push('/membership/shop');
}

// 2026.05.22[cgnoh]: 모달 토스트 관련
const modals = reactive({});
const toastMessage = ref();
const toastWarnMessage = ref();
const toastErrorMessage = ref();

// 2026.06.04[cgnoh]: 저장 토스트
const openSaveToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 2026.06.04[cgnoh]: 경고 토스트
const openWarnToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastWarnModal'] = true;
  toastWarnMessage.value = message;
}

// 2026.06.04[cgnoh]: 에러 토스트
const openErrorToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastErrorModal'] = true;
  toastErrorMessage.value = message;
}

// 2026.06.04[cgnoh]: 저장 핸들링
const handleSave = async () => {
  try {
    const res = await membersApi._owneredit(
      ownerinfo.value.ownerno,
      ownerinfo.value
    );
    if (res?.code === 200) {
      openSaveToast("저장되었습니다.");
      await getDetail();
    } else {
      openWarnToast(res?.message || "저장 실패");
    }
  } catch (err) {
    console.error(err);
    openErrorToast("저장 중 오류가 발생했습니다.");
  }
};

// 2026.06.04[cgnoh]: 중복 체크 핸들링
const checkDuplicate = (type, field) => {
  const value = field?.trim();
  const ownerno = route?.params?.slug ?? null;
  if (!value) {
    openWarnToast("값을 입력해주세요.");
    return;
  }

  // 아이디만 정규식 검사
  if (type === 1) {
    const idRegex = /^[a-zA-Z0-9_]+$/;

    if (!idRegex.test(value)) {
      openErrorToast(
        "ID 항목은 알파벳, 숫자, 언더바(_)만 입력 가능합니다."
      );
      return;
    }
  }

  // 이메일 형식 검사
  if (type === 3) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      openErrorToast("올바른 이메일 형식이 아닙니다.");
      return;
    }
  }

  membersApi._availabilityCheck({type, value, ownerno}, (success, data) => {
    if (success) {
      switch (type) {
        case 1:
          openSaveToast("사용 가능한 회원 ID입니다.");
          break;
        case 2:
          openSaveToast("사용 가능한 매장명입니다.");
          break;
        case 3:
          openSaveToast("사용 가능한 이메일입니다.");
          break;
      }
    } else {
      openErrorToast(data?.message || "이미 사용 중입니다.");
    }
  });
};

// 2026.06.04[cgnoh]: 카카오 주소 검색
const loadKakaoPostcode = () => {
  return new Promise((resolve) => {
    if (window.daum?.Postcode) return resolve();
    const script  = document.createElement("script");
    script.src    = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

// 2026.06.04[cgnoh]: 주소 검색 핸들링
const openAddressSearch = async () => {
  await loadKakaoPostcode();

  new window.daum.Postcode({
    oncomplete: async (data) => {
      var roadAddr      = data.roadAddress;
      var extraRoadAddr = "";

      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr += extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      if (extraRoadAddr !== "") {
        extraRoadAddr = " (" + extraRoadAddr + ")";
      }

      form.value.zipcode  = data.zonecode;
      form.value.address1 = roadAddr;
      form.value.address2 = data.jibunAddress;

      await geocodeAddress(roadAddr || data.jibunAddress);
    },
  }).open();
};

onMounted(async () => {
  await getDetail();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '매장회원',
  meta: [
    { name: 'description', content: '매장회원 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>
