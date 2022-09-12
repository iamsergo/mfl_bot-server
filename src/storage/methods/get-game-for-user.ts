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
        gs.*,
        games.time,
        games.score,
        games.result,
        games.total,
        games.diff,
        games.group,
        games.tour
      FROM (
        SELECT
          games.id,
          array_agg(ARRAY [games.home_name, teams.name]) as teams,
          array_agg(ARRAY [games.home_logo, teams.logo]) as teams_logos
        FROM (
          SELECT games.*, teams.name as home_name, teams.logo as home_logo
          FROM games
          JOIN teams ON teams.id = games.home_id
          WHERE games.score ISNULL
          AND games.id NOT IN (SELECT game_id FROM predictions WHERE predictions.user_id = $1)
          AND (games.time <> 0 AND extract(epoch from now()) * 1000 < games.time OR games.time = 0)
        ) as games
        JOIN teams ON teams.id = games.away_id
        GROUP BY games.id
      ) as gs
      JOIN games ON gs.id = games.id
      ORDER BY games."group", games.tour, games.time ASC
    `;
    const values = [this.userId];
    const { rows } = await this.db.query(sql, values);
    return rows;
  }
}
