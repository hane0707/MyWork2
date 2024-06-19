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
    listAll,
    getDownloadURL,
    uploadBytes,
    type StorageReference
} from "firebase/storage";
import { error } from "firebase-functions/logger";

const noImagePath = "/img/no-image.png";
const noImageErrorText = "画像をサーバーから取得できませんでした。";
const imageMaxSize = 10485760; // 10MB

export const useWorksStore = defineStore("works",{
  state: () => ({
    works: [] as Works[],
    workDetail: {} as Works,
    sort: "desc" as string,
    newWorkDetail: {} as UpdateWorks,
    createWorkDetail: {} as CreateWorks,
    validationErrorText: "" as string,
  }),
  actions: {
    /**
     * 新規チェス駒追加用storeの初期化
     */
    initWorkDetail() {
      this.createWorkDetail.doc_name = "";
      this.createWorkDetail.title = "";
      this.createWorkDetail.title_en = "";
      this.createWorkDetail.title_cn = "";
      this.createWorkDetail.material = "";
      this.createWorkDetail.voice = "";
      this.createWorkDetail.description = "";
      this.createWorkDetail.created_at = "";
      this.createWorkDetail.image_path = "";
      this.createWorkDetail.gallery_images_path_url = [{}] as [{path: string, url: string, state: boolean}];
      this.createWorkDetail.gallery_images_path_url.shift();
    },
    /**
     * ギャラリー用画像をFirebase storageから取得
     * @param doc_name 
     * @returns 
     */
    async getImageUrl(doc_name: string) {
      const storage = getStorage();
      const docRef = firebaseRef(storage, "/img/" + doc_name);
      let imagesRef = [] as StorageReference[];
      await listAll(docRef).then((res) => {
        if (res.items.length < 1) {
            console.error("ギャラリー用画像が0件です。");
            return;
        }
        imagesRef = res.items;
      }).catch((error) => {
        console.debug(error);
        console.error("ギャラリー表示用画像の参照取得時にエラーが発生しました。");
        return;
      });

      let imagesPathUrl = [{}] as [{path: string, url: string}];
      for (let index = 0; index < imagesRef.length; index++) {
        const path = imagesRef[index].fullPath;
        await getDownloadURL(imagesRef[index]).then((url) => {
          const obj = {path, url};
          imagesPathUrl.push(obj);
        })
        .catch((error) => {
          console.debug(error);
          console.error(noImageErrorText);
        });
      }
      imagesPathUrl.shift();
      return imagesPathUrl;
    },
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
          console.debug(error);
          console.error(noImageErrorText);
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
      this.validationErrorText = "";

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

        // storeへ更新処理用の初期値をセット　※"newWorkDetail.hoge = workDetail.hoge"とすると参照渡しになるため
        this.newWorkDetail.title = data.title? data.title : undefined_text;
        this.newWorkDetail.title_en = data.title_en? data.title_en : undefined_text;
        this.newWorkDetail.title_cn = data.title_cn? data.title_cn : undefined_text;
        this.newWorkDetail.material = data.material? data.material : undefined_text;
        this.newWorkDetail.voice = data.voice? data.voice : undefined_text;
        this.newWorkDetail.description = data.description? data.description : undefined_text;
        this.newWorkDetail.created_at = data.created_at? data.created_at : undefined_text;
        this.newWorkDetail.image_path = data.image? data.image : undefined; // storageの参照urlではなくpathを設定
        this.newWorkDetail.gallery_images_path = [{}] as [{path: string, state: boolean}]; // 初期化（後処理にて配列がundefindでpush()がないと怒られるため）

        // workDetail.imageをstorageから取得
        await getDownloadURL(firebaseRef(storage, data.image))
        .then((url) => {
          this.workDetail.image = url;
        })
        .catch((error) => {
          console.debug(error);
          console.error(noImageErrorTextDetail);
        });

        // 全てのギャラリー用画像をstorageから取得（非表示含む）
        await this.getImageUrl(doc_name).then((res) => {
          // storeに登録
          for (const path_url of res) {
            // Firestoreに登録のない画像は非表示画像として状態をfalseにする
            const state :boolean = data.gallery_images.includes(path_url.path);
            this.newWorkDetail.gallery_images_path.push({"path": path_url.path, "state": state});
            this.workDetail.gallery_images.push(path_url.url);
          }
          // オブジェクト初期化時に作成された空の先頭要素を削除
          this.newWorkDetail.gallery_images_path.shift();
        });
      } else {
        // NO DATA
        throw new Error("データが見つかりません。");
      }
    },
    /**
     * 画像アップロード時のバリデーション
     * @param file 
     * @returns 
     */
    imageValidation(file: File) {
      this.validationErrorText = "";
      // 1. アップロードされるファイルが画像であること
      if (!(file.type.includes('image'))) {
        this.validationErrorText = '画像ファイルのみアップロード可能です'
        return true
      }

      // 2. 画像のサイズが10MB未満であること
      if (!(file.size < imageMaxSize)) {
        this.validationErrorText = imageMaxSize + 'byte未満のファイルのみアップロード可能です'
        return true
      }

      return false;
    },
    /**
     * 画像ファイルアップロード
     * @param file 
     * @param main_image 
     * @param doc_name 
     */
    async uploadImageFile(file: File, main_image: boolean ,doc_name: string = "") {
      if (!main_image && doc_name.length < 1) {
        throw "ギャラリー用画像のアップロード先pathの指定が正しくありません。"
      }
      const path = main_image ? 'img/' + file.name : 'img/' + doc_name + '/' + file.name;
      const storage = getStorage();
      const storageRef = firebaseRef(storage, path);
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.info(file.name);
      }).catch((error) => {
        console.info(file.name);
        console.error("storageへファイルアップロード時にエラー発生")
        throw error;
      });
    },
    /**
     * メインイメージ画像の登録（新規登録画面）
     * @param file 
     * @returns 
     */
    async createImagePathProperty(file: File) {
      let res = false;
      if (this.imageValidation(file)) {
        return res;
      }

      await this.uploadImageFile(file, true).then(() => {
        this.createWorkDetail.image_path = "/img/" + file.name;
        res = true;
      });
      return res;
    },
    /**
     * メインイメージ画像の登録（更新画面）
     * @param file 
     * @returns 
     */
    async updateImagePathProperty(file: File) {
      let res = false;
      if (this.imageValidation(file)) {
          return;
      }

      await this.uploadImageFile(file, true).then(() => {
        this.newWorkDetail.image_path = "/img/" + file.name;
        res = true;
      });
      return res;
    },
    async createGalleryImagesPathProperty(files: FileList) {
      const doc_name = this.createWorkDetail.doc_name;
      let res = false;

      console.groupCollapsed("Uploaded files.")
      for (let index = 0; index < files.length; index++) {
        const file: File = files[index];
        // Firebase storageにアップロード
        await this.uploadImageFile(file, false, doc_name)
        .catch((error) => {
          console.debug(error);
          return res;
        });
      }
      console.groupEnd();

      // Firebase storageへのアップロードが完全に終了するまで、念のため3秒待つ
      await this.wait(3000);

      // 全てのギャラリー用画像をstorageから取得（非表示含む）
      await this.getImageUrl(doc_name).then((res) => {
        // 配列の初期化
        this.createWorkDetail.gallery_images_path_url = [{}] as [{path: string, url: string, state: boolean}]
        // storeに登録
        for (const path_url of res) {
          this.createWorkDetail.gallery_images_path_url.push({"path": path_url.path, url: path_url.url, "state": true});
        }
        // オブジェクト初期化時に作成された空の先頭要素を削除
        this.createWorkDetail.gallery_images_path_url.shift();
      });

      res = true;
      return res;
    },
    async updateGalleryImagesPathProperty(files: FileList) {
      let res = false;
      if (files.length < 1) {
        // 1ファイルも選択されなかった場合、処理終了
        return res;
      }

      console.groupCollapsed("Uploaded files.")
      for (let index = 0; index < files.length; index++) {
        const file: File = files[index];
        // Firebase storageにアップロード
        this.uploadImageFile(file, false, this.workDetail.doc_name).then((res) => {
          // store更新
          this.newWorkDetail.gallery_images_path.push({path: "img/" + this.workDetail.doc_name + "/" + file.name, state: false});
        }).catch((error) => {
          console.debug(error);
          return res;
        });
      }
      console.groupEnd();

      // Firebase storageへのアップロードが完全に終了するまで、念のため3秒待つ
      await this.wait(3000);

      // Firestoreからデータを取得
      const doc_name = this.workDetail.doc_name;
      const db = getFirestore();
      const docRef = doc(db, "chess_works", doc_name);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();

      if (data) {
        // 全てのギャラリー用画像をstorageから取得（非表示含む）
        await this.getImageUrl(doc_name).then((res) => {
          // 配列の初期化
          this.newWorkDetail.gallery_images_path = [{}] as [{path: string, state: boolean}]
          this.workDetail.gallery_images = [];
          // storeに登録
          for (const path_url of res) {
            // Firestoreに登録のない画像は非表示画像として状態をfalseにする
            const state :boolean = data.gallery_images.includes(path_url.path);
            this.newWorkDetail.gallery_images_path.push({"path": path_url.path, "state": state});
            this.workDetail.gallery_images.push(path_url.url);
          }
          // オブジェクト初期化時に作成された空の先頭要素を削除
          this.newWorkDetail.gallery_images_path.shift();
        });
      }
      return res;
    },
    /**
     * チェス駒新規登録
     * @returns CrudResult={crud: "create", result: "faild" | "faild-exists" | "success"}
     */
    async createWorkFirestore() {
      // 初期化
      const db = getFirestore();
      const doc_name = this.createWorkDetail.doc_name; // 登録するFirestoreドキュメント名
      const docRef = doc(db, "chess_works", doc_name);
      let res: CrudResult = {crud: "create", result: "faild"};

      try {
        await runTransaction(db, async (transaction) => {
          const doc = await transaction.get(docRef);
          if (doc.exists()) {
            res.result = "faild-exists";
            throw "指定されたドキュメントがすでに存在します。";
          }
          
          // 有効なstorage画像パスのみを変数に格納
          let image_paths = [] as string[];
          for (let index = 0; index < this.createWorkDetail.gallery_images_path_url.length; index++) {
            const obj = this.createWorkDetail.gallery_images_path_url[index];
            if (obj.state) {
              image_paths.push(obj.path);
            }
          }

          // Firestore更新
          transaction.set(docRef, {
            doc_name: this.createWorkDetail.doc_name,
            title: this.createWorkDetail.title,
            title_en: this.createWorkDetail.title_en,
            title_cn: this.createWorkDetail.title_cn,
            material: this.createWorkDetail.material,
            voice: this.createWorkDetail.voice,
            description: this.createWorkDetail.description,
            created_at: this.createWorkDetail.created_at,
            image: this.createWorkDetail.image_path,
            gallery_images: image_paths
          });
        });
        res.result = "success";
        console.info("Transaction successfully committed!");
      } catch (error) {
        console.debug(error);
        console.error("Transaction failed.");
      }
      return res;
    },
    /**
     * チェス駒更新
     * @returns CrudResult={crud: "update", result: "faild" | "faild-not-exists" | "success"}
     */
    async updateWorkFirestore() {
      // 初期化
      const db = getFirestore();
      const doc_name = this.workDetail.doc_name; // 更新対象のFirestoreドキュメント名
      const docRef = doc(db, "chess_works", doc_name);
      let res: CrudResult = {crud: "update", result: "faild"};

      try {
        await runTransaction(db, async (transaction) => {
          const doc = await transaction.get(docRef);
          if (!doc.exists()) {
            res.result = "faild-not-exists";
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
        res.result = "success";
        console.info("Transaction successfully committed!");
      } catch (error) {
        console.debug(error);
        console.error("Transaction failed.");
      }
      return res;
    },
    /**
     * nミリ秒待つ
     * @param msec 
     * @returns 
     */
    wait(msec: number) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, msec);
      });
    }
  },
  // storeの永続化
  persist: {
    storage: persistedState.sessionStorage,
  },
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {name: ""} as User,
  }),
  actions: {
    /**
     * ログイン
     * @returns AuthResult={action: "login", result: "faild" | "faild-not-exists-user" | "success"}
     */
    async login() {
      const { googleLogin } = useAuth();
      const user = await googleLogin();
      let res: AuthResult = {action: "login", result: "faild"};

      if (user) {
        this.user.name = user.name;
        res.result = "success";
        return res;
      }else {
        res.result = "faild-not-exists-user";
        return res;
    }
    },
    /**
     * サインアップ
     * @param dispName 
     * @returns AuthResult={action: "sign-up", result: "faild" | "faild-exists-user" | "success"}
     */
    async signUp(dispName: string) {
      const { googleSignUp } = useAuth();
      const user = await googleSignUp(dispName);
      let res: AuthResult = {action: "sign-up", result: "faild"};

      if (user) {
        this.user.name = dispName;
        res.result = "success";
        return res;
      } else {
        res.result = "faild-exists-user";
        return res;
      }
    },
    logout() {
      const { googleLogout } = useAuth();
      googleLogout();
    }
  },
  // storeの永続化
  persist: {
    storage: persistedState.sessionStorage,
  },
})

