import { CollName } from '@/constants'
import { db } from '@/firebaseConfig'
import type { Player, Team } from '@/types'
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

export const useStore = defineStore('players', () => {
  const playerRef = collection(db, CollName.PLAYER)
  const teamRef = collection(db, CollName.TEAM)
  const players = useCollection<Player>(playerRef)
  const teams = useCollection<Team>(teamRef)
  const teamsUI = computed(() => getTeamsUi(players.value, teams.value))

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

  return { players, teams, teamsUI, addPlayer, editPlayer, deletePlayer }
})

const getTeamsUi = (players: Player[], teams: Team[]) => {
  console.log(players)
  console.log(teams)
  return teams.map((te) => {
    const { first_player_id, second_player_id } = te
    const defaultPla: Player = {
      id: 'error',
      name: 'not found'
    }
    const firstPla = players.find((p) => p.id === first_player_id) || defaultPla
    const secPla = players.find((p) => p.id === second_player_id) || defaultPla
    const first_player_name = firstPla.name
    const second_player_name = secPla.name
    return {
      first_player_id,
      second_player_id,
      first_player_name,
      second_player_name
    }
  })
}
