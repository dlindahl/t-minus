import ClockNav from '../Navigation/ClockNav'
import { PropTypes } from 'react'
import TeleprompterInput from '../Teleprompter/TeleprompterInput'
import TimerProgress from '../Progress/TimerProgress'
import withSeverity from '../../decorators/withSeverity'

const baseStyles = {
  header: {
    padding: 15
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh'
  }
}

const Layout = (props) => (
  <div style={baseStyles.root}>
    <TeleprompterInput
      backgroundColor={props.backgroundPrimaryColor}
      inputColor={props.textSecondaryColor}
      labelColor={props.textSecondaryColor}
    />
    <main style={baseStyles.main}>
      {props.children}
    </main>
    <TimerProgress>
      <ClockNav/>
    </TimerProgress>
  </div>
)

Layout.propTypes = {
  backgroundPrimaryColor: PropTypes.string,
  children: PropTypes.node,
  textSecondaryColor: PropTypes.string
}

export default withSeverity(Layout)
