import { Pool } from "pg";
import { DBRating } from "../../types";
import { IMethod } from "./interface";

type GetRatingData = {
  offset: number;
  limit: number;
};

export class GetRating implements IMethod<DBRating[]> {
  private db: Pool;
  private offset: number;
  private limit: number;

  constructor(db: Pool, data: GetRatingData) {
    this.db = db;
    this.offset = data.offset;
    this.limit = data.limit;
  }

  async execute() {
    const sql = 'SELECT * FROM rating_table_all LIMIT $1 OFFSET $2';
    const values = [this.limit, this.offset];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
