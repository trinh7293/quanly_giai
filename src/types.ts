import type { MatchStatus } from './constants'

export interface Court {
  id: string
  name: string
}

export interface CourtDisplay {
  // Main screen
  courtId: string
  matchId?: string
  roundId?: string
  first_team_id?: string
  second_team_id?: string
  firstPlayerId?: string // team 1
  secondPlayerId?: string // team 1
  thirdPlayerId?: string // team 2
  fourtPlayerId?: string // team 2
  courtName: string
  roundName?: string
  firstPlayerName?: string // team 1
  secondPlayerName?: string // team 1
  thirdPlayerName?: string // team 2
  fourtPlayerName?: string // team 2
  first_team_score?: number
  second_team_score?: number
  duration?: number
  status?: MatchStatus
}

export interface Player {
  id: string
  name: string
}

export interface Team {
  first_player_id: string
  second_player_id: string
}

export interface Match {
  id: string
  scheduleStartTime: Date
  startTime?: Date
  endTime?: Date
  duration?: number //minutes
  courtId: string
  roundId: string
  status: MatchStatus
  first_team_id: string
  second_team_id: string
  first_team_score?: number
  second_team_score?: number
}

export interface Round {
  id: string
  name: string
}
