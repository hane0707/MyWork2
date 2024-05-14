<template>
  <div class="stack">
    <h1 class="error-code">404</h1>
    <p class="error-message">{{ error?.message }}</p>
  </div>
</template>

<script setup lang="ts">
const error = useError();
</script>

<style scoped>
</style>