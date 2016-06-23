import assign from 'lodash/assign';
import { Component, PropTypes } from 'react';
import withSeverity from '../../decorators/withSeverity';

const baseStyles = {
  microseconds: {
    fontSize: '5vw'
  },
  prefix: {
    [false]: {
      visibility: 'hidden'
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

@withSeverity
export default class TimeDisplay extends Component {
  render() {
    const style =
      assign(
        {},
        baseStyles.root,
        {
          background: this.props.secondaryColor,
          color: this.props.primaryColor
        }
      );
    const microsecondsStyle =
      assign(
        {},
        baseStyles.microseconds,
        { color: this.props.tertiaryColor }
      );
    return (
      <div style={style}>
        <div>
          <span style={baseStyles.prefix[this.props.hasTimerElapsed]}>
            -
          </span>
          <span>
            {this.props.hours}
          </span>
          :
          <span>
            {this.props.minutes}
          </span>
          :
          <span>
            {this.props.seconds}
          </span>
          <span style={microsecondsStyle}>
            .{this.props.microseconds}
          </span>
        </div>
      </div>
    );
  }
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

export default TimeDisplay;
