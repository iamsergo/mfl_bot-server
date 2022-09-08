import { DBTableRow } from '../../types';
import { Command } from './abstract';

export class UpdateTableCommand extends Command {
  private getDataForUpdate(): DBTableRow[] {
    const text = this.message.text.replace('/upd_table\n\n', '');
    const rows = text.split('\n\n');
    return rows.map(row => {
      const [
        position,
        team_id,
        _,
        games,
        win,
        draw,
        lose,
        score,
        pass,
        diff,
        points,
      ] = row.split(', ');
      return {
        position: +position,
        team_id: +team_id,
        games: +games,
        win: +win,
        draw: +draw,
        lose: +lose,
        score: +score,
        pass: +pass,
        diff: +diff,
        points: +points,
      } as DBTableRow;
    });
  }

  public async execute(): Promise<void> {
    const data = this.getDataForUpdate();
    await this.storage.updateTable(data);
    await this.bot.sendMessage(this.message.chatId, 'Обновлено ✅');
  }
}
