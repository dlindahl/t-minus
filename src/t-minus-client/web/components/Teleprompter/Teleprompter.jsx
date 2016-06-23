import assign from 'lodash/assign';
import Colors from '../../../shared/constants/Colors';
import { Component, PropTypes } from 'react';
import withSeverity from '../../decorators/withSeverity';

const baseStyles = {
  empty: {
    [true]: {
      flex: 0
    }
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '8vw',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 10,
    textTransform: 'uppercase',
    transition: 'flex-grow .5s ease-in-out'
  }
};

@withSeverity
export default class Teleprompter extends Component {
  render() {
    const prompterText = (this.props.text || '').trim();
    const style =
      assign(
        {},
        baseStyles.root,
        baseStyles.empty[prompterText === ''],
        {
          background: this.props.secondaryColor,
          color: this.props.primaryColor
        }
      );
    return (
      <div style={style}>
        <div>
          {prompterText}
        </div>
      </div>
    );
  }
};

Teleprompter.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  text: PropTypes.string
};
Teleprompter.defaultProps = {
  text: ''
};
