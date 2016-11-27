import AppNavButton from './AppNavButton'
import { bindActionCreators } from 'redux'
import ClockActions from '../../../shared/actionTypes/ClockActionTypes'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Schedule from 'react-icons/lib/md/Schedule'
import { stopwatchMode } from '../../../shared/actions/ClockActions'

function getState (state) {
  return {
    active: state.clock.mode === ClockActions.CLOCK_MODE_STOPWATCH
  }
}

function getActions (dispatch) {
  return bindActionCreators({ stopwatchMode }, dispatch)
}

@connect(getState, getActions)
export default class StopwatchModeToggleButton extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.stopwatchMode()
  }
  render () {
    return (
      <AppNavButton active={this.props.active} onClick={this.handleClick}>
        <Schedule/>
      </AppNavButton>
    )
  }
}

StopwatchModeToggleButton.propTypes = {
  active: PropTypes.bool,
  stopwatchMode: PropTypes.func
}

StopwatchModeToggleButton.defaultProps = {
  active: false
}
