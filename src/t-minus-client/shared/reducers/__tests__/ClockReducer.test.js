/* eslint no-magic-numbers: off */
import ClockActions from '../../actionTypes/ClockActionTypes'
import emptyObj from 'empty/object'
import present from 'present'
import PresenterActions from '../../actionTypes/PresenterActionTypes'
import reducer from '../ClockReducer'

describe('ClockReducer', () => {
  it('has an expected default state', () => {
    const state = reducer(undefined, {})
    expect(state.elapsedTime).toBe(0)
    expect(state.lastTick).toBe(0)
    expect(state.mode).toBeNull()
    expect(state.percentComplete).toBe(1)
    expect(state.running).toBeFalsy()
    expect(state.startedAt).toBeFalsy()
    expect(state.timerValue).toBeFalsy()
  })

  describe(ClockActions.CLOCK_MODE_CHANGED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      initState.timerValue = 1000
      const state = reducer(initState, {
        payload: {
          mode: 'NEWMODE',
          percentComplete: 0.5,
          timerValue: -1
        },
        type: ClockActions.CLOCK_MODE_CHANGED
      })
      expect(state.mode).toBe('NEWMODE')
      expect(state.percentComplete).toBe(0.5)
      expect(state.timerValue).toBe(1000)
    })
  })

  describe(ClockActions.CLOCK_PAUSED, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      initState.running = true
      const state = reducer(initState, {
        payload: {
          running: false
        },
        type: ClockActions.CLOCK_PAUSED
      })
      expect(state.running).toBeFalsy()
    })
  })

  describe(ClockActions.CLOCK_RESET, () => {
    it('changes the state', () => {
      const initState = reducer(undefined, {})
      const state = reducer(initState, {
        payload: {
          mode: 'NEWMODE',
          percentComplete: 0.5,
          timerValue: -1
        },
        type: ClockActions.CLOCK_RESET
      })
      expect(state.mode).toBeNull()
      expect(state.percentComplete).toBe(0.5)
      expect(state.timerValue).toBeNull()
    })
  })

  describe(ClockActions.CLOCK_STARTED, () => {
    it('changes the state', () => {
      const startedAt = present()
      const state = reducer(undefined, {
        payload: {
          startedAt
        },
        type: ClockActions.CLOCK_STARTED
      })
      expect(state.lastTick).toBeGreaterThan(0)
      expect(state.running).toBeTruthy()
      expect(state.startedAt).toBe(startedAt)
    })
  })

  describe(ClockActions.CLOCK_TICK, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          currentTick: 'currentTick',
          elapsedTime: 'elapsedTime',
          percentComplete: 'percentComplete'
        },
        type: ClockActions.CLOCK_TICK
      })
      expect(state.elapsedTime).toBe('elapsedTime')
      expect(state.lastTick).toBe('currentTick')
      expect(state.percentComplete).toBe('percentComplete')
    })
  })

  describe(ClockActions.CLOCK_TIMER_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          percentComplete: 'percentComplete',
          timerValue: 'timerValue'
        },
        type: ClockActions.CLOCK_TIMER_CHANGED
      })
      expect(state.timerValue).toBe('timerValue')
      expect(state.percentComplete).toBe('percentComplete')
    })
  })

  describe(ClockActions.CLOCK_UNPAUSED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: emptyObj,
        type: ClockActions.CLOCK_UNPAUSED
      })
      expect(state.lastTick).toBeGreaterThan(0)
      expect(state.running).toBeTruthy()
    })
  })

  describe(PresenterActions.PRESENTER_STATE_CHANGED, () => {
    it('changes the state', () => {
      const state = reducer(undefined, {
        payload: {
          clock: {
            mode: 'P_STATE_CHANGED'
          }
        },
        type: PresenterActions.PRESENTER_STATE_CHANGED
      })
      expect(state.mode).toBe('P_STATE_CHANGED')
    })
  })
})
