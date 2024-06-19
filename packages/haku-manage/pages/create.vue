<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const {
  createWorkDetail
} = storeToRefs(useWorksStore());
const { 
  initWorkDetail,
  createWorkFirestore,
  createImagePathProperty,
  createGalleryImagesPathProperty,
} = useWorksStore();
const toastStore = useToastStore();
const inputImage = ref<string>("");
const renderKey = ref(0);
const validationErrorText = ref<string>("");
const imageUploadResultText = ref<string>("");
const successUploadText = "画像ファイルのアップロードに成功しました。"
const errorUploadText = "画像ファイルのアップロードに失敗しました。"
let dialog = ref(false);
let loading = ref(false);

const uploadImage = async (e: any) => {
  const file = e.target.files[0];
  // storeを更新
  const res = await createImagePathProperty(file);
  if (res) {
    // アップロードファイルにアクセス可能なURLを作成し、プレビュー表示
    inputImage.value = URL.createObjectURL(file);
    toastStore.setSuccessToast(successUploadText);
  } else {
    inputImage.value = "";
    toastStore.setErrorToast(errorUploadText);
  }
}

const uploadGallaryImages = async (e: any) => {
  const files = e.target.files;
  imageUploadResultText.value = "";
  if (!createWorkDetail.value.doc_name) {
    imageUploadResultText.value = "doc_nameを入力してください。ギャラリー用画像は 'img/{doc_name}/' 以下に登録されます。";
    toastStore.setErrorToast(errorUploadText);
    return;
  }
  if (files.length < 1) {
    imageUploadResultText.value = "画像ファイルが選択されませんでした。";
    toastStore.setErrorToast(errorUploadText);
    return;
  }

  loading.value = true;
  const result = await createGalleryImagesPathProperty(files);
  if (result) {
    renderKey.value = renderKey.value + 1; // 値を更新することで強制的に画像の一覧をリロードさせる
    toastStore.setSuccessToast(successUploadText);
  } else {
    toastStore.setErrorToast(errorUploadText);
  }
  loading.value = false;
}

const create = async () => {
  const toastStore = useToastStore();
  console.info("登録処理開始");
  const res = await createWorkFirestore();

  if (res.result == "success") {
    toastStore.setSuccessToast("登録しました。")
  } else if(res.result == "faild-exists") {
    toastStore.setErrorToast("すでに登録済みのdoc_nameです。")
  } else {
    toastStore.setErrorToast("登録に失敗しました。")
  }
  dialog.value = false;
}

onMounted(() => {
   initWorkDetail();
});
</script>

