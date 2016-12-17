import AppNavBar from './AppNavBar'
import ResetButton from '../Buttons/ResetButton'
import SpawnPresenterWindowButton from '../Buttons/SpawnPresenterWindowButton'
import StartStopButton from '../Buttons/StartStopButton'
import StopwatchModeToggleButton from '../Buttons/StopwatchModeToggleButton'
import TimerModeToggleButton from '../Buttons/TimerModeToggleButton'

const ClockNav = (props) => (
  <AppNavBar>
    <TimerModeToggleButton/>
    <StopwatchModeToggleButton/>
    <StartStopButton/>
    <SpawnPresenterWindowButton/>
    <ResetButton/>
  </AppNavBar>
)

export default ClockNav
