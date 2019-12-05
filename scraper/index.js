const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://cdm16118.contentdm.oclc.org/digital/collection/p15015coll4/search"
  );
  await page.waitForSelector(".SearchResult");
  const html = await page.evaluate(() => document.body.innerHTML);

  main(html);
  await browser.close();
})();

const main = html => {
  let pageURLs = getPageURLs(html);
  console.log(pageURLs);
};

const getPageURLs = html => {
  let imagePages = [];
  const $ = cheerio.load(html);
  $(".SearchResult").each((i, el) => {
    imagePages.push($(el).attr("href"));
  });
  return imagePages;
};
