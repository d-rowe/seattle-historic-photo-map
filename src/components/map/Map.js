import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";

const TOKEN = process.env.REACT_APP_TOKEN;

const Map = ({ geojson }) => {
  useEffect(() => {
    mapboxgl.accessToken = TOKEN;
    let center = [-122.3321, 47.6062];
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/outdoors-v11",
      center,
      zoom: 10.75 // starting zoom
    });

    // map.setMinZoom(10.75);
    map.setMaxZoom(18);
    let [width, height] = [6, 4];
    map.setMaxBounds([
      { lon: center[0] - width, lat: center[1] - height },
      { lon: center[0] + width, lat: center[1] + height }
    ]);

    map.on("style.load", function() {
      map.addSource("markers", {
        type: "geojson",
        data: geojson
      });

      map.addLayer({
        id: "markers",
        interactive: true,
        type: "symbol",
        source: "markers",
        layout: {
          "icon-image": "attraction-15",
          "icon-size": 1.5
          // "icon-allow-overlap": true
        },
        paint: {
          /*"text-size": 10,*/
        }
      });
    });
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "markers", function(e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      map.flyTo({
        center: coordinates
      });
      var properties = e.features[0].properties;
      let { title, image } = properties;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      let popupHTML = `<div class="popup">
          <img src=${image} class="popup-image" alt=${title} />
          <h3>${title}</h3>
        </div>`;

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(popupHTML)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", function() {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", function() {
      map.getCanvas().style.cursor = "";
    });
  });

  return <div id="map" />;
};

export default Map;
