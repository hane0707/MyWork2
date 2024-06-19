import {
  type User,
  type UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";
import { computed, ref } from "vue";
import {
  getFirestore,
  getDoc,
  setDoc,
  doc
} from '@firebase/firestore';
import { error } from "firebase-functions/logger";

export function useAuth() {
  const auth = getAuth();
  const db = getFirestore();
  const user = ref<User | null>(auth.currentUser);
  const isAuthed = computed(() => !!user.value);
 
  auth.onIdTokenChanged((authUser) => (user.value = authUser));
 
  /**
   * ユーザー情報取得
   * @param uid 
   * @returns 
   */
  const getUser = async (uid: string): Promise<any> => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
 
    return docSnap.data();
  };
 
  /**
   * ユーザー作成
   * @param user 
   * @param dispName 
   */
  const createUser = async (user: UserCredential ,dispName: string) => {
    await setDoc(doc(db, 'users', user.user.uid), {
      uid: user.user.uid,
      name: dispName, // サインアップ時に入力した名前
      email: user.user.email,
      photo: user.user.photoURL
    })
  };
 
  /**
   * Googleログイン
   */
  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      let user: any;
      // ログインセッション
      await setPersistence(auth, browserSessionPersistence).then(async () => {
        const googleUser = await signInWithPopup(auth, provider); // chromeにログインしているアカウントが勝手に選択される恐れがある？
        user = await getUser(googleUser.user.uid);
      })
      console.log(user)

      if (user) {
        const { updateUser } = await useUser();
        updateUser(user);
        console.info("ログイン成功");
        return user;
      } else {
        // 認証成功しても、storeからデータが取れなければユーザー未登録でエラー
        console.error("ユーザー未登録");
        googleLogout();
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Google新規登録
   */
  async function googleSignUp(dispName: string): Promise<string | null> {
    let res = null;
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const googleUser = await signInWithPopup(auth, provider);
      const user = await getUser(googleUser.user.uid);

      if (user) {
        console.error("登録済みユーザー");
        googleLogout();
        return res;
      }
      // 未登録のユーザーの場合、storeにデータを追加して正常終了
      await createUser(googleUser ,dispName).then(async () => {
        const { updateUser } = await useUser();
        const newUser = await getUser(googleUser.user.uid);
        updateUser(newUser)
        console.info("サインアップ成功");
        res = googleUser.user.uid;
      }).catch((error) => {
        console.error("登録処理でエラー発生");
        googleLogout();
        throw error;
      })
      
    } catch (error) {
      throw error;
    }
    return res;
  }

  /**
   * Googleログアウト
   */
  function googleLogout() {
    signOut(auth).then(() => {
      useAuthStore().user.name = "";
      navigateTo("/login", { replace: true })
      console.log("ログアウト")
    }).catch((error) => {
      console.log(error)
    });
  }
 
  async function currentUser() {
    return auth.currentUser
  }
 
  return { isAuthed, user, googleLogin, googleSignUp, googleLogout, currentUser };
}