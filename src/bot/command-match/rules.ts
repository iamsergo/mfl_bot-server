import { CommandMatch } from "./abstarct";

export const RULES_COMMAND_STARTS_WITH = ['/rules', 'правила'];

export class RulesCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = RULES_COMMAND_STARTS_WITH;
  }
}
