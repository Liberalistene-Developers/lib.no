import React from 'react'
import PropTypes from 'prop-types'

import MenuItem from './MenuItem.jsx'

export const Menu = ({ items }) => (
  <div className="sub-menu">
    { items && items.map(({ itemID, title, url, current }) => (
      <MenuItem key={itemID} title={title} url={url} selected={current} />
    ))}
  </div>
)

Menu.propTypes = {
  items: PropTypes.arrayOf({
    itemID: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    current: PropTypes.string
  })
}

const DefaultMenu = (props) => <Menu {...props} />
DefaultMenu.displayName = 'Menu'

export default DefaultMenu
