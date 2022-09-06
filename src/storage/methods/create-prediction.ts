import { Pool } from "pg";
import { DBPrediction } from "../../types";
import { IMethod } from "./interface";
import { DiffForScore, ResultForScore, TotalForScore } from '../../helpers';

type CreatePredictionData = {
  userId: number;
  gameId: number;
  prediction: number[];
};
export class CreatePrediction implements IMethod<DBPrediction> {
  private db: Pool;
  private userId: number;
  private gameId: number;
  private prediction: number[];


  constructor(db: Pool, data: CreatePredictionData) {
    this.db = db;
    this.userId = data.userId;
    this.gameId = data.gameId;
    this.prediction = data.prediction;
  }

  async execute() {
    const sql = `
      INSERT INTO predictions(
        user_id,
        game_id, 
        value,
        total, 
        result,
        diff
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      this.userId,
      this.gameId,
      this.prediction,
      new TotalForScore(this.prediction).value(),
      new ResultForScore(this.prediction).value(),
      new DiffForScore(this.prediction).value(),
    ];
    const { rows } = await this.db.query(sql, values);
    return rows[0];
  }
}
