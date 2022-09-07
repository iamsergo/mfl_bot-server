import { CommandMatch } from "./abstarct";

export const PREDICTIONS_COMMAND_STARTS_WITH = ['/predictions', 'прогнозы'];

export class PredictionsCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = PREDICTIONS_COMMAND_STARTS_WITH;
  }
}
