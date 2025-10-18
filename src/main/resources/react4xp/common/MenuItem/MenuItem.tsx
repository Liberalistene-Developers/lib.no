import {type FC} from 'react';

/**
 * Props for the MenuItem component
 */
interface MenuItemProps {
  /** Menu item text */
  title?: string;
  /** Link URL */
  url?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * MenuItem component displays a styled menu button with skewed design.
 *
 * Renders a prominent purple button with white text and a distinctive skewed
 * (parallelogram) shape created using CSS transforms. Fixed dimensions at
 * 278px width and 66px height. The text is counter-skewed to remain readable.
 * Functions as both a link and clickable button with optional onClick handler.
 *
 * @example
 * ```tsx
 * <MenuItem
 *   title="Join Us"
 *   url="/join"
 *   onClick={() => console.log('Clicked')}
 * />
 * ```
 */
export const MenuItem: FC<MenuItemProps> = ({
  title = '',
  url,
  onClick
}) => (
  <a
    href={url}
    className="flex items-center justify-center bg-primary-700 border border-background-700 text-button-100 text-[25px] font-medium h-[66px] w-[278px] leading-[30px] skew-x-[20deg]"
    role="button"
    onClick={onClick}
  >
    <span className="-skew-x-[20deg] z-10">{title}</span>
  </a>
);
