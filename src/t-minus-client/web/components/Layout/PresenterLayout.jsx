import AppFooter from './AppFooter';
import ClockNav from '../Navigation/ClockNav';
import Colors from '../../../shared/constants/Colors';
import DisplayNav from '../Navigation/DisplayNav';
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
    flex: 1
  },
  root: {
    display: 'flex'
  }
};

const Layout = (props) => (
  <div style={baseStyles.root}>
    <div style={baseStyles.app}>
      <main style={baseStyles.main}>
        {props.children}
      </main>
      <AppFooter/>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
