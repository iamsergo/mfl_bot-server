import { DBLastResults, DBPredictionPoints, DBPredictionResult, DBPreictionsStats, DBRating } from "../../types";

type PredictionsTextData = {
  userRating: DBRating;
  userStats: DBPreictionsStats[];
  lastUserResults: DBLastResults;
  userPredictions: DBPredictionResult[];
};

export class PredictionsText {
  private userRating: DBRating;
  private userStats: DBPreictionsStats[];
  private lastUserResults: DBLastResults;
  private userPredictions: DBPredictionResult[];

  constructor(data: PredictionsTextData) {
    this.userRating = data.userRating;
    this.userStats = data.userStats;
    this.lastUserResults = data.lastUserResults;
    this.userPredictions = data.userPredictions;
  }

  private signs = {
    [''+null]: '⚪',
    [''+DBPredictionPoints.NOTHING]: '🔴',
    [''+DBPredictionPoints.ONLY_RESULT]: '🟠',
    [''+DBPredictionPoints.RESULT_AND_DIFF]: '🟡',
    [''+DBPredictionPoints.EXACTLY_SCORE]: '🟢',
    [''+DBPredictionPoints.TECHNICAL_RESULT]: '⚪',
  };

  private getUserRating(): string {
    return this.userRating
      ? [
        `Вы на ${this.userRating.position} месте в рейтинге прогнозистов.`,
        `У вас ${this.userRating.points}оч.`,
      ].join(' ')
      : 'Вас пока нет в рейтинге.';
  }

  private getUserStats(): string {
    const entries = this.userStats.map(s => ([''+s.value, +s.count]));
    const map = Object.fromEntries(entries);

    const texts = {
      [''+null]: 'Без результата',
      [''+DBPredictionPoints.NOTHING]: 'Ничего не угадано(0оч.)',
      [''+DBPredictionPoints.ONLY_RESULT]: 'Угадан только результат(2оч.)',
      [''+DBPredictionPoints.RESULT_AND_DIFF]: 'Угадан результат и разница(3оч.)',
      [''+DBPredictionPoints.EXACTLY_SCORE]: 'Угадан точный счет(5оч.)',
    };
    const statsRows = Object.entries(this.signs)
      .filter(([key]) => key !== ''+DBPredictionPoints.TECHNICAL_RESULT)
      .map(([key, sign]) => {
        const count = map[key] || 0;
        return `${sign} ${texts[key]}: ${count}`;
      });

    const text = [
      'Общая статистика прогнозов:',
      statsRows.join('\n'),
    ].join('\n\n');
    return text;
  }

  private getLastUserResults(): string {
    const lastResultsText = this.lastUserResults
      .map(r => this.signs[''+r.points])
      .join('');
    return this.lastUserResults.length === 0
      ? ''
      : [
          'Ваши последние проверенные прогнозы:',
          lastResultsText,
        ].join('\n');
  }

  private getLastUserPredictions(): string {
    const lastPredictionsText = this.userPredictions.length === 0
      ? 'У вас пока нет прогнозов.'
      : this.userPredictions.map(p => {
        const teamsText = p.teams[0].join('-');
        const scoreText = p.result ? p.result.join(':') : '?:?';
        return [
          teamsText + ' ' + scoreText,
          `Ваш прогноз:  ${p.prediction.join(':')}`,
          `Очки: ${p.points !== null ? p.points : '?'} ${this.signs[''+p.points]}`
        ].join('\n');
      }).join('\n\n');
    return [
      'Ваши последние прогнозы:',
      lastPredictionsText,
    ].join('\n\n');
  }

  value() {
    const text = [
      this.getUserRating(),
      this.getUserStats(),
      this.getLastUserResults(),
      this.getLastUserPredictions(),
      'Чтобы посмотреть все прогнозы, нажмите кнопку ниже.'
    ].join('\n\n\n');
    return text;
  }
}
