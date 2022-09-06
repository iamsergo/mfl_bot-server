import { TgUser } from "../bot/types";
import { DBGame, DBPrediction } from "../types";

export interface IStorage {
  updateUser(user: TgUser): Promise<void>
  getGamesForUser(data: { userId: number }): Promise<DBGame[]>
  createPrediction(data: { userId: number, gameId: number, prediction: number[] }): Promise<DBPrediction>
  getGame(data: { gameId: number }): Promise<DBGame>
}
