import ClientHandler from '../ClientHandler'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import { Provider } from 'react-redux'
import renderer from 'react-test-renderer'

const STATES = {
  default: {
    clock: {
      percentComplete: 0
    },
    display: {
      teleprompter: 'TEXT'
    },
    meta: emptyObj
  }
}
const store = configureStore()

describe('ClientHandler', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <Provider store={store(STATES.default)}>
        <ClientHandler/>
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
