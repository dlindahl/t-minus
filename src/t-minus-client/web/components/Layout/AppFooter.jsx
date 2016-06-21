import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';
import TimerProgress from '../Progress/TimerProgress';

const baseStyles = {
  root: {
    background: Colors.Silver
  }
};

const AppFooter = (props) => {
  return (
    <footer style={baseStyles.root}>
      <TimerProgress/>
    </footer>
  );
};

export default AppFooter;
