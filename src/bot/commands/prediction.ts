import { WebAppButton } from '../buttons';
import { PredictionText } from '../texts';
import { Command } from './abstract';

export class PredictionCommand extends Command {
  public async execute(): Promise<void> {
    await this.bot.sendMessage(
      this.message.chatId,
      new PredictionText().value(),
      new WebAppButton('Выбрать матч', 'prediction').asObject()
    );
  }
}
