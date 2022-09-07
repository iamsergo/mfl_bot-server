import { Pool } from "pg";
import { DBTableRow } from "../../types";
import { IMethod } from "./interface";


export class GetTable implements IMethod<DBTableRow[]> {
  private db: Pool;
  private extened: boolean;

  constructor(db: Pool, data: { extended?: boolean }) {
    this.db = db;
    this.extened = data.extended || false;
  }

  async execute() {
    const extendedSql = this.extened
      ? `
        ,teams.logo as team_logo,
        tournament_table.games,
        tournament_table.win,
        tournament_table.draw,
        tournament_table.lose,
        tournament_table.score,
        tournament_table.pass,
        tournament_table.diff
      `
      : '';
    const sql = `
      SELECT
        tournament_table.group,
        tournament_table.position,
        teams.name as team,
        tournament_table.points
        ${extendedSql}
      FROM tournament_table
      JOIN teams ON tournament_table.team_id = teams.id
      ORDER BY tournament_table.position ASC
    `;
    const { rows } = await this.db.query(sql);
    return rows;
  }
}
