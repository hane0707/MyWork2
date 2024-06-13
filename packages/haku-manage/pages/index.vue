<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';

const { works, sort } = storeToRefs(useWorksStore());
const { getWorksFirestore } = useWorksStore();
const headers: any = [
  { title: 'doc_name', key: 'doc_name' },
  { title: 'created_at', key: 'created_at' },
  { title: 'title', key: 'title', sortable: false },
  { title: 'title_en', key: 'title_en', sortable: false },
  { title: 'title_cn', key: 'title_cn', sortable: false },
  { title: 'material', key: 'material', sortable: false },
  { title: '画像の登録点数', key: 'image_count', sortable: false },
  { title: '編集', key: 'edit', sortable: false },
]
const search = ref("");
const goToEditPage = (doc_name: string) => {
    navigateTo("/work/" + doc_name)
}

onMounted(() => {
  getWorksFirestore("desc");
});

/**
 * worksの表示順変更
*/
function sortChange() {
  const changed_sort = (sort.value === "desc") ? "asc" : "desc";
  getWorksFirestore(changed_sort);
}
</script>

<template>
  <v-container>
    <div class="mb-4 flex flex-row-reverse">
      <v-btn @click="sortChange()" variant="text" prepend-icon="mdi-swap-vertical">sort works</v-btn>
    </div>
    <v-text-field
      v-model="search"
      class="mb-2"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      flat
      hide-details
      single-line
    ></v-text-field>
    <v-data-table
      :items="works"
      :headers="headers"
      :search="search"
      density="compact"
      items-per-page="30"
      items-per-page-text="表示行数"
      class="elevation-1"
    >
      <template v-slot:item.image_count="{ item }">
        {{ (item.gallery_images.length).toString() }}
      </template>
      <template v-slot:item.edit="{ item }">
        <v-icon
          size="large"
          @click="goToEditPage(item.doc_name)"
        >
          mdi-folder-edit-outline
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<style>
.v-data-table thead th span {
  font-weight: bold;
  font-size: large;
}
.v-data-table tr:hover td {
  background-color: gray;
}
</style>