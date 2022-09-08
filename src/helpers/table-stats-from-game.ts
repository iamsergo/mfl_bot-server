import { DBRawGame } from "../types";

export type TeamTableStat = {
  teamId: number;
  games: number;
  win: number;
  draw: number;
  lose: number;
  score: number;
  pass: number;
  diff: number;
  points: number;
};

export class TableStatsFromGame {
  private game: DBRawGame;

  constructor(game: DBRawGame) {
    this.game = game;
  }

  private getStats(teamId: number, myIdx: number): TeamTableStat {
    const otherIdx = myIdx === 0 ? 1 : 0;
    const score = this.game.score![myIdx];
    const pass = this.game.score![otherIdx];
    const diff = score - pass;

    let gameStats;
    if(this.game.result === 0) {
      gameStats = myIdx === 0
        ? { win: 1, draw: 0, lose: 0, points: 3 }
        : { win: 0, draw: 0, lose: 1, points: 0 };
    } else if(this.game.result === 2) {
      gameStats = myIdx === 0
        ? { win: 0, draw: 0, lose: 1, points: 0 }
        : { win: 1, draw: 0, lose: 0, points: 3 };
    } else if(this.game.result === 1) {
      gameStats = { win: 0, draw: 1, lose: 0, points: 1 };
    } else {
      gameStats = score > pass
        ? { win: 1, draw: 0, lose: 0, points: 3 }
        : { win: 0, draw: 0, lose: 1, points: 0 };
    }

    return {
      teamId,
      games: 1,
      ...gameStats,
      score,
      pass,
      diff,
    };
  }

  public value(): TeamTableStat[] {
    return [this.game.home_id, this.game.away_id].map(this.getStats.bind(this));
  }
}
