import assign from 'lodash/assign';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';

const baseStyles = {
  active: {
    [false]: {
      color: Colors.Silver,
      background: 'transparent'
    },
    [true]: {
      color: Colors.Clouds,
      background: Colors.WetAsphalt
    }
  },
  root: {
    background: 'purple',
    border: 0,
    cursor: 'pointer',
    fontSize: '2rem',
    height: 50,
    lineHeight: 1,
    padding: 0,
    width: 50
  }
};

const AppNavButton = (props) => (
  <button
    {...props}
    style={assign({}, baseStyles.root, baseStyles.active[props.active], props.style)}
  >
    {props.children}
  </button>
);

AppNavButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node
};
AppNavButton.defaultProps = {
  active: false
};

export default AppNavButton;
