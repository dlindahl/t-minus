import AppNavBar from './AppNavBar';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';
import ResetButton from '../Buttons/ResetButton';
import StartStopButton from '../Buttons/StartStopButton';
import StopwatchModeToggleButton from '../Buttons/StopwatchModeToggleButton';
import TimerModeToggleButton from '../Buttons/TimerModeToggleButton';
import Title from 'react-icons/lib/md/title';

const baseStyles = {
  logo: {
    color: Colors.Clouds,
    height: '50%',
    width: '100%'
  }
}

const ClockNav = (props) => (
  <AppNavBar direction="column">
    <Title style={baseStyles.logo}/>
    <TimerModeToggleButton/>
    <StopwatchModeToggleButton/>
    <StartStopButton/>
    &nbsp;
    <ResetButton/>
  </AppNavBar>
);

export default ClockNav;
