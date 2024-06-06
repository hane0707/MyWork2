<template>
  <v-app class="text-base">
    <NuxtLayout>
      <v-main>
        <NuxtPage />
      </v-main>
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
const title = 'Haku-manage'
useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ${title}` : title;
    },
    script: [{children: 'console.log(\'Hello Lady Z\')'}]
})
</script>
 
<style>
</style>
