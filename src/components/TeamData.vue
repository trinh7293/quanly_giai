<template>
  <v-card title="Teams" flat>
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
      :items="teamsUI"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
// import { collection, query, onSnapshot } from 'firebase/firestore'
import { useStore } from '@/stores/store'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useStore()
const { teamsUI } = storeToRefs(store)
const search = ref('')
const headers = [
  {
    key: 'first_player_name',
    sortable: false,
    title: 'Van dong vien 1'
  },
  {
    key: 'second_player_name',
    sortable: false,
    title: 'Van dong vien 2'
  }
]
</script>
