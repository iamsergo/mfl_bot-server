import { Pool } from "pg";
import { DBRating } from "../../types";
import { IMethod } from "./interface";

type GetRatingForUserData = {
  userId: number;
};

export class GetRatingForUser implements IMethod<DBRating> {
  private db: Pool;
  private userId: number;

  constructor(db: Pool, data: GetRatingForUserData) {
    this.db = db;
    this.userId = data.userId;
  }

  async execute() {
    const sql = 'SELECT * FROM rating_table_all WHERE user_id=$1';
    const values = [this.userId];
    const { rows } = await this.db.query(sql, values);
    return rows[0];
  }
}
