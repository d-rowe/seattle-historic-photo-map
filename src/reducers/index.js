import { combineReducers } from "redux";
import geojson from "./geojson";
import displayGeojson from "./displayGeojson";

const index = combineReducers({
  geojson,
  displayGeojson
});

export default index;
