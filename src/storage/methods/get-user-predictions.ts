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
        ${this.extended ? 'ps.teams_logos, games.time,' : ''}
        ps.teams,
        predictions.value as prediction,
        predictions.points,
        games.score as result
      FROM (
        SELECT
          predictions.prediction_id,
          array_agg(ARRAY [predictions.home_name, teams.name]) as teams,
          array_agg(ARRAY [predictions.home_logo, teams.logo]) as teams_logos
        FROM (
          SELECT predictions.*, teams.name as home_name, teams.logo as home_logo
          FROM (
            SELECT *, predictions.id as prediction_id
            FROM predictions
            JOIN games ON predictions.game_id = games.id
            WHERE predictions.user_id = $1
          ) as predictions
          JOIN teams ON predictions.home_id = teams.id
        ) as predictions
        JOIN teams ON predictions.away_id = teams.id
        GROUP BY predictions.prediction_id
      ) as ps
      JOIN predictions ON predictions.id = ps.prediction_id
      JOIN games ON predictions.game_id = games.id
      ORDER BY predictions.time DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [this.userId, this.limit, this.offset];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