export const useToastStore = defineStore("toast", {
  state: (): State => ({
    isActive: false,
    text: null,
    color: "success"
  }),
  actions: {
    unsetSnackbar() {
      this.$reset()
    },
    setToast(text: State['text']) {
      this.isActive = true
      this.text = text
    },
    setSuccessToast(text: State['text']) {
      this.setToast(text)
      this.color = 'success'
    },
    setErrorToast(text: State['text']) {
      this.setToast(text)
      this.color = 'error'
    },
  },
})

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

interface UpdateWorks {
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

  interface CreateWorks {
    doc_name: string;
    title: string;
    title_en: string;
    title_cn: string;
    material: string;
    voice: string;
    description: string;
    created_at: string;
    image_path: string;
    gallery_images_path_url: [{
        path: string,
        url: string,
        state: boolean // false:更新時、Firestoreから削除
    }];
  }

  interface User {
    name: string
  }

  interface State {
    isActive: boolean
    text: string | null
    color: 'success' | 'error'
  }

  interface CrudResult {
    crud: 'create' | 'update' | 'delete'
    result: 'faild-exists' | 'faild-not-exists' | 'faild' | 'success'
  }

  interface AuthResult {
    action: 'login' | 'sign-up'
    result: 'faild-exists-user' | 'faild-not-exists-user' | 'faild' | 'success'
  }