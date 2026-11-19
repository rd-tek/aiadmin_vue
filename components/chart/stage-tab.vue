<!-- 2026-11-19: 구분동작 탭(address·backswing·…) 한 칸.
     영상 재생 중 구분동작이 바뀔 때마다(한 번 재생에 7번) 탭을 가진 화면 전체가 다시 그려져 영상이 버벅이던 것을,
     이 탭 칸만 다시 그리도록 분리했습니다.
     current 에는 ref 를 그대로 넘깁니다(예: :current="stageTab.r"). 화면에서는 <li is="vue:chart-stage-tab" …> 로 씁니다. -->
<script>
import { h, unref } from 'vue'
export default {
  props: {
    name: { type: String, required: true },
    current: { type: Object, default: null },
    tag: { type: String, default: 'li' },
  },
  setup(props, { slots }) {
    return () => h(props.tag, { class: { 'is-active': unref(props.current) === props.name } }, slots.default?.())
  },
}
</script>
