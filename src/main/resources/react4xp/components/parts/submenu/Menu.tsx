import * as React from 'react';

import {MenuItem} from './MenuItem';

interface MenuItemType {
  itemID?: string;
  title?: string;
  url?: string;
  current?: boolean | string;
}

interface MenuProps {
  items?: MenuItemType[];
}

export const Menu: React.FC<MenuProps> = ({
  items
}) => (
  <div className="flex justify-center flex-wrap content-center mobile:flex-col">
    {items && items.map(({itemID, title, url, current}) => (
      <MenuItem key={itemID} title={title} url={url} />
    ))}
  </div>
);
