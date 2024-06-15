<template>
  <Header />
  <div class="text-grey-lighten-1">
    <slot />
    <Toast />
  </div>
</template>

<style>
html {
  font-family: "Noto Serif JP", serif;
  font-weight: 400;
  font-style: normal;
}
</style>