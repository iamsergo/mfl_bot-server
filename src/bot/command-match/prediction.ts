import { CommandMatch } from "./abstarct";

export const PREDICTION_COMMAND_STARTS_WITH = ['/prediction', 'прогноз'];

export class PredictionCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = PREDICTION_COMMAND_STARTS_WITH;
  }
}
