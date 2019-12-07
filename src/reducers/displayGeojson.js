import photos from "../geojson/photos.json";

const displayGeojson = (state = photos, action) => {
  switch (action.type) {
    case "SET_FEATURES":
      return { type: "FeatureCollection", features: action.features };
    default:
      return state;
  }
};

export default displayGeojson;
