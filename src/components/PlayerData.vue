<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :hide-default-footer="player.length < 11"
      :items="player"
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

            Popular books
          </v-toolbar-title>

          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            rounded="lg"
            text="Add a Book"
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

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          rounded="lg"
          text="Reset data"
          variant="text"
          border
          @click="reset"
        ></v-btn>
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
            <v-text-field v-model="formModel.name" label="Title"></v-text-field>
          </v-col>
        </v-row>
      </template>

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
import type { Player } from '@/types'
import { onMounted, ref, shallowRef, toRef } from 'vue'

function createNewRecord() {
  return {
    id: '',
    name: ''
  }
}

const player = ref<Player[]>([])
const formModel = ref(createNewRecord())
const dialog = shallowRef(false)
const isEditing = toRef(() => !!formModel.value.id)

const headers = [
  { title: 'name', key: 'name', align: 'start' as const },
  { title: 'Actions', key: 'actions', align: 'end' as const, sortable: false }
]

onMounted(() => {
  reset()
})

function add() {
  formModel.value = createNewRecord()
  dialog.value = true
}

function edit(id: string) {
  const found = player.value.find((pla) => pla.id === id)
  if (!found) {
    console.log('no player found')
    return
  }
  formModel.value = {
    id: found.id,
    name: found.name
  }

  dialog.value = true
}

function remove(id: string) {
  const index = player.value.findIndex((pla) => pla.id === id)
  player.value.splice(index, 1)
}

function save() {
  if (isEditing.value) {
    const index = player.value.findIndex((pla) => pla.id === formModel.value.id)
    player.value[index] = formModel.value
  } else {
    formModel.value.id = (player.value.length + 1).toString()
    player.value.push(formModel.value)
  }

  dialog.value = false
}

function reset() {
  dialog.value = false
  formModel.value = createNewRecord()
  player.value = [
    {
      id: '1',
      name: 'To Kill a Mockingbird'
    },
    {
      id: '2',
      name: '1984'
    }
  ]
}
</script>
