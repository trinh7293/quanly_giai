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
import {ref } from 'vue'
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '@/firebaseConfig'

const players = useCollection(collection(db, 'Player'))
const search = ref('')
const headers = [
  {
    key: 'name',
    sortable: false,
    title: 'Ho va Ten'
  }
]
</script>
