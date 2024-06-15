<script setup lang="ts">
import { storeToRefs } from 'pinia';
const {
  isActive
} = storeToRefs(useToastStore());
const toastStore = useToastStore()
</script>

<template>
  <v-snackbar
    v-model="isActive"
    multi-line
    timeout="3000"
    :color="toastStore.color"
    location="top center"
    variant="tonal"
    class="py-2"
    @on-vnode-unmounted="toastStore.unsetSnackbar()"
  >
    {{ toastStore.text }}
  </v-snackbar>
</template>