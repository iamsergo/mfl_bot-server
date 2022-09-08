import { CommandMatch } from "./abstarct";

export const UPDATE_TABLE_COMMAND_STARTS_WITH = ['/upd_table'];

export class UpdateTableCommandMatch extends CommandMatch {
  protected startsWith: string[];
  
  constructor(text: string) {
    super(text);
    this.startsWith = UPDATE_TABLE_COMMAND_STARTS_WITH;
  }

  existed(): boolean {
    return this.startsWith.some(start => this.text.startsWith(start));
  }
}
