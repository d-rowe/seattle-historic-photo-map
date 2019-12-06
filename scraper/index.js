const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const fs = require("fs");

const STARTING_PAGE = 1;
const ENDING_PAGE = 1;

(async () => {
  const browser = await puppeteer.launch();
  for (let page = STARTING_PAGE; page <= ENDING_PAGE; page++) {
    let results = [];
    console.log(`Loading page ${page}...`);
    const mainPage = await browser.newPage();
    await mainPage.goto(
      `https://cdm16118.contentdm.oclc.org/digital/collection/p15015coll4/search/page/${page}`
    );
    await mainPage.waitForSelector(".SearchResult");
    let html = await mainPage.evaluate(() => document.body.innerHTML);

    let imagePages = [];
    let $ = cheerio.load(html);
    const baseURL = "https://cdm16118.contentdm.oclc.org";
    $(".SearchResult").each((i, el) => {
      imagePages.push(baseURL + $(el).attr("href"));
    });

    for (let i = 0; i < imagePages.length; i++) {
      console.log(`Scraping information for image ${(page - 1) * 50 + i + 1}`);
      const imagePage = await browser.newPage();
      await imagePage.goto(imagePages[i]);
      await imagePage.waitForSelector(".field-title");
      html = await imagePage.evaluate(() => document.body.innerHTML);
      $ = cheerio.load(html);

      let image =
        baseURL +
        $(".ItemImage-itemImage")
          .find("img")
          .attr("src")
          .replace("?highlightTerms=", "");

      let title = $(".field-title")
        .find(".field-value")
        .text();

      let identifier = $(".field-identi")
        .find(".field-value")
        .text();

      let description = $(".field-descri")
        .find(".field-value")
        .text();

      let coordinates = $(".field-coordi")
        .find(".field-value")
        .text()
        .split(", ")
        .map(coord => parseFloat(coord));

      let createdDate = new Date(
        $(".field-date")
          .find(".field-value")
          .text()
      );

      let subjects = [];
      $(".field-subjec")
        .find("span")
        .find("span")
        .each((i, el) => {
          subjects.push(
            $(el)
              .find("a")
              .text()
          );
        });

      let photographer = $(".field-creato")
        .find(".field-value")
        .text();

      let intersection = $(".field-inters")
        .find(".field-value")
        .text();

      results.push({
        title,
        identifier,
        description,
        subjects,
        photographer,
        intersection,
        coordinates,
        createdDate,
        image
      });
    }

    if (page < 10) {
      page = `0${page}`;
    }

    fs.writeFile(
      `./pages/${page}.json`,
      JSON.stringify(results, null, 2),
      function(err) {
        if (err) {
          console.log(err);
        }
      }
    );
  }

  await browser.close();
})();
