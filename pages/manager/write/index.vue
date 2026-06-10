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
                                        <input
                                            type="text"
                                            placeholder="관리자 테스트"
                                            v-model="form.name"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>
                                    <div class="input-text">
                                        <input
                                            type="text"
                                            placeholder="아이디"
                                            v-model="form.id"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <div class="input-text">
                                        <input
                                            type="password"
                                            placeholder="비밀번호"
                                            v-model="form.password"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인</th>
                                <td>
                                    <div class="input-text">
                                        <input
                                            type="password"
                                            placeholder="비밀번호 확인"
                                            v-model="form.password_re"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>부서</th>
                                <td>
                                    <div class="select-default">
                                        <select v-model="form.part">
                                            <option value="1">개발팀</option>
                                            <option value="2">기획팀</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>직책</th>
                                <td>
                                    <div class="select-default">
                                        <select v-model="form.position">
                                            <option value="1">사원</option>
                                            <option value="2">대리</option>
                                            <option value="3">과장</option>
                                            <option value="4">차장</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>핸드폰</th>
                                <td>
                                    <div class="input-text">
                                        <input
                                            type="text"
                                            placeholder="010-0000-0000"
                                            v-model="form.phone"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <div class="input-text">
                                        <input
                                            type="text"
                                            placeholder="abc@example.com"
                                            v-model="form.email"
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>
                                    <div class="input-text">
                                        <select v-model="form.status">
                                            <option value="1">정상</option>
                                            <option value="2">대기</option>
                                            <option value="3">중지</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-wrap">
                        <nuxt-link to="/manager/list" class="btn-md-line">목록보기</nuxt-link>
                        <button
                            type="button"
                            class="btn-primary-purple btn-md-fill"
                            @click="saveAdmin"
                            >
                            저장
                        </button>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script setup>
import { useManagerApi } from "@/api/manager";

const { _adminWrite } = useManagerApi();

const form = ref({
  name: "",
  id: "",
  password: "",
  password_re: "",
  part: "1",
  position: "1",
  phone: "",
  mail: "",
  status: "1",
});

const saveAdmin = async () => {
  try {
    if (!form.value.name) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!form.value.id) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (!form.value.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (form.value.password !== form.value.password_re) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const res = await _adminWrite(form.value);

    if (res.code === 200) {
      alert("등록되었습니다.");
      navigateTo("/manager/list");
    } else {
      alert(res.message || "등록에 실패했습니다.");
    }
  } catch (err) {
    console.error(err);
    alert("등록 중 오류가 발생했습니다.");
  }
};

definePageMeta({
  layout: "default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';
</style>