const express = require('express');
require('dotenv').config();

const { Composer } = require('micro-bot')

// const tg = new Telegram(process.env.BOT_TOKEN)

const tg = new Composer;

const getArticle = require('./getArticle');
const app = express();

app.use(express.static('public'))

app.get('/api/article', async (req, res) => {
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

const port = process.env.PORT || 4242;

app.listen(port, () => {
  console.log(`server is running on a port ${port}`)
});

module.exports = tg;