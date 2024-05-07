<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">{{works[id].title}}</p>
    </div>
    <v-row class="mx-auto w-full h-full">
      <v-col
        class="d-flex child-flex"
        cols="12"
        xs="12"
        sm="12"
        lg="6"
      >
        <img
          :lazy-src="`https://picsum.photos/10/6?image=15`"
          :src="works[id].image"
          :max-width="700"
          class="bg-grey-lighten-2 work-image"
        >
        </img>
      </v-col>
      <v-col>
        <div class="p-8">{{works[id].description}}</div>
        <div class="text-xl">本源</div>
        <div class="text-base pl-4 pb-4">{{works[id].material}}</div>
        <div class="text-xl">展示開始日</div>
        <div class="text-base pl-4">{{works[id].created_at}}</div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorksStore } from '@/store/works'
// const store = useWorksStore()

const route = useRoute();
const { works } = storeToRefs(useWorksStore());
const id = parseInt(route.params.id, 10)-1;
// const work = works.find(a => (
//         a.id === work_id
//       ));

// export default {
//   // ダミーデータ
//   data () {
//     return {
//       workContent:
//         {
//           title: "ソネット",
//           text: "紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。紹介文が入ります。",
//           material: "石膏　石粉粘土　水性ホビーカラー",
//           createDate: "2023年11月",
//           image: "/img/temp4.jpg"
//         },
//       }
//     }
//   }

</script>

<style scoped>
.work-image {
  transition: all 0.6s ease-in-out;
  margin-bottom: 20px;
}
</style>