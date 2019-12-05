const joined = require("../joined.json");
const fs = require("fs");

const geoJSON = joined.map(entry => {
  const { coordinates } = entry;
  delete entry.coordinates;
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-122.413682, 37.775408]
    },
    properties: entry
  };
});

fs.writeFile(
  "../../client/src/geoJSON/photos.json",
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
