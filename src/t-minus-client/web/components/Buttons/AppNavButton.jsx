import { assign } from 'lodash'
import { Children, cloneElement, PropTypes } from 'react'
import withSeverity from '../../decorators/withSeverity'

const baseStyles = {
  icon: {
    verticalAlign: 'top'
  },
  label: {
    fontFamily: 'Roboto Mono, monospace',
    fontSize: '.8rem',
    lineHeight: 1.5,
    textTransform: 'uppercase'
  },
  root: {
    background: 'transparent',
    border: 0,
    cursor: 'pointer',
    fontSize: '2rem',
    height: 50,
    lineHeight: 1,
    minWidth: 50,
    padding: 0
  }
}

function iconize (node) {
  return cloneElement(node, { style: baseStyles.icon })
}

const AppNavButton = (props) => {
  let color
  if (props.disabled) {
    color = props.textQuaternaryColor
  } else if (props.active) {
    color = props.textSecondaryColor
  } else {
    color = props.textTertiaryColor
  }

  const labelStyles = assign(
    {},
    baseStyles.label,
    { color }
  )
  return (
    <button
      onClick={props.onClick}
      style={
        assign(
          {},
          baseStyles.root,
          { color },
          props.style
        )
      }
    >
      {Children.map(props.children, iconize)}<br/>
      <div style={labelStyles}>
        {props.label}
      </div>
    </button>
  )
}

AppNavButton.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  textQuaternaryColor: PropTypes.string,
  textSecondaryColor: PropTypes.string,
  textTertiaryColor: PropTypes.string
}
AppNavButton.defaultProps = {
  active: false,
  disabled: false
}

export default withSeverity(AppNavButton)
