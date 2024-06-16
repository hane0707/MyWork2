<script setup lang="ts">
const loading = ref(false);
const dispName = ref("");
const valid = ref(null);
const rules = [
  (value:string) => requireRule(value),
  (value:string) => maxCharRule(value),
]
const requireRule = (value:string) => {
    return value ? true : 'Required.'
}
const maxCharRule = (value:string) => {
    return (value || '').length <= 20 || '20文字以内で入力してください。'
}

const login = async () => {
  loading.value = true;
  const toastStore = useToastStore();
  const { login } = useAuthStore();
  const res = await login();
  if (res) {
    toastStore.setSuccessToast("ログインしました。");
    navigateTo("/", { replace: true }); // topページへ遷移
  } else {
    toastStore.setErrorToast("ログインに失敗しました。");
  }
  loading.value = false;
}
const signUp = async () => {
  const toastStore = useToastStore();
  if (!valid.value) {
    toastStore.setErrorToast("アカウント名が入力ルールを満たしていません。")
    return;
  }
  loading.value = true;
  const { signUp } = useAuthStore();
  const res = await signUp(dispName.value);
  if (res) {
    toastStore.setSuccessToast("アカウントを登録しました。");
    navigateTo("/", { replace: true }); // topページへ遷移
  } else {
    toastStore.setErrorToast("アカウントの登録に失敗しました。すでに同一のGoogleアカウントで登録済みの場合は「Login」ボタンからログインしてください。");
  }
  loading.value = false;
}
</script>

<template>
  <v-sheet width="100vw" height="100vh">
    <v-row>
      <v-col align="center" cols="12" class="row">
        <p class="message">Welcome</p>
      </v-col>
      <v-col align="center" cols="12">
        <v-card
          variant="tonal"
          max-width="500"
          title="Login Form"
          subtitle="Welcome home. Timekeeper."
          class="mx-5"
        >
          <v-btn @click="login"
            :loading="loading"
            color="purple-darken-2"
            prepend-icon="mdi-chess-knight"
            rounded="xl"
            size="large"
            class="mb-5"
          >
            <span>Login</span>
          </v-btn>
        </v-card>
      </v-col>
      <v-col align="center" cols="12">
        <v-card
          variant="tonal"
          max-width="500"
          title="SignUp Form"
          subtitle="Welcome New Timekeeper."
          class="mx-5"
        >
          <v-form v-model="valid" @submit.prevent="signUp" class="my-5">
            <v-text-field
              variant="filled"
              label="Please enter your user-name."
              v-model="dispName"
              :rules="rules"
              density="compact"
              clearable
              class="mx-10 mb-2"
            ></v-text-field>
            <v-btn 
              @click="signUp"
              :disabled="!valid"
              :loading="loading"
              color="deep-purple-darken-2"
              prepend-icon="mdi-chess-pawn"
              rounded="xl"
              size="large"
            >
              <span>signUp</span>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
</v-sheet>
</template>

<style scoped>
.message {
  font-size: xx-large;
}
.row {
  margin-top: 10%;
}
</style>