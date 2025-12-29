<template>
  <VueDatePicker
    v-model="date"
    locale="ko"
    auto-apply
  />
</template>

<script setup>
import { ref, watch } from 'vue'
import { format } from 'date-fns'
import VueDatePicker from '@vuepic/vue-datepicker'

const props = defineProps({
  modelValue: {
    type: String, // "2025.09.24" 같은 문자열
    default: () => format(new Date(), 'yyyy.MM.dd')
  }
})
const emit = defineEmits(['update:modelValue'])

const date = ref(new Date(props.modelValue))

// picker에서 값이 바뀌면 -> 포맷 후 부모에 전달
watch(date, (newVal) => {
  if (newVal) {
    emit('update:modelValue', format(newVal, 'yyyy.MM.dd'))
  }
})

// 부모 값 바뀌면 -> Date 객체로 변환해서 picker에 반영
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      const parsed = new Date(newVal)
      if (!isNaN(parsed)) {
        date.value = parsed
      }
    }
  }
)
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/datepicker.scss';
</style>
