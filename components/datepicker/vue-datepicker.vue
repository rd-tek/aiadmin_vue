<template>
  <VueDatePicker
    v-model="month"
    locale="ko"
    month-picker
    auto-apply
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: {
    type: Object, // { month, year }
    default: () => {
      const d = new Date()
      return { month: d.getMonth(), year: d.getFullYear() }
    }
  }
})
const emit = defineEmits(['update:modelValue'])

const month = ref(props.modelValue)

// picker에서 값이 바뀌면 부모에 그대로 전달
watch(month, (newVal) => {
  emit('update:modelValue', newVal)
})

// 부모 값 바뀌면 동기화
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && (newVal.month !== month.value?.month || newVal.year !== month.value?.year)) {
      month.value = newVal
    }
  }
)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/datepicker.scss';
</style>
