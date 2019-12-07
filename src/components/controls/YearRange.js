import React, { useRef } from "react";
import "./YearRange.css";

const YearRange = () => {
  const yearStartEl = useRef(null);
  const yearEndEl = useRef(null);

  const startYear = 1851;
  const endYear = new Date().getFullYear();

  let lastStartYear = startYear;
  let lastEndYear = endYear;

  const onYearChange = e => {
    const { name, value } = e.target;
    if (value >= startYear && value <= endYear) {
      if (name === "year-start") {
        lastStartYear = value;
        const endValue = yearEndEl.current.valueAsNumber;
        if (value > endValue) {
          yearEndEl.current.value = value;
          lastEndYear = value;
        }
      } else if (name === "year-end") {
        lastEndYear = value;
        const startValue = yearStartEl.current.valueAsNumber;
        if (value < startValue) {
          yearStartEl.current.value = value;
          lastStartYear = value;
        }
      }
    }
  };

  const onBlur = e => {
    const { name, value } = e.target;
    if (value < startYear || value > endYear) {
      if (name === "year-start") {
        e.target.value = lastStartYear;
      } else if (name === "year-end") {
        e.target.value = lastEndYear;
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
      <header className="card-header has-background-info">
        <p className="card-header-title has-text-white">Year Range</p>
      </header>
      <div className="card-content">
        <div className="content">
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
      </div>
    </div>
  );
};

export default YearRange;
