const express = require('express');
const { Telegram } = require('telegraf');
const tg = new Telegram(process.env.BOT_TOKEN);

require('dotenv').config();

const port = process.env.PORT || 3000;
const chat = '-1001342903377';
const app = express();

const getArticle = require('./getArticle');

app.get('/', async (req, res) => {
  const fullArticle = await getArticle();
  tg.sendPhoto(chat, `https:${fullArticle.imageSrc}`);
  tg.sendMessage(chat, fullArticle.text.join('\n \n').trim(), {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Полная статья", url: `https://ru.wikipedia.org/${fullArticle.articleLink}` }]
      ]
    }
  });
  res.send("Bot is working!");
})

app.listen(port);