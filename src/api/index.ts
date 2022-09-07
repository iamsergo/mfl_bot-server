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

app.get('/rating', async (req, res) => {
  const { limit, offset } = req.query;

  console.log({ limit, offset });
  
  const rating = await storage.getRating({ limit: +limit!, offset: +offset! });
  await res.json(rating);
});

app.get('/predictions/:userId', async (req, res) => {
  const { userId } = req.params;

  const predictions = await storage.getUserPredictions({
    userId: +userId,
    limit: 100,
    offset: 0,
    extended: true,
  });
  await res.json(predictions);
});

app.get('/table', async (req, res) => {
  const table = await storage.getTable({ extended: true });
  await res.json(table);
});

app.get('/all-games', async (req, res) => {
  const games = await storage.getGames();
  await res.json(games);
});

export default app;
