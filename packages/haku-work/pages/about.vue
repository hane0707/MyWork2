<template>
  <v-container class="fadein my-5">
    <div class="my-5 text-3xl border1999 text-center">
      <p class="fl-1999">ABOUT</p>
    </div>
    <v-card variant="flat">
      <v-layout class="d-flex justify-center">
        <v-avatar size="256">
        <v-img
          class=""
          :src="aboutImage"
        >
        </v-img>
        </v-avatar>
      </v-layout>
      <v-container class="textarea">
        <v-card-text class="about-text text-left">
          <p>リバース:1999に登場する芸術品を、2次創作として私[haku] が立体化しここで再展示しています。</p>
          <br>
          <p>ここにいる間は、<ruby>神秘学家<rt>アルカニスト</rt></ruby>界で稀有な才能を持つタイムキーパーのスーツケースと同様、雨を気にせずにお過ごしいただけます。</p>
          <p>どうぞお好きなお部屋でくつろぎながらご鑑賞ください。</p>
          <br>
          <p>※<ruby>神秘学家<rt>アルカニスト</rt></ruby>/人間の方関係なくお楽しみいただけます。</p>
        </v-card-text>
      </v-container>
      
    </v-card>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      title: 'About',
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'このサイトについて。',
      }]
    }
  },
  data: () => ({
    aboutImage: "/img/about_image.jpg"
  })
}

</script>

<style scoped>
.fl-1999::first-letter {
  padding:0 0 0 0.7em;
}
.textarea {
  max-width: 720px;
  min-height: 340px;
}
.about-text {
  font-weight: 900;
  letter-spacing: 0.015em;
}
.about-text::first-letter {
  font-size:1.4em;
  color: red;
}
</style>