import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.secondHandRef = React.createRef();
    this.minuteHandRef = React.createRef();
    this.hourHandRef = React.createRef();
  }

  getTime = () => {
    const timeUtc = moment().utcOffset();
    const timeReq = moment()
      .add(timeUtc * -1, "m")
      .add(this.props.clock.timezone, "h")
      .toDate();
    const timeNow = moment(timeReq);
    const seconds = timeNow.seconds();
    const minutes = timeNow.minutes();
    const hours = timeNow.hours();
    const timeInterval = 6;

    this.secondHandRef.current.style.transform =
      "rotate(" + seconds * timeInterval + "deg)";
    this.minuteHandRef.current.style.transform =
      "rotate(" + (minutes * timeInterval + seconds / 10) + "deg)";
    this.hourHandRef.current.style.transform =
      "rotate(" + (hours * 30 + minutes / 2) + "deg)";
  };

  componentDidMount() {
    this.intervalId = setInterval(this.getTime, 500);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <>
        <div
          className="card me-3 mb-3"
          style={{ width: "180px", height: "250px" }}
        >
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Удалить"
              onClick={() => this.props.remove(this.props.clock.id)}
            ></button>
          </div>
          <h6 className="card-title text-capitalize text-center">
            {this.props.clock.name}
            <small className="text-muted">
              {" "}
              (
              {(this.props.clock.timezone > 0 ? "+" : "") +
                this.props.clock.timezone}
              )
            </small>
          </h6>
          <div className="card-body ">
            <div className="clock">
              <div id="second-hand" ref={this.secondHandRef}></div>
              <div id="minute-hand" ref={this.minuteHandRef}></div>
              <div id="hour-hand" ref={this.hourHandRef}></div>
              <div id="center"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Clock.propTypes = {
  clock: PropTypes.shape({
    name: PropTypes.string.isRequired,
    timezone: PropTypes.number.isRequired,
    id: PropTypes.any.isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
};

export default Clock;
