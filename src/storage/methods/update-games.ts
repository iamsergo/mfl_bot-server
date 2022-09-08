import { Pool } from "pg";
import { DBRawGame } from "../../types";
import { IMethod } from "./interface";
import { DataForUpdate } from "../../bot/commands/update-games";

export class UpdateGames implements IMethod<DBRawGame[]> {
  private db: Pool;
  private data: DataForUpdate[];


  constructor(db: Pool, data: DataForUpdate[]) {
    this.db = db;
    this.data = data;
  }

  async execute() {
    const updateValues = this.data
      .map(d => `(${d.gameId}, ARRAY [${d.score.join(',')}], ${d.result}, ${d.total}, ${d.diff})`)
      .join(', ');
    const sql = `
      UPDATE games
      SET
        score = d.score,
        "result" = d."result",
        total = d.total,
        diff = d.diff
      FROM (values ${updateValues}) as d(game_id, score, "result", total, diff)
      WHERE d.game_id = games.id
      RETURNING games.*
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
