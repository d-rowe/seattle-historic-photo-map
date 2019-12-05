const fs = require("fs");

for (let i = 1; i <= 62; i++) {
  let page = i.toString();
  if (i < 10) page = "0" + page;
  const json = require(`../pages/${page}.json`);
  console.log(page);
  const output = json.map(entry => {
    const image = entry.imageURL.replace("?highlightTerms=", "");
    delete entry.imageURL;
    entry.image = image;
    if (!entry.createdDate) entry.createdDate = "";
    return entry;
  });
  fs.writeFile(
    `../pages/${page}.json`,
    JSON.stringify(output, null, 2),
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
}
