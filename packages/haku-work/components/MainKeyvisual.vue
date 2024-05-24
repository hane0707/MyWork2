<template>
  <v-container fluid class="main-visual relative h-svh mb-20">
    <!-- PC用キービジュアル -->
    <div class="slider absolute w-full h-full hidden-xs" v-for="(image, i) in kv_lg" :key="i">
      <img
        class="slider-image w-full h-full object-cover"
        :class="{ show: currentImageId == i }"
        :src="image"
      />
    </div>
    <!-- スマホ用キービジュアル -->
    <div class="slider absolute w-full h-full hidden-sm-and-up" v-for="(image, i) in kv_sm" :key="i">
      <img
        class="slider-image w-full h-full object-cover"
        :class="{ 'show': currentImageId == i }"
        :src="image"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    currentImageId: 0,
    kv_lg: [
      "/img/kv/lg/kv1.jpg",
      "/img/kv/lg/kv2.jpg",
      "/img/kv/lg/kv3.jpg",
      "/img/kv/lg/kv4.jpg",
      "/img/kv/lg/kv5.jpg",
      "/img/kv/lg/kv6.jpg",
    ],
    kv_sm: [
      "/img/kv/sm/kv1.jpg",
      "/img/kv/sm/kv2.jpg",
      "/img/kv/sm/kv3.jpg",
      "/img/kv/sm/kv4.jpg",
      "/img/kv/sm/kv5.jpg",
      "/img/kv/sm/kv6.jpg",
    ]
  }),
  mounted() { // 5秒ごとに次の画像に
    setInterval(() => {
      this.changeNextSlide()
    }, 5000)
  },
  methods: {
    changeNextSlide() { // 表示するcurrentの画像を変えるため、加算していく
      if (this.currentImageId < this.kv_lg.length - 1) {
        this.currentImageId += 1
      } else {
        this.currentImageId = 0
      }
    },
  }
}
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