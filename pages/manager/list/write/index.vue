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
                                        <input type="text" placeholder="관리자 테스트" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>아이디</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="아이디" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td>
                                    <div class="input-text">
                                        <input type="password" placeholder="비밀번호" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 확인</th>
                                <td>
                                    <div class="input-text">
                                        <input type="password" placeholder="비밀번호 확인" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>부서</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="부서" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>직책</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="직책" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>핸드폰</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="010-000-0000" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="abc@example.com" />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>상태</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text" placeholder="상태" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-wrap">
                        <nuxt-link to="/publish/manager/list" class="btn-md-line">목록보기</nuxt-link>
                        <button class="btn-primary-purple btn-md-fill">저장</button>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script setup>
// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/manager.scss';
</style>