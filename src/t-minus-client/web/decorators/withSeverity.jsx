import Colors from '../../shared/constants/Colors'
import { connect } from 'react-redux'
import { PropTypes } from 'react'
import TimerSeverity from '../../shared/actionTypes/TimerSeverityTypes'

const theme = {
  [TimerSeverity.TIMER_SEVERITY_CALM]: {
    primaryColor: Colors.MidnightBlue,
    secondaryColor: Colors.Silver,
    tertiaryColor: Colors.Concrete
  },
  [TimerSeverity.TIMER_SEVERITY_WARN]: {
    primaryColor: Colors.MidnightBlue,
    secondaryColor: Colors.SunFlower,
    tertiaryColor: Colors.Orange
  },
  [TimerSeverity.TIMER_SEVERITY_DANGER]: {
    primaryColor: Colors.MidnightBlue,
    secondaryColor: Colors.Alizarin,
    tertiaryColor: Colors.Pomegranate
  },
  [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
    primaryColor: Colors.Clouds,
    secondaryColor: Colors.Pomegranate,
    tertiaryColorcolor: Colors.Alizarin
  }
}

function getState (state) {
  return {
    severity: state.display.severity
  }
}

export default function withSeverity (WrappedComponent) {
  const SeverityTheme = (props) => (
    <WrappedComponent {...props} {...theme[props.severity]}/>
  )
  SeverityTheme.propTypes = {
    severity: PropTypes.string
  }
  SeverityTheme.defaultProps = {
    severity: TimerSeverity.TIMER_SEVERITY_CALM
  }
  SeverityTheme.WrappedComponent = WrappedComponent
  return connect(getState)(SeverityTheme)
}
