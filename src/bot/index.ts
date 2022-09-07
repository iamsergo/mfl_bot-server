import TgBot from 'node-telegram-bot-api';
import storage from '../storage';
import { StartCommandMatch, PredictionCommandMatch, RatingCommandMatch, PredictionsCommandMatch, RulesCommandMatch, TournamentCommandMatch } from './command-match/';
import { CommandOptions, DefaultCommand, PredictionCommand, PredictionsCommand, RatingCommand, RulesCommand, StartCommand, TournamentCommand } from './commands';

const bot = new TgBot(process.env.BOT_TOKEN!, { polling: true });

bot.on('message', async (msg) => {
  console.log('Message:\n', msg);

  if(!msg.from) return;

  const text = msg.text!.toLowerCase();

  const options: CommandOptions = {
    storage,
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
});

export default bot;
