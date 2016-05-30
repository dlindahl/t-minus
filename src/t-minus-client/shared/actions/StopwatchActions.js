import partial from 'lodash/partial';
import StopwatchActions from '../actionTypes/StopwatchActionTypes';

const IntervalValue = 50;
let interval = null;

function stopwatchTick(dispatch) {
  dispatch({
    type: StopwatchActions.STOPWATCH_TICK,
    payload: {}
  });
}

export function pauseStopwatch() {
  return {
    type: StopwatchActions.STOPWATCH_PAUSED,
    payload: {}
  };
}

export function resetStopwatch() {
  clearInterval(interval);
  interval = null;
  return {
    type: StopwatchActions.STOPWATCH_RESET,
    payload: {}
  };
}

export function startStopwatch() {
  return (dispatch) => {
    dispatch({
      type: StopwatchActions.STOPWATCH_STARTED,
      payload: {
        startedAt: performance.now()
      }
    });
    interval = setInterval(partial(stopwatchTick, dispatch), IntervalValue);
  };
}

export function toggleStopwatch() {
  return (dispatch, getState) => {
    const stopwatch = getState().stopwatch;
    if(!stopwatch.startedAt) {
      startStopwatch()(dispatch);
    } else if(stopwatch.running) {
      dispatch(pauseStopwatch());
    } else {
      dispatch(unpauseStopwatch());
    }
  };
}

export function unpauseStopwatch() {
  return {
    type: StopwatchActions.STOPWATCH_UNPAUSED,
    payload: {}
  };
}
