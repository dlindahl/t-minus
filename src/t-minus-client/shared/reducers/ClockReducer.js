import assign from 'lodash/assign';
import ClockActions from '../actionTypes/ClockActionTypes';
import TimerSeverity from '../actionTypes/TimerSeverityTypes';

function initialState() {
  return {
    elapsedTime: 0,
    lastTick: 0,
    mode: null,
    percentComplete: 1,
    running: false,
    startedAt: null,
    timerValue: null
  };
}

export default function clock(state = initialState(), action) {
  const payload = action.payload || {};
  switch(action.type) {
    case ClockActions.CLOCK_MODE_CHANGED:
      return assign({}, initialState(), {
        mode: payload.mode,
        percentComplete: payload.percentComplete,
        timerValue: state.timerValue
      });
    case ClockActions.CLOCK_PAUSED:
      return assign({}, state, {
        running: false
      });
    case ClockActions.CLOCK_RESET:
      return assign({}, initialState(), {
        mode: state.mode,
        percentComplete: payload.percentComplete,
        timerValue: state.timerValue
      });
    case ClockActions.CLOCK_STARTED:
      return assign({}, state, {
        lastTick: performance.now(),
        running: true,
        startedAt: payload.startedAt
      });
    case ClockActions.CLOCK_TICK:
      return assign({}, state, {
        elapsedTime: payload.elapsedTime,
        lastTick: payload.currentTick,
        percentComplete: payload.percentComplete
      });
    case ClockActions.CLOCK_TIMER_CHANGED:
      return assign({}, initialState(), {
        timerValue: payload.timerValue,
        percentComplete: payload.percentComplete
      });
    case ClockActions.CLOCK_UNPAUSED:
      return assign({}, state, {
        lastTick: performance.now(),
        running: true
      });
    default:
      return state;
  }
}
