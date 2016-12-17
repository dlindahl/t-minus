import ClockActions from '../../../../shared/actionTypes/ClockActionTypes'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import TimerModeToggleButton from '../TimerModeToggleButton'

const STATES = {
  default: {
    clock: emptyObj,
    display: emptyObj
  },
  timerMode: {
    clock: {
      mode: ClockActions.CLOCK_MODE_TIMER
    },
    display: emptyObj
  }
}
const store = configureStore()

describe('TimerModeToggleButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <TimerModeToggleButton/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an active component when the clock is in timer mode', () => {
    const component = renderer.create(
      <Provider store={store(STATES.timerMode)}>
        <TimerModeToggleButton/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('enables stopwatch mode when clicked', () => {
    const timerMode = jest.fn()
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <TimerModeToggleButton.WrappedComponent
          timerMode={timerMode}
        />
      </Provider>
    )
    const tree = component.toJSON()
    tree.props.onClick()
    expect(timerMode).toHaveBeenCalled()
  })
})
