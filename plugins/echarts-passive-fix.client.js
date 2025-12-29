export default defineNuxtPlugin(() => {
  if (process.client) {
    // ECharts의 passive 이벤트 리스너 문제 해결을 위한 전역 패치
    const originalAddEventListener = EventTarget.prototype.addEventListener
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      // wheel과 mousewheel 이벤트에 대해 passive 옵션 강제 설정
      if (type === 'wheel' || type === 'mousewheel') {
        if (typeof options === 'boolean') {
          options = { capture: options, passive: true }
        } else if (typeof options === 'object') {
          options = { ...options, passive: true }
        } else {
          options = { passive: true }
        }
      }
      
      return originalAddEventListener.call(this, type, listener, options)
    }
  }
})
