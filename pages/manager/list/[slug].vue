<template>
    <div class="manager-list detail">
        <div class="detail-wrap">
             <div class="table-wrap">
                <div class="table type02">
                    <table>
                        <colgroup>
                            <col width="18%" />
                            <col width="*" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>
                                    <div class="input-text">
                                        <input aria-label="이름"
                                            type="text"
                                            v-model="form.name"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>
                                    <div class="input-text">
                                        <input aria-label="아이디"
                                            type="text"
                                            v-model="form.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <div class="input-text">
                                        <input aria-label="비밀번호"
                                            type="password"
                                            v-model="form.password"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인</th>
                                <td>
                                    <div class="input-text">
                                        <input aria-label="비밀번호 확인"
                                            type="password"
                                            v-model="form.password_re"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>부서</th>
                                <td>
                                    <div class="select-default">
                                        <select aria-label="부서 선택" v-model="form.part">
                                            <option value="1">관리부</option>
                                            <option value="2">기술연구소</option>
                                            <option value="3">고객지원팀</option>
                                            <option value="4">제조부</option>
                                            <option value="5">해외영업부</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>직급</th>
                                <td>
                                    <div class="select-default">
                                        <select aria-label="직급 선택" v-model="form.position">
                                            <option value="1">사원</option>
                                            <option value="2">대리</option>
                                            <option value="3">과장</option>
                                            <option value="4">팀장</option>
                                            <option value="5">차장</option>
                                            <option value="6">부장</option>
                                            <option value="7">이사</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>휴대폰</th>
                                <td>
                                    <div class="input-text">
                                        <input inputmode="tel" autocomplete="tel" aria-label="휴대폰"
                                            type="text"
                                            v-model="form.phone"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <div class="input-text">
                                        <input aria-label="이메일"
                                            type="text"
                                            v-model="form.email"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>
                                    <div class="select-default">
                                        <select aria-label="상태 선택" v-model="form.status">
                                            <option value="1">사용</option>
                                            <option value="0">대기</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-wrap">
                        <nuxt-link to="/manager/list" class="btn-md-line">목록보기</nuxt-link>
                        <button class="btn-primary-purple btn-md-fill" @click="saveAdmin">저장하기</button>
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

    </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { useManagerApi } from "@/api/manager";
import toastModal from '@/components/toast-ui/toast-modal.vue';

// 2026.06.15[cgnoh]: 라우터 관련 
const route = useRoute();
const { _adminView, _adminUpdate } = useManagerApi();

// 2026.06.15[cgnoh]: 폼 형태
const form = ref({
  name: "",
  id: "",
  password: "",
  password_re: "",
  part: "",
  position: "",
  phone: "",
  email: "",
  status: "",
});

// 2026.06.15[cgnoh]: 상세화면 조회
const getAdminView = async () => {
  try {
    const adminno = route.params.slug;

    const res = await _adminView(adminno);

    if (res.code === 200) {
      const info = res.admininfo || {};

      form.value = {
        ...form.value,
        ...info,
      };
    }
  } catch (err) {
    console.error("관리자 상세조회 실패", err);
  }
};

// 2026.06.15[cgnoh]: 모달 관련
const modals = reactive({});

// 2026.06.15[cgnoh]: 토스트 메시지 관련
const toastMessage = ref();

// 2026.06.04[cgnoh]: 저장 토스트
const openSaveToast = (message) => {
  document.querySelector('body').classList.add('is-hidden');
  modals['toastModal'] = true;
  toastMessage.value = message;
}

// 2026.06.15[cgnoh]: 저장 메서드
const saveAdmin = async () => {
  const res = await _adminUpdate(
    route.params.slug,
    form.value
  );

  if (res.code === 200) {
    openSaveToast("수정되었습니다.");
    navigateTo("/manager/list");
  }
};

onMounted(() => {
  getAdminView();
});

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "default",
});

useHead({
  htmlAttrs: {
    lang: 'ko'
  },
  title: '관리자',
  meta: [
    { name: 'description', content: '관리자 페이지 입니다.' }
  ]
})
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';
</style>