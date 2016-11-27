import * as clock from '../ClockActions'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import lolex from 'lolex'
import { merge } from 'lodash'

const STATES = {
  stopwatch: {
    clock: {
      elapsedTime: 0,
      lastTick: 0,
      mode: 'CLOCK_MODE_STOPWATCH',
      running: true,
      startedAt: 0,
      timerValue: 5000
    }
  },
  timer: {
    clock: {
      elapsedTime: 0,
      lastTick: 0,
      mode: 'CLOCK_MODE_TIMER',
      running: true,
      startedAt: 0,
      timerDuration: 5000,
      timerValue: 5000
    }
  }
}
const mockStore = configureStore()

describe('ClockActions', () => {
  describe('#pauseClock', () => {
    it('returns a payload', () => {
      const result = clock.pauseClock()
      expect(result.type).toBe('CLOCK_PAUSED')
      expect(result.payload).toBe(emptyObj)
    })
  })

  describe('#resetClock', () => {
    it('resets the clock', () => {
      const mockClock = lolex.install()
      const store = mockStore(STATES.stopwatch)
      clock.resetClock()(store.dispatch, store.getState)
      let actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions[0].type).toBe('CLOCK_RESET')
      expect(actions[0].payload).toMatchSnapshot()
      mockClock.tick(clock.IntervalValue)
      actions = store.getActions()
      expect(actions.length).toBe(1)
      mockClock.uninstall()
    })

    it('resets the timer', () => {
      const mockClock = lolex.install()
      const store = mockStore(STATES.timer)
      clock.resetClock()(store.dispatch, store.getState)
      let actions = store.getActions()
      expect(actions[0].type).toBe('CLOCK_RESET')
      expect(actions[0].payload).toMatchSnapshot()
      mockClock.tick(clock.IntervalValue)
      actions = store.getActions()
      expect(actions.length).toBe(1)
      mockClock.uninstall()
    })
  })

  describe('#startClock', () => {
    it('starts the stopwatch', () => {
      const mockClock = lolex.install()
      const store = mockStore(STATES.stopwatch)
      clock.startClock()(store.dispatch, store.getState)
      let actions = store.getActions()
      expect(actions.length).toBe(1)
      expect(actions[0].type).toBe('CLOCK_STARTED')
      expect(actions[0].payload).toMatchSnapshot()
      mockClock.tick(clock.IntervalValue)
      actions = store.getActions()
      expect(actions.length).toBe(2)
      expect(actions[1].type).toBe('CLOCK_TICK')
      expect(actions[1].payload).toMatchSnapshot()
      mockClock.uninstall()
    })

    it('starts the timer', () => {
      const mockClock = lolex.install()
      const store = mockStore(STATES.timer)
      clock.startClock()(store.dispatch, store.getState)
      let actions = store.getActions()
      expect(actions[0].type).toBe('CLOCK_STARTED')
      expect(actions[0].payload).toMatchSnapshot()
      mockClock.tick(clock.IntervalValue)
      actions = store.getActions()
      expect(actions.length).toBe(2)
      expect(actions[1].type).toBe('CLOCK_TICK')
      expect(actions[1].payload).toMatchSnapshot()
      mockClock.uninstall()
    })
  })

  describe('#changeTimerValue', () => {
    it('resets and updates the timer value when in stopwatch mode', () => {
      const store = mockStore(STATES.stopwatch)
      clock.changeTimerValue()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_TIMER_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })

    it('resets and updates the timer value when in timer mode', () => {
      const store = mockStore(STATES.timer)
      clock.changeTimerValue(STATES.timer.clock.timerValue)(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_TIMER_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })
  })

  describe('#stopwatchMode', () => {
    it('resets the clock and changes the mode from stopwatch to stopwatch', () => {
      const store = mockStore(STATES.stopwatch)
      store.dispatch(clock.stopwatchMode())
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_MODE_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })

    it('resets the clock and changes the mode from timer to stopwatch', () => {
      const store = mockStore(STATES.timer)
      store.dispatch(clock.stopwatchMode())
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_MODE_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })
  })

  describe('#timerMode', () => {
    it('resets the clock and changes the mode from stopwatch to timer', () => {
      const store = mockStore(STATES.stopwatch)
      clock.timerMode()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_MODE_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })

    it('resets the clock and changes the mode from timer to timer', () => {
      const store = mockStore(STATES.timer)
      clock.timerMode()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_MODE_CHANGED')
      expect(action.payload).toMatchSnapshot()
    })
  })

  describe('#toggleClock', () => {
    it('starts the clock when not previously started', () => {
      const mockClock = lolex.install()
      const store = mockStore(merge({}, STATES.stopwatch, {
        clock: {
          running: false,
          startedAt: null
        }
      }))
      clock.toggleClock()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_STARTED')
      expect(action.payload).toMatchSnapshot()
      mockClock.uninstall()
    })

    it('pauses the clock when running', () => {
      const mockClock = lolex.install()
      const store = mockStore(STATES.stopwatch)
      clock.toggleClock()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_PAUSED')
      expect(action.payload).toMatchSnapshot()
      mockClock.uninstall()
    })

    it('unpauses the clock when paused', () => {
      const store = mockStore(merge({}, STATES.stopwatch, {
        clock: {
          running: false
        }
      }))
      clock.toggleClock()(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_UNPAUSED')
      expect(action.payload).toMatchSnapshot()
    })
  })

  describe('#clockTick', () => {
    it('does nothing if the clock is not running', () => {
      const store = mockStore(merge({}, STATES.stopwatch, {
        clock: {
          running: false
        }
      }))
      clock.clockTick(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action).not.toBeDefined()
    })

    it('recalculates the clock state when running', () => {
      const mockClock = lolex.install()
      mockClock.tick(clock.IntervalValue * 20)
      const store = mockStore(STATES.stopwatch)
      mockClock.tick(clock.IntervalValue * 20)
      clock.clockTick(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.payload).toMatchSnapshot()
      mockClock.uninstall()
    })

    it('recalculates the timer state when running', () => {
      const mockClock = lolex.install()
      mockClock.tick(clock.IntervalValue * 20)
      const store = mockStore(STATES.timer)
      mockClock.tick(clock.IntervalValue * 20)
      clock.clockTick(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.payload).toMatchSnapshot()
      mockClock.uninstall()
    })

    it('determines when the timer has expired', () => {
      const mockClock = lolex.install()
      mockClock.tick(clock.IntervalValue * 20)
      const store = mockStore(merge({}, STATES.timer, {
        clock: {
          timerDuration: 500,
          timerValue: 500
        }
      }))
      mockClock.tick(clock.IntervalValue * 20)
      clock.clockTick(store.dispatch, store.getState)
      const action = store.getActions()[0]
      expect(action.payload.hasTimerElapsed).toBeTruthy()
      mockClock.uninstall()
    })
  })

  describe('#pauseClock', () => {
    it('pauses the clock', () => {
      const store = mockStore(STATES.stopwatch)
      store.dispatch(clock.pauseClock())
      const action = store.getActions()[0]
      expect(action.type).toBe('CLOCK_PAUSED')
      expect(action.payload).toMatchSnapshot()
    })
  })
})
