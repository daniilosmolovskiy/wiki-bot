const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%80%D1%82%D0%B0%D0%BB:%D0%98%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5_%D1%81%D0%BE%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%B8%D0%B5';


async function getArticle() {
  const { data } = await axios.get(page_url);
  const $ = cheerio.load(data);

  const fullArticle = {
    imageSrc: null,
    text: [],
    articleLink: null
  };

  //get Image src
  const article = $('b:contains("Актуальная избранная")').parent().parent();
  const image = article.find(".floatright").find("img").attr("src");
  fullArticle.imageSrc = image;

  //get title
  // const title = article.find("p").find("a").text();
  //   fullArticle.text.push($elem.text().trim());

    
  //get link to full article
  const link = article.find("p").find("a").attr("href");
  fullArticle.articleLink = link;

  const title = article.find("p").first().find("a").first().text();
  fullArticle.text.push(`<b>${title}</b>`);

  //get text
  const text = article.find("p").each((i, elem) => {
    const $elem = $(elem);
    fullArticle.text.push($elem.text().trim());
  });


  return fullArticle;
}

module.exports = getArticle;