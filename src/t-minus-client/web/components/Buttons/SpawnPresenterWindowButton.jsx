import AppNavButton from './AppNavButton';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import OpenInNew from 'react-icons/lib/md/open-in-new';
import { spawnPresenterWindow } from '../../../shared/actions/PresenterActions';

function getState(state) {
  return {
    disabled: !!state.meta.presenterWin
  };
}

function getActions(dispatch) {
  return bindActionCreators({ spawnPresenterWindow }, dispatch);
}

@connect(getState, getActions)
export default class SpawnPresenterWindowButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if(!this.props.disabled) {
      this.props.spawnPresenterWindow();
    }
  }
  render() {
    return (
      <AppNavButton disabled={this.props.disabled} onClick={this.handleClick}>
        <OpenInNew/>
      </AppNavButton>
    );
  }
}

SpawnPresenterWindowButton.propTypes = {
  disabled: PropTypes.bool,
  spawnPresenterWindow: PropTypes.func
};
SpawnPresenterWindowButton.defaultProps = {
  disabled: false
};
