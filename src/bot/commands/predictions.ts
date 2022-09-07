import { WebAppButton } from '../buttons';
import { PredictionsText } from '../texts';
import { Command } from './abstract';

export class PredictionsCommand extends Command {
  public async execute(): Promise<void> {
    const [userRating, userStats, lastUserResults, userPredictions] = await Promise.all([
      this.storage.getRatingForUser({ userId: this.message.user.id }),
      this.storage.getUserStats({ userId: this.message.user.id }),
      this.storage.getLastUserResults({ userId: this.message.user.id }),
      this.storage.getUserPredictions({
        userId: this.message.user.id,
        limit: 5,
        offset: 0,
      }),
    ]);

    await this.bot.sendMessage(
      this.message.chatId,
      new PredictionsText({userRating, userStats, lastUserResults, userPredictions}).value(),
      new WebAppButton('Подробнее', 'predictions').asObject()
    );
  }
}
