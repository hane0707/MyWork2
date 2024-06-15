import {
  type User,
  type UserCredential,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getAuth,
  signOut
} from "firebase/auth";
import { computed, ref } from "vue";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  addDoc
} from '@firebase/firestore';
import { error } from "firebase-functions/logger";

export function useAuth() {
  const auth = getAuth();
  const db = getFirestore();
  const user = ref<User | null>(auth.currentUser);
  const isAuthed = computed(() => !!user.value);
 
  auth.onIdTokenChanged((authUser) => (user.value = authUser));
 
  // ユーザー情報取得
  const getUser = async (uid: string): Promise<any> => {
    const q = query(
      collection(db, 'users'),
      where("uid", "==", uid)
    );
    const querySnapshot = await getDocs(q);
 
    return querySnapshot.docs[0]
  };
 
  // ユーザー作成
  const createUser = async (user: UserCredential ,dispName: string) => {
    await addDoc(collection(db, 'users'), {
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
      const googleUser = await signInWithPopup(auth, provider);
      const user = await getUser(googleUser.user.uid);

      if (user) {
        const { updateUser } = await useUser();
        updateUser(user.data());
        console.log("ログイン成功");
        return googleUser.user.uid;
      } else {
        // 認証成功しても、storeからデータが取れなければユーザー未登録でエラー
        console.log("ユーザー未登録")
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
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const googleUser = await signInWithPopup(auth, provider);
      const user = await getUser(googleUser.user.uid);

      if (user) {
        console.log("登録済みユーザー")
        googleLogout();
        return null;
      }

      // 未登録のユーザーの場合、storeにデータを追加して正常終了
      await createUser(googleUser ,dispName).then(async () => {
        const { updateUser } = await useUser()
        const newUser = await getUser(googleUser.user.uid)
        updateUser(newUser.data())
        return googleUser.user.uid;
      }).catch((error) => {
        console.log("登録処理でエラー発生")
        googleLogout();
        throw error;
      })
      
    } catch (error) {
      throw error;
    }
    return null;
  }

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