<template>
  <v-container>
    <p class="text-2xl">Works</p>
    <v-card
      class="mx-auto"
      max-width="36vh"
      height="28vh"
      color="surface-variant"
      image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
      subtitle="Take a walk down the beach"
      title="Evening sunset"
      nuxt to="/works"
    >
    </v-card>
    <NuxtLink
      to='/works'
      class="my-2 text-sm underline underline-offset-1 hover:text-gray-600/50 transition-all duration-500 ease-out"
    >View all…
    </NuxtLink>
  </v-container>
</template>