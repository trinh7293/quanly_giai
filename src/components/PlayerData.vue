<template>
  <v-card title="Players" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="players"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
// import { collection, query, onSnapshot } from 'firebase/firestore'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const playerStore = useStore()
const { players } = storeToRefs(playerStore)
const search = ref('')
const headers = [
  {
    key: 'name',
    sortable: false,
    title: 'Ho va Ten'
  }
]
</script>
