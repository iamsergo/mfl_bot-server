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
        games.id,
        array_agg(teams.name) as teams,
        array_agg(teams.logo) as teams_logos,
        games.time,
        games.score,
        games.result,
        games.total,
        games.diff,
        games.group,
        games.tour
      FROM games
      JOIN teams ON games.id = $1
      AND teams.id IN (games.home_id, games.away_id)
      GROUP BY games.id
    `;
    const values = [this.gameId];
    const { rows } = await this.db.query(sql, values);
    return rows[0];
  }
}
