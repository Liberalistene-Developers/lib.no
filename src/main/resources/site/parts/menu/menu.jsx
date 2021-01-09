import React from 'react';

import MenuItem from '../menuitem/menuitem.jsx';

const Menu = ({ items }) => (
  <div className="menu">
    { items && items.map(({ title, url}) => (
      <MenuItem key={title} title={title} url={url} />
    ))}
  </div>
);

export default Menu;

export {
  Menu,
};