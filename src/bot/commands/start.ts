import { MenuText } from '../texts';
import { Command } from './abstract';

export class StartCommand extends Command {
  public async execute(): Promise<void> {
    await this.storage.updateUser(this.message.user);
    await this.bot.sendMessage(
      this.message.chatId,
      new MenuText().value(),
      { parse_mode: 'HTML' }
    );
  }
}
