import { bindActionCreators } from 'redux'
import AppNavButton from './AppNavButton'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AutoRenew from 'react-icons/lib/md/autorenew'
import { resetClock } from '../../../shared/actions/ClockActions'

function getActions (dispatch) {
  return bindActionCreators({ resetClock }, dispatch)
}

@connect(null, getActions)
export default class ResetButton extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.resetClock()
  }
  render () {
    return (
      <AppNavButton label="Reset" onClick={this.handleClick}>
        <AutoRenew/>
      </AppNavButton>
    )
  }
}

ResetButton.propTypes = {
  resetClock: PropTypes.func
}
