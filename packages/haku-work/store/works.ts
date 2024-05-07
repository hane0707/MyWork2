import { ref, computed } from "vue";
import { defineStore } from "pinia";
import work from '../api/dummy.js';

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    name: "testname"
  }),
  actions: {
    getWorks() {
      work.getWorks((works) => (this.works = works));
    },
  },
});

interface Works {
  id: string,
  title: string,
  material: string,
  description: string,
  created_at: string,
  url: string
}