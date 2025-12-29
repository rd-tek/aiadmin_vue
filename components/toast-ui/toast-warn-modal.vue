<template>
    <transition name="toast-fade">
        <div class="toast-modal toast-modal-warn" :class="{ 'is-active': isOpen }" ref="toastRef">
            <div class="toast-modal-body">
                <div class="icon-area color-yellow">
                    <i class="icon">
                        <img src="/images/icon/icon_warn.png" alt="icon_warn" />
                    </i>
                </div>
                <div class="cont-area">
                    {{ toastWarnMessage }}
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
  toastWarnMessage: { type: [String, Boolean], default: false },
});

const emit = defineEmits(["update:isOpen"]);
const messageShow = ref(true);
const modalClose = () => {
    emit("update:isOpen", false);
    document.querySelector('body').classList.remove('is-hidden');
}
</script>