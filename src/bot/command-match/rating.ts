import { CommandMatch } from "./abstarct";

export const RATING_COMMAND_STARTS_WITH = ['/rating', 'рейтинг'];

export class RatingCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = RATING_COMMAND_STARTS_WITH;
  }
}
