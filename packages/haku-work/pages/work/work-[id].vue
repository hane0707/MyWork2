<template>
  <v-container class="my-5">
    <div class="my-5 text-3xl border1999">
      <p class="custom-first-letter">ABOUT</p>
    </div>
    <v-card class="mx-auto">
        <v-card-text>
          <div class="item">
            <div>ID: "{{[$route.params.id]}}"</div>
        </div>
        </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
    export default {
        name: "ItemDetail",
        props: {
            id: String,
            name: String,
            price: Number,
            description: String,
        }
    }

</script>
