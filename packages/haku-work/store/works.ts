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
import { getStorage, ref as firebaseRef, getDownloadURL } from "firebase/storage";

const noImagePath = "/img/no-image.png";
const noImageErrorText = "画像をサーバーから取得できませんでした。";

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    workDetail: {} as Works,
    sort: "desc" as string,
    kvLg: [] as string[],
    kvSm: [] as string[],
    currentKvImageId: 0 as number,
    aboutImage: noImagePath as any,
    aboutBgImage: noImagePath as any
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
      let id = 0;
      this.works = []
      const db = getFirestore();
      const storage = getStorage();
      
      // Firestoreからデータを取得し、storeに格納
      const q = query(collection(db, "chess_works"), orderBy("created_at", order_sort), limit(limit_number))
      const querySnapshot = await getDocs(q);
      
      // querySnapshot.forEachの中で直接awaitできないので、通常の配列に入れ替え
      let tempCollection = [] as any;
      querySnapshot.forEach(collection => {
          tempCollection.push(collection.data());
      });
      // ※直列で回すので、遅いなら修正検討
      for (const data of tempCollection) {
        let image = noImagePath;
        await getDownloadURL(firebaseRef(storage, data.image))
        .then((url) => {
          image = url;
        })
        .catch((error) => {
          console.log(noImageErrorText);
        });
  
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
          "image": image,
          "gallery_images": data.gallery_images
        })
        
        this.sort = order_sort
        id += 1;
      }
    },
    /**
     * チェス駒の詳細ページ表示用のstoreを設定する
     * @param id 
     */
    async getDetailWork(id: number) {
      // 初期化
      const db = getFirestore();
      const storage = getStorage();
      const docName = this.works[id].doc_name;
      const undefined_text = "データがありません";
      const noImageErrorTextDetail = docName + "の" + noImageErrorText;

      // Firestoreからデータを取得
      const docRef = doc(db, "chess_works", docName);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      // storeへデータセット
      this.workDetail.doc_name = docName
      this.workDetail.id = id.toString();
      this.workDetail.title = data? data.title : undefined_text;
      this.workDetail.title_en = data? data.title_en : undefined_text;
      this.workDetail.title_cn = data? data.title_cn : undefined_text;
      this.workDetail.material = data? data.material : undefined_text;
      this.workDetail.voice = data? data.voice : undefined_text;
      this.workDetail.description = data? data.description : undefined_text;
      this.workDetail.created_at = data? formatDate(data.created_at) : undefined_text;
      this.workDetail.image = noImagePath;
      this.workDetail.gallery_images = [];

      if (data) {
        // workDetail.imageをstorageから取得
        await getDownloadURL(firebaseRef(storage, data.image))
        .then((url) => {
          this.workDetail.image = url;
        })
        .catch((error) => {
          console.log(noImageErrorTextDetail);
        });

        // workDetail.gallery_imagesをstorageから取得
        let images = [] as string[];
        for (const image of data.gallery_images) {
          await getDownloadURL(firebaseRef(storage, image))
          .then((url) => {
            images.push(url);
          })
          .catch((error) => {
            console.log(noImageErrorTextDetail);
            images.push(noImagePath);
          });
        }
        this.workDetail.gallery_images = images;
      } else {
        // NO DATA
      }
    },
    /**
     * Aboutページのアバター画像を取得する
     */
    async getAboutImage() {
      const storagePath = "img/about_image.jpg";
      const storage = getStorage();
      await getDownloadURL(firebaseRef(storage, storagePath))
      .then((url) => {
        this.aboutImage = url;
      })
      .catch((error) => {
        console.log(noImageErrorText);
        this.aboutImage = noImagePath;
      });
    },
    /**
     * TOPページキービジュアルセクションに表示する画像を取得する
     */
    async getKeyVisualImage() {
      // 初期化
      this.kvLg = [];
      this.kvSm = [];
      const storage = getStorage();

      for (let index = 1; index <= 6; index++) {
        const lg_path = "img/key_visual/lg/kv" + index.toString() + ".jpg";
        const sm_path = "img/key_visual/sm/kv" + index.toString() + ".jpg";

        // PC画面表示用のキービジュアル取得
        await getDownloadURL(firebaseRef(storage, lg_path))
        .then((url) => {
          this.kvLg.push(url);
        })
        .catch((error) => {
          console.log(noImageErrorText);
          this.kvLg.push(noImagePath);
        });
        // スマホ画面表示用のキービジュアル取得
        await getDownloadURL(firebaseRef(storage, sm_path))
        .then((url) => {
          this.kvSm.push(url);
        })
        .catch((error) => {
          console.log(noImageErrorText);
          this.kvSm.push(noImagePath);
        });
      }
    },
    changeNextSlide() { // 表示するcurrentの画像を変えるため、加算していく
      if (this.currentKvImageId < this.kvLg.length - 1) {
        this.currentKvImageId += 1
      } else {
        this.currentKvImageId = 0
      }
    },
    /**
     * TOPページAboutセクションの背景画像を取得する
     */
    async getAboutSectionBgImage() {
      const storagePath = "img/about_bg.jpg";
      const storage = getStorage();
      await getDownloadURL(firebaseRef(storage, storagePath))
      .then((url) => {
        this.aboutBgImage = url;
      })
      .catch((error) => {
        console.log(noImageErrorText);
        this.aboutBgImage = noImagePath;
      });
    }
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
  const new_date_text = `${new_date.getFullYear()}-${new_date.getMonth()+1}-${new_date.getDate()}`
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
  image: any;
  gallery_images: string[]
}