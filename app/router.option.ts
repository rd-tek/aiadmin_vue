import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior() {
    // 모든 페이지 이동 시 무조건 맨 위로 이동
    return { left: 0, top: 0 }
  }
}
