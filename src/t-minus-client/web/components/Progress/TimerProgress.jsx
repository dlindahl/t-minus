import assign from 'lodash/assign';
import ClockActions from '../../../shared/actionTypes/ClockActionTypes';
import Colors from '../../../shared/constants/Colors';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TimerSeverity from '../../../shared/actionTypes/TimerSeverityTypes';

const DefaultHeight = 50;

const baseStyles = {
  empty: {
    height: DefaultHeight
  },
  root: {
    default: {
      background: Colors.Silver
    },
    [TimerSeverity.TIMER_SEVERITY_WARN]: {
      background: Colors.SunFlower
    },
    [TimerSeverity.TIMER_SEVERITY_DANGER]: {
      background: Colors.Alizarin
    },
    [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
      background: Colors.Pomegranate
    }
  },
  progress: {
    default: {
      background: Colors.Concrete,
      height: DefaultHeight,
      whiteSpace: 'nowrap'
    },
    [TimerSeverity.TIMER_SEVERITY_WARN]: {
      background: Colors.Orange
    },
    [TimerSeverity.TIMER_SEVERITY_DANGER]: {
      background: Colors.Pomegranate
    },
    [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
      background: Colors.Pomegranate
    }
  }
}

function getState(state) {
  return {
    mode: state.clock.mode,
    percentComplete: state.clock.percentComplete,
    severity: state.display.severity
  };
}

@connect(getState)
export default class TimerProgress extends Component {
  render() {
    if(this.props.mode !== ClockActions.CLOCK_MODE_TIMER) {
      return (
        <div style={baseStyles.empty}/>
      );
    }
    const containerStyle =
      assign(
        {},
        baseStyles.root.default,
        baseStyles.root[this.props.severity]
      );
    const progressStyle =
      assign(
        {},
        baseStyles.progress.default,
        baseStyles.progress[this.props.severity],
        { width: `${this.props.percentComplete * 100}%` }
      );
    return (
      <div style={containerStyle}>
        <div style={progressStyle}/>
      </div>
    );
  }
}

TimerProgress.propTypes = {
  mode: PropTypes.string,
  percentComplete: PropTypes.number,
  severity: PropTypes.string
};
TimerProgress.defaultProps = {
  mode: null,
  percentComplete: 1,
  severity: TimerSeverity.TIMER_SEVERITY_CALM
};
