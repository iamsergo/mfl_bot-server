export class DiffForScore {
  private home: number;
  private away: number;

  constructor(score: number[]) {
    this.home = score[0];
    this.away = score[1];
  }

  public value(): number {
    return this.home - this.away;
  }
}
