import * as React from 'react';

import {MenuItem} from './MenuItem';

interface MenuItemType {
  itemID?: string;
  title?: string;
  url?: string;
}

interface MenuProps {
  items?: MenuItemType[];
}

export const SubmenuPart: React.FC<MenuProps> = ({
  items
}) => (
  <div className="flex justify-center flex-wrap content-center mobile:flex-col">
    {items && items.map(({itemID, title, url}) => (
      <MenuItem key={itemID} title={title} url={url} />
    ))}
  </div>
);
