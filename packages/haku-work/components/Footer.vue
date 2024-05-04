<template>
  <v-footer class="bg-grey-lighten-3">
    <v-row justify="center" no-gutters class="text-grey-darken-1">
      <v-btn nuxt to='/' class="hidden-xs text-sm" variant="text" color=''><span class="custom-first-letter">TOP</span></v-btn>
      <v-btn nuxt to='/about' class="hidden-xs" variant="text" color=''><span class="custom-first-letter">ABOUT</span></v-btn>
      <v-btn nuxt to='/works' class="hidden-xs" variant="text" color=''><span class="custom-first-letter">WORKS</span></v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Haku-works</strong>
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