import { Pool } from "pg";
import { DBGame, RecentGame } from "../../types";
import { IMethod } from "./interface";

export class GetRecentGames implements IMethod<RecentGame[]> {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  async execute() {
    const sql = `
      SELECT
        gs.*,
        games.time,
        games.score,
        games.group,
        games.tour
      FROM (
        SELECT
          games.id,
          array_agg(ARRAY [games.home_name, teams.name]) as teams
        FROM (
          SELECT games.*, teams.name as home_name, teams.logo as home_logo
          FROM games
          JOIN teams ON teams.id = games.home_id
          WHERE games.score ISNULL AND games.time <> 0
		  ORDER BY games.time ASC
		  LIMIT 8
        ) as games
        JOIN teams ON teams.id = games.away_id
        GROUP BY games.id
      ) as gs
      JOIN games ON gs.id = games.id
      ORDER BY games.time ASC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
