import { Pool } from "pg";
import { DBTableRow } from "../../types";
import { IMethod } from "./interface";

export class UpdateTable implements IMethod<void> {
  private db: Pool;
  private data: DBTableRow[];


  constructor(db: Pool, data: DBTableRow[]) {
    this.db = db;
    this.data = data;
  }

  async execute() {
    const updateValues = this.data
      .map(d => {
        const s = [
          d.team_id,
          d.position,
          d.games,
          d.win,
          d.draw,
          d.lose,
          d.score,
          d.pass,
          d.diff,
          d.points
        ].join(',');
        return '(' + s + ')';
      })
      .join(', ');
    const sql = `
      UPDATE tournament_table
      SET
          "position" = d.position,
          games = d.games,
          win = d.win,
          draw = d.draw,
          lose = d.lose,
          score = d.score,
          pass = d.pass,
          diff = d.diff,
          points = d.points
      FROM (values ${updateValues}) as d(
        team_id,
        "position",
        games,
        win,
        draw,
        lose,
        score,
        pass,
        diff,
        points
      )
      WHERE d.team_id = tournament_table.team_id
    `;
    await this.db.query(sql);
  }
}
