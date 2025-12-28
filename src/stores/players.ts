import { CollName } from '@/constants'
import { db } from '@/firebaseConfig'
import type { Player } from '@/types'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useCollection } from 'vuefire'

export const usePlayerStore = defineStore('players', () => {
  const playerRef = collection(db, CollName.PLAYER)
  const playersWithoutId = useCollection<Player>(playerRef)
  const players = computed(() => {
    const resu = playersWithoutId.value.map((p) => ({
      id: p.id,
      name: p.name
    })) as Player[]
    return resu
  })

  const addPlayer = async (name: string) => {
    const docRef = await addDoc(playerRef, {
      name
    })
    console.log('Document written with ID: ', docRef.id)
  }
  const editPlayer = async (id: string, name: string) => {
    const playerRef = doc(db, CollName.PLAYER, id)
    await updateDoc(playerRef, {
      name
    })
    console.log('Document written with ID: ', playerRef.id)
  }
  const deletePlayer = async (id: string) => {
    const playerRef = doc(db, CollName.PLAYER, id)
    await deleteDoc(playerRef)
    console.log('Document deleted with ID: ', playerRef.id)
  }

  return { players, addPlayer, editPlayer, deletePlayer }
})
