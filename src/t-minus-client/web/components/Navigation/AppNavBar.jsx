import { assign, isString } from 'lodash'
import { Children, PropTypes } from 'react'
import Colors from '../../../shared/constants/Colors'

const baseStyles = {
  filler: {
    flex: 1
  },
  item: {
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
    background: Colors.MidnightBlue
  }
}
const Dimensions = {
  column: 'width',
  row: 'height'
}
const NonBreakingSpace = 160
const StringStart = 0

function itemize (node) {
  if (isString(node) && node.charCodeAt(StringStart) === NonBreakingSpace) {
    return <li style={baseStyles.filler}>{node}</li>
  }
  return <li style={baseStyles.item}>{node}</li>
}

const AppNavBar = (props) => {
  const items = Children.map(props.children, itemize)
  const rootStyles =
    assign(
      {},
      baseStyles.root,
      { [Dimensions[props.direction]]: props.size }
    )
  const itemsStyles =
    assign(
      {},
      baseStyles.items,
      { flexDirection: props.direction }
    )
  return (
    <nav style={rootStyles}>
      <ul style={itemsStyles}>
        {items}
      </ul>
    </nav>
  )
}

AppNavBar.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.oneOf(['column', 'row']),
  size: PropTypes.number
}
AppNavBar.defaultProps = {
  direction: 'row',
  size: 50
}

export default AppNavBar
