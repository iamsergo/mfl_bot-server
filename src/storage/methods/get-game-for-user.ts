import { Pool } from "pg";
import { DBGame } from "../../types";
import { IMethod } from "./interface";

type GetGamesForUserData = {
  userId: number;
};
export class GetGamesForUser implements IMethod<DBGame[]> {
  private db: Pool;
  private userId: number;

  constructor(db: Pool, data: GetGamesForUserData) {
    this.db = db;
    this.userId = data.userId;
  }

  async execute() {
    const sql = `
    SELECT
      games.id,
      games.time,
      games.score,
      games.result,
      games.total,
      games.diff,
      games.group,
      games.tour,
      array_agg(teams.name) as teams,
      array_agg(teams.logo) as teams_logos
    FROM (
      SELECT *
      FROM games
      WHERE games.score ISNULL
        AND games.id NOT IN (
          SELECT game_id
          FROM predictions
          WHERE predictions.user_id = $1
        )
        AND extract(epoch from now()) * 1000 < games.time
    ) as games
    JOIN teams ON teams.id IN (games.home_id, games.away_id)
    GROUP BY
      games.id,
      games.time,
      games.score,
      games.result,
      games.total,
      games.diff,
      games.group,
      games.tour
    ORDER BY "group", tour, time
    `;
    const values = [this.userId];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
