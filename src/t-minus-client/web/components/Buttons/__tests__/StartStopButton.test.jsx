import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'
import StartStopButton from '../StartStopButton'

const STATES = {
  default: {
    clock: emptyObj
  },
  running: {
    clock: {
      running: true,
      startedAt: Date.now()
    }
  },
  started: {
    clock: {
      startedAt: Date.now()
    }
  }
}
const store = configureStore()

describe('StartStopButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <StartStopButton store={store(STATES.default)}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('is active when the clock that is running', () => {
    const component = renderer.create(
      <StartStopButton store={store(STATES.running)}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a label that reflects a clock that has started', () => {
    const component = renderer.create(
      <StartStopButton store={store(STATES.started)}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a label that reflects a clock that is running', () => {
    const component = renderer.create(
      <StartStopButton store={store(STATES.running)}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('toggles the clock when clicked', () => {
    const toggleClock = jest.fn()
    const component = renderer.create(
      <Provider store={store()}>
        <StartStopButton.WrappedComponent
          toggleClock={toggleClock}
        />
      </Provider>
    )
    const tree = component.toJSON()
    tree.props.onClick()
    expect(toggleClock).toHaveBeenCalled()
  })
})
