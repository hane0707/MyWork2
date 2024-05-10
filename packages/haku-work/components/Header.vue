<template>
    <header>
      <v-app-bar :elevation="0">
        <v-app-bar-title><NuxtLink to="/" class="text-xl text-grey-darken-2">Haku-works</NuxtLink></v-app-bar-title>
        <template v-slot:append>
          <div class="text-grey-darken-1">
            <v-btn nuxt to='/' class="hidden-xs"><span class="fl-nomal">TOP</span></v-btn>
            <v-btn nuxt to='/about' class="hidden-xs"><span class="fl-nomal">ABOUT</span></v-btn>
            <v-btn nuxt to='/works' class="hidden-xs"><span class="fl-nomal">WORKS</span></v-btn>
            <v-btn variant="text" class="hidden-sm-and-up" @click.stop="drawer = !drawer">
              <img :src="image" class="w-8"></img>
            </v-btn>
        </div>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        location="right"
      >
        <v-list nav dense>
          <v-list-item title="TOP" link nuxt to="/"></v-list-item>
          <v-list-item title="ABOUT" link nuxt to="/about"></v-list-item>
          <v-list-item title="WORKS" link nuxt to="/works"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    </header>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    image: "/img/navigation1999.svg",
  }),
}
</script>

<style>
</style>