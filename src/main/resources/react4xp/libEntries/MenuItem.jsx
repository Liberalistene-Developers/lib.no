import React from 'react'
import PropTypes from 'prop-types'

export const MenuItem = ({ title, url, onClick }) => (
  <a href={url} className="menu-item" role="button">
    <span className="menu-item-title">{title}</span>
  </a>
)

MenuItem.propTypes = {
  onClick: PropTypes.func,

  title: PropTypes.string,

  url: PropTypes.string
}

MenuItem.defaultProps = {
  onClick: undefined,

  title: '',

  url: undefined
}

export default (props) => <MenuItem {...props} /> // eslint-disable-line react/display-name
