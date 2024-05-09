import { ref, computed } from "vue";
import { defineStore } from "pinia";
import work from '../api/dummy.js';

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    workDetail: [] as Works
  }),
  actions: {
    getWorks() {
      work.getWorks((works) => (this.works = works));
    },
    getDetailWork(id: number) {
      this.workDetail = this.works[id];
      // work.getWorks((works) => (this.workDetail = works[id]));
    }
  },
  persist: {
    storage: persistedState.sessionStorage,
  },
});

interface Works {
  id: string,
  title: string,
  material: string,
  description: string,
  created_at: string,
  image: string,
  gallery_images: []
}