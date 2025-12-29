<template>
    <transition name="toast-fade">
        <div class="toast-modal toast-modal-alarm" :class="{ 'is-active': isOpen }" ref="toastRef">
            <div class="toast-modal-body">
                <div class="icon-area">
                    <i class="icon">
                        <img src="/images/icon/icon_confirm.png" alt="icon_confirm" />
                    </i>
                </div>
                <div class="cont-area">
                    {{ toastMessage }}
                </div>
                <button type="button" class="btn-primary-grey btn-md-fill" @click="modalClose">확인</button>
            </div>
        </div>
    </transition>
    <transition name="fade">
        <div class="toast-bg" v-if="messageShow"></div>
    </transition>
</template>
<script setup>
const props = defineProps({
  isOpen: { type: Boolean, default: false },
  toastMessage: { type: [String, Boolean], default: false },
});

const emit = defineEmits(["update:isOpen"]);
const messageShow = ref(true);
const modalClose = () => {
    emit("update:isOpen", false);
    document.querySelector('body').classList.remove('is-hidden');
}
</script>