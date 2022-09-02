import TgBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
dotenv.config();
import { PgStorage as Storage } from '../storage';
import { StartCommandMatch, PredictionCommandMatch } from './command-match/';
import { CommandOptions, DefaultCommand, PredictionCommand, StartCommand } from './commands';

const bot = new TgBot(process.env.BOT_TOKEN!, { polling: true });

console.log('here');

bot.on('message', async (msg) => {
  console.log('Message:\n', msg);

  if(!msg.from) return;

  const text = msg.text!.toLowerCase();

  const options: CommandOptions = {
    storage: new Storage(),
    bot,
    message: {
      chatId: msg.chat.id,
      text,
      user: {
        id: msg.from.id,
        username: msg.from.username!,
        name: msg.from.first_name,
      },
    },
  };

  if(new StartCommandMatch(text).existed()) {
    await new StartCommand(options).execute();
  } else if(new PredictionCommandMatch(text).existed()) {
    await new PredictionCommand(options).execute();
  } else {
    await new DefaultCommand(options).execute();
  }
});

export default bot;
