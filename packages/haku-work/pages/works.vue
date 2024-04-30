<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">WORKS</p>
    </div>
    <v-row>
      <v-col
      v-for="(slide, index) in slideContents"
        :key="n"
        class="d-flex child-flex"
        :class="[index == 1 ? 'shake' : '']"
        cols="12"
        xs="12"
        sm="4"
        lg="3"
      >
        <div class="image-frame w-full h-full">
          <v-img
            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
            :src="slide.image"
            aspect-ratio="1"
            class="bg-grey-lighten-2 work-image"
            cover
            @click="overlay = !overlay"
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head () {
    return {
      title: "Works",
      meta: [{
        hid: "description",
        name: "description",
        content: "作品の一覧ページ。",
      }]
    }
  },
  data () {
    return {
      slideContents: [
        {
          title: "タイトル1",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp4.jpg"
        },
        {
          title: "タイトル2",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp5.jpg"
        },
        {
          title: "タイトル3",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp6.jpg"
        },
        {
          title: "タイトル4",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp7.jpg"
        },
        {
          title: "タイトル5",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp8.jpg"
        },
        {
          title: "タイトル6",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp9.jpg"
        },
        {
          title: "タイトル1",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp4.jpg"
        },
        {
          title: "タイトル2",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp5.jpg"
        },
      ]
    }
  }
}
</script>

<style scoped>
.image-frame {
  overflow: hidden;
}
.work-image {
  transition: all 0.6s ease-in-out;
}
.work-image:hover {
  transform:scale(1.2,1.2);
}
</style>