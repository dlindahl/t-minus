/* eslint no-magic-numbers: off */
import ClockActions from '../../actionTypes/ClockActionTypes'
import reducer from '../DisplayReducer'
import PresenterActions from '../../actionTypes/PresenterActionTypes'
import TeleprompterActions from '../../actionTypes/TeleprompterActionTypes'
import TimerSeverity from '../../actionTypes/TimerSeverityTypes'

describe('DisplayReducer', () => {
  it('has an expected default state', () => {
    const state = reducer(undefined, {})
    expect(state.hours).toBe('--')
    expect(state.minutes).toBe('--')
    expect(state.seconds).toBe('--')
    expect(state.microseconds).toBe('----')
    expect(state.hasTimerElapsed).toBeFalsy()
    expect(state.mode).toBeNull()
    expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CALM)
    expect(state.teleprompter).toBe('')
    expect(state.timerValue).toBeNull()
  })

  describe(ClockActions.CLOCK_MODE_CHANGED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      initState.timerValue = 1000
      const state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timerValue: -1
        },
        type: ClockActions.CLOCK_MODE_CHANGED
      })
      expect(state.mode).toBe(ClockActions.CLOCK_MODE_TIMER)
      expect(state.timerValue).toBe(1000)
      expect(state.hours).toBe('00')
      expect(state.minutes).toBe('00')
      expect(state.seconds).toBe('00')
      expect(state.microseconds).toBe('0000')
    })
  })

  describe(ClockActions.CLOCK_TICK, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          hasTimerElapsed: true
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.hasTimerElapsed).toBeTruthy()
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CALM)
    })

    it('uses a default severity when not in TIMER mode', () => {
      const initState = reducer(undefined, {})
      initState.severity = TimerSeverity.TIMER_SEVERITY_CRITICAL
      const state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_STOPWATCH
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CALM)
    })

    it('sets severity to the default when a short timer is less than 75% complete', () => {
      const timerValue = 2 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      const state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.7499,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CALM)
    })

    it('sets severity to WARN when a short timer is between 75% and 80% complete', () => {
      const timerValue = 2 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      let state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.75,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_WARN)

      state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.7999,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_WARN)
    })

    it('sets severity to DANGER when a short timer is between 80% and 90% complete', () => {
      const timerValue = 2 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      let state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.8,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_DANGER)

      state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.8999,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_DANGER)
    })

    it('sets severity to CRITICAL when a short timer is more than 90% complete', () => {
      const timerValue = 2 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      let state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 0.9,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CRITICAL)

      state = reducer(initState, {
        payload: {
          elapsedTime: timerValue * 1.10,
          mode: ClockActions.CLOCK_MODE_TIMER
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CRITICAL)
    })

    it('sets the severity to the default when there is more than 1 minute remaining in the timer', () => {
      const timerValue = 3 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      const state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: 1 * 60 * 1000
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CALM)
    })

    it('sets the severity to WARN when there is between 30 seconds and 1 minute remaining in the timer', () => {
      const timerValue = 3 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      let state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: 30 * 1000
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_WARN)

      state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: (1 * 60 * 1000) - 1
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_WARN)
    })

    it('sets the severity to DANGER when there is between 0 and 30 seconds remaining in the timer', () => {
      const timerValue = 3 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      let state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: 0
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_DANGER)

      state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: (30 * 1000) - 1
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_DANGER)
    })

    it('sets the severity to CRITICAL when there is less than 0 seconds remaining in the timer', () => {
      const timerValue = 3 * 60 * 1000
      const initState = reducer(undefined, {})
      initState.timerValue = timerValue
      const state = reducer(initState, {
        payload: {
          mode: ClockActions.CLOCK_MODE_TIMER,
          timeRemaining: -0.001
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.severity).toBe(TimerSeverity.TIMER_SEVERITY_CRITICAL)
    })
  })

  describe(ClockActions.CLOCK_TIMER_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          timerValue: 1000
        },
        type: ClockActions.CLOCK_TIMER_CHANGED
      })
      expect(state.timerValue).toBe(1000)
    })
  })

  describe(ClockActions.CLOCK_RESET, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      initState.mode = ClockActions.CLOCK_MODE_TIMER
      initState.timerValue = 1000
      const state = reducer(initState, {
        payload: {
          duration: {
            d: 1,
            h: 2,
            m: 30,
            ms: 500,
            s: 40
          },
          mode: 'NOOP',
          timerValue: -1
        },
        type: ClockActions.CLOCK_RESET
      })
      expect(state.mode).toBe(ClockActions.CLOCK_MODE_TIMER)
      expect(state.timerValue).toBe(1000)
      expect(state.hours).toBe('02')
      expect(state.minutes).toBe('30')
      expect(state.seconds).toBe('40')
      expect(state.microseconds).toBe('5000')
    })
  })

  describe(PresenterActions.PRESENTER_STATE_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          display: {
            mode: 'P_STATE_CHANGED'
          }
        },
        type: PresenterActions.PRESENTER_STATE_CHANGED
      })
      expect(state.mode).toBe('P_STATE_CHANGED')
    })
  })

  describe(TeleprompterActions.TELEPROMPTER_VALUE_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          value: 'PROMPTER_TEXT'
        },
        type: TeleprompterActions.TELEPROMPTER_VALUE_CHANGED
      })
      expect(state.teleprompter).toBe('PROMPTER_TEXT')
    })
  })
})
