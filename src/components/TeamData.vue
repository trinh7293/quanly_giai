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
      :items="teamUI"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
// import { collection, query, onSnapshot } from 'firebase/firestore'
import { ref } from 'vue'
import { useCollection } from 'vuefire'
import { collection } from 'firebase/firestore'
import { db } from '@/firebaseConfig'
import { CollName } from '@/constants'
import type { Player, Team, TeamDisplay } from '@/types'

const teams = useCollection<Team>(collection(db, CollName.TEAM))
const players = useCollection<Player>(collection(db, CollName.PLAYER))
const playersList = players.data.value
const teamUI: TeamDisplay[] = teams.data.value.map((te) => {
  const { first_player_id, second_player_id } = te
  const defaultPla: Player = {
    id: 'error',
    name: 'not found'
  }
  const firstPla =
    playersList.find((p) => p.id === first_player_id) || defaultPla
  const secPla =
    playersList.find((p) => p.id === second_player_id) || defaultPla
  const first_player_name = firstPla.name
  const second_player_name = secPla.name
  return {
    first_player_id,
    second_player_id,
    first_player_name,
    second_player_name
  }
})
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
