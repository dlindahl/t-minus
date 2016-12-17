import AppNavButton from '../AppNavButton'
import Beer from 'react-icons/lib/fa/beer'
import configureStore from 'redux-mock-store'
import emptyObj from 'empty/object'
import renderer from 'react-test-renderer'

const STATE = {
  display: emptyObj
}
const store = configureStore()

describe('AppNavButton', () => {
  it('renders the component', () => {
    const component = renderer.create(
      <AppNavButton label="LABEL" store={store(STATE)}>
        <Beer/>
      </AppNavButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an active component', () => {
    const component = renderer.create(
      <AppNavButton active label="LABEL" store={store(STATE)}>
        <Beer/>
      </AppNavButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an inactive component', () => {
    const component = renderer.create(
      <AppNavButton active={false} label="LABEL" store={store(STATE)}>
        <Beer/>
      </AppNavButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled component', () => {
    const component = renderer.create(
      <AppNavButton disabled label="LABEL" store={store(STATE)}>
        <Beer/>
      </AppNavButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an enabled component', () => {
    const component = renderer.create(
      <AppNavButton disabled={false} label="LABEL" store={store(STATE)}>
        <Beer/>
      </AppNavButton>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
