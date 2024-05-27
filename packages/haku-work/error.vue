<template>
  <div class="main relative w-screen h-screen">
    <div class="stack">
      <Error404 v-if="error.statusCode === 404"/>
      <p class="error-message">{{ error?.message }}</p>

      <v-btn @click="handleError" prepend-icon="mdi-chevron-right" color="black" size="x-large" class="btn w-full mt-6">
        <span class="fl-nomal">Back to Top page</span>
      </v-btn>
    </div>
    <img src="/img/1999bg.png" alt="" class="w-full h-full object-cover absolute">
  </div>
</template>

<script setup lang="ts">
const error = useError();
const handleError = () => clearError({redirect: '/'})
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}
.stack {
  z-index: 999;
}
.btn {
  text-transform: none;
}
img {
  background-color: #57486c;
}
</style>