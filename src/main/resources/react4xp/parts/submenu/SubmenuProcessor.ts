import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {runQuery} from '/react4xp/utils/query';

/**
 * Submenu part configuration from submenu.xml schema.
 */
interface SubmenuConfig {
  /** Item set configuration for manual or query-based item selection */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual item selection configuration */
    manual?: {
      /** Array of manually selected content IDs */
      items?: string[];
    };
    /** Query-based item selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sort expression for query results */
      querysorting?: string;
      /** Maximum number of items to fetch */
      count?: number;
    };
  };
}

/**
 * Processes submenu configuration for the Submenu component.
 *
 * Fetches submenu items using either manual selection or content query. Supports
 * two modes: manually selecting specific pages, or dynamically querying content
 * from a specified root path with optional sorting and count limits.
 *
 * Used for creating navigation submenus and sidebar menus.
 *
 * **Data Flow:**
 * 1. Extracts submenu configuration from part component
 * 2. Determines selection mode (manual or query)
 * 3. If manual mode:
 *    - Uses manually selected content IDs
 * 4. If query mode:
 *    - Runs content query with specified root, count, and sorting
 *    - Collects query result IDs
 * 5. For each item ID:
 *    - Fetches content by ID
 *    - Retrieves content metadata (display name, path)
 *    - Generates page URL
 *    - Checks if item is the current page
 * 6. Returns Submenu props with items array
 *
 * @param component - The submenu part component from Enonic XP
 * @param content - Current page content for checking active state
 * @returns Submenu props including items array with URLs and current state
 *
 * @example
 * ```ts
 * // Manual selection configuration
 * {
 *   itemsSet: {
 *     _selected: "manual",
 *     manual: {
 *       items: ["page1", "page2", "page3"]
 *     }
 *   }
 * }
 *
 * // Query selection configuration
 * {
 *   itemsSet: {
 *     _selected: "query",
 *     query: {
 *       queryroot: "/site/pages/about",
 *       querysorting: "displayName ASC",
 *       count: 5
 *     }
 *   }
 * }
 *
 * // Returns:
 * {
 *   items: [
 *     {
 *       itemID: "page1",
 *       url: "/about/mission",
 *       title: "Our Mission",
 *       current: false
 *     },
 *     {
 *       itemID: "page2",
 *       url: "/about/team",
 *       title: "Our Team",
 *       current: true
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * @remarks
 * - Defaults to 'manual' mode if _selected is not specified
 * - Query mode defaults to 10 items if count not specified
 * - Non-existent content items are filtered out
 * - Current page is marked with current: true flag
 * - Query uses runQuery utility for consistent content fetching
 * - Items maintain order from manual selection or query sorting
 */
export const submenuProcessor: ComponentProcessor<'lib.no:submenu'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as SubmenuConfig;


  const selection = config?.itemsSet?._selected || 'manual';
  const items: string[] = [];

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        undefined,
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
  }

  return {
    items: items.map((itemID) => {
      const itemContent = getContent({key: itemID});
      if (!itemContent) {
        return null;
      }

      return {
        itemID,
        url: pageUrl({path: itemContent._path}),
        title: itemContent.displayName,
        current: content._path === itemContent._path
      };
    }).filter(Boolean)
  };
};
