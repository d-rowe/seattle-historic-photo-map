const joined = require("../joined.json");
const fs = require("fs");

const geoJSON = joined.map(entry => {
  const { coordinates } = entry;
  delete entry.coordinates;
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates
    },
    properties: entry
  };
});

fs.writeFile(
  "../../src/geojson/photos.json",
  JSON.stringify(geoJSON, null, 2),
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);

console.log(
  `Created geojson file at client/src/geoJSON/photos.json with ${geoJSON.length} entries`
);
