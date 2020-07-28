import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
const Beer = ({ beer }) => {
  return (
    <div className="beer">
      <div className="beer-name">
        <span className="beer-name-label">{beer.id}</span>
      </div>
      <div className="min-max">
        <span id="mintemp" className="min-temp">{beer.min}</span>
         &#8451;~
        <span className="max-temp">{beer.max}</span>&#8451;
      </div>
      <div
        className={classNames("current", {
          warning: beer.min > beer.current || beer.current > beer.max,
        })}
      >
        <span className="current-label">{beer.current} &#8451;</span>
      </div>
    </div>
  );
};

Beer.propTypes = {
  beer: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
    current: PropTypes.number,
    id: PropTypes.string,
  }),
};

export default Beer;
