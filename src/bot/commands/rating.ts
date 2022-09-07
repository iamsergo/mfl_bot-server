import { WebAppButton } from '../buttons/web-app';
import { RatingText } from '../texts';
import { Command } from './abstract';

export class RatingCommand extends Command {
  public async execute(): Promise<void> {
    const [rating, userRating] = await Promise.all([
      this.storage.getRating({ offset: 0, limit: 20 }),
      this.storage.getRatingForUser({ userId: this.message.user.id })
    ]);
    await this.bot.sendMessage(
      this.message.chatId,
      new RatingText(rating, userRating).value(),
      new WebAppButton('Подробный рейтинг', 'rating').asObject()
    );
  }
}
