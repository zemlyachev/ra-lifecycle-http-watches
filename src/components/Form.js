import React, { useRef } from "react";
import PropTypes from "prop-types";

function Form(props) {
  const timezoneInputRef = useRef();
  const nameInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const clockName = nameInputRef.current.value;
    const timezone = parseInt(timezoneInputRef.current.value, 10);
    props.onAddClock({
      name: clockName,
      timezone: timezone,
    });
    nameInputRef.current.value = "";
    timezoneInputRef.current.value = "";
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="name" className="form-label">
              Название
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              ref={nameInputRef}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="timezone" className="form-label">
              Временная зона
            </label>
            <input
              name="timezone"
              type="number"
              className="form-control"
              ref={timezoneInputRef}
              min="-12"
              max="14"
              step="1"
              required
            />
          </div>
          <div className="col d-flex align-items-end">
            <button type="submit" className="btn btn-primary">
              Добавить
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  onAddClock: PropTypes.func.isRequired,
};

export default Form;
