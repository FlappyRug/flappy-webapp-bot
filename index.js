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

// === Webhook Endpoint ===
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// === /start with full-screen WebApp button ===
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Натисни кнопку нижче, щоб почати гру:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Грати зараз",
            web_app: {
              url: WEBAPP_URL
            }
          }
        ]
      ]
    }
  });
});

// === Keep-alive route ===
app.get('/', (req, res) => {
  res.send('✅ Бот працює');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порту ${PORT}`);
});
