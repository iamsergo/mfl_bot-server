import { ICommandMatch } from "./interface";

export abstract class CommandMatch implements ICommandMatch {
  protected abstract startsWith: string[];
  protected text: string;

  constructor(text: string) {
    this.text = text;
  }

  existed(): boolean {
    return this.startsWith.some(start => start === this.text);
  }
}
