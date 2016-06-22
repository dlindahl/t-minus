import assign from 'lodash/assign';
import { PropTypes } from 'react';

const baseStyles = {
  root: {
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 'normal',
    lineHeight: 1.4,
    marginBottom: 0,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  default: {
    background: '#bdc3c7',
    color: '#fff'
  },
  large: {
    borderRadius: 6,
    fontSize: 17,
    lineHeight: 1.471,
    paddingLeft: 19,
    paddingRight: 19
  }
};

const Button = (props) => (
  <button onClick={props.onClick} style={assign(baseStyles.root, baseStyles.default)}>
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node
};

// Button.defaultProps = {
//
// };

export default Button;