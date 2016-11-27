import { assign } from 'lodash'
import ClockActions from '../../../shared/actionTypes/ClockActionTypes'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import withSeverity from '../../decorators/withSeverity'

const DefaultHeight = 50

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
  if (props.mode !== ClockActions.CLOCK_MODE_TIMER) {
    return (
      <div
        style={
          assign(
            {},
            baseStyles.empty,
            { background: props.secondaryColor }
          )
        }
      />
    )
  }
  const containerStyle = { background: props.secondaryColor }
  const progressStyle =
    assign(
      {},
      baseStyles.progress,
      {
        background: props.tertiaryColor,
        width: `${props.percentComplete * 100}%`
      }
    )
  return (
    <div style={containerStyle}>
      <div style={progressStyle}/>
    </div>
  )
}

TimerProgress.propTypes = {
  mode: PropTypes.string,
  percentComplete: PropTypes.number,
  secondaryColor: PropTypes.string,
  tertiaryColor: PropTypes.string
}
TimerProgress.defaultProps = {
  mode: null,
  percentComplete: 1
}

export default withSeverity(connect(getState)(TimerProgress))
