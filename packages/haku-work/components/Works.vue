<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">WORKS</p>
    </div>
    <v-row>
      <v-col
      v-for="slide in slideContents"
        class="d-flex child-flex"
        :key="n"
        cols="12"
        xs="12"
        sm="4"
        lg="3"
      >
        <v-img
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
          :src="slide.image"
          aspect-ratio="1"
          class="bg-grey-lighten-2 card-image sepia hover:sepia-0"
          cover
        >
          <template v-slot:placeholder>
            <v-row
              align="center"
              class="fill-height ma-0"
              justify="center"
            >
              <v-progress-circular
                color="grey-lighten-5"
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
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
          image: "/img/temp5.jpg"
        },
        {
          title: 'タイトル3',
          contents: 'コンテンツ',
          image: "/img/temp6.jpg"
        },
        {
          title: 'タイトル4',
          contents: 'コンテンツ',
          image: "/img/temp7.jpg"
        },
        {
          title: 'タイトル5',
          contents: 'コンテンツ',
          image: "/img/temp8.jpg"
        },
        {
          title: 'タイトル6',
          contents: 'コンテンツ',
          image: "/img/temp9.jpg"
        },
        {
          title: 'タイトル1',
          contents: 'コンテンツ',
          image: "/img/temp4.jpg"
        },
        {
          title: 'タイトル2',
          contents: 'コンテンツ',
          image: "/img/temp5.jpg"
        },
      ]
    }
  }
}
</script>

<style scoped>
.card-image {
  transition: all 0.6s ease-in-out;
}
</style>