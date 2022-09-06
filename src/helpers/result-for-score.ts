import { GameResult } from "../types";

export class ResultForScore {
  private home: number;
  private away: number;

  constructor(score: number[]) {
    this.home = score[0];
    this.away = score[1];
  }

  public value(): number {
    if(this.home > this.away) return GameResult.HOME;
    else if(this.home === this.away) return GameResult.DRAW;
    else return GameResult.AWAY;
  }
}