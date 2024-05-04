<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999 text-center">
      <p class="custom-first-letter">WORKS</p>
    </div>
    <v-row>
      <v-col
      v-for="(work, index) in worksContents"
        :key="index"
        class="d-flex child-flex"
        :class="[index == 1 ? 'shake' : '']"
        cols="6"
        xs="6"
        sm="4"
        lg="3"
      >
        <div class="image-frame w-full h-full">
          <nuxt-link :to="`/work/work-${work.id}`">
            <v-img
              :lazy-src="`https://picsum.photos/10/6?image=${index * 5 + 10}`"
              :src="work.image"
              aspect-ratio="1"
              class="bg-grey-lighten-2 work-image"
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
          </nuxt-link>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
let overlay;

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
  // created() {
  //   this.$store.dispatch('fetchWorks')
  // },
  data () {
    return {
      absolute: true,
      overlay: false,
      worksContents: [
        {
          id: "1",
          title: "タイトル1",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp4.jpg"
        },
        {
          id: "2",
          title: "タイトル2",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp5.jpg"
        },
        {
          id: "3",
          title: "タイトル3",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp6.jpg"
        },
        {
          id: "4",
          title: "タイトル4",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp7.jpg"
        },
        {
          id: "5",
          title: "タイトル5",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp8.jpg"
        },
        {
          id: "6",
          title: "タイトル6",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp9.jpg"
        },
        {
          id: "7",
          title: "タイトル1",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp4.jpg"
        },
        {
          id: "8",
          title: "タイトル2",
          text: "紹介文が入ります。",
          material: "素材名が入ります。",
          createDate: "",
          image: "/img/temp5.jpg"
        },
      ]
    }
  },
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