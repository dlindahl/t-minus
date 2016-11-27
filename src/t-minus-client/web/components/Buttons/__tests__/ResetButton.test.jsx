import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import ResetButton from '../ResetButton'
import { Provider } from 'react-redux'

const store = configureStore()

describe('ResetButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <ResetButton store={store()}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('resets the clock when reset', () => {
    const resetClock = jest.fn()
    const component = renderer.create(
      <Provider store={store()}>
        <ResetButton.WrappedComponent
          resetClock={resetClock}
        />
      </Provider>
    )
    const tree = component.toJSON()
    tree.props.onClick()
    expect(resetClock).toHaveBeenCalled()
  })
})
