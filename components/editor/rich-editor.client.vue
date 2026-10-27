<!--
  2026-10-13: 관리자 등록/수정 폼용 웹 에디터 (Tiptap 2 · Vue3, MIT)
  - v-model 은 HTML 문자열 (공지·자료실 상세는 v-html 로 렌더)
  - 기존 평문 내용(태그 없음)은 줄바꿈을 문단으로 바꿔 불러옴
-->
<template>
  <div class="rich-editor" :class="{ 'is-focused': focused }" :style="{ '--re-accent': accent }">
    <div class="rich-editor-toolbar" v-if="editor" role="toolbar" aria-label="서식 도구">
      <div class="group">
        <select aria-label="문단 형식" :value="blockType" @change="setBlock($event.target.value)">
          <option value="p">본문</option>
          <option value="h2">제목 1</option>
          <option value="h3">제목 2</option>
          <option value="h4">제목 3</option>
        </select>
      </div>
      <div class="group">
        <button type="button" title="굵게 (Ctrl+B)" aria-label="굵게" :class="{ on: editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"><b>B</b></button>
        <button type="button" title="기울임 (Ctrl+I)" aria-label="기울임" :class="{ on: editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()"><i>I</i></button>
        <button type="button" title="밑줄 (Ctrl+U)" aria-label="밑줄" :class="{ on: editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()"><u>U</u></button>
        <button type="button" title="취소선" aria-label="취소선" :class="{ on: editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()"><s>S</s></button>
      </div>
      <div class="group">
        <button type="button" title="글머리 기호" aria-label="글머리 기호 목록" :class="{ on: editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">
          <svg viewBox="0 0 20 20" width="18" height="18"><circle cx="4" cy="5" r="1.6"/><circle cx="4" cy="10" r="1.6"/><circle cx="4" cy="15" r="1.6"/><rect x="8" y="4.2" width="10" height="1.6" rx=".8"/><rect x="8" y="9.2" width="10" height="1.6" rx=".8"/><rect x="8" y="14.2" width="10" height="1.6" rx=".8"/></svg>
        </button>
        <button type="button" title="번호 목록" aria-label="번호 목록" :class="{ on: editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">
          <svg viewBox="0 0 20 20" width="18" height="18"><text x="1.5" y="7" font-size="6" font-weight="700">1</text><text x="1.5" y="12.5" font-size="6" font-weight="700">2</text><text x="1.5" y="18" font-size="6" font-weight="700">3</text><rect x="8" y="4.2" width="10" height="1.6" rx=".8"/><rect x="8" y="9.2" width="10" height="1.6" rx=".8"/><rect x="8" y="14.2" width="10" height="1.6" rx=".8"/></svg>
        </button>
        <button type="button" title="인용" aria-label="인용" :class="{ on: editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">❝</button>
        <button type="button" title="구분선" aria-label="구분선" @click="editor.chain().focus().setHorizontalRule().run()">―</button>
      </div>
      <div class="group">
        <button v-for="a in aligns" :key="a.v" type="button" :title="a.t" :aria-label="a.t" :class="{ on: editor.isActive({ textAlign: a.v }) }" @click="editor.chain().focus().setTextAlign(a.v).run()">
          <svg viewBox="0 0 20 20" width="18" height="18"><rect :x="a.x[0]" y="4" :width="a.w[0]" height="1.6" rx=".8"/><rect :x="a.x[1]" y="9" :width="a.w[1]" height="1.6" rx=".8"/><rect :x="a.x[2]" y="14" :width="a.w[2]" height="1.6" rx=".8"/></svg>
        </button>
      </div>
      <div class="group">
        <button type="button" title="링크" aria-label="링크 넣기" :class="{ on: editor.isActive('link') }" @click="setLink">🔗</button>
        <button type="button" title="이미지 주소로 넣기" aria-label="이미지 넣기" @click="setImage">🖼</button>
      </div>
      <div class="group">
        <button type="button" title="실행 취소 (Ctrl+Z)" aria-label="실행 취소" :disabled="!editor.can().undo()" @click="editor.chain().focus().undo().run()">↶</button>
        <button type="button" title="다시 실행 (Ctrl+Y)" aria-label="다시 실행" :disabled="!editor.can().redo()" @click="editor.chain().focus().redo().run()">↷</button>
        <button type="button" title="서식 지우기" aria-label="서식 지우기" @click="editor.chain().focus().unsetAllMarks().clearNodes().run()">⌫</button>
      </div>
    </div>
    <editor-content :editor="editor" class="rich-editor-body" />
    <div class="rich-editor-foot">{{ charCount }}자</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '내용을 입력해주세요.' },
  // 2026-10-26: 입력칸 접근성 이름(화면낭독기) — 없으면 placeholder 사용
  label: { type: String, default: '' },
  minHeight: { type: [Number, String], default: 320 },
  // 2026-10-21: 4앱 공통 에디터(Tiptap) — 앱 대표색(관리자 보라 · 코치 청록)
  accent: { type: String, default: '#4b3df5' },
})
const emit = defineEmits(['update:modelValue'])

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// 태그가 없는 기존 평문 → 문단(줄바꿈 유지)
const toHtml = (v) => {
  const s = v ?? ''
  if (!s) return ''
  if (/<\/?[a-z][\s\S]*>/i.test(s)) return s
  return s.split(/\r?\n/).map((l) => `<p>${l ? escapeHtml(l) : ''}</p>`).join('')
}

