import { Pool } from 'pg';
import { TgUser } from '../../bot/types';
import { User } from '../types';
import { IMethod } from "./interface";

type UpdateUserData = {
  user: TgUser;
};

export class UpdateUser implements IMethod<void> {
  private db: Pool;
  private user: TgUser;

  constructor(db: Pool, data: UpdateUserData) {
    this.db = db;
    this.user = data.user;
  }

  private async getUser(): Promise<User | undefined> {
    const sql = `SELECT * FROM users WHERE tgid=$1`;
    const values = [this.user.id];
    const { rows } = await this.db.query(sql, values);
    return rows[0] as User;
  }

  private async createUser(): Promise<void> {
    const sql = `INSERT INTO users (tgid, name, username) VALUES ($1, $2, $3)`;
    const values = [this.user.id, this.user.name, this.user.username];
    await this.db.query(sql, values);
  }

  private async updateUser(userId: string): Promise<void> {
    const sql = `UPDATE users SET name=$1, username=$2 WHERE id=$3`;
    const values = [this.user.name, this.user.username, userId];
    await this.db.query(sql, values);
  }
  
  public async execute(): Promise<void> {
    const user = await this.getUser();
    if(!user) {
      await this.createUser();
    } else {
      await this.updateUser(user.id);
    }
  }
}
