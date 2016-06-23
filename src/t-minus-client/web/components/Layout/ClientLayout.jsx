import ClockNav from '../Navigation/ClockNav';
import DisplayNav from '../Navigation/DisplayNav';
import TimerProgress from '../Progress/TimerProgress';
import { PropTypes } from 'react';

const baseStyles = {
  app: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh'
  },
  header: {
    padding: 15
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  root: {
    display: 'flex'
  }
};

const Layout = (props) => (
  <div style={baseStyles.root}>
    <ClockNav direction="column"/>
    <div style={baseStyles.app}>
      <DisplayNav/>
      <main style={baseStyles.main}>
        {props.children}
      </main>
      <TimerProgress/>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
