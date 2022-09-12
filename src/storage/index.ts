import { Pool } from 'pg';
import { TgUser } from '../bot/types';
import { DBGame, DBLastResults, DBPrediction, DBPredictionResult, DBPreictionsStats, DBRating, DBRawGame, DBTableRow, RecentGame } from '../types';
import { IStorage } from "./interface";
import { CreatePrediction } from './methods/create-prediction';
import { GetGame } from './methods/get-game';
import { GetGamesForUser } from './methods/get-game-for-user';
import { UpdateUser } from './methods/update-user';
import { GetRating } from './methods/get-rating';
import { GetRatingForUser } from './methods/get-rating-for-user';
import { GetUserStats} from './methods/get-user-stats';
import { GetLastUserResults } from './methods/get-last-user-results'
import { GetUserPredictions} from './methods/get-user-predictions';
import { GetTable } from './methods/get-table';
import { GetGames } from './methods/get-games';
import { UpdateGames } from './methods/update-games';
import { DataForUpdate } from '../bot/commands/update-games';
import { UpdateTable } from './methods/update-table';
import { GetRecentGames } from './methods/get-recent-games';

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
     console.log('✅ Storage initialized');
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

  public async getRating(data: { limit: number, offset: number }): Promise<DBRating[]> {
    return new GetRating(this.db, data).execute();
  }

  public async getRatingForUser(data: {userId: number}): Promise<DBRating> {
    return new GetRatingForUser(this.db, data).execute();
  }

  public async getUserStats(data: { userId: number }): Promise<DBPreictionsStats[]> {
    return new GetUserStats(this.db, data).execute();
  }
  public async getLastUserResults(data: { userId: number }): Promise<DBLastResults> {
    return new GetLastUserResults(this.db, data).execute();
  }
  public async getUserPredictions(data: { userId: number, limit: number, offset: number }): Promise<DBPredictionResult[]> {
    return new GetUserPredictions(this.db, data).execute();
  }

  public async getTable(data: { extended?: boolean }): Promise<DBTableRow[]> {
    return new GetTable(this.db, data).execute();
  }

  public async getGames(): Promise<DBGame[]> {
    return new GetGames(this.db).execute();
  }

  public async updateGames(data: DataForUpdate[]): Promise<DBRawGame[]> {
    return new UpdateGames(this.db, data).execute();
  }

  public async updateTable(data: DBTableRow[]): Promise<void> {
    return new UpdateTable(this.db, data).execute();
  }

  public async getRecentGames(): Promise<RecentGame[]> {
    return new GetRecentGames(this.db).execute();
  }  
}

export default new PgStorage() as IStorage;
export * from './interface';
