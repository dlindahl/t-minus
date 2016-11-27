import { assign, omit } from 'lodash';
import Colors from '../../../shared/constants/Colors';
import { Children, cloneElement, PropTypes } from 'react';

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
  disabled: {
    [true]: {
      color: Colors.WetAsphalt
    }
  },
  icon: {
    verticalAlign: 'top'
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

function iconize(node) {
  return cloneElement(node, { style: baseStyles.icon });
}

const AppNavButton = (props) => {
  return (
    <button
      {...omit(props, 'active')}
      style={
        assign(
          {},
          baseStyles.root,
          baseStyles.active[props.active],
          baseStyles.disabled[props.disabled],
          props.style
        )
      }
    >
      {Children.map(props.children, iconize)}
    </button>
  );
}

AppNavButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool
};
AppNavButton.defaultProps = {
  active: false,
  disabled: false
};

export default AppNavButton;
