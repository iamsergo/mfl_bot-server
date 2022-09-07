import { TgUser } from "../bot/types";
import { DBGame, DBLastResults, DBPrediction, DBPredictionResult, DBPreictionsStats, DBRating, DBTableRow } from "../types";

export interface IStorage {
  updateUser(user: TgUser): Promise<void>
  getGamesForUser(data: { userId: number }): Promise<DBGame[]>
  createPrediction(data: { userId: number, gameId: number, prediction: number[] }): Promise<DBPrediction>
  getGame(data: { gameId: number }): Promise<DBGame>
  getRating(data: { limit: number, offset: number }): Promise<DBRating[]>
  getRatingForUser(data: {userId: number}): Promise<DBRating>
  getUserStats(data: { userId: number }): Promise<DBPreictionsStats[]>
  getLastUserResults(data: { userId: number }): Promise<DBLastResults>
  getUserPredictions(data: { userId: number, limit: number, offset: number, extended?: boolean }): Promise<DBPredictionResult[]>
  getTable(data: { extended?: boolean }): Promise<DBTableRow[]>
  getGames(): Promise<DBGame[]>
}