const focused = ref(false)
const editor = useEditor({
  content: toHtml(props.modelValue),
  extensions: [
    StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
    Underline,
    Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { target: '_blank', rel: 'noopener noreferrer' } }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Placeholder.configure({ placeholder: props.placeholder }),
    Image,
  ],
  editorProps: { attributes: { role: 'textbox', 'aria-label': props.label || props.placeholder || '내용 입력', 'aria-multiline': 'true' } }, // 2026-10-26: 접근성(axe aria-input-field-name)
  onUpdate: ({ editor }) => emit('update:modelValue', editor.isEmpty ? '' : editor.getHTML()),
  onFocus: () => { focused.value = true },
  onBlur: () => { focused.value = false },
})

// 수정 화면: 서버 값이 나중에 도착하면 반영
watch(() => props.modelValue, (v) => {
  const ed = editor.value
  if (!ed) return
  const cur = ed.isEmpty ? '' : ed.getHTML()
  if ((v || '') !== cur) ed.commands.setContent(toHtml(v), false)
})

const blockType = computed(() => {
  const ed = editor.value
  if (!ed) return 'p'
  for (const l of [2, 3, 4]) if (ed.isActive('heading', { level: l })) return 'h' + l
  return 'p'
})
const setBlock = (v) => {
  const c = editor.value.chain().focus()
  if (v === 'p') c.setParagraph().run()
  else c.toggleHeading({ level: Number(v.slice(1)) }).run()
}
const aligns = [
  { v: 'left', t: '왼쪽 정렬', x: [2, 2, 2], w: [16, 11, 14] },
  { v: 'center', t: '가운데 정렬', x: [2, 4.5, 3], w: [16, 11, 14] },
  { v: 'right', t: '오른쪽 정렬', x: [2, 7, 4], w: [16, 11, 14] },
]
const setLink = () => {
  const prev = editor.value.getAttributes('link').href || 'https://'
  const url = window.prompt('링크 주소를 입력하세요 (비우면 링크 해제)', prev)
  if (url === null) return
  if (!url || url === 'https://') return editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
  if (!/^(https?:|mailto:|tel:)/i.test(url)) return
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}
const setImage = () => {
  const url = window.prompt('이미지 주소(https://…)를 입력하세요')
  if (url && /^https?:\/\//i.test(url)) editor.value.chain().focus().setImage({ src: url }).run()
}
const charCount = computed(() => (editor.value ? editor.value.getText().replace(/\s/g, '').length : 0))

onBeforeUnmount(() => editor.value?.destroy())
</script>

<style lang="scss" scoped>
.rich-editor {
  width: 100%;
  border: 1px solid #d9dbe1;
  border-radius: 8px;
  background: #fff;
  transition: border-color .15s, box-shadow .15s;
  &.is-focused { border-color: var(--re-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--re-accent) 15%, transparent); }
}
.rich-editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 6px;
  padding: 8px 10px;
  border-bottom: 1px solid #eceef2;
  background: #f8f9fb;
  border-radius: 8px 8px 0 0;
  position: sticky;
  top: 0;
  z-index: 2;
  .group {
    display: flex;
    align-items: center;
    gap: 2px;
    padding-right: 6px;
    border-right: 1px solid #e3e5ea;
    &:last-child { border-right: 0; }
  }
  select {
    height: 30px;
    padding: 0 8px;
    border: 1px solid #d9dbe1;
    border-radius: 6px;
    font-size: 13px;
    background: #fff;
  }
  button {
    min-width: 30px;
    height: 30px;
    padding: 0 6px;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    svg { fill: currentColor; }
    &:hover:not(:disabled) { background: color-mix(in srgb, var(--re-accent) 10%, #fff); }
    &.on { background: var(--re-accent); color: #fff; }
    &:disabled { opacity: .35; cursor: default; }
  }
}
.rich-editor-body {
  :deep(.ProseMirror) {
    min-height: v-bind('typeof minHeight === "number" ? minHeight + "px" : minHeight');
    max-height: 70vh;
    overflow-y: auto;
    padding: 16px 18px;
    font-size: 15px;
    line-height: 1.7;
    color: #222;
    outline: none;
    word-break: break-word;
    p { margin: 0 0 6px; }
    h2 { font-size: 22px; font-weight: 700; margin: 14px 0 8px; }
    h3 { font-size: 19px; font-weight: 700; margin: 12px 0 6px; }
    h4 { font-size: 16px; font-weight: 700; margin: 10px 0 6px; }
    ul { list-style: disc; padding-left: 22px; margin: 4px 0 8px; }
    ol { list-style: decimal; padding-left: 22px; margin: 4px 0 8px; }
    li > p { margin: 0; }
    blockquote { border-left: 4px solid color-mix(in srgb, var(--re-accent) 35%, #fff); background: color-mix(in srgb, var(--re-accent) 5%, #fff); padding: 8px 14px; margin: 8px 0; color: #444; }
    hr { border: 0; border-top: 1px solid #ddd; margin: 14px 0; }
    a { color: var(--re-accent); text-decoration: underline; }
    img { max-width: 100%; height: auto; border-radius: 4px; }
    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      color: #9aa0a6;
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
}
.rich-editor-foot {
  padding: 6px 12px;
  border-top: 1px solid #f0f1f4;
  text-align: right;
  font-size: 12px;
  color: #61666c;
}
</style>
