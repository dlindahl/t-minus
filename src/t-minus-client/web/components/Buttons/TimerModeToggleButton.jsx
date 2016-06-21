import AccessAlarm from 'react-icons/lib/md/access-alarm';
import AppNavButton from './AppNavButton';
import { bindActionCreators } from 'redux';
import ClockActions from '../../../shared/actionTypes/ClockActionTypes';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { timerMode } from '../../../shared/actions/ClockActions';

function getState(state) {
  return {
    active: state.clock.mode === ClockActions.CLOCK_MODE_TIMER
  };
}

function getActions(dispatch) {
  return bindActionCreators({ timerMode }, dispatch);
}

@connect(getState, getActions)
export default class TimerModeToggleButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.timerMode();
  }
  render() {
    return (
      <AppNavButton active={this.props.active} onClick={this.handleClick}>
        <AccessAlarm/>
      </AppNavButton>
    );
  }
}

TimerModeToggleButton.propTypes = {
  active: PropTypes.bool
};

TimerModeToggleButton.defaultProps = {
  active: false
};
