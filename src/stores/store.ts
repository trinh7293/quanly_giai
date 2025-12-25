import { CollName } from '@/constants'
import { db } from '@/firebaseConfig'
import type { Player, Team } from '@/types'
import { collection } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useCollection } from 'vuefire'

export const useStore = defineStore('players', () => {
  const players = useCollection<Player>(collection(db, CollName.PLAYER))
  const teams = useCollection<Team>(collection(db, CollName.TEAM))
  const teamsUI = computed(() => getTeamsUi(players.value, teams.value))

  return { players, teams, teamsUI }
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
