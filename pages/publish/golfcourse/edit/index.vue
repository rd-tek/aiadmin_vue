<template>
    <div class="golf-course edit">
        <div class="table-wrap">
            <div class="table type02" :class="{ 'is-move': tableMove }" ref="tableRef">
                <table>
                    <colgroup>
                        <col width="18%">
                        <col width="*">
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>코스명</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="XG드래곤밸리">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>코드</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="C_1000">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>홀 수</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="18">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>파 수</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="72">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 수</th>
                            <td>
                                <div class="select-default">
                                    <select>
                                        <option>2</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 1</th>
                            <td>
                                <div class="course-wrap">
                                    <div class="input-text">
                                        <input type="text" value="Hill course">
                                    </div>
                                    <div class="table-area type02">
                                        <div class="table-list">
                                            <div class="table-wrap">
                                                <table class="table type02">
                                                    <tbody>
                                                        <tr>
                                                            <th>홀</th>
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>4</td>
                                                            <td>5</td>
                                                            <td>6</td>
                                                            <td>7</td>
                                                            <td>8</td>
                                                            <td>9</td>
                                                            <td>합계</td>
                                                        </tr>
                                                        <tr>
                                                            <th>파</th>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>핸디캡</th>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>서브 코스 2</th>
                            <td>
                                <div class="course-wrap">
                                    <div class="input-text">
                                        <input type="text" value="Hill course">
                                    </div>
                                    <div class="table-area type02">
                                        <div class="table-list">
                                            <div class="table-wrap">
                                                <table class="table type02">
                                                    <tbody>
                                                        <tr>
                                                            <th>홀</th>
                                                            <td>1</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>4</td>
                                                            <td>5</td>
                                                            <td>6</td>
                                                            <td>7</td>
                                                            <td>8</td>
                                                            <td>9</td>
                                                            <td>합계</td>
                                                        </tr>
                                                        <tr>
                                                            <th>파</th>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>핸디캡</th>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="input-text">
                                                                    <input type="text" value="32" disabled>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <div class="input-wrap">
                                    <div class="input-text">
                                        <input type="text" placeholder="선택해 주세요.">
                                    </div>
                                    <button type="button" class="btn-file">파일선택</button>
                                </div>
                                <div class="desc">
                                    <div class="desc-list">* 파일 총 용량은 최대 26MB까지 (파일당 최대 4MB 등록 가능)</div>
                                    <div class="desc-list">* JPG, JPEG, PNG, ZIP 유형만 가능</div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>닉네임</th>
                            <td>
                                <div class="checkbox-list">
                                    <div class="check-box">
                                        <input type="checkbox" id="chk_0" name="chk_0">
                                        <label for="chk_0">
                                            <span class="check-box-item">
                                                <i class="item-line" />
                                            </span>
                                            <span class="check-box-txt">사용</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="checkbox-list">
                                    <div class="check-box">
                                        <input type="checkbox" id="chk_1" name="chk_1">
                                        <label for="chk_1">
                                            <span class="check-box-item">
                                                <i class="item-line" />
                                            </span>
                                            <span class="check-box-txt">표시</span>
                                        </label>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <div class="select-wrap">
                                    <div class="select-list">
                                        <span class="label">필드</span>
                                        <div class="select-default">
                                            <select>
                                                <option>2</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="select-list">
                                        <span class="label">그린</span>
                                        <div class="select-default">
                                            <select>
                                                <option>2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>지역</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="포천시">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>국가</th>
                            <td>
                                <div class="select-default m-w-100">
                                    <select>
                                        <option>대한민국</option>
                                    </select>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>설명</th>
                            <td>
                                <div class="input-text">
                                    <input type="text" value="코스에 대한 설명">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn-wrap">
                <nuxt-link to="/publish/golfcourse/list" class="btn-md-line">목록 보기</nuxt-link>
                <button type="button" class="btn-md-fill btn-primary-purple">저장하기</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useIntersectionObserver } from "@vueuse/core";

const tableRef  = ref();
const tableMove = ref(false);
useIntersectionObserver(tableRef, ([{ isIntersecting }]) => {
    if (isIntersecting) tableMove.value = true;
}, { threshold: 0 });

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/golf-course.scss';
</style>