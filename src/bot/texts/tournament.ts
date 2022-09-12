import { FormatedTime } from "../../helpers";
import { DBTableRow, RecentGame } from "../../types";

export class TournamentText {
  constructor(private table: DBTableRow[], private recentGames: RecentGame[]) {}

  public value(): string {
    const byGroups = this.table.reduce((map, row) => {
      const key = row.group;
      if(!map[key]) return { ...map, [key]: [row] };
      else return { ...map, [key]: map[key].concat([row]) };
    }, {} as {[key: string]: DBTableRow[]});

    const tableText = Object.entries(byGroups).reduce((str, [groupName, rows]) => {
      let s = str + `\n\n\n<b>${groupName}</b>\n\n`;
      s += rows.map(t => `${t.position}.  <b><i>${t.team}</i></b> ${t.points}оч.`).join('\n');
      return s;
    }, '');

    const recentGamesText = this.recentGames.length === 0
      ? 'Пока нет информации о ближайших играх.\n\n'
      : this.recentGames.map(g => {
        return [
          new FormatedTime(+g.time).value(),
          g.teams[0].join('-'),
        ].join('\n');
        }).join('\n\n');

    return [
      '🏆 Положение команд',
      tableText,
      '\n\n<b>Ближайшие игры</b>\n\n',
      recentGamesText,
      '\n\nДля просмотра подробной таблицы, расписания и результатов игр, нажмите кнопку ниже.'
    ].join('');
  }
}