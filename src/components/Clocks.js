import React from "react";
import PropTypes from "prop-types";
import Clock from "./Clock";

function Clocks(props) {
  return (
    <div className="d-flex flex-wrap pt-4">
      {props.clocks.map((clock) => (
        <Clock key={clock.id} clock={clock} remove={props.remove} />
      ))}
    </div>
  );
}

Clocks.propTypes = {
  clocks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      timezone: PropTypes.number.isRequired,
      id: PropTypes.any.isRequired,
    })
  ).isRequired,
  remove: PropTypes.func.isRequired,
};

export default Clocks;
