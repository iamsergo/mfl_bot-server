import { Pool } from "pg";
import { DBPreictionsStats } from "../../types";
import { IMethod } from "./interface";

export class GetUserStats implements IMethod<DBPreictionsStats[]> {
  private db: Pool;
  private userId: number;

  constructor(db: Pool, data: { userId: number }) {
    this.db = db;
    this.userId = data.userId;
  }

  async execute() {
    const sql = `
      SELECT
        predictions.points as "value",
        count(*)
      FROM predictions
      WHERE user_id=$1
      GROUP BY predictions.user_id, predictions.points
    `;
    const values = [this.userId];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
