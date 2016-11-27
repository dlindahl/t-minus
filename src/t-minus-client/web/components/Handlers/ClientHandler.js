import { PropTypes } from 'react'
import { connect } from 'react-redux'
import ClientLayout from '../Layout/ClientLayout'
import Teleprompter from '../Teleprompter/Teleprompter'
import TimeDisplay from '../TimeDisplay/TimeDisplay'

function getState (state) {
  return {
    display: state.display,
    percentComplete: state.clock.percentComplete
  }
}

const ClientHandler = (props) => (
  <ClientLayout percentComplete={props.percentComplete}>
    <TimeDisplay {...props.display}/>
    <Teleprompter text={props.display.teleprompter}/>
  </ClientLayout>
)

ClientHandler.propTypes = {
  display: PropTypes.object,
  percentComplete: PropTypes.number
}

export default connect(getState)(ClientHandler)
