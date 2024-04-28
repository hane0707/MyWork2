<template>
  <v-container fluid class="main-visual h-svh mb-20">
    <div class="slider" v-for="(image, i) in images" :key="i">
      <img :class="{ show: currentImageId == i }" class="slider-image" :src="image" />
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

<style>
.main-visual {
  position: relative;
}
.slider {
  position: absolute;
  width: 100%;
  height: 100%;
}
.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: all 1s ease-in-out;
}
.show {
  opacity: 1;
}
</style>