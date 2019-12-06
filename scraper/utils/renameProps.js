const fs = require("fs");

for (let i = 2; i <= 62; i++) {
  let page = i.toString();
  if (i < 10) page = "0" + page;
  const json = require(`../pages/${page}.json`);
  console.log(page);
  const output = json.map(entry => {
    entry.coordinates = entry.coordinates.map(coord => parseFloat(coord));
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
