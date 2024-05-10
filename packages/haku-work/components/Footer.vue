<template>
  <v-footer class="bg-grey-lighten-3">
    <v-row no-gutters class="text-grey-darken-1">
      <v-col cols="12" class="d-flex flex-row justify-center m-4">
        <v-btn nuxt to='/' variant="text"><span class="fl-nomal">TOP</span></v-btn>
        <v-btn nuxt to='/about' variant="text"><span class="fl-nomal">ABOUT</span></v-btn>
        <v-btn nuxt to='/works' variant="text"><span class="fl-nomal">WORKS</span></v-btn>
      </v-col>
      <v-col sm="12" lg="12" class="d-flex flex-row justify-center">
        <a href="https://twitter.com/haku_craft1999" target="_blank" class="w-10"><img src="/img/x-logo.png" class="w-10 h-auto bg-slate-200 rounded-2xl p-2"></img></a>
      </v-col>
      <v-col class="text-center mt-4" cols="12">
        <p>© 2024 Haku-works</p>
      </v-col>
    </v-row>
    <v-btn justify="right" class="top-btn" icon="mdi-chevron-double-up" @click="returnTop"></v-btn>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
  }),
  mounted() {
    window.addEventListener("scroll", this.scrollWindow);
  },
  methods: {
    scrollWindow() {
      this.windowHeight = window.scrollY;
    },
    returnTop() {
      const duration = 400; // 移動速度
      const interval = 10; // 移動間隔
      const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        if (window.scrollY <= 0) {
          clearInterval(timer);
        }
      }, interval);
    }
  }
};
</script>

<style scoped>
</style>