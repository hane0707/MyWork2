import { ref, computed } from "vue";
import { defineStore } from "pinia";
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
    limit,
    runTransaction
} from 'firebase/firestore'
import {
    getStorage,
    ref as firebaseRef,
    getDownloadURL,
    uploadBytes
} from "firebase/storage";
  
const noImagePath = "/img/no-image.png";
const noImageErrorText = "画像をサーバーから取得できませんでした。";

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    workDetail: {} as Works,
    sort: "desc" as string,
    newWorkDetail: {} as InputWorks,
    gallery_images_path_keep: [{}] as [{path: string, state: boolean}] // 初期状態の退避用
  }),
  actions: {
    /**
     * Firestoreから一覧取得
     * @param order_sort ※ソート順（"asc"/"desc"）。デフォルトは"desc"。
     * @param limit_number ※取得件数。デフォルトは1000。
     */
    async getWorksFirestore(order_sort: OrderByDirection = "desc", limit_number: number = 1000) {
      // 初期化
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

        const formatCreatedAt = formatDate(data.created_at);
  
        this.works.push({
          "doc_name": data.doc_name,
          "title": data.title,
          "title_en": data.title_en,
          "title_cn": data.title_cn,
          "material": data.material,
          "voice": data.voice,
          "description": data.description,
          "created_at": formatCreatedAt,
          "image": image,
          "gallery_images": data.gallery_images
        })

        this.sort = order_sort
      }
    },
    /**
     * チェス駒の詳細ページ表示用のstoreを設定する
     * @param id 
     */
    async getDetailWork(doc_name: string) {
      // 初期化
      const db = getFirestore();
      const storage = getStorage();
      const undefined_text = "データがありません";
      const noImageErrorTextDetail = doc_name + "の" + noImageErrorText;

      // Firestoreからデータを取得
      const docRef = doc(db, "chess_works", doc_name);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        // storeへ表示用の値をデータセット
        this.workDetail.doc_name = doc_name
        this.workDetail.title = data.title? data.title : undefined_text;
        this.workDetail.title_en = data.title_en? data.title_en : undefined_text;
        this.workDetail.title_cn = data.title_cn? data.title_cn : undefined_text;
        this.workDetail.material = data.material? data.material : undefined_text;
        this.workDetail.voice = data.voice? data.voice : undefined_text;
        this.workDetail.description = data.description? data.description : undefined_text;
        this.workDetail.created_at = data.created_at? formatDate(data.created_at) : undefined_text;
        this.workDetail.image = noImagePath;
        this.workDetail.gallery_images = [];

        // storeへ更新処理用の初期値をセット　※"newWorkDetail = workDetail"とすると参照渡しになるため
        this.newWorkDetail.title = data.title? data.title : undefined_text;
        this.newWorkDetail.title_en = data.title_en? data.title_en : undefined_text;
        this.newWorkDetail.title_cn = data.title_cn? data.title_cn : undefined_text;
        this.newWorkDetail.material = data.material? data.material : undefined_text;
        this.newWorkDetail.voice = data.voice? data.voice : undefined_text;
        this.newWorkDetail.description = data.description? data.description : undefined_text;
        this.newWorkDetail.created_at = data.created_at? data.created_at : undefined_text;
        this.newWorkDetail.image_path = data.image? data.image : undefined; // storageの参照urlではなくpathを設定
        this.newWorkDetail.gallery_images_path = [{}] as [{path: string, state: boolean}]; // 初期化（後処理にて配列がundefindでpush()がないと怒られるため）

        // newWorkDetail.gallery_images_pathの要素を作成
        for (let index = 0; index < data.gallery_images.length; index++) {
            const images_path = data.gallery_images[index];
            this.newWorkDetail.gallery_images_path.push({"path": images_path, "state": true});
        }
        // オブジェクト初期化時に作成された空の先頭要素を削除
        this.newWorkDetail.gallery_images_path.shift();
        // 追加画像ファイルが削除されたときのために退避（ディープコピー）
        this.gallery_images_path_keep = JSON.parse(JSON.stringify(this.newWorkDetail.gallery_images_path));

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
        throw new Error("データが見つかりません。");
      }
    },
    updateImagePathProperty(path: string) {
        this.newWorkDetail.image_path = "/img/" + path;
    },
    updateGalleryImagesPathProperty(files: FileList) {
        if (files.length < 1) {
            // 1ファイルも選択されなかった場合、配列を初期状態に戻して終了
            this.newWorkDetail.gallery_images_path = this.gallery_images_path_keep;
            return;
        }

        for (let index = 0; index < files.length; index++) {
            const file: File = files[index];

            // store更新
            this.newWorkDetail.gallery_images_path.push({path: "/img/" + this.workDetail.doc_name + "/" + file.name, state: true});

            // Firebase storageにアップロード
            const storage = getStorage();
            const storageRef = firebaseRef(storage, 'img/' + this.workDetail.doc_name + '/' + file.name);
            uploadBytes(storageRef, file).then((snapshot) => {
                console.log(file.name + '：Uploaded file!');
            });
        }
    },
    updateGalleryImagesArrayState(gallery_images_index: number) {
        const state_value = this.newWorkDetail.gallery_images_path[gallery_images_index].state;
        this.newWorkDetail.gallery_images_path[gallery_images_index].state = !state_value;
    },
    async updateWorkFirestore() {
        // 初期化
        const db = getFirestore();
        const doc_name = this.workDetail.doc_name; // 更新対象のFirestoreドキュメント
        const docRef = doc(db, "dummy_works", doc_name);

        try {
            await runTransaction(db, async (transaction) => {
              const doc = await transaction.get(docRef);
              if (!doc.exists()) {
                throw "指定されたドキュメントが存在しません。";
              }
              
              const newDetails = this.newWorkDetail;
              let image_paths = [] as string[];

              // 有効なstorage画像パスのみを変数に格納
              for (let index = 0; index < newDetails.gallery_images_path.length; index++) {
                const obj = newDetails.gallery_images_path[index];
                if (obj.state) {
                    image_paths.push(obj.path);
                }
              }
              console.log(image_paths);

              // Firestore更新
              transaction.update(docRef, {
                title: newDetails.title,
                title_en: newDetails.title_en,
                title_cn: newDetails.title_cn,
                material: newDetails.material,
                voice: newDetails.voice,
                description: newDetails.description,
                created_at: newDetails.created_at,
                image: newDetails.image_path,
                gallery_images: image_paths
              });
            });
            console.log("Transaction successfully committed!");
          } catch (e) {
            console.log("Transaction failed: ", e);
          }
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
  title: string;
  title_en: string;
  title_cn: string;
  material: string;
  voice: string;
  description: string;
  created_at: string;
  image: any;
  gallery_images: string[];
}

interface InputWorks {
    title: string;
    title_en: string;
    title_cn: string;
    material: string;
    voice: string;
    description: string;
    created_at: string;
    image_path: string;
    gallery_images_path: [{
        path: string,
        state: boolean // false:更新時、Firestoreから削除
    }];
  }