import { formatMasteries } from "utils/summoner/formatMasteries"
import { formatRanks } from "utils/summoner/formatRanks"
import { FormatMatch } from "../../utils/summoner/FormatMatch"

export type SummonerProps = {
  summoner: {
    id: string
    puuid: string
    accountId: string
    nick: string
    level: string
    icon: string
  }
  matchHistory: Array<ReturnType<typeof FormatMatch>>
  masteries: ReturnType<typeof formatMasteries>
  ranks: ReturnType<typeof formatRanks>
}

export type UnformattedMastery = {
  championId: number // Champion ID for this entry.

  championLevel: number // 	Champion level for specified player and champion combination.

  championPoints: number // 	Total number of champion points for this player and champion combination - they are used to determine championLevel.

  lastPlayTime: number // 	Last time this champion was played by this player - in Unix milliseconds time format.

  championPointsSinceLastLevel: number // 	Number of points earned since current level has been achieved.

  championPointsUntilNextLevel: number // Number of points needed to achieve next level. Zero if player reached maximum champion level for this champion.

  chestGranted: boolean // Is chest granted for this champion or not in current season.

  tokensEarned: number // The token earned for this champion at the current championLevel. When the championLevel is advanced the tokensEarned resets to 0.

  summonerId: string // Summoner ID for this entry. (Encrypted)
}

export type UnformattedRank = {
  leagueId: string
  summonerId: string // Player's encrypted summonerId.
  summonerName: string
  queueType: string
  tier: string
  rank?: string // The player's division within a tier.
  leaguePoints: number
  wins: number // Winning team on Summoners Rift.
  losses: number // Losing team on Summoners Rift.
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries?: MiniSeriesDTO
}

type MiniSeriesDTO = {
  losses: number
  progress: string
  target: number
  wins: number
}
