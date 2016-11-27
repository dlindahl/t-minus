import AppNavBar from './AppNavBar'
import Colors from '../../../shared/constants/Colors'
import ResetButton from '../Buttons/ResetButton'
import StartStopButton from '../Buttons/StartStopButton'
import StopwatchModeToggleButton from '../Buttons/StopwatchModeToggleButton'
import TimerModeToggleButton from '../Buttons/TimerModeToggleButton'
import Title from 'react-icons/lib/md/title'

const ClockNav = (props) => (
  <AppNavBar direction="column">
    <Title color={Colors.Clouds} size={50}/>
    <TimerModeToggleButton/>
    <StopwatchModeToggleButton/>
    <StartStopButton/>
    &nbsp;
    <ResetButton/>
  </AppNavBar>
)

export default ClockNav
