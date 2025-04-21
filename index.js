const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.TOKEN;
const WEBAPP_URL = process.env.WEBAPP_URL;

app.use(bodyParser.json());

app.post(`/webhook`, async (req, res) => {
  const message = req.body.message;
  if (!message || !message.chat || !message.text) return res.sendStatus(200);

  if (message.text === "/start") {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: message.chat.id,
      text: "🎮 Грати",
      reply_markup: {
        inline_keyboard: [[
          { text: "🎮 Грати", web_app: { url: `${WEBAPP_URL}?start_param=play` } }
        ]]
      }
    });
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(PORT, () => console.log(`Bot server running on port ${PORT}`));
