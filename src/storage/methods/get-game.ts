import { Pool } from "pg";
import { DBPrediction } from "../../types";
import { IMethod } from "./interface";

type GetGameData = {
  gameId: number;
};
export class GetGame implements IMethod<DBPrediction> {
  private db: Pool;
  private gameId: number;

  constructor(db: Pool, data: GetGameData) {
    this.db = db;
    this.gameId = data.gameId;
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
      WHERE games.id = $1
    `;
    const values = [this.gameId];
    const { rows } = await this.db.query(sql, values);
    return rows[0];
  }
}
