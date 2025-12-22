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
import { collection, query, onSnapshot } from 'firebase/firestore'
import type { Player } from '@/types'
import { onMounted, ref } from 'vue'
import { CollName } from '@/constants'
import { db, playerCol } from '@/firebaseConfig'
const search = ref('')
const headers = [
  {
    key: 'name',
    sortable: false,
    title: 'Ho va Ten'
  }
]
const players: Player[] = []
onMounted(() => {
  // Fetch player data from Firestore
  const q = query(playerCol)
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const cities = []
    querySnapshot.forEach((doc) => {
      cities.push(doc.data().name)
    })
    console.log('Current cities in CA: ', cities.join(', '))
  })
})
</script>
