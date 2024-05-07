<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="fl-1999">WORKS</p>
    </div>
    <v-row>
      <v-col
      v-for="(work, index) in worksContents"
        class="d-flex child-flex"
        :key="index"
        cols="6"
        xs="6"
        sm="4"
        lg="3"
      >
        <v-img
          :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
          :src="work.image"
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
      worksContents: [
        {
          image: "/img/temp4.jpg"
        },
        {
          image: "/img/temp5.jpg"
        },
        {
          image: "/img/temp6.jpg"
        },
        {
          image: "/img/temp7.jpg"
        },
        {
          image: "/img/temp8.jpg"
        },
        {
          image: "/img/temp9.jpg"
        },
        {
          image: "/img/temp4.jpg"
        },
        {
          image: "/img/temp5.jpg"
        },
      ]
    }
  }
}
</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.3em;
}
.card-image {
  transition: all 0.6s ease-in-out;
}
</style>