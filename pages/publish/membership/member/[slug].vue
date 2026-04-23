<template>
    <div class="membership-memeber detail">
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
                      <div class="select-default">
                        <select>
                          <option>정상</option>
                        </select>
                      </div>
                    </td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td>charles</td>
                </tr>
                <tr>
                    <th>닉네임</th>
                    <td>황금마차</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>홍길동</td>
                </tr>
                <tr>
                    <th>핸드폰</th>
                    <td>010-1234-1234</td>
                </tr>
                <tr>
                    <th>이메일</th>
                    <td>charles@xgolf.com.au</td>
                </tr>
                <tr>
                    <th>인증</th>
                    <td>인증</td>
                </tr>
                <tr>
                    <th>이메일 수신</th>
                    <td>동의</td>
                </tr>
                <tr>
                    <th>성별</th>
                    <td>남성</td>
                </tr>
                <tr>
                    <th>손잡이</th>
                    <td>오른손</td>
                </tr>
                <tr>
                    <th>티높이</th>
                    <td>50mm</td>
                </tr>
                <tr>
                  <th>세팅</th>
                  <td>
                    <div class="select-wrap">
                      <div class="select-default">
                        <select>
                          <option>M</option>
                        </select>
                      </div>
                      <div class="select-default">
                        <select>
                          <option>M</option>
                        </select>
                      </div>
                      <div class="select-default">
                        <select>
                          <option>km/h</option>
                        </select>
                      </div>
                    </div>
                  </td>
                </tr>
            </tbody>
          </table>
          <div class="btn-wrap">
            <button type="button" class="btn-md-line" @click="handleList">목록보기</button>
            <button type="button" class="btn-primary-purple btn-md-fill">저장</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useIntersectionObserver } from "@vueuse/core";

const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

const router = useRouter();
const handleList = () => {
  router.push('/publish/membership/member');
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/membership.scss';
</style>