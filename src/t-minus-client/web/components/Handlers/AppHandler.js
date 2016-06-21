import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Layout from '../Layout/Layout';
import ResetButton from '../Buttons/ResetButton';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

function getState(state) {
  return {
    display: state.display,
    percentComplete: state.clock.percentComplete
  };
}

@connect(getState)
export default class AppHandler extends Component {
  render() {
    return (
      <Layout clockMode={this.props.clockMode} percentComplete={this.props.percentComplete}>
        <TimeDisplay {...this.props.display}/>
      </Layout>
    );
  }
}

AppHandler.propTypes = {
  display: PropTypes.object
};
