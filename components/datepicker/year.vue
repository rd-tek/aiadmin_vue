<template>
  <VueDatePicker
    v-model="year"
    locale="ko"
    year-picker
    auto-apply
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'

const props = defineProps({
  modelValue: {
    type: Object, // { year }
    default: () => {
      const d = new Date()
      return { year: d.getFullYear() }
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const year = ref(props.modelValue)

// picker에서 값이 바뀌면 부모에 그대로 전달
watch(year, (newVal) => {
  emit('update:modelValue', newVal)
})

// 부모 값 바뀌면 동기화
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal.year !== year.value?.year) {
      year.value = newVal
    }
  }
)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/datepicker.scss';
</style>
