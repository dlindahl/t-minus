import AppNavBar from './AppNavBar';
import SpawnPresenterWindowButton from '../Buttons/SpawnPresenterWindowButton';
import TelePromptInput from '../Inputs/TelePromptInput';

const DisplayNav = (props) => (
  <AppNavBar direction="row">
    <TelePromptInput/>
    &nbsp;
    <SpawnPresenterWindowButton/>
  </AppNavBar>
);

export default DisplayNav;
