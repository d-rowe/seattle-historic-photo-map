import React, { useRef } from "react";
import { connect } from "react-redux";
import { setFeatures } from "../../../actions/index";
import "./YearRange.css";

const YearRange = ({ geojson, setFeatures }) => {
  const yearStartEl = useRef(null);
  const yearEndEl = useRef(null);

  const startYear = 1851;
  const endYear = new Date().getFullYear();

  const onYearChange = e => {
    const { name, value } = e.target;
    if (value >= startYear && value <= endYear) {
      if (name === "year-start") {
        const endValue = yearEndEl.current.valueAsNumber;
        if (value > endValue) {
          yearEndEl.current.value = value;
        }
      } else if (name === "year-end") {
        const startValue = yearStartEl.current.valueAsNumber;
        if (value < startValue) {
          yearStartEl.current.value = value;
        }
      }

      setFeatures(
        geojson.features.filter(photo => {
          const date = new Date(photo.properties.createdDate);
          const year = date.getFullYear();
          const start = yearStartEl.current.valueAsNumber;
          const end = yearEndEl.current.valueAsNumber;
          return year >= start && year <= end;
        })
      );
    }
  };

  const onBlur = e => {
    const { name, value } = e.target;
    if (value < startYear || value > endYear) {
      if (name === "year-start") {
        e.target.value = startYear;
      } else if (name === "year-end") {
        e.target.value = endYear;
      }
    }
  };

  const onKeyPress = e => {
    let charCode = typeof e.which == "number" ? e.which : e.keyCode;
    if (charCode === 13) {
      onBlur(e);
    }
  };

  return (
    <div>
      <h3>Filter Years</h3>
      <div className="field is-grouped is-grouped-centered">
        <div className="control">
          <input
            className="input year-input"
            type="number"
            name="year-start"
            min={startYear}
            max={endYear}
            defaultValue={startYear}
            ref={yearStartEl}
            onChange={onYearChange}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
          />
        </div>
        <div className="control">
          <input
            className="input year-input"
            type="number"
            name="year-end"
            min={startYear}
            max={endYear}
            defaultValue={endYear}
            ref={yearEndEl}
            onChange={onYearChange}
            onBlur={onBlur}
            onKeyPress={onKeyPress}
          />
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { geojson: state.geojson };
}

const mapDispatchToProps = dispatch => {
  return {
    setFeatures: features => {
      dispatch(setFeatures(features));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(YearRange);
