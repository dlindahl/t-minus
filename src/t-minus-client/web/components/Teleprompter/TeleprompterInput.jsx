import assign from 'lodash/assign';
import { bindActionCreators } from 'redux';
import Colors from '../../../shared/constants/Colors';
import { Component,  PropTypes } from 'react';
import { connect } from 'react-redux';
import { setTeleprompterValue } from '../../../shared/actions/TeleprompterActions';

const baseStyles = {
  root: {
    height: '100%',
    textAlign: 'left'
  },
  input: {
    default: {
      background: 'transparent',
      border: 'none',
      color: Colors.Clouds,
      display: 'inline-block',
      fontSize: 18,
      fontWeight: 200,
      padding: 5,
      height: '100%',
      minWidth: '25ch',
      maxWidth: '75vw',
      overflow: 'hidden'
    },
    focus: {
      [true]: {
        background: Colors.WetAsphalt
      }
    }
  }
};

function getActions(dispatch) {
  return bindActionCreators({ setTeleprompterValue }, dispatch);
}

@connect(null, getActions)
export default class TeleprompterInput extends Component {
  constructor(props) {
    super(props);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { focus: false, value: '' };
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
  }
  handleBlur() {
    this.setState({ focus: false });
    if(!this.refs.input.value.trim().length) {
      this.props.setTeleprompterValue('');
    }
  }
  handleFocus() {
    this.setState({ focus: true });
  }
  handleSubmit(e) {
    const input = this.refs.input;
    e.preventDefault();
    this.props.setTeleprompterValue(input.value);
    input.setSelectionRange(0, input.value.length);
  }
  render() {
    const inputStyle =
      assign(
        {},
        baseStyles.input.default,
        baseStyles.input.focus[this.state.focus],
        { width: `${this.state.value.length + 3}ch` }
      );
    return (
      <form onSubmit={this.handleSubmit} style={baseStyles.root}>
        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder="Enter text for teleprompter..."
          ref="input"
          style={inputStyle}
        />
      </form>
    );
  }
}

TeleprompterInput.propTypes = {
  setTeleprompterValue: PropTypes.func
};
