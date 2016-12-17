import { bindActionCreators } from 'redux'
import AppNavButton from './AppNavButton'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Pause from 'react-icons/lib/md/pause'
import PlayArrow from 'react-icons/lib/md/play-arrow'
import { toggleClock } from '../../../shared/actions/ClockActions'

function getState (state) {
  return {
    running: state.clock.running,
    started: !!state.clock.startedAt
  }
}

function getActions (dispatch) {
  return bindActionCreators({ toggleClock }, dispatch)
}

@connect(getState, getActions)
export default class StartStopButton extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.toggleClock()
  }
  render () {
    let icon
    let label
    if (!this.props.started) {
      icon = <PlayArrow data-test-id="PlayArrow"/>
      label = 'Start'
    } else if (this.props.running) {
      icon = <Pause data-test-id="Pause"/>
      label = 'Pause'
    } else {
      icon = <PlayArrow data-test-id="PlayArrow"/>
      label = 'Start'
    }
    return (
      <AppNavButton active={this.props.running} label={label} onClick={this.handleClick}>
        {icon}
      </AppNavButton>
    )
  }
}

StartStopButton.propTypes = {
  running: PropTypes.bool,
  started: PropTypes.bool,
  toggleClock: PropTypes.func
}
StartStopButton.defaultProps = {
  running: false,
  started: false
}
