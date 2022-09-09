import { Pool } from "pg";
import { DBGame } from "../../types";
import { IMethod } from "./interface";


export class GetGames implements IMethod<DBGame[]> {
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
        ) as games
        JOIN teams ON teams.id = games.away_id
        GROUP BY games.id
      ) as gs
      JOIN games ON gs.id = games.id
      ORDER BY "group", tour, time ASC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
