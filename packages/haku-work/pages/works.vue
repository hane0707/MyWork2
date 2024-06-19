<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999 text-center">
      <p class="fl-1999">WORKS</p>
    </div>
    <div class="mb-4 flex flex-row-reverse">
      <v-btn @click="sortChange()" variant="text" prepend-icon="mdi-swap-vertical">sort works</v-btn>
    </div>
    <v-row>
      <v-col
        v-for="(work, index) in works"
        :key="work.doc_name"
        class="d-flex child-flex"
        :class="[index == 1 ? 'shake' : '']"
        cols="6"
        xs="6"
        sm="4"
        lg="3"
      >
        <div class="image-frame w-full h-full">
          <nuxt-link :to="`/work/work-${work.doc_name}`">
            <v-img
              :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
              :src="work.image"
              aspect-ratio="1"
              class="bg-grey-lighten-2 work-image carbuncle-cursor"
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
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
useHead({ title: 'Works' })

import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorksStore } from '@/store/works'

const { works, sort } = storeToRefs(useWorksStore());
const {
  // getWorks,
  getWorksFirestore } = useWorksStore();

onMounted(() => {
  // getWorks(); // ダミーデータから取得に切り替える場合
  getWorksFirestore("desc");
});

/**
 * worksの表示順変更
*/
function sortChange() {
  const changed_sort = (sort.value === "desc") ? "asc" : "desc";
  getWorksFirestore(changed_sort);
}
</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.4em;
}
.image-frame {
  overflow: hidden;
}
.work-image {
  transition: all 0.6s ease-in-out;
}
.work-image:hover {
  transform:scale(1.2,1.2);
}
</style>