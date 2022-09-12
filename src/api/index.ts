import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { IStorage } from '../storage';
import { ApplyingPredictionText } from '../bot/texts';
import { WebAppButton } from '../bot/buttons';
import TelegramBot from 'node-telegram-bot-api';

export class ApiServer {
  private bot: TelegramBot;
  private storage: IStorage;

  constructor(bot: TelegramBot, storage: IStorage) {
    this.bot = bot;
    this.storage = storage;
  }

  public launch(): void {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    
    app.use('/web-app', express.static('build'));
    app.use('/static', express.static('build/static'));
    app.use('/images', express.static('images'));
    app.use('/', express.static('build'));
    
    app.get('/games', async (req, res) => {
      const { userId } = req.query;
    
      const games = await this.storage.getGamesForUser({ userId: +userId! });
    
      await res.json(games);
    });
    
    app.post('/prediction', async (req, res) => {
      const { userId, gameId, prediction } = req.body;
    
      const p = await this.storage.createPrediction({ userId, gameId, prediction });
      const game = await this.storage.getGame({ gameId });
    
      await this.bot.sendMessage(
        userId,
        new ApplyingPredictionText({ prediction: p, game }).value(),
        new WebAppButton('Выбрать матч', 'prediction').asObject()
      ); 
      res.end();
    });
    
    app.get('/rating', async (req, res) => {
      const { limit, offset } = req.query;
      
      const rating = await this.storage.getRating({ limit: +limit!, offset: +offset! });
      await res.json(rating);
    });
    
    app.get('/predictions/:userId', async (req, res) => {
      const { userId } = req.params;
    
      const predictions = await this.storage.getUserPredictions({
        userId: +userId,
        limit: 100,
        offset: 0,
        extended: true,
      });
      await res.json(predictions);
    });
    
    app.get('/table', async (req, res) => {
      const table = await this.storage.getTable({ extended: true });
      await res.json(table);
    });
    
    app.get('/all-games', async (req, res) => {
      const games = await this.storage.getGames();
      await res.json(games);
    });

    app.listen(process.env.API_PORT, () => console.log('✅ API started'));
  }
}
