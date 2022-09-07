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
      FROM games
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
      ORDER BY "group", tour ASC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
