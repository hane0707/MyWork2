import {getAuth, onAuthStateChanged} from '@firebase/auth'

export default defineNuxtRouteMiddleware( async(to,from) => {
  if (!process.server) {
    const auth = getAuth();
    const checkAuthState = new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async user => {
        if (user) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
    
    try {
      const user = await checkAuthState;
    } catch (err) {
      const toastStore = useToastStore();
      // 認証していない場合、ログインページにリダイレクトさせる
      if(to.path.startsWith('/login')){
        return;
      }else{
        toastStore.setErrorToast("ログインしてください。");
        return await navigateTo('/login');
      }
    }
  }
})