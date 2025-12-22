import type { Court, Player, Round, Team } from './types'
import { genArrayNumber } from './utils'
import _ from 'lodash'

const genPlayers = (count: number) => {
  const arrCount = genArrayNumber(count)
  const players: Player[] = arrCount.map((count) => ({
    id: `player-${count}`,
    name: `player-${count}`
  }))
  return players
}

const genCourts = (count: number) => {
  const arrCount = genArrayNumber(count)
  const courts: Court[] = arrCount.map((count) => ({
    id: `court-${count}`,
    name: `court-${count}`
  }))
  return courts
}
const genRounds = (count: number) => {
  const arrCount = genArrayNumber(count)
  const rounds: Round[] = arrCount.map((count) => ({
    id: `round-${count}`,
    name: `round-${count}`
  }))
  return rounds
}

const genTeam = (players: Player[]): Team[] => {
  const playerIds = players.map((p) => p.id)
  const teamIdList = _.chunk(playerIds, 2)
  const teams = teamIdList.map((ids) => ({
    first_player_id: ids[0] || 'error',
    second_player_id: ids[1] || 'error'
  }))
  return teams
}
