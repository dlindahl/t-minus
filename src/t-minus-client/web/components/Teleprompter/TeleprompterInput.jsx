import assign from 'lodash/assign'
import { bindActionCreators } from 'redux'
import Colors from '../../../shared/constants/Colors'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTeleprompterValue } from '../../../shared/actions/TeleprompterActions'

const baseStyles = {
  input: {
    default: {
      background: 'transparent',
      border: 'none',
      color: Colors.Clouds,
      display: 'inline-block',
      fontSize: 18,
      fontWeight: 200,
      height: '100%',
      maxWidth: '75vw',
      minWidth: '25ch',
      overflow: 'hidden',
      padding: 5
    },
    focus: {
      [false]: {
        background: 'transparent'
      },
      [true]: {
        background: Colors.WetAsphalt
      }
    }
  },
  root: {
    height: '100%',
    textAlign: 'left'
  }
}

function getActions (dispatch) {
  return bindActionCreators({ setTeleprompterValue }, dispatch)
}

@connect(null, getActions)
export default class TeleprompterInput extends Component {
  constructor (props) {
    super(props)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRefUpdate = this.handleRefUpdate.bind(this)
    this.state = { focus: false, value: '' }
  }
  handleChange (e) {
    this.setState({ value: e.target.value })
  }
  handleBlur () {
    this.setState({ focus: false })
    if (!this.state.value.trim().length) {
      this.props.setTeleprompterValue('')
    }
  }
  handleFocus () {
    this.setState({ focus: true })
  }
  handleRefUpdate (component) {
    this.inputField = component
  }
  handleSubmit (e) {
    const inputField = this.inputField
    e.preventDefault()
    this.props.setTeleprompterValue(this.state.value)
    inputField.setSelectionRange(0, this.state.value.length)
  }
  render () {
    const inputStyle =
      assign(
        {},
        baseStyles.input.default,
        baseStyles.input.focus[this.state.focus],
        { width: `${this.state.value.length + 3}ch` }
      )
    return (
      <form onSubmit={this.handleSubmit} style={baseStyles.root}>
        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="Enter text for teleprompter..."
          ref={this.handleRefUpdate}
          style={inputStyle}
        />
      </form>
    )
  }
}

TeleprompterInput.propTypes = {
  setTeleprompterValue: PropTypes.func
}
