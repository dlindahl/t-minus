import ClockActions from '../actionTypes/ClockActionTypes'
import emptyObj from 'empty/object'
import formatDuration from '../util/formatDuration'
import { partial } from 'lodash'
import present from 'present'

export const IntervalValue = 50
let interval = null
const PercentCompleteMax = 1
const ElapsedTimeMin = 0

function calculateDuration (mode, elapsedTime, maxDuration) {
  switch (mode) {
    case ClockActions.CLOCK_MODE_TIMER: {
      const timeRemaining = maxDuration - elapsedTime
      const percentComplete = Math.min(elapsedTime / maxDuration, PercentCompleteMax)
      return [formatDuration(timeRemaining), timeRemaining, percentComplete]
    }
    default:
      return [formatDuration(elapsedTime), null, PercentCompleteMax]
  }
}

function determineTimerElapsed (mode, elapsedTime, maxDuration) {
  switch (mode) {
    case ClockActions.CLOCK_MODE_TIMER:
      return elapsedTime > maxDuration
    default:
      return false
  }
}

export function clockTick (dispatch, getState) {
  const { clock } = getState()
  if (!clock.running) {
    return
  }
  const currentTick = present()
  const delta = currentTick - clock.lastTick
  const elapsedTime = clock.elapsedTime + delta
  const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, elapsedTime, clock.timerValue)
  const hasTimerElapsed = determineTimerElapsed(clock.mode, elapsedTime, clock.timerValue)
  dispatch({
    payload: {
      currentTick,
      delta,
      duration,
      elapsedTime,
      hasTimerElapsed,
      mode: clock.mode,
      percentComplete,
      timeRemaining
    },
    type: ClockActions.CLOCK_TICK
  })
}

export function pauseClock () {
  return {
    payload: emptyObj,
    type: ClockActions.CLOCK_PAUSED
  }
}

export function resetClock () {
  return (dispatch, getState) => {
    const { clock } = getState()
    clearInterval(interval)
    interval = null
    const [duration, timeRemaining, percentComplete] =
      calculateDuration(clock.mode, ElapsedTimeMin, clock.timerValue)
    return dispatch({
      payload: {
        duration,
        percentComplete,
        timeRemaining,
        timerValue: clock.timerValue
      },
      type: ClockActions.CLOCK_RESET
    })
  }
}

export function startClock () {
  return (dispatch, getState) => {
    const { clock } = getState()
    const [duration, timeRemaining, percentComplete] =
      calculateDuration(clock.mode, clock.elapsedTime, clock.timerDuration)
    dispatch({
      payload: {
        duration,
        percentComplete,
        startedAt: present(),
        timeRemaining
      },
      type: ClockActions.CLOCK_STARTED
    })
    interval = setInterval(partial(clockTick, dispatch, getState), IntervalValue)
  }
}

export function changeTimerValue (timerValue) {
  return (dispatch, getState) => {
    const { clock } = getState()
    const [duration, timeRemaining, percentComplete] = calculateDuration(clock.mode, ElapsedTimeMin, timerValue)
    return dispatch({
      payload: { duration, percentComplete, timeRemaining, timerValue },
      type: ClockActions.CLOCK_TIMER_CHANGED
    })
  }
}

export function stopwatchMode () {
  const mode = ClockActions.CLOCK_MODE_STOPWATCH
  const [duration, timeRemaining, percentComplete] = calculateDuration(mode, ElapsedTimeMin)
  return {
    payload: {
      duration,
      mode,
      percentComplete,
      timeRemaining
    },
    type: ClockActions.CLOCK_MODE_CHANGED
  }
}

export function timerMode () {
  return (dispatch, getState) => {
    const { clock } = getState()
    const mode = ClockActions.CLOCK_MODE_TIMER
    const [duration, timeRemaining, percentComplete] = calculateDuration(mode, ElapsedTimeMin, clock.timerValue)
    return dispatch({
      payload: {
        duration,
        mode,
        percentComplete,
        timeRemaining
      },
      type: ClockActions.CLOCK_MODE_CHANGED
    })
  }
}

export function toggleClock () {
  return (dispatch, getState) => {
    const clock = getState().clock
    if (clock.startedAt == null) {
      startClock()(dispatch, getState)
    } else if (clock.running) {
      dispatch(pauseClock())
    } else {
      dispatch(unpauseClock())
    }
  }
}

export function unpauseClock () {
  return {
    payload: emptyObj,
    type: ClockActions.CLOCK_UNPAUSED
  }
}
