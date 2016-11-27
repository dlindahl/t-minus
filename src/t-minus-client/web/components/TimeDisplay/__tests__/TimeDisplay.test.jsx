import ConnectedTimeDisplay from '../TimeDisplay';
import { shallow } from 'enzyme';

const TimeDisplay = ConnectedTimeDisplay.WrappedComponent;

describe('TimeDisplay',() => {
  it('shows a null time', () => {
    const component = shallow(
      <TimeDisplay/>
    );
    expect(component.find('[data-test-id="hours"]').text()).toBe('--');
    expect(component.find('[data-test-id="minutes"]').text()).toBe('--');
    expect(component.find('[data-test-id="seconds"]').text()).toBe('--');
    expect(component.find('[data-test-id="microseconds"]').text()).toBe('.----');
  });

  it('shows the time passed in', () => {
    const component = shallow(
      <TimeDisplay hours="12" minutes="13" seconds="14" microseconds="0001"/>
    );
    expect(component.find('[data-test-id="hours"]').text()).toBe('12');
    expect(component.find('[data-test-id="minutes"]').text()).toBe('13');
    expect(component.find('[data-test-id="seconds"]').text()).toBe('14');
    expect(component.find('[data-test-id="microseconds"]').text()).toBe('.0001');
  });

  it('includes different styles when the timer has elapsed', () => {
    const component = shallow(
      <TimeDisplay hasTimerElapsed={true}/>
    );
    expect(component.find('[data-test-id="prefix"]').node.props.style.opacity).toBe(1);
  });

  it('applies the :primaryColor prop', () => {
    const component = shallow(
      <TimeDisplay primaryColor="red"/>
    );
    expect(component.node.props.style.color).toBe('red');
  });

  it('applies the :secondaryColor prop', () => {
    const component = shallow(
      <TimeDisplay secondaryColor="green"/>
    );
    expect(component.node.props.style.background).toBe('green');
  });

  it('applies the :tertiaryColor prop', () => {
    const component = shallow(
      <TimeDisplay tertiaryColor="yellow"/>
    );
    expect(component.find('[data-test-id="microseconds"]').node.props.style.color).toBe('yellow');
  });
});