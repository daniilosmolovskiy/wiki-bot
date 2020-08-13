const express = require('express');
require('dotenv').config();

const { Telegram } = require('telegraf');

const port = process.env.PORT || 3000;

// const { Composer } = require('micro-bot')

const tg = new Telegram(process.env.BOT_TOKEN);

// const tg = new Composer;

const getArticle = require('./getArticle');
const app = express();

// app.use(express.static('public'))

app.get('/', async (req, res) => {
  const fullArticle = await getArticle();

  tg.sendPhoto(process.env.CHANNEL_ID, `https:${fullArticle.imageSrc}`);

  tg.sendMessage(process.env.CHANNEL_ID, fullArticle.text.join('\n \n').trim(), {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Полная статья", url: `https://ru.wikipedia.org/${fullArticle.articleLink}` }]
      ]
    }
  });

  res.json(fullArticle);
})

app.listen(port)

// app.post('/', (req, res) => {
//   bot.processUpdate(req.body);
//   res.sendStatus(200);
// });
// tg.start( ctx => {
//   ctx.reply('Bot working')
// })

// module.exports = tg;