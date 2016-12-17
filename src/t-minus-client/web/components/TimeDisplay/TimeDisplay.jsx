import { assign } from 'lodash'
import { PropTypes } from 'react'
import withSeverity from '../../decorators/withSeverity'

const baseStyles = {
  microseconds: {
    fontSize: '5vw'
  },
  prefix: {
    default: {
      pointerEvents: 'none'
    },
    [false]: {
      opacity: 0
    },
    [true]: {
      opacity: 1
    }
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '14vw',
    justifyContent: 'center',
    width: '100%'
  }
}

const TimeDisplay = (props) => {
  const microsecondsStyle =
    assign(
      {},
      baseStyles.microseconds,
      { color: props.textTertiaryColor }
    )
  const prefixStyle =
    assign(
      {},
      baseStyles.prefix.default,
      baseStyles.prefix[props.hasTimerElapsed]
    )
  const style =
    assign(
      {},
      baseStyles.root,
      {
        background: props.backgroundPrimaryColor,
        color: props.textPrimaryColor
      }
    )
  return (
    <div style={style}>
      <div>
        <span data-test-id="prefix" style={prefixStyle}>
          -
        </span>
        <span data-test-id="hours">
          {props.hours}
        </span>
        :
        <span data-test-id="minutes">
          {props.minutes}
        </span>
        :
        <span data-test-id="seconds">
          {props.seconds}
        </span>
        <span data-test-id="microseconds" style={microsecondsStyle}>
          .{props.microseconds}
        </span>
      </div>
    </div>
  )
}

TimeDisplay.propTypes = {
  backgroundPrimaryColor: PropTypes.string,
  hasTimerElapsed: PropTypes.bool,
  hours: PropTypes.string,
  microseconds: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  textPrimaryColor: PropTypes.string,
  textTertiaryColor: PropTypes.string
}
TimeDisplay.defaultProps = {
  hasTimerElapsed: false,
  hours: '--',
  microseconds: '----',
  minutes: '--',
  seconds: '--'
}

export default withSeverity(TimeDisplay)
