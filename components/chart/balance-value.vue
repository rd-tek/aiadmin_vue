<!-- 2026-11-18: Step Balance 숫자(L/R/F/B) 한 칸.
     영상 재생 중 숫자가 바뀔 때마다 상세 화면 전체가 다시 그려지던 것을, 이 숫자만 다시 그리도록 분리했습니다.
     source 에는 ref 를 그대로 넘깁니다(예: :source="animated.Left"). -->
<script>
import { unref } from 'vue'
export default {
  props: { source: { type: Object, default: null } },
  setup(props) {
    return () => String(unref(props.source) ?? 0)
  },
}
</script>
