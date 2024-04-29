<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">WORKS</p>
    </div>
    <v-slide-group show-arrows>
      <v-slide-group-item v-for="slide in slideContents">
        <v-card
          class="mr-5 w-60 h-60"
          :title="slide.title"
          :subtitle="slide.contents"
          nuxt to="/works"
        >
        <v-img cover class="card-image sepia hover:sepia-0" :src="slide.image"></v-img>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
    <NuxtLink
      to="/works"
      class="my-2 text-sm custom-textlink hover:custom-textlink-hover"
    >View all…
    </NuxtLink>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      slideContents: [
        {
          title: 'タイトル1',
          contents: 'コンテンツ',
          image: "/img/temp4.jpg"
        },
        {
          title: 'タイトル2',
          contents: 'コンテンツ',
          image: "/img/temp1.jpg"
        },
        {
          title: 'タイトル3',
          contents: 'コンテンツ',
          image: "/img/temp2.jpg"
        },
        {
          title: 'タイトル4',
          contents: 'コンテンツ',
          image: "/img/temp3.jpg"
        },
        {
          title: 'タイトル5',
          contents: 'コンテンツ',
          image: "/img/temp4.jpg"
        },
        {
          title: 'タイトル6',
          contents: 'コンテンツ',
          image: "/img/temp1.jpg"
        },
        {
          title: 'タイトル7',
          contents: 'コンテンツ',
          image: "/img/temp2.jpg"
        }
      ]
    }
  }
}
</script>

<style scoped>
.card-image {
  transition: all 1s ease-in-out;
}
</style>