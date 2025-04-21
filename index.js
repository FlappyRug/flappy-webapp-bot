
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const TOKEN = process.env.TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;
const PORT = process.env.PORT || 3000;

const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${process.env.SERVER_URL}/webhook`);

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// === Handle /start ===
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Натисни кнопку нижче, щоб почати гру:', {
    reply_markup: {
      inline_keyboard: [[
        {
          text: 'Play Last Flight',
          web_app: { url: WEBAPP_URL }
        }
      ]]
    }
  });
});

// === Keep-alive Route ===
app.get('/', (req, res) => {
  res.send('✅ Game bot is live');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
