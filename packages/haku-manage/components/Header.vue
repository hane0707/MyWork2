<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());
const { logout } = useAuthStore()
const link = "https://haku-works.web.app"
const drawer = ref<boolean>(false);
const image = "/img/navigation1999_light.svg";
</script>

<template>
  <header>
    <v-app-bar :elevation="0">
      <v-app-bar-title><NuxtLink to="/" class="text-xl text-grey-lighten-2">Haku-works 管理サイト</NuxtLink></v-app-bar-title>
      <template v-slot:append>
        <div class="text-grey-lighten-1">
          <v-btn href="https://haku-works.web.app" target="_blank" prepend-icon="mdi-open-in-new" class="hidden-xs"><span>Haku-works</span></v-btn>
          <v-btn @click="logout" prepend-icon="mdi-logout" class="hidden-xs"><span>Logout</span></v-btn>
          <p v-if="user.name" class="text-right hidden-xs">user:{{user.name}}</p>
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
      <v-list-item title="TOP" link nuxt to="/" prepend-icon="mdi-list-box-outline"></v-list-item>
      <v-list-item title="Haku-works" :href="link" target="_blank" prepend-icon="mdi-open-in-new" class="mb-16"></v-list-item>
      <v-list-item title="Logout" @click="logout" prepend-icon="mdi-logout"></v-list-item>
      <v-list-item :title="'user name：' + user.name"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</header>
</template>