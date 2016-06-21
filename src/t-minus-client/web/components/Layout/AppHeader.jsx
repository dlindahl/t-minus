import assign from 'lodash/assign';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';

const baseStyles = {
  buttonList: {
    display: 'inline-block',
    margin: 0,
    padding: 0
  },
  buttonListItem: {
    display: 'inline-block',
    marginRight: 2
  },
  root: {
    background: Colors.MidnightBlue,
    color: Colors.Clouds,
    maxHeight: 50,
    overflow: 'hidden',
    padding: 15
  }
};

const AppHeader = (props) => (
  <header style={baseStyles.root}>
    <nav>
      <ul style={baseStyles.buttonList}>
        <li style={baseStyles.buttonListItem}>
          
        </li>
      </ul>
    </nav>
  </header>
);

export default AppHeader;
