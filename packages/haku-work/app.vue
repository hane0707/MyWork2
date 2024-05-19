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
const title = 'Haku-works'
useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - ${title}` : title;
    },
    meta: [
      {name: 'description', content: '当サイトはリバース:1999の二次創作ファンサイトです。ここでは、私 [haku] の作った2次創作作品の再展示をしています。「なければ作る」を行動指針に、リバース:1999に登場する芸術品を立体化しています。'}
    ],
    script: [{children: 'console.log(\'Hello TimeKeeper\')'}]
})
</script>
 
<style>
</style>
