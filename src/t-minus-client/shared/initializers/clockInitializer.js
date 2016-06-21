import { bindActionCreators } from 'redux';
import { changeTimerValue, stopwatchMode, timerMode } from '../actions/ClockActions';
import ClockActions from '../actionTypes/ClockActionTypes';

const initialMode = ClockActions.CLOCK_MODE_STOPWATCH;
const initialTimerValue = 3 * 60 * 1000;

export default function clockInitializer(store) {
  if(!store) {
    return;
  }
  const actions = bindActionCreators({ changeTimerValue, stopwatchMode, timerMode }, store.dispatch);
  actions.changeTimerValue(initialTimerValue);
  switch(initialMode) {
    case ClockActions.CLOCK_MODE_STOPWATCH:
      actions.stopwatchMode();
      break;
    case ClockActions.CLOCK_MODE_TIMER:
      actions.timerMode();
      break;
    default:
      console.warn('Unknown initial clock mode: "%s"', initialMode);
  }
}
