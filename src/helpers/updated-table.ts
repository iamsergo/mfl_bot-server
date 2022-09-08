import { DBTableRow } from "../types";
import { TeamTableStat } from "./table-stats-from-game";

export class UpdatedTable {
  private table: DBTableRow[];
  private dataForUpdate: TeamTableStat[];

  constructor(table: DBTableRow[], dataForUpdate: TeamTableStat[]) {
    this.table = table;
    this.dataForUpdate = dataForUpdate;
  }

  public value(): {[groupName: string]: DBTableRow[]} {
    const sortedTable = this.table.map(row => {
      const dataForUpdateRow = this.dataForUpdate.find(d => d.teamId === row.team_id);
      if(!dataForUpdateRow) return row;
      return {
        ...row,
        games: row.games + dataForUpdateRow.games,
        win: row.win + dataForUpdateRow.win,
        draw: row.draw + dataForUpdateRow.draw,
        lose: row.lose + dataForUpdateRow.lose,
        score: row.score + dataForUpdateRow.score,
        pass: row.pass + dataForUpdateRow.pass,
        diff: row.diff + dataForUpdateRow.diff,
        points: row.points + dataForUpdateRow.points,
      };
    }).sort((a, b) => b.points - a.points);

    const map = sortedTable.reduce((map, row) => {
      const k = row.group;
      if(!map[k]) return { ...map, [k]: [row]};
      else return { ...map, [k]: [...map[k], row]};
    }, {} as {[groupName: string]: DBTableRow[]});
    const entries = Object.entries(map)
      .map(([key, rows]) => ([key, rows.map((row, i) => ({ ...row, position: i + 1 }))]));
    return Object.fromEntries(entries);
  }
}
