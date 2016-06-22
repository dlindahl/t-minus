import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PresenterLayout from '../Layout/PresenterLayout';
import { presenterReady } from '../../../shared/actions/PresenterActions';
import ResetButton from '../Buttons/ResetButton';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

function getState(state) {
  return {
    display: state.display,
    percentComplete: state.clock.percentComplete
  };
}

function getActions(dispatch) {
  return bindActionCreators({ presenterReady }, dispatch);
}

@connect(getState, getActions)
export default class PresenterHandler extends Component {
  componentDidMount() {
    this.props.presenterReady(window);
  }
  render() {
    return (
      <PresenterLayout clockMode={this.props.clockMode} percentComplete={this.props.percentComplete}>
        <TimeDisplay {...this.props.display}/>
      </PresenterLayout>
    );
  }
}

PresenterHandler.propTypes = {
  display: PropTypes.object,
  presenterReady: PropTypes.func
};