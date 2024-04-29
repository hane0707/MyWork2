<template>
  <v-footer class="bg-grey-lighten-3">
    <v-row justify="center" no-gutters class="text-grey-darken-1">
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        rounded="xl"
        variant="text"
      >
        {{ link }}
      </v-btn>
      <v-btn class="top-btn" @click="returnTop">Top</v-btn>
      <v-col class="text-center mt-4" cols="12">
        {{ new Date().getFullYear() }} — <strong>Haku-works</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
        'TOP',
        'ABOUT',
        'WORKS',
        'Privacy Policy',
    ],
    scrollPosition: [{
      headerHeight: "",
      windowHeight: ""
    }],
  }),
  mounted() {
    window.addEventListener("scroll", this.scrollWindow);
  },
  methods: {
    scrollWindow() {
      this.windowHeight = window.scrollY;
    },
    returnTop() {
      const duration = 400; // 移動速度
      const interval = 10; // 移動間隔
      const step = -window.scrollY / Math.ceil(duration / interval); // 1回に移動する距離
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        if (window.scrollY <= 0) {
          clearInterval(timer);
        }
      }, interval);
    }
  }
};
</script>