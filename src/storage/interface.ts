import { TgUser } from "../bot/types";
import { DBGame, DBPrediction, DBRating } from "../types";

export interface IStorage {
  updateUser(user: TgUser): Promise<void>
  getGamesForUser(data: { userId: number }): Promise<DBGame[]>
  createPrediction(data: { userId: number, gameId: number, prediction: number[] }): Promise<DBPrediction>
  getGame(data: { gameId: number }): Promise<DBGame>
  getRating(data: { limit: number, offset: number }): Promise<DBRating[]>
  getRatingForUser(data: {userId: number}): Promise<DBRating>
}
