import { assign } from 'lodash'
import { PropTypes } from 'react'
import withSeverity from '../../decorators/withSeverity'

const baseStyles = {
  empty: {
    [false]: {
      flex: 1
    },
    [true]: {
      flex: 0
    }
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '8vw',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingBottom: 10,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 10,
    textTransform: 'uppercase',
    transition: 'flex-grow .5s ease-in-out'
  }
}

const Teleprompter = (props) => {
  const prompterText = (props.text || '').trim()
  const style =
    assign(
      {},
      baseStyles.root,
      baseStyles.empty[prompterText === ''],
      {
        background: props.secondaryColor,
        color: props.primaryColor
      }
    )
  return (
    <div style={style}>
      <div data-test-id="prompterText">
        {prompterText}
      </div>
    </div>
  )
}

Teleprompter.propTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  text: PropTypes.string
}
Teleprompter.defaultProps = {
  text: ''
}

export default withSeverity(Teleprompter)
