import { isString } from 'lodash'
import { Children, PropTypes } from 'react'

const baseStyles = {
  filler: {
    flex: 1
  },
  item: {
    flex: 1,
    textAlign: 'center'
  },
  items: {
    display: 'flex',
    height: '100%',
    listStyleType: 'none',
    margin: 0,
    padding: 0
  },
  root: {
    height: 100
  }
}
const NonBreakingSpace = 160
const StringStart = 0

function itemize (node) {
  let style = baseStyles.item
  if (isString(node) && node.charCodeAt(StringStart) === NonBreakingSpace) {
    style = baseStyles.filler
  }
  return (
    <li style={style}>
      {node}
    </li>
  )
}

const AppNavBar = (props) => {
  const items = Children.map(props.children, itemize)
  return (
    <nav style={baseStyles.root}>
      <ul style={baseStyles.items}>
        {items}
      </ul>
    </nav>
  )
}

AppNavBar.propTypes = {
  children: PropTypes.node
}

export default AppNavBar
