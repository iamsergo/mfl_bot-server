import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bot from '../bot';
import storage from '../storage';
import { ApplyingPredictionText } from '../bot/texts';
import { WebAppButton } from '../bot/buttons';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/web-app', express.static('/home/head/Рабочий стол/files/mfl_bot-web-app/build'));
app.use('/static', express.static('/home/head/Рабочий стол/files/mfl_bot-web-app/build/static'));

app.get('/games', async (req, res) => {
  const { userId } = req.query;

  const games = await storage.getGamesForUser({ userId: +userId! });

  await res.json(games);
});

app.post('/prediction', async (req, res) => {
  const { userId, gameId, prediction } = req.body;

  console.log({ userId, gameId, prediction });

  const p = await storage.createPrediction({ userId, gameId, prediction });
  const game = await storage.getGame({ gameId });

  await bot.sendMessage(
    userId,
    new ApplyingPredictionText({ prediction: p, game }).value(),
    new WebAppButton('Выбрать матч', 'prediction').asObject()
  ); 
  res.end();
});

export default app;
