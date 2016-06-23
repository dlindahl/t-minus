import AppNavBar from './AppNavBar';
import SpawnPresenterWindowButton from '../Buttons/SpawnPresenterWindowButton';
import TeleprompterInput from '../Teleprompter/TeleprompterInput';

const DisplayNav = (props) => (
  <AppNavBar direction="row">
    <TeleprompterInput/>
    &nbsp;
    <SpawnPresenterWindowButton/>
  </AppNavBar>
);

export default DisplayNav;
