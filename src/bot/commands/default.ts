import { MenuText } from '../texts';
import { Command } from "./abstract";

export class DefaultCommand extends Command {
  async execute(): Promise<void> {
    await this.bot.sendMessage(
      this.message.chatId,
      new MenuText().value(),
      { parse_mode: 'HTML' }
    );
  }
}
