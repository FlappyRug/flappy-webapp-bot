const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const TOKEN = process.env.TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL; // https://birdgame-brown.vercel.app
const SERVER_URL = process.env.SERVER_URL; // https://telegram-webapp-bot-pk72.onrender.com
const PORT = process.env.PORT || 3000;
const GAME_SHORT_NAME = 'lastflight';

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${SERVER_URL}/webhook`);

app.use(bodyParser.json());

// === Webhook Endpoint ===
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// === /start command ===
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendGame(chatId, GAME_SHORT_NAME);
});

// === Game launch (callback_query) ===
bot.on('callback_query', (query) => {
  const gameUrl = `${WEBAPP_URL}?userId=${query.from.id}`;
  bot.answerCallbackQuery({
    callback_query_id: query.id,
    url: gameUrl,
  });
});

// === Keep-alive route ===
app.get('/', (req, res) => {
  res.send('✅ Game bot is live');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

