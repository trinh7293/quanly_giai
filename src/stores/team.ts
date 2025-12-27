import { CollName } from '@/constants'
import { db } from '@/firebaseConfig'
import type { Player, Team, TeamDisplay } from '@/types'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useCollection } from 'vuefire'
import { usePlayerStore } from './players'

export const useTeamStore = defineStore('team', () => {
  const teamRef = collection(db, CollName.TEAM)
  const teams = useCollection<Team>(teamRef)
  const { players } = storeToRefs(usePlayerStore())

  const teamsUI = computed(() => getTeamsUi(players.value, teams.value))
  const editTeam = async (
    id: string,
    first_player_id: string,
    second_player_id: string
  ) => {
    const teamRef = doc(db, CollName.TEAM, id)
    await updateDoc(teamRef, {
      first_player_id,
      second_player_id
    })
  }

  return { players, teams, teamsUI, editTeam }
})

const getTeamsUi = (players: Player[], teams: Team[]): TeamDisplay[] => {
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
      id: te.id,
      first_player_id,
      second_player_id,
      first_player_name,
      second_player_name
    }
  })
}
