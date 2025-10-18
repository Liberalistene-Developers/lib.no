import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {runQuery} from '/react4xp/utils/query';
import {mapGroup} from '/react4xp/utils/board';

/**
 * Board presentation part configuration from boardpresentation.xml schema.
 *
 * Supports two item selection modes (manual/query) and two presentation modes
 * (highlighted/list).
 */
interface BoardPresentationConfig {
  /** Display title for the board */
  boardname?: string;
  /** Image size specification */
  imagesize?: string;
  /** Whether to use round image type */
  imagetype?: boolean;
  /** Email display mode: 'yes', 'no', or 'link' */
  showemail?: string;
  /** Presentation style configuration */
  presentation?: {
    /** Selected presentation mode: 'hightlighted' or 'list' */
    _selected?: string;
    /** Highlighted mode configuration */
    hightlighted?: {
      /** Whether to reverse member order */
      reverseOrder?: boolean;
      /** Content ID of member to highlight */
      memberHighlighted?: string;
      /** Description text for highlighted presentation */
      description?: string;
    };
  };
  /** Item selection configuration */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of manually selected group content IDs */
      items?: string[];
    };
    /** Query-based selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sort order for query results */
      querysorting?: string;
      /** Maximum number of items to fetch */
      count?: number;
    };
  };
}

/**
 * Processes board presentation configuration for the BoardPresentation component.
 *
 * Fetches organizational groups (e.g., local branches, committees) using either
 * manual selection or content queries, with support for highlighted member presentation.
 *
 * **Data Flow:**
 * 1. Extracts board presentation configuration from part component
 * 2. Determines selection mode (manual/query) and presentation style (highlighted/list)
 * 3. For manual mode: Uses explicitly selected group IDs
 * 4. For query mode: Runs content query to fetch groups dynamically
 * 5. Maps each group ID to full group data via mapGroup utility
 * 6. Returns BoardPresentation props with groups and display settings
 *
 * @param component - The boardpresentation part component from Enonic XP
 * @returns BoardPresentation props including groups, highlighting, and display settings
 *
 * @example
 * ```ts
 * // Manual mode with highlighting
 * {
 *   boardname: "Local Branches",
 *   itemsSet: {
 *     _selected: "manual",
 *     manual: { items: ["branch1", "branch2", "branch3"] }
 *   },
 *   presentation: {
 *     _selected: "hightlighted",
 *     hightlighted: {
 *       memberHighlighted: "member-123",
 *       description: "Meet our featured member"
 *     }
 *   }
 * }
 *
 * // Query mode as simple list
 * {
 *   itemsSet: {
 *     _selected: "query",
 *     query: {
 *       queryroot: "/groups",
 *       querysorting: "displayName ASC",
 *       count: 10
 *     }
 *   },
 *   presentation: { _selected: "list" }
 * }
 * ```
 *
 * @remarks
 * - Query mode uses runQuery utility for content fetching
 * - noHighlighting is true when presentation mode is 'list'
 * - showemail defaults to 'no' if not specified
 * - mapGroup utility fetches full group data including name, members, location, etc.
 */
export const boardPresentationProcessor: ComponentProcessor<'lib.no:boardpresentation'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BoardPresentationConfig;


  const selection = config?.itemsSet?._selected || 'manual';
  const presentation = config?.presentation?._selected || 'hightlighted';

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
    boardTitle: config?.boardname || '',
    description: config?.presentation?.hightlighted?.description || '',
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    items: items.map(mapGroup),
    memberHighlighted: config?.presentation?.hightlighted?.memberHighlighted,
    noHighlighting: presentation === 'list',
    reverseOrder: config?.presentation?.hightlighted?.reverseOrder,
    showEmail: config?.showemail || 'no'
  };
};
