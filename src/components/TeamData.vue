<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="teamsUI.length < 11"
      :items="teamsUI"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon
              color="medium-emphasis"
              icon="mdi-book-multiple"
              size="x-small"
              start
            ></v-icon>

            Teams
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add Team"
            border
            @click="add"
          ></v-btn>
        </v-toolbar>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex ga-2 justify-end">
          <v-icon
            color="medium-emphasis"
            icon="mdi-pencil"
            size="small"
            @click="edit(item.id)"
          ></v-icon>

          <v-icon
            color="medium-emphasis"
            icon="mdi-delete"
            size="small"
            @click="remove(item.id)"
          ></v-icon>
        </div>
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${isEditing ? 'Update' : 'Create'} your favorite book`"
      :title="`${isEditing ? 'Edit' : 'Add'} a Book`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12">
            <!-- <v-text-field v-model="formModel.name" label="Title"></v-text-field> -->
            <v-select
              label="First Player"
              :items="players"
              item-title="name"
              item-value="id"
              v-model="formModel.first_player_id"
            ></v-select>
            <v-select
              label="Second Player"
              :items="players"
              item-title="name"
              item-value="id"
              v-model="formModel.second_player_id"
            ></v-select>
          </v-col>
        </v-row>
      </template>
      {{ errorLogic ? `error: ${errorLogic}` : '' }}
      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="save"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { usePlayerStore } from '@/stores/players'
import { useTeamStore } from '@/stores/team'
import { storeToRefs } from 'pinia'
import { onMounted, ref, shallowRef, toRef } from 'vue'

function createNewRecord() {
  return {
    id: '',
    first_player_id: '',
    second_player_id: ''
  }
}

const teamStore = useTeamStore()
const playerStore = usePlayerStore()
const { players } = storeToRefs(playerStore)
const { teamsUI } = storeToRefs(teamStore)
const { editTeam, addTeam, deleteTeam } = teamStore
const errorLogic = ref('')

const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

const headers = [
  {
    title: 'VDV 1',
    key: 'first_player_name',
    align: 'start' as const
  },
  {
    title: 'VDV 2',
    key: 'second_player_name'
  },
  {
    title: 'Actions',
    key: 'actions',
    align: 'end' as const,
    sortable: false
  }
]

onMounted(() => {
  reset()
})

function add() {
  errorLogic.value = ''
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id: string) {
  errorLogic.value = ''
  const found = teamsUI.value.find((te) => te.id === id)
  if (!found) {
    console.log('no team found')
    return
  }
  formModel.value = {
    id: found.id,
    first_player_id: found.first_player_id,
    second_player_id: found.second_player_id
  }

  dialog.value = true
}

function remove(id: string) {
  deleteTeam(id)
}

function save() {
  const { id, first_player_id, second_player_id } = formModel.value
  if (first_player_id == second_player_id) {
    errorLogic.value = 'same player'
    return
  }
  errorLogic.value = ''
  if (isEditing.value) {
    editTeam(id, first_player_id, second_player_id)
  } else {
    addTeam(first_player_id, second_player_id)
  }

  dialog.value = false
}

function reset() {
  dialog.value = false
  errorLogic.value = ''
  formModel.value = createNewRecord()
}
</script>
