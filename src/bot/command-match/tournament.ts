import { CommandMatch } from "./abstarct";

export const TOURNAMENT_COMMAND_STARTS_WITH = ['/tournament', 'турнир'];

export class TournamentCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = TOURNAMENT_COMMAND_STARTS_WITH;
  }
}
