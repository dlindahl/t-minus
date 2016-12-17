import { assign } from 'lodash'
import ClockActions from '../../../shared/actionTypes/ClockActionTypes'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import withSeverity from '../../decorators/withSeverity'

const DefaultHeight = 50
const MaxWidthPercentage = 100

const baseStyles = {
  empty: {
    height: DefaultHeight
  },
  progress: {
    height: DefaultHeight,
    whiteSpace: 'nowrap'
  }
}

function getState (state) {
  return {
    mode: state.clock.mode,
    percentComplete: state.clock.percentComplete,
    severity: state.display.severity
  }
}

const TimerProgress = (props) => {
  let progressBackgroundColor = props.backgroundSecondaryColor
  if (props.mode !== ClockActions.CLOCK_MODE_TIMER) {
    progressBackgroundColor = props.backgroundPrimaryColor
  }
  const containerStyle = {
    background: props.backgroundPrimaryColor
  }
  const progressStyle =
    assign(
      {},
      baseStyles.progress,
      {
        background: progressBackgroundColor,
        width: `${props.percentComplete * MaxWidthPercentage}%`
      }
    )
  return (
    <div style={containerStyle}>
      {props.children}
      <div style={progressStyle}/>
    </div>
  )
}

TimerProgress.propTypes = {
  backgroundPrimaryColor: PropTypes.string,
  backgroundSecondaryColor: PropTypes.string,
  children: PropTypes.node,
  mode: PropTypes.string,
  percentComplete: PropTypes.number
}
TimerProgress.defaultProps = {
  percentComplete: 0.5
}

export default withSeverity(connect(getState)(TimerProgress))
