import { DBRating } from "../../types";

export class RatingText {
  private rating: DBRating[];
  private userRating: DBRating;

  constructor(rating: DBRating[], userRating: DBRating) {
    this.rating = rating;
    this.userRating = userRating;
  }

  value() {
    const ratingText = this.rating.length === 0
      ? 'Рейтинг пока пустой.'
      : this.rating.map(u => {
        let positionPrefix;
        if(+u.position === 1) positionPrefix = '🥇 ';
        else if(+u.position === 2) positionPrefix = '🥈 ';
        else if(+u.position === 3) positionPrefix = '🥉 ';
        else positionPrefix = `#${u.position} `;

        return `${positionPrefix} @${u.username} ${u.points}оч.`
      }).join('\n');
    const userRatingText = this.userRating
      ? [
        `Вы на ${this.userRating.position} месте.`,
        `У вас ${this.userRating.points}оч.`,
      ].join('\n')
      : 'Вас пока нет в рейтинге.';
    const text = [
      '📊 Рейтинг прогнозистов(топ 20)',
      ratingText,
      userRatingText,
    ].join('\n\n');
    return text;
  }
}
