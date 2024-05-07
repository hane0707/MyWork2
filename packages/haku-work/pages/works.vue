<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999 text-center">
      <p class="fl-1999">WORKS</p>
    </div>
    <v-row>
      <v-col
        v-for="(work, index) in works"
        :key="work.id"
        class="d-flex child-flex"
        :class="[index == 1 ? 'shake' : '']"
        cols="6"
        xs="6"
        sm="4"
        lg="3"
      >
        <div class="image-frame w-full h-full">
          <nuxt-link :to="`/work/work-${work.id}`">
            <v-img
              :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
              :src="work.image"
              aspect-ratio="1"
              class="bg-grey-lighten-2 work-image"
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
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorksStore } from '@/store/works'

const { works } = storeToRefs(useWorksStore());
const { getWorks } = useWorksStore();

onMounted(() => {
  getWorks();
});
</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.3em;
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