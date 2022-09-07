import { RulesText } from '../texts';
import { Command } from './abstract';

export class RulesCommand extends Command {
  public async execute(): Promise<void> {
    await this.bot.sendMessage(
      this.message.chatId,
      new RulesText().value(),
    );
  }
}
