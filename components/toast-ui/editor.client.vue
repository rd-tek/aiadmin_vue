<template>
  <div class="editor-container">
    <div ref="editorRef" class="editor"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
let editorInstance = null

onMounted(async () => {
  const Editor = (await import('@toast-ui/editor')).default

  editorInstance = new Editor({
    el: editorRef.value,
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    height: '100%',
    initialValue: props.modelValue || '', // 🔥 초기값: v-model 값
  })

  // 🔥 에디터 내용이 바뀔 때마다 v-model 업데이트
  editorInstance.on('change', () => {
    const value = editorInstance.getMarkdown()
    emit('update:modelValue', value)
  })
})

// 🔥 바깥에서 modelValue가 변경됐을 때 에디터에 반영
watch(
  () => props.modelValue,
  (newVal) => {
    if (!editorInstance) return
    const current = editorInstance.getMarkdown()
    if (newVal !== current) {
      editorInstance.setMarkdown(newVal || '')
    }
  },
)

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy()
    editorInstance = null
  }
})
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 30vh; /* 화면 높이의 70%로 설정, 필요시 조정 */
  max-height: 800px; /* 너무 커지는 것을 방지 */
  min-height: 300px; /* 너무 작아지는 것을 방지 */
  box-sizing: border-box;
}

.editor {
  flex: 1;
}
</style>
