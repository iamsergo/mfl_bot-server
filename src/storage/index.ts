import { Pool } from 'pg';
import { TgUser } from '../bot/types';
import { IStorage } from "./interface";
import { UpdateUser } from './methods/update-user';

export class PgStorage implements IStorage {
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
}

export * from './interface';
