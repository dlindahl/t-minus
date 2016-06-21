import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppNav from './AppNav';
import Colors from '../../../shared/constants/Colors';
import { PropTypes } from 'react';

const baseStyles = {
  app: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh'
  },
  appNav: {
    width: 50
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
    <AppNav style={baseStyles.appNav}/>
    <div style={baseStyles.app}>
      <AppHeader/>
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
