const fs = require("fs");

let joined = [];
let lastPage = 0;
for (let page = 1; page <= 62; page++) {
  try {
    const path = `../pages/${page}.json`;
    if (fs.existsSync(path)) {
      //file exists
      const json = require(path);
      joined.push(...json);
      lastPage = page;
    }
  } catch (err) {
    // console.error(err);
  }
}

let totalEntries = joined.length;
// Remove entries without coordinate data
joined = joined.filter(entry => entry.coordinates[0] !== "");

// Remove extra rounded coordinate(s)
for (let i = 0; i < joined.length; i++) {
  let { length } = joined[i].coordinates;
  if (length > 2) {
    joined[i].coordinates.splice(1, 1);
  }
}

let numOmitted = totalEntries - joined.length;

fs.writeFile("../joined.json", JSON.stringify(joined, null, 2), function(err) {
  if (err) {
    console.log(err);
  }
});
console.log(`Joined ${lastPage} pages, ${joined.length} images.`);
console.log(`${numOmitted} images omitted for lack of coordinate information.`);
