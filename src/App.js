import React from "react";
import Map from "./components/Map";
import geojson from "./geojson/photos.json";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map geojson={geojson} />
    </div>
  );
}

export default App;
