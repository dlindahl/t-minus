import TimerProgress from '../Progress/TimerProgress'
import { PropTypes } from 'react'

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
}

const Layout = (props) => (
  <div style={baseStyles.root}>
    <div style={baseStyles.app}>
      <main style={baseStyles.main}>
        {props.children}
      </main>
      <TimerProgress/>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
