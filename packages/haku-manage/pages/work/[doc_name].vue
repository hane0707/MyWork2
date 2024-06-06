<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const route = useRoute();
const doc_name = route.params.doc_name;
const { workDetail, newWorkDetail } = storeToRefs(useWorksStore());
const { 
  getDetailWork,
  deleteWorkFromFirestore,
  updateImagePathProperty,
  updateGalleryImagesPathProperty,
  updateGalleryImagesArrayState
} = useWorksStore();
const input_image = ref<string>("");
const input_gallery_images = ref<string[]>([]);
let dialog = ref(false);

const deleteWork = (doc_name: string) => {
    deleteWorkFromFirestore(doc_name);
}

const uploadImage = (e: any) => {
  const file = e.target.files[0];

  // storeを更新（states.ts呼び出し）
  updateImagePathProperty(file.name);

  // アップロードファイルにアクセス可能なURLを作成し、プレビュー表示
  const url = URL.createObjectURL(file);
  input_image.value = url;
}
const deleteFile = () => {
  input_image.value = "";
}
const uploadGallaryImages = (e: any) => {
  const files = e.target.files;
  updateGalleryImagesPathProperty(files);
}

const onChangeGalleryImageCheck = (gallery_images_index: number) => {
  updateGalleryImagesArrayState(gallery_images_index);
}

const update = () => {
  console.log("更新処理開始")
}

onMounted(() => {
  getDetailWork(doc_name);
});

useHead({ title: route.params.id })
</script>

<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="py-2">title：{{workDetail.title}}</p>
      <v-text-field v-model="newWorkDetail.title" variant="outlined" label="更新後のtitle" class="pl-4"></v-text-field>
    </div>
    <v-row class="mx-auto w-full h-full">
      <v-col class="" cols="12" xs="12" sm="12" lg="6">
        <p class="py-2">imageURL：{{workDetail.image}}</p>
        <v-img
          :lazy-src="`https://picsum.photos/10/6?image=15`"
          :src="workDetail.image"
          :max-width="700"
          class="bg-grey-lighten-2 mb-4"
          cover
        >
        </v-img>
        <p>メインイメージ（doc.image）を更新する場合、画像を選択してください。</p>
        <v-sheet class="input-image-erea ml-4">
          <input @change="uploadImage" type="file" data-label="画像の添付" class="file-button">
          <p class="py-2">更新後のimageパス：{{newWorkDetail.image_path}}</p>
          <v-img :src="input_image" :max-width="500"></v-img>
        </v-sheet>
      </v-col>
      <v-col cols="12" xs="12" sm="12" lg="6">
        <p class="py-2">title_en：{{workDetail.title_en}}</p>
        <v-text-field v-model="newWorkDetail.title_en" variant="outlined" label="更新後のtitle_en" class="pl-4"></v-text-field>
        <p class="py-2">title_cn：{{workDetail.title_cn}}</p>
        <v-text-field v-model="newWorkDetail.title_cn" variant="outlined" label="更新後のtitle_cn" class="pl-4"></v-text-field>
        <p class="py-2">voice：{{workDetail.voice}}</p>
        <v-textarea v-model="newWorkDetail.voice" variant="outlined" label="更新後のvoice" auto-grow clearable counter class="pl-4"></v-textarea>
        <p class="py-2">description：{{workDetail.description}}</p>
        <v-textarea v-model="newWorkDetail.description" variant="outlined" label="更新後のdescription" auto-grow clearable counter class="pl-4"></v-textarea>
        <p class="py-2">material（本源）：{{workDetail.material}}</p>
        <v-text-field v-model="newWorkDetail.material" variant="outlined" label="更新後のmaterial　※全角スペース区切り" class="pl-4"></v-text-field>
        <p class="py-2">created_at（展示開始日）：{{workDetail.created_at}}</p>
        <v-text-field v-model="newWorkDetail.created_at" variant="outlined" label="更新後のcreated_at　※yyyy-MM-dd形式（表示時はyyyy-M-d）" class="pl-4"></v-text-field>
      </v-col>
      <v-col v-for="(ga_image, index) in workDetail.gallery_images" :key="index" class="d-flex child-flex" cols="6" xs="6" sm="4" lg="2">
        <v-card>
          <v-card-actions>
            <v-checkbox @change="onChangeGalleryImageCheck(index)" :key="index" :input-value="index" density="compact" hide-details>
              <template v-slot:label>
                <p>{{newWorkDetail.gallery_images_path[index].path}}</p>
              </template>
            </v-checkbox>
          </v-card-actions>
          <v-img
          :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
          :src="ga_image"
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
        <p>ギャラリー画像（doc.gallary_images）を追加する場合、画像を選択してください。</p>
        <v-sheet class="ml-4">
          <input @change="uploadGallaryImages" type="file" multiple data-label="画像の添付" class="file-button">
        </v-sheet>
      </v-col>
      <v-col cols="6" class="text-grey-darken-1">
        <v-btn nuxt to='/' prepend-icon="mdi-chevron-left" class="">
          <span class="fl-nomal">一覧へ戻る</span>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col xs="3" sm="4" lg="1" class="text-grey-darken-1">
        <v-btn @click="update" prepend-icon="mdi-chevron-left" class="">
          <span class="fl-nomal">更新</span>
        </v-btn>
      </v-col>
      <v-col xs="3" sm="4" lg="1" class="text-grey-darken-1">
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
      </v-col>
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
  border: 2px red dotted;
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
</style>