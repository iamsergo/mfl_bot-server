import { DBGame, DBPrediction } from "../../types";

type ApplyingPredictionTextData = {
  prediction: DBPrediction;
  game: DBGame;
};

export class ApplyingPredictionText {
  private prediction: DBPrediction;
  private game: DBGame;

  constructor(data: ApplyingPredictionTextData) {
    this.prediction = data.prediction;
    this.game = data.game;
  }

  public value(): string {
    return [
      `Ваш прогноз ${this.prediction.value!.join(':')} на матч ${this.game.teams[0].join('-')} успешно принят ✅`,
      // 'Чтобы сделать еще прогноз 🎯, нажмите кнопку ниже.'
    ].join('\n\n');
  }
}
