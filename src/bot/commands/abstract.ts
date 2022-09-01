import TelegramBot from "node-telegram-bot-api";
import { ICommand } from "./interface";
import { CommandMessage } from '../types';
import { IStorage } from "../../storage";

export type CommandOptions = {
  storage: IStorage;
  bot: TelegramBot;
  message: CommandMessage;
}

export abstract class Command implements ICommand {
  protected storage: IStorage;
  protected bot: TelegramBot;
  protected message: CommandMessage;

  constructor(options: CommandOptions) {
    this.storage = options.storage;
    this.bot = options.bot;
    this.message = options.message;
  }

  abstract execute(): Promise<void>;
}
