<template>
  <div class="datepicker">
    <button type="button" class="button-prev" @click="$emit('prev')">
      <img src="/public/images/icon/icon_prev.png" alt="icon_prev" />
    </button>

    <div class="date">
      <span class="num">{{ displayDate }}</span>

      <button type="button" class="icon" v-if="usePicker">
        <slot name="picker"></slot>
      </button>
    </div>

    <button type="button" class="button-next" @click="$emit('next')">
      <img src="/public/images/icon/icon_next.png" alt="icon_next" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  displayDate: {
    type: String,
    default: "",
  },
  usePicker: {
    type: Boolean,
    default: true,
  },
});

// 부모에게 '이전/다음 버튼 눌렸다'고 신호 보냄
defineEmits(["prev", "next"]);
</script>
<style lang="scss" scoped>
@use "@/assets/scss/pages/statistics.scss";
</style>
