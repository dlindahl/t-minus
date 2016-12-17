import { assign } from 'lodash'
import { bindActionCreators } from 'redux'
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setTeleprompterValue } from '../../../shared/actions/TeleprompterActions'

const baseStyles = {
  fauxCursor: {
    default: {
      borderLeftStyle: 'solid',
      borderLeftWidth: 2,
      display: 'inline-block',
      height: '1.25em',
      marginLeft: 5
    },
    focus: {
      [false]: {
        animation: '1s blink step-end infinite'
      },
      [true]: {
        borderLeftColor: 'transparent'
      }
    },
    hasInput: {
      [true]: {
        animation: 'none',
        borderLeftColor: 'transparent'
      }
    }
  },
  input: {
    default: {
      background: 'transparent',
      border: 'none',
      display: 'inline-block',
      flex: 1,
      fontSize: 18,
      fontWeight: 200,
      outlineWidth: 'thin',
      overflow: 'hidden',
      padding: 5
    }
  },
  label: {
    fontFamily: 'Roboto Mono, monospace',
    textTransform: 'uppercase'
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5
  }
}
const DefaultSelectionStart = 0

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
    const inputField = this.inputField
    if (inputField) {
      // TODO: Find a way to test this
      inputField.setSelectionRange(DefaultSelectionStart, this.state.value.length)
    }
  }
  handleRefUpdate (component) {
    this.inputField = component
  }
  handleSubmit (e) {
    const inputField = this.inputField
    e.preventDefault()
    this.props.setTeleprompterValue(this.state.value)
    inputField.setSelectionRange(DefaultSelectionStart, this.state.value.length)
  }
  render () {
    const inputStyle =
      assign(
        {
          color: this.props.inputColor,
          outlineColor: this.props.inputColor
        },
        baseStyles.input.default
      )
    const fauxCursorStyle =
      assign(
        {
          borderLeftColor: this.props.labelColor
        },
        baseStyles.fauxCursor.default,
        baseStyles.fauxCursor.focus[this.state.focus],
        baseStyles.fauxCursor.hasInput[!!this.state.value.trim()]
      )
    const labelStyle =
      assign(
        {
          color: this.props.labelColor
        },
        baseStyles.label
      )
    const rootStyle =
      assign(
        {
          background: this.props.backgroundColor
        },
        baseStyles.root
      )
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={rootStyle}>
          <label style={labelStyle}>
            Teleprompter:&gt;
          </label>
          <span style={fauxCursorStyle}/>
          <input
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            ref={this.handleRefUpdate}
            style={inputStyle}
          />
        </form>
      </div>
    )
  }
}

TeleprompterInput.propTypes = {
  backgroundColor: PropTypes.string,
  inputColor: PropTypes.string,
  labelColor: PropTypes.string,
  setTeleprompterValue: PropTypes.func
}
