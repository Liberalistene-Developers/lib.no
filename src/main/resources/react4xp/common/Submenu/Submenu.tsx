import {MenuItem} from '@common/MenuItem/MenuItem';

interface MenuItemType {
  itemID?: string;
  title?: string;
  url?: string;
}

export interface SubmenuProps {
  items?: MenuItemType[];
}

export const Submenu = ({
  items
}: SubmenuProps) => (
  <div className="flex justify-center flex-wrap content-center mobile:flex-col">
    {items && items.map(({itemID, title, url}) => (
      <MenuItem key={itemID} title={title} url={url} />
    ))}
  </div>
);
