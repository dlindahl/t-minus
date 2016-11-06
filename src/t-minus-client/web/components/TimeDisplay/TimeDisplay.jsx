import assign from 'lodash/assign';
import { Component, PropTypes } from 'react';
import withSeverity from '../../decorators/withSeverity';

const baseStyles = {
  microseconds: {
    fontSize: '5vw'
  },
  prefix: {
    default: {
      pointerEvents: 'none'
    },
    [false]: {
      opacity: 0
    },
    [true]: {
      opacity: 1
    }
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '14vw',
    justifyContent: 'center',
    flex: 1,
    width: '100%'
  }
};

const TimeDisplay = (props) => {
  const microsecondsStyle =
    assign(
      {},
      baseStyles.microseconds,
      { color: props.tertiaryColor }
    );
  const prefixStyle =
    assign(
      {},
      baseStyles.prefix.default,
      baseStyles.prefix[props.hasTimerElapsed]
    );
  const style =
    assign(
      {},
      baseStyles.root,
      {
        background: props.secondaryColor,
        color: props.primaryColor
      }
    );
  return (
    <div style={style}>
      <div>
        <span data-test-id="prefix" style={prefixStyle}>
          -
        </span>
        <span data-test-id="hours">
          {props.hours}
        </span>
        :
        <span data-test-id="minutes">
          {props.minutes}
        </span>
        :
        <span data-test-id="seconds">
          {props.seconds}
        </span>
        <span data-test-id="microseconds" style={microsecondsStyle}>
          .{props.microseconds}
        </span>
      </div>
    </div>
  );
};

TimeDisplay.propTypes = {
  hasTimerElapsed: PropTypes.bool,
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  microseconds: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  tertiaryColor: PropTypes.string
};
TimeDisplay.defaultProps = {
  hasTimerElapsed: false,
  hours: '--',
  minutes: '--',
  seconds: '--',
  microseconds: '----'
};

export default withSeverity(TimeDisplay);
