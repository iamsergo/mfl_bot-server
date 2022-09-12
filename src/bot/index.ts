import TgBot from 'node-telegram-bot-api';
import { IStorage } from '../storage';
import { StartCommandMatch, PredictionCommandMatch, RatingCommandMatch, PredictionsCommandMatch, RulesCommandMatch, TournamentCommandMatch, UpdateGamesCommandMatch, UpdateTableCommandMatch } from './command-match/';
import { CommandOptions, DefaultCommand, PredictionCommand, PredictionsCommand, RatingCommand, RulesCommand, StartCommand, TournamentCommand, UpdateGamesCommand, UpdateTableCommand } from './commands';

export class Bot {
  private storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  public launch(): TgBot {
    const bot = new TgBot(process.env.BOT_TOKEN!, { polling: true });

    bot.on('message', async (msg) => {
      if(!msg.from || !msg.text) return;
    
      const text = msg.text!.toLowerCase();
    
      const options: CommandOptions = {
        storage: this.storage,
        bot,
        message: {
          chatId: msg.chat.id,
          text,
          user: {
            id: msg.from.id,
            username: msg.from.username || `_${msg.from.first_name}`,
            name: msg.from.first_name,
          },
        },
      };
    
      if(new StartCommandMatch(text).existed()) {
        await new StartCommand(options).execute();
      } else if(new PredictionCommandMatch(text).existed()) {
        await new PredictionCommand(options).execute();
      } else if(new RatingCommandMatch(text).existed()) {
        await new RatingCommand(options).execute();
      } else if(new PredictionsCommandMatch(text).existed()) {
        await new PredictionsCommand(options).execute();
      } else if(new RulesCommandMatch(text).existed()) {
        await new RulesCommand(options).execute();
      } else if(new TournamentCommandMatch(text).existed()) {
        await new TournamentCommand(options).execute();
      } else {
        await new DefaultCommand(options).execute();
      }
    
      if(process.env.ADMIN_ID && msg.from.id === +process.env.ADMIN_ID) {
        if(new UpdateGamesCommandMatch(text).existed()) {
          await new UpdateGamesCommand(options).execute();
        } else if(new UpdateTableCommandMatch(text).existed()) {
          await new UpdateTableCommand(options).execute();
        }
      }
    });

    console.log('✅ Bot launched');    
    return bot;
  }
}
