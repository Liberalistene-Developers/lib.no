import {MenuItem} from '@common/MenuItem/MenuItem';

/**
 * Represents a menu item in the submenu
 */
interface MenuItemType {
  /** Unique item identifier */
  itemID?: string;
  /** Menu item text */
  title?: string;
  /** Link URL */
  url?: string;
}

/**
 * Props for the Submenu component
 */
export interface SubmenuProps {
  /** Array of menu items to display */
  items?: MenuItemType[];
}

/**
 * Submenu component displays a grid of styled menu items.
 *
 * Renders a flexbox grid of MenuItem components with centered content.
 * The grid wraps on desktop and switches to a single column on mobile.
 * Used for displaying multiple call-to-action buttons or navigation options.
 *
 * @example
 * ```tsx
 * <Submenu
 *   items={[
 *     {itemID: '1', title: 'Join Us', url: '/join'},
 *     {itemID: '2', title: 'Donate', url: '/donate'},
 *     {itemID: '3', title: 'Volunteer', url: '/volunteer'}
 *   ]}
 * />
 * ```
 */
export const Submenu = ({
  items
}: SubmenuProps) => (
  <div className="flex justify-center flex-wrap content-center mobile:flex-col">
    {items && items.map(({itemID, title, url}, index) => (
      <MenuItem key={itemID || `menu-item-${index}`} title={title} url={url} />
    ))}
  </div>
);
