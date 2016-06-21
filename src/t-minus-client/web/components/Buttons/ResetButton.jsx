import { bindActionCreators } from 'redux';
import AppNavButton from './AppNavButton';
import { Component } from 'react';
import { connect } from 'react-redux';
import AutoRenew from 'react-icons/lib/md/autorenew';
import { resetClock } from '../../../shared/actions/ClockActions';

function getState(state) {
  return {};
}

function getActions(dispatch) {
  return bindActionCreators({ resetClock }, dispatch);
}

@connect(getState, getActions)
export default class ResetButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.resetClock();
  }
  render() {
    return (
      <AppNavButton onClick={this.handleClick}>
        <AutoRenew/>
      </AppNavButton>
    );
  }
}
