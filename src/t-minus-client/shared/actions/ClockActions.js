import ClockActions from '../actionTypes/ClockActionTypes';
import emptyObj from 'empty/object';
import formatDuration from '../util/formatDuration';
import partial from 'lodash/partial';
import present from 'present';

export const IntervalValue = 50;
let interval = null;

function calculateDuration(mode, elapsedTime, maxDuration) {
  switch(mode) {
    case ClockActions.CLOCK_MODE_TIMER:
      const timeRemaining = maxDuration - elapsedTime;
      const percentComplete = Math.min(elapsedTime / maxDuration, 1);
      return [formatDuration(timeRemaining), timeRemaining, percentComplete];
    default:
      return [formatDuration(elapsedTime), null, 1]
  }
}

function determineTimerElapsed(mode, elapsedTime, maxDuration) {
  switch(mode) {
    case ClockActions.CLOCK_MODE_TIMER:
      return elapsedTime > maxDuration;
    default:
      return false;
  }
}

export function clockTick(dispatch, getState) {
  const { clock } = getState();
  if(!clock.running) {
    return;
  }
  const currentTick = present();
  const delta = currentTick - clock.lastTick;
  const elapsedTime = clock.elapsedTime + delta;
  const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, elapsedTime, clock.timerValue);
  const hasTimerElapsed = determineTimerElapsed(clock.mode, elapsedTime, clock.timerValue);
  dispatch({
    type: ClockActions.CLOCK_TICK,
    payload: {
      currentTick,
      delta,
      duration,
      elapsedTime,
      hasTimerElapsed,
      mode: clock.mode,
      percentComplete,
      timeRemaining
    }
  });
}

export function pauseClock() {
  return {
    type: ClockActions.CLOCK_PAUSED,
    payload: emptyObj
  };
}

export function resetClock() {
  return (dispatch, getState) => {
    const { clock } = getState();
    clearInterval(interval);
    interval = null;
    const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, 0, clock.timerValue);
    return dispatch({
      type: ClockActions.CLOCK_RESET,
      payload: {
        duration,
        timeRemaining,
        timerValue: clock.timerValue,
        percentComplete
      }
    });
  }
}

export function startClock() {
  return (dispatch, getState) => {
    const { clock } = getState();
    const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, clock.elapsedTime, clock.timerDuration);
    dispatch({
      type: ClockActions.CLOCK_STARTED,
      payload: {
        duration,
        percentComplete,
        startedAt: present(),
        timeRemaining
      }
    });
    interval = setInterval(partial(clockTick, dispatch, getState), IntervalValue);
  };
}

export function changeTimerValue(timerValue) {
  return (dispatch, getState) => {
    const { clock } = getState();
    const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, 0, timerValue);
    return dispatch({
      type: ClockActions.CLOCK_TIMER_CHANGED,
      payload: { duration, percentComplete, timeRemaining, timerValue }
    });
  }
}

export function stopwatchMode() {
  const mode = ClockActions.CLOCK_MODE_STOPWATCH;
  const [duration, timeRemaining, percentComplete] = calculateDuration(mode, 0);
  return {
    type: ClockActions.CLOCK_MODE_CHANGED,
    payload: {
      duration,
      mode,
      percentComplete,
      timeRemaining
    }
  }
}

export function timerMode() {
  return (dispatch, getState) => {
    const { clock } = getState();
    const mode = ClockActions.CLOCK_MODE_TIMER;
    const [duration, timeRemaining, percentComplete] = calculateDuration(mode, 0, clock.timerValue);
    return dispatch({
      type: ClockActions.CLOCK_MODE_CHANGED,
      payload: {
        duration,
        mode,
        percentComplete,
        timeRemaining
      }
    });
  }
}

export function toggleClock() {
  return (dispatch, getState) => {
    const clock = getState().clock
    if(clock.startedAt == null) {
      startClock()(dispatch, getState);
    } else if(clock.running) {
      dispatch(pauseClock());
    } else {
      dispatch(unpauseClock());
    }
  };
}

export function unpauseClock() {
  return {
    type: ClockActions.CLOCK_UNPAUSED,
    payload: {}
  };
}
