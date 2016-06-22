import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ClientLayout from '../Layout/ClientLayout';
import ResetButton from '../Buttons/ResetButton';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

function getState(state) {
  return {
    display: state.display,
    percentComplete: state.clock.percentComplete
  };
}

@connect(getState)
export default class ClientHandler extends Component {
  render() {
    return (
      <ClientLayout clockMode={this.props.clockMode} percentComplete={this.props.percentComplete}>
        <TimeDisplay {...this.props.display}/>
      </ClientLayout>
    );
  }
}

ClientHandler.propTypes = {
  display: PropTypes.object
};