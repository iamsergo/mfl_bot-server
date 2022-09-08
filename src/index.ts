import dotenv from 'dotenv';
dotenv.config();
import storage from './storage';
import { Bot } from './bot';
import { ApiServer } from './api';

const bot = new Bot(storage).launch();
new ApiServer(bot, storage).launch();
