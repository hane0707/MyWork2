<template>
  <v-container fluid class="main-visual relative h-svh mb-20">
    <div class="slider absolute w-full h-full" v-for="(image, i) in images" :key="i">
      <img
        class="slider-image w-full h-full object-cover"
        :class="{ show: currentImageId == i }"
        :src="image"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: true,
    currentImageId: 0,
    images: [
        "/img/temp4.jpg",
        "/img/temp2.jpg",
        "/img/temp3.jpg"
    ]
  }),
  mounted() { // 5秒ごとに次の画像に
    setInterval(() => {
      this.changeNextSlide()
    }, 5000)
  },
  methods: {
    changeNextSlide() { // 表示するcurrentの画像を変えるため、加算していく
      if (this.currentImageId < this.images.length - 1) {
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