import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import token from "./token";

const Map = ({ geojson }) => {
  useEffect(() => {
    mapboxgl.accessToken = token;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [-122.3321, 47.6062],
      zoom: 10.75 // starting zoom
    });

    map.setMinZoom(10.75);
    map.setMaxZoom(18);
    map.setMaxBounds([
      { lon: -122.7, lat: 47.4 },
      { lon: -121.9, lat: 47.8 }
    ]);

    map.on("load", () => {
      console.log("loaded");
    });
  });

  return <div id="map" />;
};

export default Map;
