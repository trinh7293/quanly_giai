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
import { useCollection } from 'vuefire'

export const usePlayerStore = defineStore('players', () => {
  const playerRef = collection(db, CollName.PLAYER)
  const players = useCollection<Player>(playerRef)

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
