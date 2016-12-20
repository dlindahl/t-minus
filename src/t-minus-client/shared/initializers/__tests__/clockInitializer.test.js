/* eslint no-magic-numbers: off */
import configureStore from 'redux-mock-store'
import initializer from '../clockInitializer'

const STATES = {
  default: {
    clock: {
      mode: 'MODE'
    }
  }
}
const mockStore = configureStore()

describe('clockInitializer', () => {
  it('initializes the TIMER settings', () => {
    const store = mockStore(STATES.default)
    initializer(store)
    const actions = store.getActions()
    expect(actions[0].type).toBe('CLOCK_TIMER_CHANGED')
    expect(actions[0].payload.timerValue).toBe(5 * 60 * 1000)
  })

  it('initializes the app in STOPWATCH mode', () => {
    const store = mockStore(STATES.default)
    initializer(store)
    const actions = store.getActions()
    expect(actions[1].type).toBe('CLOCK_MODE_CHANGED')
    expect(actions[1].payload.mode).toBe('CLOCK_MODE_STOPWATCH')
  })

  it('can initialize the app in TIMER mode', () => {
    const store = mockStore(STATES.default)
    initializer(store, undefined, 'CLOCK_MODE_TIMER')
    const actions = store.getActions()
    expect(actions[1].type).toBe('CLOCK_MODE_CHANGED')
    expect(actions[1].payload.mode).toBe('CLOCK_MODE_TIMER')
  })

  it('warns when an unknown initial mode is used', () => {
    const store = mockStore(STATES.default)
    console.warn = jest.genMockFunction()
    initializer(store, undefined, 'ZOMG')
    expect(console.warn).toHaveBeenCalledTimes(1)
  })

  it('does nothing when there is no store', () => {
    expect(() => initializer()).not.toThrow()
  })
})
