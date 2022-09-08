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
      const dataForUpdateRow = this.dataForUpdate.filter(d => d.teamId === row.team_id);
      return {
        ...row,
        games: row.games + dataForUpdateRow.map(r => r.games).reduce((s, v) => s + v ,0),
        win: row.win + dataForUpdateRow.map(r => r.win).reduce((s, v) => s + v ,0),
        draw: row.draw + dataForUpdateRow.map(r => r.draw).reduce((s, v) => s + v ,0),
        lose: row.lose + dataForUpdateRow.map(r => r.lose).reduce((s, v) => s + v ,0),
        score: row.score + dataForUpdateRow.map(r => r.score).reduce((s, v) => s + v ,0),
        pass: row.pass + dataForUpdateRow.map(r => r.pass).reduce((s, v) => s + v ,0),
        diff: row.diff + dataForUpdateRow.map(r => r.diff).reduce((s, v) => s + v ,0),
        points: row.points + dataForUpdateRow.map(r => r.points).reduce((s, v) => s + v ,0),
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
