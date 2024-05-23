import { ref, computed } from "vue";
import { defineStore } from "pinia";
import work from '../api/dummy.js';
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDoc,
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
    sort: "desc" as string
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
     * @param order_sort ※ソート順（"asc"/"desc"）。デフォルトは"desc"。
     * @param limit_number ※取得件数。デフォルトは1000。
     */
    async getWorksFirestore(order_sort: OrderByDirection = "desc", limit_number: number = 1000) {
      // 初期化
      const db = getFirestore();
      let id = 0;
      this.works = []
      
      // Firestoreからデータを取得し、storeに格納
      const q = query(collection(db, "chess_works"), orderBy("created_at", order_sort), limit(limit_number))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.works.push({
          "doc_name": data.doc_name,
          "id": id.toString(),
          "title": data.title,
          "title_en": data.title_en,
          "title_cn": data.title_cn,
          "material": data.material,
          "voice": data.voice,
          "description": data.description,
          "created_at": formatDate(data.created_at),
          "image": data.image,
          "gallery_images": data.gallery_images
        })
        
        this.sort = order_sort
        id += 1;
      });
    },
    /**
     * チェス駒の詳細ページ表示用のstoreを設定する
     * @param id 
     */
    async getDetailWork(id: number) {
      // 初期化
      const db = getFirestore();
      const undefined_text = "データがありません";
      const doc_name = this.works[id].doc_name;

      // Firestoreからデータを取得し、storeに格納
      const docRef = doc(db, "chess_works", doc_name);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      this.workDetail.doc_name = doc_name
      this.workDetail.id = id.toString();
      this.workDetail.title = data? data.title : undefined_text;
      this.workDetail.title_en = data? data.title_en : undefined_text;
      this.workDetail.title_cn = data? data.title_cn : undefined_text;
      this.workDetail.material = data? data.material : undefined_text;
      this.workDetail.voice = data? data.voice : undefined_text;
      this.workDetail.description = data? data.description : undefined_text;
      this.workDetail.created_at = data? formatDate(data.created_at) : undefined_text;
      this.workDetail.image = data? data.image : undefined_text;
      this.workDetail.gallery_images = data? data.gallery_images : [];
    },
  },
  // storeの永続化
  persist: {
    storage: persistedState.sessionStorage,
  },
});

/**
 * 日付フォーマットの変換（yyyy-MM-dd　→　yyyy-M-d）
 * @param date 
 * @returns 
 */
function formatDate(date:string) {
  const new_date = new Date(date);
  const new_date_text = `${new_date.getFullYear()}-${new_date.getMonth()}-${new_date.getDate()}`
  return new_date_text
}

interface Works {
  doc_name: string;
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