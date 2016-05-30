import { bindActionCreators } from 'redux';
import { Component } from 'react';
import { connect } from 'react-redux';
import { resetStopwatch, toggleStopwatch } from '../../../shared/actions/StopwatchActions';
import Layout from '../Layout';

function getState(state) {
  return {
    display: state.stopwatch.display,
    running: state.stopwatch.running,
    startedAt: state.stopwatch.startedAt
  };
}

function getActions(dispatch) {
  return bindActionCreators({ resetStopwatch, toggleStopwatch }, dispatch);
}

@connect(getState, getActions)
export default class AppHandler extends Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggleTimer = this.handleToggleTimer.bind(this);
  }
  handleToggleTimer() {
    this.props.toggleStopwatch();
  }
  handleReset() {
    this.props.resetStopwatch();
  }
  render() {
    let toggleLabel;
    if(!this.props.startedAt) {
      toggleLabel = 'Start';
    } else if(this.props.running) {
      toggleLabel = 'Pause';
    } else {
      toggleLabel = 'Unpause';
    }
    const { display } = this.props;
    return (
      <Layout>
        <main>
          {display.hours}:{display.minutes}:{display.seconds}.{display.microseconds}
        </main>
        <footer>
          <button onClick={this.handleToggleTimer}>
            {toggleLabel}
          </button>
          <button onClick={this.handleReset}>RESET</button>
        </footer>
      </Layout>
    );
  }
}
