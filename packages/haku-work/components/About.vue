<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">ABOUT</p>
    </div>
    <v-card class="mx-auto">
      <v-img
      class="align-top"
      :src="aboutImage"
      max-height="700"
      cover  
      >
        <v-card-text>
          <div class="text-base">
            <p>ここでは、私 [haku] の作った2次創作作品の再展示をしています。</p>
            <p>「なければ作る」を行動指針に、リバース:1999に登場する展示作品を立体化しています。</p>
          </div>
          <br>
          <NuxtLink
          to='/about'
          class="my-2 text-sm pl-4 custom-textlink hover:custom-textlink-hover"
          >View more…
          </NuxtLink>
        </v-card-text>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    show: true,
    aboutImage: "/img/temp8.jpg"
  })
}
</script>

<style scoped>
.bg {
  background-image: url("/img/about-section.jpg");
}
</style>