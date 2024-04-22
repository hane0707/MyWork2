<template>
    <header>
      <v-app-bar :elevation="2">
        <v-app-bar-title><NuxtLink to="/">haku-works</NuxtLink></v-app-bar-title>
        <template v-slot:append>
          <v-btn nuxt to='/about' text rounded class="my-2 text-decoration-none hidden-xs" color=''>About</v-btn>
          <v-btn nuxt to='/works' text rounded class="my-2 text-decoration-none hidden-xs" color=''>Works</v-btn>
          <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        location="right"
        class="bg-deep-purple"
      >
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item title="Top" link nuxt to="/"></v-list-item>
            <v-list-item title="About" link nuxt to="/about"></v-list-item>
            <v-list-item title="Works" link nuxt to="/works"></v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
    }
  }
}
</script>

<style>
</style>