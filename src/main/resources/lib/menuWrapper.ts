/**
 * Menu library - wraps Enonic's lib-menu
 */

import * as menuLib from '/lib/menu';

interface MenuItem {
  url: string;
  title: string;
  newWindow?: boolean;
  children?: MenuItem[];
}

interface Menu {
  ariaLabel?: string;
  menuItems: MenuItem[];
}

/**
 * Get menu tree for the current content
 * @param levels - Number of levels to fetch (1 = only top level, 2 = top + children, etc.)
 */
export function getMenuTree(levels: number): Menu {
  try {
    const menuData = menuLib.getMenuTree(levels) as Menu;

    return menuData || {
      menuItems: []
    };
  } catch (e) {
    log.error('Failed to get menu tree: ' + e);
    return {
      menuItems: []
    };
  }
}
