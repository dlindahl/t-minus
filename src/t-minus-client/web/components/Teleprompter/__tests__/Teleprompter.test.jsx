import ConnectedTeleprompter from '../Teleprompter'
import { shallow } from 'enzyme'

const Teleprompter = ConnectedTeleprompter.WrappedComponent

describe('Teleprompter', () => {
  it('renders the prompter text', () => {
    const component = shallow(
      <Teleprompter/>
    )
    expect(component.find('[data-test-id="prompterText"]').text()).toBe('')
  })

  it('trims the prompter text', () => {
    const component = shallow(
      <Teleprompter text="  Test  "/>
    )
    expect(component.find('[data-test-id="prompterText"]').text()).toBe('Test')
  })

  it('adjusts styling when the prompter text is empty', () => {
    const component = shallow(
      <Teleprompter text=""/>
    )
    expect(component.node.props.style.flex).toBe(0)
  })

  it('adjusts styling when the prompter text is NOT empty', () => {
    const component = shallow(
      <Teleprompter text="TEST"/>
    )
    expect(component.node.props.style.flex).toBe(1)
  })
})
