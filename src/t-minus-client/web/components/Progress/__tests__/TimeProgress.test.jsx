import ClockActions from '../../../../shared/actionTypes/ClockActionTypes';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import TimerProgress from '../TimerProgress';
import TimerSeverity from '../../../../shared/actionTypes/TimerSeverityTypes';

const states = {
  [ClockActions.CLOCK_MODE_TIMER]: {
    clock: {
      mode: ClockActions.CLOCK_MODE_TIMER,
      percentComplete: .5
    },
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_CALM
    }
  },
  [ClockActions.CLOCK_MODE_STOPWATCH]: {
    clock: {
      mode: ClockActions.CLOCK_MODE_STOPWATCH,
      percentComplete: .5
    },
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_CALM
    }
  }
};
const store = configureStore();

describe('TimeProgress', () => {
  it('renders a timer when in timer moder', () => {
    const component = renderer.create(
      <TimerProgress store={store(states[ClockActions.CLOCK_MODE_TIMER])}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a stopwatch when in stopwatch moder', () => {
    const component = renderer.create(
      <TimerProgress store={store(states[ClockActions.CLOCK_MODE_STOPWATCH])}/>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