<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="py-2">doc_name</p>
      <v-text-field v-model="createWorkDetail.doc_name" variant="outlined" label="doc_name" class="pl-4"></v-text-field>
      <p class="py-2">title</p>
      <v-text-field v-model="createWorkDetail.title" variant="outlined" label="title" class="pl-4"></v-text-field>
    </div>
    <v-row class="mx-auto w-full h-full">
      <v-col class="" cols="12" xs="12" sm="12" lg="6">
        <p>メインイメージ（doc.image）となる画像を選択してください。</p>
        <v-sheet class="input-image-erea ml-4">
          <input @change="uploadImage" type="file" data-label="画像の添付" class="file-button">
          <p class="py-2">imageパス：{{createWorkDetail.image_path}}</p>
          <v-img :src="inputImage" :max-width="500"></v-img>
        </v-sheet>
      </v-col>
      <v-col cols="12" xs="12" sm="12" lg="6">
        <p class="py-2">title_en</p>
        <v-text-field v-model="createWorkDetail.title_en" variant="outlined" label="title_en" class="pl-4"></v-text-field>
        <p class="py-2">title_cn</p>
        <v-text-field v-model="createWorkDetail.title_cn" variant="outlined" label="title_cn" class="pl-4"></v-text-field>
        <p class="py-2">voice</p>
        <v-textarea v-model="createWorkDetail.voice" variant="outlined" label="voice" auto-grow clearable counter class="pl-4"></v-textarea>
        <p class="py-2">description</p>
        <v-textarea v-model="createWorkDetail.description" variant="outlined" label="description" auto-grow clearable counter class="pl-4"></v-textarea>
        <p class="py-2">material（本源）</p>
        <v-text-field v-model="createWorkDetail.material" variant="outlined" label="material　※全角スペース区切り" class="pl-4"></v-text-field>
        <p class="py-2">created_at（展示開始日）</p>
        <v-text-field v-model="createWorkDetail.created_at" variant="outlined" label="created_at　※yyyy-MM-dd形式（表示時はyyyy-M-d）" class="pl-4"></v-text-field>
      </v-col>
      <v-divider thickness="3"></v-divider>
      <v-col cols="12">
        <p>ギャラリー用画像一覧</p>
        <v-row class="mx-auto w-full h-full" :key="renderKey">
          <v-col v-for="(ga_image, index) in createWorkDetail.gallery_images_path_url" :key="index" class="d-flex child-flex mt-4" cols="6" xs="6" sm="4" lg="2">
            <v-card min-width="100%">
              <v-card-actions>
                <v-switch
                  v-model="ga_image.state"
                  inset
                  hide-details
                  density="compact"
                  color="green"
                >
                  <template v-slot:label>
                    <p class="text-caption">{{ga_image.path}}</p>
                  </template>
                </v-switch>
              </v-card-actions>
              <v-img
              :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
              :src="ga_image.url"
              aspect-ratio="1"
              class="bg-grey-lighten-2"
              cover
              >
                <template v-slot:placeholder>
                  <v-row
                    align="center"
                    class="fill-height ma-0"
                    justify="center"
                  >
                    <v-progress-circular
                      color="grey-lighten-5"
                      indeterminate
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12">
            <p>Firebase storageにギャラリー用画像を追加する場合、ファイルを選択してください。</p>
            <p class="text-red-accent-4 bold">{{imageUploadResultText}}</p>
            <div v-if="loading">
              <v-progress-circular
                indeterminate
                color="amber"
              ></v-progress-circular>
            </div>
            <v-sheet class="ml-4">
              <input v-if="!loading" @change="uploadGallaryImages" type="file" multiple data-label="画像の添付" class="file-button">
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="text-grey-darken-1">
        <v-btn nuxt to='/' prepend-icon="mdi-chevron-left" class="">
          <span class="fl-nomal">一覧へ戻る</span>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col xs="3" sm="4" lg="1" class="text-grey-darken-1">
        <v-btn prepend-icon="mdi-chess-rook" class="">
          <span class="fl-nomal">登録</span>
          <v-dialog
            v-model="dialog"
            activator="parent"
          >
            <div class="d-flex justify-center">
              <v-card variant="elevated" max-width="400">
                <v-card-title>Update waiting.</v-card-title>
                <v-divider thickness="3"></v-divider>
                <v-card-text>現在の入力値で登録していいですか？</v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="create">登録</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" @click="dialog = false">キャンセル</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
        </v-btn>
      </v-col>
      <!-- <v-col xs="3" sm="4" lg="1" class="text-grey-darken-1">
        <v-btn prepend-icon="mdi-delete" color="error" class="">
          <span class="fl-nomal">削除</span>
          <v-dialog
            v-model="dialog"
            activator="parent"
          >
            <div class="d-flex justify-center">
              <v-card variant="elevated" max-width="400">
                <v-card-title>Caution!</v-card-title>
                <v-divider thickness="3"></v-divider>
                <v-card-text>この操作は取り消せません。本当に削除しますか？</v-card-text>
                <v-card-actions>
                  <v-btn color="error" @click="dialog = false">削除</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" @click="dialog = false">キャンセル</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-dialog>
        </v-btn>
      </v-col> -->
    </v-row>
  </v-container>
</template>

<style scoped>
.input-image-erea {
  border: 2px solid #BDBDBD;
  border-radius: 0.375rem;
  padding: 10px;
}
.file-button {
  border: 2px grey dotted;
  padding: 30px 0px 30px 10px;
  width: 100%;
}
.file-button::file-selector-button {
  font-weight: bold;
  color: white;
  background: rgb(126, 126, 202);
  font-size: 14px;
  border: 1px solid rgb(191, 194, 199);
  border-radius: 0.375rem;
  padding: 8px 16px;
  text-align: center;
  cursor: pointer;
}
.card-label {
  font-size: xx-small;
}
</style>