// 예: SearchListStore.js (Pinia 스토어 예)
import { defineStore } from 'pinia'

export const useSearchListStore = defineStore('searchList', {
  state: () => ({
    selectedLabel: null,
  }),
  actions: {
    setLabel(label) {
      this.selectedLabel = label
    }
  }
})
