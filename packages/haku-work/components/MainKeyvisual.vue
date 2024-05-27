<template>
  <v-container fluid class="main-visual relative h-svh mb-20">
    <!-- PC用キービジュアル -->
    <div class="slider absolute w-full h-full hidden-xs" v-for="(image, i) in kvLg" :key="i">
      <img
        class="slider-image w-full h-full object-cover"
        :class="{ show: currentKvImageId == i }"
        :src="image"
      />
    </div>
    <!-- スマホ用キービジュアル -->
    <div class="slider absolute w-full h-full hidden-sm-and-up" v-for="(image, i) in kvSm" :key="i">
      <img
        class="slider-image w-full h-full object-cover"
        :class="{ 'show': currentKvImageId == i }"
        :src="image"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWorksStore } from '@/store/works';

const { kvLg, kvSm, currentKvImageId } = storeToRefs(useWorksStore());
const { getKeyVisualImage, changeNextSlide } = useWorksStore();

onMounted(() => {
  getKeyVisualImage();
  setInterval(() => {
      changeNextSlide()
    }, 5000)
});
</script>

<style scoped>
.main-visual {
  padding: 0;
}
.slider-image {
  opacity: 0;
  transition: all 1s ease-in-out;
}
.show {
  opacity: 1;
}
</style>