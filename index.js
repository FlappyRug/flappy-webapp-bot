
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const TOKEN = process.env.TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;
const PORT = process.env.PORT || 3000;
const GAME_SHORT_NAME = 'lastflight';

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${process.env.SERVER_URL}/webhook`);

// Express middleware
app.use(bodyParser.json());

// Webhook endpoint
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendGame(chatId, GAME_SHORT_NAME);
});

// Handle game launch
bot.on('callback_query', (query) => {
  const gameUrl = WEBAPP_URL + `?userId=${query.from.id}`;
  bot.answerCallbackQuery({
    callback_query_id: query.id,
    url: gameUrl,
  });
});

// Keep-alive
app.get('/', (req, res) => {
  res.send('✅ Game bot is live');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 Bot server running on port ${PORT}`));
