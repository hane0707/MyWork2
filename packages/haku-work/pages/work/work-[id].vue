<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999">
      <p class="fl-1999">{{workDetail.title}}</p>
    </div>
    <v-row class="mx-auto w-full h-full">
      <v-col class="d-flex child-flex" cols="12" xs="12" sm="12" lg="6">
        <img
          :lazy-src="`https://picsum.photos/10/6?image=15`"
          :src="workDetail.image"
          :max-width="700"
          class="bg-grey-lighten-2 work-image"
        >
        </img>
      </v-col>
      <v-col cols="12" xs="12" sm="12" lg="6">
        <div class="text-xl pt-4 font-bold">{{workDetail.title_en}} / {{workDetail.title_cn}}</div>
        <div class="p-8 max-w-2xl italic">"{{workDetail.voice}}"</div>
        <div class="px-8 pb-16 max-w-2xl">{{workDetail.description}}</div>
        <div class="text-xl font-bold">本源</div>
        <div class="text-base pt-2 pl-4 pb-4">{{workDetail.material}}</div>
        <div class="text-xl font-bold">展示開始日</div>
        <div class="text-base pt-2 pl-4">{{workDetail.created_at}}</div>
      </v-col>
      
      <v-col v-for="(ga_image, index) in workDetail.gallery_images" :key="index" class="d-flex child-flex" cols="6" xs="6" sm="4" lg="3">
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
      </v-col>
      <v-col cols="12" class="text-grey-darken-1">
        <v-btn nuxt to='/works' prepend-icon="mdi-chevron-left" class="">
          <span class="fl-nomal">WORKS</span>
        </v-btn>
      </v-col>
</v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorksStore } from '@/store/works'

const route = useRoute();
const id = parseInt(route.params.id, 10)-1;
const { works } = storeToRefs(useWorksStore());
const { workDetail } = storeToRefs(useWorksStore());
const { getWorks } = useWorksStore();
const { getDetailWork } = useWorksStore();

onMounted(() => {
  getWorks();
  getDetailWork(id);
});

console.log("title:")
console.log(workDetail.title)
useHead({ title: workDetail.title })

definePageMeta({
  middleware: ['redirect']
})
</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.4em;
}
.work-image {
  transition: all 0.6s ease-in-out;
  margin-bottom: 20px;
}
</style>