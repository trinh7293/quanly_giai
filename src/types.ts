export interface Match {
  startTime: Date
  endTime: Date
  duration: number //minutes
  courtId: string
  status: MatchStatus
  first_team_id: string
  second_team_id: string
  first_team_score: number
  second_team_score: number
}

export enum MatchStatus {
  WAITING = 1,
  PLAYING = 2,
  DONE = 3,
}

export interface Team {
  first_player_name: string
  second_player_name: string
  matchs: Match[]
}
