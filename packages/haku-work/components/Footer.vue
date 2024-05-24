<template>
  <v-footer class="bg-grey-lighten-3">
    <v-row no-gutters class="text-grey-darken-1">
      <v-col sm="12" lg="5" class="m-4 d-flex flex-row justify-center">
        <p class="text-3xl mr-4">Haku-works</p>
      </v-col>
      <v-col cols="5" class="m-4 hidden-sm">
        <v-btn nuxt to='/' variant="text"><span class="fl-nomal text-xs mx-5">TOP</span></v-btn>
        <v-btn nuxt to='/about' variant="text"><span class="fl-nomal text-xs mx-5">ABOUT</span></v-btn>
        <v-btn nuxt to='/works' variant="text"><span class="fl-nomal text-xs mx-5">WORKS</span></v-btn>
        <v-btn nuxt to='/privacy-policy' variant="text"><span class="fl-nomal text-xs mx-5">PRIVACY POLICY</span></v-btn>
      </v-col>
      <v-col sm="12" lg="5" class="d-flex flex-row justify-center">
        <a href="https://twitter.com/haku_craft1999" target="_blank" class="w-10"><img src="/img/x-logo.png" class="w-10 h-auto bg-slate-200 rounded-2xl p-2"></img></a>
      </v-col>
      <v-col class="text-center mt-4" cols="12">
        <p>© 2024 Haku-works</p>
      </v-col>
    </v-row>
    <v-btn justify="right" class="top-btn" icon="mdi-chevron-double-up" @click="returnTop"></v-btn>
  </v-footer>
</template>

<script setup lang="ts">
function returnTop() {
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
</script>

<style scoped>
</style>