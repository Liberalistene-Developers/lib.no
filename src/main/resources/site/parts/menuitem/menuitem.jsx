import React from 'react';
import PropTypes from 'prop-types';

const MenuItem = ({ title, url, onClick }) => (
  <a href={url} class="menu-item">
    <span className="menu-item-title">{title}</span>
  </a>
);

MenuItem.propTypes = {
  onClick: PropTypes.func,
  
  title: PropTypes.string,
  
  url: PropTypes.string,
};

MenuItem.defaultProps = {
  onClick: undefined,
  
  title: '',
  
  url: undefined,
};

export default MenuItem;

export {
  MenuItem,
};