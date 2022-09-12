import { WebAppButton } from '../buttons/web-app';
import { TournamentText } from '../texts';
import { Command } from './abstract';

export class TournamentCommand extends Command {
  public async execute(): Promise<void> {
    const table = await this.storage.getTable({ extended: false });
    const recentGames = await this.storage.getRecentGames();
    await this.bot.sendMessage(
      this.message.chatId,
      new TournamentText(table, recentGames).value(),
      {
        parse_mode: 'HTML',
        ...new WebAppButton('Подробная информация', 'tournament').asObject(),
      }
    );
  }
}
