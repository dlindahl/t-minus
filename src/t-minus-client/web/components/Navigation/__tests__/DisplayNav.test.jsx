import configureStore from 'redux-mock-store'
import DisplayNav from '../DisplayNav'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const STATES = {
  default: {
    meta: emptyObj
  }
}
const store = configureStore()

describe('DisplayNav', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <DisplayNav/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
