import ClockActions from '../../../../shared/actionTypes/ClockActionTypes'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import StopwatchModeToggleButton from '../StopwatchModeToggleButton'

const STATES = {
  default: {
    clock: emptyObj,
    display: emptyObj
  },
  stopwatchMode: {
    clock: {
      mode: ClockActions.CLOCK_MODE_STOPWATCH
    },
    display: emptyObj
  }
}
const store = configureStore()

describe('StopwatchModeToggleButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <StopwatchModeToggleButton/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an active component when the clock is in stopwatch mode', () => {
    const component = renderer.create(
      <Provider store={store(STATES.stopwatchMode)}>
        <StopwatchModeToggleButton/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('enables stopwatch mode when clicked', () => {
    const stopwatchMode = jest.fn()
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <StopwatchModeToggleButton.WrappedComponent
          stopwatchMode={stopwatchMode}
        />
      </Provider>
    )
    const tree = component.toJSON()
    tree.props.onClick()
    expect(stopwatchMode).toHaveBeenCalled()
  })
})
