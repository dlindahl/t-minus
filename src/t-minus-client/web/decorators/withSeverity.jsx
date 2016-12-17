import { connect } from 'react-redux'
import { PropTypes } from 'react'
import TimerSeverity from '../../shared/actionTypes/TimerSeverityTypes'

const theme = {
  [TimerSeverity.TIMER_SEVERITY_CALM]: {
    backgroundPrimaryColor: 'var(--Clouds)',
    backgroundSecondaryColor: 'var(--Concrete)',
    textPrimaryColor: 'var(--MidnightBlue)',
    textQuaternaryColor: 'var(--Clouds-Dark)',
    textSecondaryColor: 'var(--Concrete)',
    textTertiaryColor: 'var(--Silver)'
  },
  [TimerSeverity.TIMER_SEVERITY_WARN]: {
    backgroundPrimaryColor: 'var(--SunFlower)',
    backgroundSecondaryColor: 'var(--Orange)',
    textPrimaryColor: 'var(--MidnightBlue)',
    textQuaternaryColor: 'var(--SunFlower-Dark)',
    textSecondaryColor: 'var(--Pumpkin)',
    textTertiaryColor: 'var(--Orange)'
  },
  [TimerSeverity.TIMER_SEVERITY_DANGER]: {
    backgroundPrimaryColor: 'var(--Alizarin)',
    backgroundSecondaryColor: 'var(--Pomegranate)',
    textPrimaryColor: 'var(--MidnightBlue)',
    textQuaternaryColor: 'var(--Alizarin-Dark)',
    textSecondaryColor: 'var(--Pomegranate-Dark)',
    textTertiaryColor: 'var(--Pomegranate)'
  },
  [TimerSeverity.TIMER_SEVERITY_CRITICAL]: {
    backgroundPrimaryColor: 'var(--Pomegranate)',
    backgroundSecondaryColor: 'var(--Alizarin)',
    textPrimaryColor: 'var(--Clouds)',
    textQuaternaryColor: 'var(--Pomegranate-Dark)',
    textSecondaryColor: 'var(--Alizarin-Light)',
    textTertiaryColor: 'var(--Alizarin)'
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
