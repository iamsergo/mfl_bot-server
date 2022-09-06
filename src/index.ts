import dotenv from 'dotenv';
dotenv.config();
import bot from './bot';
import app from './api';

console.log(bot);

app.listen(process.env.API_PORT, () => console.log('\n\nStarted...\n\n'));
