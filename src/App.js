import React from "react";
import Map from "./components/map/Map";
import geojson from "./geojson/photos.json";
import Controls from "./components/controls/Controls";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map geojson={geojson} />
      <Controls />
    </div>
  );
}

export default App;
