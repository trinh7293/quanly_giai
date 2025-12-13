<template>
  <v-card
    title="Nutrition"
    flat
  >
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
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const search = ref('')
  const headers = [
    {
      align: "start" as const,
      key: 'court',
      sortable: false,
      title: 'San',
    },
    { key: 'team_1', title: 'Team 1' },
    { key: 'score', title: 'Score' },
    { key: 'team_2', title: 'Team 2' },
    { key: 'duration', title: 'Duration (min)' },
    { key: 'status', title: 'Status' },
  ]
  const desserts = [
    {
      court: 'San 1',
      team_1: "trinh-trang",
      score: "5-7",
      team_2: "nguyen-anh",
      duration: 17,
      status: 0,
    },
    {
      court: 'San 2',
      team_1: "le-thanh",
      score: "3-6",
      team_2: "pham-hoang",
      duration: 20,
      status: 1,
    }
  ]
</script>
