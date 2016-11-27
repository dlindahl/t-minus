import configureStore from 'redux-mock-store'
import renderer from 'react-test-renderer'
import TimerSeverity from '../../../shared/actionTypes/TimerSeverityTypes'
import withSeverity from '../withSeverity'

const SeverityComponent = withSeverity(({ primaryColor, secondaryColor, tertiaryColor }) => (
  <div primaryColor={primaryColor} secondaryColor={secondaryColor} tertiaryColor={tertiaryColor}/>
))
const states = {
  [TimerSeverity.TIMER_SEVERITY_CALM]: {
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_CALM
    }
  },
  [TimerSeverity.TIMER_SEVERITY_WARN]: {
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_WARN
    }
  },
  [TimerSeverity.TIMER_SEVERITY_DANGER]: {
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_DANGER
    }
  },
  [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
    display: {
      severity: TimerSeverity.TIMER_SEVERITY_CRITICAL
    }
  }
}
const store = configureStore()

describe('withSeverity', () => {
  it('passes in appropriate theme colors when the severity state is TIMER_SEVERITY_CALM', () => {
    const component = renderer.create(
      <SeverityComponent store={store(states[TimerSeverity.TIMER_SEVERITY_CALM])}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('passes in appropriate theme colors when the severity state is TIMER_SEVERITY_WARN', () => {
    const component = renderer.create(
      <SeverityComponent store={store(states[TimerSeverity.TIMER_SEVERITY_WARN])}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('passes in appropriate theme colors when the severity state is TIMER_SEVERITY_DANGER', () => {
    const component = renderer.create(
      <SeverityComponent store={store(states[TimerSeverity.TIMER_SEVERITY_DANGER])}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('passes in appropriate theme colors when the severity state is TIMER_SEVERITY_CRITICAL', () => {
    const component = renderer.create(
      <SeverityComponent store={store(states[TimerSeverity.TIMER_SEVERITY_CRITICAL])}/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
