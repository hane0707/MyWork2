<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">ABOUT</p>
    </div>
    <v-row>
      <v-col cols="" class="mr-10 d-flex flex-row justify-center">
        <v-img class="about-image" :src="aboutImage"></v-img>
      </v-col>
      <v-col cols="" class="mr-10">
        <p class="text-2xl">haku :</p>
        <p class="text-lg pl-4">リバース1999に登場する展示品を立体化している神秘学家。</p>
        <p class="text-sm pl-4">※掲載作品はリバース1999の二次創作物となります。</p>
        <br>
        <NuxtLink
        to='/about'
        class="my-2 text-sm pl-4 custom-textlink hover:custom-textlink-hover"
        >View all…
        </NuxtLink>  
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: true,
    aboutImage: "/img/temp4.jpg"
  })
}
</script>

<style scoped>
</style>