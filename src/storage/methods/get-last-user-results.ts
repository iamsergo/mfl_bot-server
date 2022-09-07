import { Pool } from "pg";
import { DBLastResults, DBPreictionsStats } from "../../types";
import { IMethod } from "./interface";

export class GetLastUserResults implements IMethod<DBLastResults> {
  private db: Pool;
  private userId: number;

  constructor(db: Pool, data: { userId: number }) {
    this.db = db;
    this.userId = data.userId;
  }

  async execute() {
    const sql = `
      SELECT points
      FROM predictions
      WHERE user_id=$1 AND points IS NOT NULL
      ORDER BY time ASC
      LIMIT 20
    `;
    const values = [this.userId];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
