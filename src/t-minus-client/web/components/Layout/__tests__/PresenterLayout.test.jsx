import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import PresenterLayout from '../PresenterLayout'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const STATES = {
  default: {
    clock: emptyObj,
    display: emptyObj
  }
}
const store = configureStore()

describe('PresenterLayout', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <PresenterLayout/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
