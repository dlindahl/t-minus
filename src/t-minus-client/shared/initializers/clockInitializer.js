import { changeTimerValue, stopwatchMode, timerMode } from '../actions/ClockActions'
import ClockActions from '../actionTypes/ClockActionTypes'

const DefaultInitialMode = ClockActions.CLOCK_MODE_STOPWATCH
const DefaultInitialTimerValue = 3 * 60 * 1000

export default function clockInitializer (store, initialTimerValue = DefaultInitialTimerValue, initialMode = DefaultInitialMode) {
  if (!store) {
    return
  }
  changeTimerValue(initialTimerValue)(store.dispatch, store.getState)
  switch (initialMode) {
    case ClockActions.CLOCK_MODE_STOPWATCH:
      store.dispatch(stopwatchMode())
      break
    case ClockActions.CLOCK_MODE_TIMER:
      timerMode()(store.dispatch, store.getState)
      break
    default:
      console.warn('Unknown initial clock mode: "%s"', initialMode)
  }
}
