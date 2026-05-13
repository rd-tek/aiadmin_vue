<template>
    <div class="membership-member write">
        <div class="write-wrap">
            <div class="table-wrap">
                <div class="table type02">
                    <table>
                        <colgroup>
                            <col width="18%" />
                            <col width="*" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>상태 <span class="required"></span></th>
                                <td>
                                    <div class="select-default">
                                        <select>
                                            <option>정상</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>회원 ID <span class="required"></span></th>
                                <td>
                                    <div class="input-wrap">
                                        <div class="input-text">
                                            <input type="text">
                                        </div>
                                        <button type="button" class="btn-md-line">중복체크</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>비밀번호 <span class="required"></span></th>
                                <td>
                                    <div class="input-text">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>매장명 <span class="required"></span></th>
                                <td>
                                    <div class="input-wrap">
                                        <div class="input-text">
                                            <input type="text">
                                        </div>
                                        <button type="button" class="btn-md-line">중복체크</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일 <span class="required"></span></th>
                                <td>
                                    <div class="input-wrap">
                                        <div class="input-text">
                                            <input type="text">
                                        </div>
                                        <button type="button" class="btn-md-line">중복체크</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>인증</th>
                                <td>
                                    인증
                                </td>
                            </tr>
                            <tr>
                                <th>매장 타입 <span class="required"></span></th>
                                <td>
                                    <div class="select-default">
                                        <select>
                                            <option>직영매장</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>세팅</th>
                                <td>
                                    <div class="input-wrap flex-column">
                                        <span>페어웨이</span>
                                        <div class="select-wrap flex-column">
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
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>이메일 수신</th>
                                <td>
                                    <div class="check-box">
                                        <input type="checkbox" id="chk_01" name="chk_01">
                                        <label for="chk_01">
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
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <div class="input-wrap mb-10">
                                        <div class="input-text">
                                            <input type="text">
                                        </div>
                                        <button type="button" class="btn-md-line">주소찾기</button>
                                    </div>
                                    <div class="input-text mb-10 m-w-100">
                                        <input type="text">
                                    </div>
                                    <div class="input-text m-w-100">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>전화번호</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>팩스</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>홈페이지</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>장비 수</th>
                                <td>
                                    <div class="select-default">
                                        <select>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>기타정보</th>
                                <td>
                                    <div class="input-text">
                                        <input type="text">
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>라커 수</th>
                                <td>
                                    <div class="select-default">
                                        <select>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="btn-wrap">
                        <button type="button" class="btn-md-line">목록 보기</button>
                        <button type="button" class="btn-md-fill btn-primary-purple">저장하기</button>
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
@use '@/assets/scss/pages/membership.scss';
</style>