import { bindActionCreators } from 'redux';
import AppNavButton from './AppNavButton';
import { Component,  PropTypes } from 'react';
import { connect } from 'react-redux';
import Pause from 'react-icons/lib/md/pause';
import PlayArrow from 'react-icons/lib/md/play-arrow';
import { toggleClock } from '../../../shared/actions/ClockActions';

function getState(state) {
  return {
    running: state.clock.running,
    started: !!state.clock.startedAt
  };
}

function getActions(dispatch) {
  return bindActionCreators({ toggleClock }, dispatch);
}

@connect(getState, getActions)
export default class StartStopButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.toggleClock();
  }
  render() {
    let label;
    if(!this.props.started) {
      label = <PlayArrow data-test-id="PlayArrow"/>;
    } else if(this.props.running) {
      label = <Pause data-test-id="Pause"/>;
    } else {
      label = <PlayArrow data-test-id="PlayArrow"/>;
    }
    return (
      <AppNavButton active={this.props.running} onClick={this.handleClick}>
        {label}
      </AppNavButton>
    );
  }
}

StartStopButton.propTypes = {
  running: PropTypes.bool,
  started: PropTypes.bool
};
StartStopButton.defaultProps = {
  running: false,
  started: false
};
