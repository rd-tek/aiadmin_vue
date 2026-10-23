<template>
    <div class="membership-member detail">
      <div class="table-wrap">
        <div class="table type02" :class="{ 'is-move': tableMove }" ref="tableRef">
          <table>
            <colgroup>
                <col width="18%">
                <col width="*">
            </colgroup>
            <tbody>
                <tr>
                    <th>상태</th>
                    <td>
                      <div class="select-default m-w-100">
                        <select aria-label="상태 선택" v-model="playerInfo.status">
                          <option value="1">정상</option>
                          <option value="2">탈퇴</option>
                        </select>
                      </div>
                    </td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td>{{ playerInfo.id }}</td>
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td>{{ playerInfo.nickname }}</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>{{ [playerInfo.firstname, playerInfo.lastname].filter(v => v && v !== 'null' && v !== 'undefined').join(' ') || '-' }}</td>
                </tr>
                <tr>
                    <th>핸드폰</th>
                    <td>{{ playerInfo.handphone || '-' }}</td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>
                      <span :class="{ 'text-underline color-blue': playerInfo.email }">{{ playerInfo.email || '-' }}</span>
                    </td>
                </tr>
                <tr>
                    <th>인증</th>
                    <td>{{ playerInfo.auth === '1' ? '인증' : '미인증' }}</td>
                </tr>
                <tr>
                    <th>이메일 수신</th>
                    <td>{{ playerInfo.emailagree === '1' ? '동의' : '미동의' }}</td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td>{{ playerInfo.gender === 'M' ? '남성' : '여성' }}</td>
                </tr>
                <tr>
                    <th>손잡이</th>
                    <td>{{ playerInfo.handrl === 'R' ? '오른손' : '왼손' }}</td>
                </tr>
                <tr>
                    <th>티높이</th>
                    <td>{{ playerInfo.teeheight }}mm</td>
                </tr>
                <tr>
                  <th>세팅</th>
                  <td>
                    <div class="select-wrap flex-column">
                      <div class="select-default"><!-- 2026-10-23: 항목명 한국어(매장회원 화면과 같게) -->페어웨이 거리 : <b>{{ distUnit(playerInfo.fieldunit) }}</b></div>
                      <div class="select-default">그린 거리 : <b>{{ distUnit(playerInfo.greenunit) }}</b></div>
                      <div class="select-default">스피드 : <b>{{ speedUnit(playerInfo.speedunit) }}</b></div>
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
const playerInfo = ref({});

// 2026-09-14: 세팅 단위 코드→라벨 (정본=매장 등록 폼 select 옵션: field/green 1=M/2=Yard/3=Feet, speed 1=km/h/2=mile/h/3=m/s)
const distUnit = (v) => ({ "1": "M", "2": "Yard", "3": "Feet" }[String(v)] ?? "-");
const speedUnit = (v) => ({ "1": "km/h", "2": "mile/h", "3": "m/s" }[String(v)] ?? "-");

// 2026.06.12[cgnoh]: 상세 정보 조회
const getDetail = async () => {
  try {
    const playerPk = route.params.slug;
    const res = await membersApi._playerview(playerPk);
    const selected = res?.memberinfo;

    if (!selected) {
      console.error("memberinfo가 없습니다.", res);
      return;
    }

    playerInfo.value = {
      ...selected,
      player_pk: playerPk,
    };
  } catch (err) {
    console.error("상세 조회 실패:", err);
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
  router.push('/membership/member');
}

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
    const res = await membersApi._playeredit(
      playerInfo.value.player_pk,
      playerInfo.value
    );
    if (res?.success || res?.code === 200) {
      openSaveToast('저장되었습니다.');
      await getDetail();
    } else {
      openWarnToast(res?.message || "저장에 실패했습니다.");
    }
  } catch (err) {
    console.error("저장 실패:", err);
    openErrorToast("저장 중 오류가 발생했습니다.");
  }
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
  title: '일반회원',
  meta: [
    { name: 'description', content: '일반회원 페이지 입니다.' }
  ]
})

</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>
