import { Pool } from "pg";
import { DBPredictionResult, DBRating } from "../../types";
import { IMethod } from "./interface";

type GetUserPredictionsData = {
  userId: number;
  offset: number;
  limit: number;
  extended?: boolean;
};

export class GetUserPredictions implements IMethod<DBPredictionResult[]> {
  private db: Pool;
  private userId: number;
  private offset: number;
  private limit: number;
  private extended: boolean;

  constructor(db: Pool, data: GetUserPredictionsData) {
    this.db = db;
    this.userId = data.userId;
    this.offset = data.offset;
    this.limit = data.limit;
    this.extended = data.extended || false;
  }

  async execute() {
    const sql = `
      SELECT
        ${this.extended ? 'array_agg(teams.logo) as teams_logos, games.time,' : ''}
        array_agg(teams.name) as teams,
        predictions.value as prediction,
        predictions.points,
        games.score as result
      FROM (
        SELECT *
        FROM predictions
        WHERE user_id=$1
      ) as predictions
      JOIN games ON games.id = predictions.game_id
      JOIN teams ON teams.id IN (games.home_id, games.away_id)
      GROUP BY predictions.id, games.id, predictions.value, predictions.points, predictions.time
      ORDER BY predictions.time DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [this.userId, this.limit, this.offset];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
