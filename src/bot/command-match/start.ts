import { CommandMatch } from "./abstarct";

export const START_COMMAND_STARTS_WITH = ['/start', 'меню'];

export class StartCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = START_COMMAND_STARTS_WITH;
  }
}
