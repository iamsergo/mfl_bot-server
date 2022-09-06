import { Pool } from 'pg';
import { TgUser } from '../bot/types';
import { DBGame, DBPrediction } from '../types';
import { IStorage } from "./interface";
import { CreatePrediction } from './methods/create-prediction';
import { GetGame } from './methods/get-game';
import { GetGamesForUser } from './methods/get-game-for-user';
import { UpdateUser } from './methods/update-user';

class PgStorage implements IStorage {
  private db: Pool;

  constructor() {
    this.db = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
     });
  }

  public async updateUser(user: TgUser): Promise<void> {
    return new UpdateUser(this.db, { user }).execute();
  }

  public async getGamesForUser(data: { userId: number }): Promise<DBGame[]> {
    return new GetGamesForUser(this.db, data).execute();
  }

  public async createPrediction(data: { userId: number, gameId: number, prediction: number[] }): Promise<DBPrediction> {
    return new CreatePrediction(this.db, data).execute();
  }

  public async getGame(data: { gameId: number }): Promise<DBGame> {
    return new GetGame(this.db, data).execute();
  }
}

export default new PgStorage() as IStorage;
export * from './interface';
