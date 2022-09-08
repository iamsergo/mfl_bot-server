import { DiffForScore, ResultForScore, TableStatsFromGame, TeamTableStat, TotalForScore, UpdatedTable } from '../../helpers';
import { Command } from './abstract';

export type DataForUpdate = {
  gameId: number;
  score: number[];
  result: number;
  total: number;
  diff: number;
};

export class UpdateGamesCommand extends Command {
  private getDataForUpdate(): DataForUpdate[] {
    const text = this.message.text.replace('/upd_games\n\n', '');
    const rows = text.split('\n');
    return rows.map(row => {
      const [gameId, _, _score, r] = row.split(',').map(s => s.trim());
      const score = _score.split(':').map(Number)
      const result = r === undefined ? new ResultForScore(score).value() : 3;
      return {
        gameId: +gameId,
        score,
        result,
        total: new TotalForScore(score).value(),
        diff: new DiffForScore(score).value(),
      };
    });
  }

  public async execute(): Promise<void> {
    const data = this.getDataForUpdate();
    const updatedGames = await this.storage.updateGames(data);
    const dataForUpdateTable = updatedGames
      .reduce((data, game) => ([ ...data, ...new TableStatsFromGame(game).value() ]), [] as TeamTableStat[]);
    const table = await this.storage.getTable({ extended: true });
    const updatedTableByGroups = new UpdatedTable(table, dataForUpdateTable).value();
    
    let updatedTableText = '/upd_table';
    Object.entries(updatedTableByGroups).forEach(([groupName, rows]) => {
      updatedTableText += `\n\n${groupName}(удалить)\n\n\n`;
      updatedTableText += rows
        .map(r => {
          return [
            r.position,
            r.team_id,
            r.team,
            r.games,
            r.win,
            r.draw,
            r.lose,
            r.score,
            r.pass,
            r.diff,
            r.points,
          ].join(', ');
        })
        .join('\n\n');
    });

    await this.bot.sendMessage(this.message.chatId, updatedTableText);
  }
}
