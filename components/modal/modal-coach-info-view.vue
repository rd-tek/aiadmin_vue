<template>
    <div class="modal modal-member-info-view" :class="{ 'is-active' : isOpen }" @click.self="modalClose">
        <div class="modal-container">
            <div class="modal-header">
                <p class="title">코치정보</p>
                <button type="button" class="btn-close" @click="modalClose">
                    <img src="/images/icon/icon_close_grey.png" alt="icon_close_grey">
                </button>
            </div>
            <div class="modal-body">
                <div class="content">
                    <div class="content-desc">
                        <div class="content-desc-row">
                            <p class="title">신장</p>
                            <div class="desc">177cm</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">바닥에서 손목길이</p>
                            <div class="desc">100cm</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">몸무게</p>
                            <div class="desc">77kg</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">핸디캡</p>
                            <div class="desc">
                                <div class="radiobox">
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_00" name="radio_a">
                                            <label for="radio_00">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">-79</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_01" name="radio_a">
                                            <label for="radio_01">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">80-90</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_02" name="radio_a">
                                            <label for="radio_02">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">90-99</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_03" name="radio_a">
                                            <label for="radio_03">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">+100</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">평균드라이버거리</p>
                            <div class="desc">
                                <div class="radiobox">
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_04" name="radio_b">
                                            <label for="radio_04">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">-79</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_05" name="radio_b">
                                            <label for="radio_05">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">80-90</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_06" name="radio_b">
                                            <label for="radio_06">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">90-99</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_07" name="radio_b">
                                            <label for="radio_07">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">+100</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">클럽의 중요성</p>
                            <div class="desc">
                                <div class="radiobox">
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_08" name="radio_c">
                                            <label for="radio_08">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">타구감</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_09" name="radio_c">
                                            <label for="radio_09">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">방향</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="radiobox-list">
                                        <div class="radio-box">
                                            <input type="radio" id="radio_10" name="radio_c">
                                            <label for="radio_10">
                                                <span class="check-box-item">
                                                    <i class="item-line" />
                                                </span>
                                                <span class="check-box-txt">거리</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">선호 샤프트</p>
                            <div class="desc">SR</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">손</p>
                            <div class="desc">23cm</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">중지길이</p>
                            <div class="desc">24cm</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">상의</p>
                            <div class="desc">XL</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">상의</p>
                            <div class="desc">XL</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">하의</p>
                            <div class="desc">38inch</div>
                        </div>
                        <div class="content-desc-row">
                            <p class="title">신발</p>
                            <div class="desc">270mm</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div class="btn-wrap">
                    <button type="button" class="btn-lg-line" @click="modalClose">확인</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: false,
  },
  title: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['update:isOpen']);
const modalClose = () => {
    emit('update:isOpen', false);
    document.querySelector('body').classList.remove('is-hidden');
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/components/modal.scss';
</style>