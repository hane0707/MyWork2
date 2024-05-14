<template>
  <div class="main relative w-screen h-screen">
    <div class="stack">
      <Error404 v-if="error.statusCode === 404"/>
      <p class="error-message">{{ error?.message }}</p>
      <v-btn nuxt to='/works' prepend-icon="mdi-chevron-right" color="black" class="btn w-full mt-6">
        <span class="fl-nomal">Back to Top page</span>
      </v-btn>  
    </div>
    <img src="/img/1999bg.png" alt="" class="w-full h-full object-cover absolute">
  </div>
</template>

<script setup lang="ts">
const error = useError();
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message {
  font-weight: lighter;
  color: antiquewhite;
}
.btn {
  text-transform: none;
}
img {
  z-index: -1;
}
</style>