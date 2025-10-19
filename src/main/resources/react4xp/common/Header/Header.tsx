import type { MenuTree } from '/lib/menu';

import { Menu } from "/react4xp/common/Menu/Menu";

/**
 * Props for the Header component.
 */
interface HeaderProps {
  /** Logo image data */
  image?: {
    /** URL to the logo image file */
    url?: string;
  };
  /** Site title used as logo alt text */
  title?: string;
  /** Menu tree structure containing navigation items */
  menu?: MenuTree;
}

/**
 * Header component for the site-wide navigation bar.
 *
 * Renders the main site header with:
 * - Logo image that links to the homepage
 * - Primary navigation menu
 * - Light background with minimum height
 *
 * The header uses a flexbox layout to position the logo on the left
 * and the menu on the right.
 *
 * @example
 * ```tsx
 * <Header
 *   image={{url: '/images/logo.png'}}
 *   title="Liberalistene"
 *   menu={menuTreeData}
 * />
 * ```
 *
 * @remarks
 * - The logo always links to the root path "/"
 * - If no title is provided, defaults to "Liberalistene Logo" as alt text
 * - Minimum height is 60px to ensure consistent header sizing
 */
export const Header = ({image, title, menu }: HeaderProps) => (
    <header className="bg-background-700 flex min-h-[60px] items-center justify-between">
      {image && (
        <a href="/" title="Hjem" className="mr-5">
          <img
            alt={title || 'Liberalistene Logo'}
            src={image.url}
          />
        </a>
      )}
      <Menu menu={menu} />
    </header>
);
