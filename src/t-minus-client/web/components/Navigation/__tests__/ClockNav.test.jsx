import ClockNav from '../ClockNav'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const STATES = {
  default: {
    clock: emptyObj,
    display: emptyObj,
    meta: emptyObj
  }
}
const store = configureStore()

describe('ClockNav', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <ClockNav/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
