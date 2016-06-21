import assign from 'lodash/assign';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';
import ResetButton from '../Buttons/ResetButton';
import StartStopButton from '../Buttons/StartStopButton';
import StopwatchModeToggleButton from '../Buttons/StopwatchModeToggleButton';
import TimerModeToggleButton from '../Buttons/TimerModeToggleButton';

import Title from 'react-icons/lib/md/title';

const baseStyles = {
  appNavItem: {
    textAlign: 'center'
  },
  appNavItems: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: 0,
    padding: 0
  },
  appNavItemFiller: {
    flex: 1,
  },
  logo: {
    color: Colors.Clouds,
    height: '50%',
    width: '100%'
  },
  root: {
    background: Colors.MidnightBlue
  }
}

const AppNav = (props) => (
  <nav style={assign({}, baseStyles.root, props.style)}>
    <ul style={baseStyles.appNavItems}>
      <li style={baseStyles.appNavItem}>
        <Title style={baseStyles.logo}/>
      </li>
      <li style={baseStyles.appNavItem}>
        <TimerModeToggleButton/>
      </li>
      <li style={baseStyles.appNavItem}>
        <StopwatchModeToggleButton/>
      </li>
      <li style={baseStyles.appNavItem}>
        <StartStopButton/>
      </li>
      <li style={baseStyles.appNavItemFiller}>
        &nbsp;
      </li>
      <li style={baseStyles.appNavItem}>
        <ResetButton/>
      </li>
    </ul>
  </nav>
);

AppNav.propTypes = {
  style: PropTypes.object
};

export default AppNav;
