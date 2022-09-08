import { CommandMatch } from "./abstarct";

export const UPDATE_GAMES_COMMAND_STARTS_WITH = ['/upd_games'];

export class UpdateGamesCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = UPDATE_GAMES_COMMAND_STARTS_WITH;
  }

  existed(): boolean {
    return this.startsWith.some(start => this.text.startsWith(start));
  }
}
