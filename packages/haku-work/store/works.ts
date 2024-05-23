import { ref, computed } from "vue";
import { defineStore } from "pinia";
import work from '../api/dummy.js';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  type OrderByDirection,
  limit
} from 'firebase/firestore'
import type { AnyNode } from "postcss";

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    workDetail: {} as Works,
  }),
  actions: {
    /**
     * ダミーデータから取得
     */
    // getWorks() {
    //   work.getWorks((works: any) => (this.works = works));
    // },
    /**
     * Firestoreから取得
     * @param sort ※ソート順（"asc"/"desc"）。デフォルトは"desc"。
     * @param limit_number ※取得件数。デフォルトは1000。
     */
    async getWorksFirestore(sort: OrderByDirection = "desc", limit_number: number = 1000) {
      // 初期化
      const db = getFirestore();
      let id = 0;
      this.works = []
      
      // Firestoreからデータを取得し、storeに格納
      const q = query(collection(db, "chess_works"), orderBy("created_at", sort), limit(limit_number))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(id)
        const data = doc.data();
        this.works.push({
          "id": id.toString(),
          "title": data.title,
          "title_en": data.title_en,
          "title_cn": data.title_cn,
          "material": data.material,
          "voice": data.voice,
          "description": data.description,
          "created_at": data.created_at,
          "image": data.image,
          "gallery_images": data.gallery_images
        })
        console.log(this.works[id])
        
        id += 1;
      });
    },
    /**
     * チェス駒の詳細ページ表示用のstoreを設定する
     * @param id 
     */
    getDetailWork(id: number) {
      if (!this.works.length) {
        this.getWorksFirestore("desc");
      }
      this.workDetail = this.works[id];
    },
  },
  // storeの永続化
  persist: {
    storage: persistedState.sessionStorage,
  },
});

interface Works {
  id: string;
  title: string;
  title_en: string;
  title_cn: string;
  material: string;
  voice: string;
  description: string;
  created_at: string;
  image: string;
  gallery_images: string[]
}