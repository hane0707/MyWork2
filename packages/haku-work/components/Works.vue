<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="fl-1999">WORKS</p>
    </div>
    <v-row>
      <v-col
        v-for="(work, index) in works"
        :key="work.id"
        class="d-flex child-flex"
        cols="6"
        xs="6"
        sm="4"
        lg="3"
      >
        <nuxt-link :to="`/work/work-${work.id}`" class="w-full h-full">
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
            :src="work.image"
            aspect-ratio="1"
            class="bg-grey-lighten-2 card-image sepia hover:sepia-0"
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
      </v-col>
    </v-row>
    <NuxtLink
      to="/works"
      class="my-2 text-sm custom-textlink hover:custom-textlink-hover"
    >View all…
    </NuxtLink>
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
  padding:0 0 0 0.4em;
}
.card-image {
  transition: all 0.6s ease-in-out;
}
</style>