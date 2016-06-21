import assign from 'lodash/assign';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';
import TimerSeverity from '../../../shared/actionTypes/TimerSeverityTypes';

const baseStyles = {
  severity: {
    [TimerSeverity.TIMER_SEVERITY_CALM]: {
      background: Colors.Silver,
      color: Colors.MidnightBlue
    },
    [TimerSeverity.TIMER_SEVERITY_WARN]: {
      background: Colors.SunFlower,
      color: Colors.MidnightBlue
    },
    [TimerSeverity.TIMER_SEVERITY_DANGER]: {
      background: Colors.Alizarin,
      color: Colors.MidnightBlue
    },
    [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
      background: Colors.Pomegranate,
      color: Colors.Clouds
    }
  },
  microseconds: {
    fontSize: '5vw'
  },
  microsecondsSeverity: {
    [TimerSeverity.TIMER_SEVERITY_CALM]: {
      color: Colors.Concrete
    },
    [TimerSeverity.TIMER_SEVERITY_WARN]: {
      color: Colors.Orange
    },
    [TimerSeverity.TIMER_SEVERITY_DANGER]: {
      color: Colors.Pomegranate
    },
    [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
      color: Colors.Alizarin
    }
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
    fontFamily: 'Roboto Mono',
    fontSize: '14vw',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  }
};

const TimeDisplay = (props) => (
  <div style={assign({}, baseStyles.root, baseStyles.severity[props.severity])}>
    <div>
      <span style={baseStyles.prefix[props.hasTimerElapsed]}>
        -
      </span>
      <span>
        {props.hours}
      </span>
      :
      <span>
        {props.minutes}
      </span>
      :
      <span>
        {props.seconds}
      </span>
      <span style={assign({}, baseStyles.microseconds, baseStyles.microsecondsSeverity[props.severity])}>
        .{props.microseconds}
      </span>
    </div>
  </div>
);

TimeDisplay.propTypes = {
  hasTimerElapsed: PropTypes.bool,
  severity: PropTypes.string,
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  microseconds: PropTypes.string
};
TimeDisplay.defaultProps = {
  hasTimerElapsed: false,
  severity: TimerSeverity.TIMER_SEVERITY_CALM,
  hours: '--',
  minutes: '--',
  seconds: '--',
  microseconds: '----'
};

export default TimeDisplay;
