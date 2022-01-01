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
  items: PropTypes
    .arrayOf(PropTypes
      .shape({
        itemID: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
        current: PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.string
        ])
      }))
}

export default (props) => <Menu {...props} /> // eslint-disable-line react/display-name
