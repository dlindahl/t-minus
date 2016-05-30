import assign from 'lodash/assign';
import padStart from 'lodash/padStart';
import StopwatchActions from '../actionTypes/StopwatchActionTypes';

function initialState() {
  return {
    display: {
      hours: '--',
      minutes: '--',
      seconds: '--',
      microseconds: '----'
    },
    elapsedTime: 0,
    lastTick: 0,
    running: false,
    startedAt: null
  };
}

function formatDuration(duration) {
  var d, h, m, s, ms;
  ms = Math.floor((duration % 1) * 1000);
  s = Math.floor(duration / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return { d, h, m, s, ms };
};

export default function stopwatch(state = initialState(), action) {
  const payload = action.payload || {};
  switch(action.type) {
    case StopwatchActions.STOPWATCH_PAUSED:
      return assign({}, state, {
        running: false
      });
    case StopwatchActions.STOPWATCH_RESET:
      return initialState();
    case StopwatchActions.STOPWATCH_STARTED:
      return assign({}, state, {
        display: {
          hours: '00',
          minutes: '00',
          seconds: '00',
          microseconds: '0000'
        },
        lastTick: performance.now(),
        running: true,
        startedAt: payload.startedAt
      });
    case StopwatchActions.STOPWATCH_TICK:
      if(!state.running) {
        return state;
      }
      const currentTick = performance.now();
      const delta = currentTick - state.lastTick;
      const elapsedTime = state.elapsedTime + delta;
      const duration = formatDuration(elapsedTime);

      return assign({}, state, {
        display: {
          hours: padStart(duration.h, 2, '0'),
          minutes: padStart(duration.m, 2, '0'),
          seconds: padStart(duration.s, 2, '0'),
          microseconds: padStart(duration.ms, 4, '0')
        },
        elapsedTime,
        lastTick: currentTick
      });
    case StopwatchActions.STOPWATCH_UNPAUSED:
      return assign({}, state, {
        lastTick: performance.now(),
        running: true
      });
    default:
      return state;
  }
}
