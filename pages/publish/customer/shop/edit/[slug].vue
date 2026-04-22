<template>
    <div class="customer-member edit">
      <div class="table-wrap">
        <div class="table type02">
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
                          <option>공지</option>
                        </select>
                      </div>
                    </td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td>
                        <div class="input-text">
                            <input type="text" placeholder="제목을 입력해주세요.">
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>게시</th>
                    <td>
                        <div class="checkbox">
                            <div class="checkbox-list">
                                <div class="check-box">
                                    <input type="checkbox" id="chk_0" name="chk_0">
                                    <label for="chk_0">
                                        <span class="check-box-item">
                                            <i class="item-line" />
                                        </span>
                                        <span class="check-box-txt">게시</span>
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
                                        <span class="check-box-txt">상단에 표시</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td>
                        <div class="textarea">
                            <textarea placeholder="한글 100자 3줄 까지 입력가능 합니다."></textarea>
                        </div>
                        <div class="input-wrap">
                            <div class="input-text">
                                <input type="text" placeholder="선택해 주세요.">
                                <button type="button" class="btn-file">파일선택</button>
                            </div>
                        </div>
                        <div class="desc">
                            <div class="desc-list">* 파일 총 용량은 최대 26MB까지(파일당 최대 4MB 등록 가능)</div>
                            <div class="desc-list">* JPG, JPEG, PNG, ZIP 유형만 가능</div>
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

const router = useRouter();
const handleList = () => {
  router.push('/publish/customer/shop');
}

// 2026.03.04[cgnoh]: 페이지 메타 정보
definePageMeta({
  layout: "publish-default",
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/pages/customer.scss';
</style>