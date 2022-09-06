export class TotalForScore {
  private score: number[];

  constructor(score: number[]) {
    this.score = score;
  }

  public value(): number {
    return this.score.reduce((t, s) => t + s, 0);
  }
}
