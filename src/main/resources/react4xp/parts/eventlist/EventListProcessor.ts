import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {mapEvent, type MappedEvent} from '/react4xp/utils/events';
import {findItems} from '/react4xp/utils/query';
import {buildParentPathQuery} from '/react4xp/utils/guillotine/helpers';

/**
 * Configuration for the event list part.
 */
interface EventListConfig {
  /** List description text */
  description?: string;
  /** Display type configuration (list or grid) */
  displaytype?: {
    /** Selected display type: 'list' or 'grid' */
    _selected?: string;
    /** List display configuration */
    list?: {
      /** Image display configuration for list view */
      image?: {
        /** Image visibility: 'show' or 'hide' */
        _selected?: string;
        /** Configuration when images are shown */
        show?: {
          /** Image size variant */
          imagesize?: string;
          /** Whether to use round image style */
          imagetype?: boolean;
        };
      };
    };
  };
  /** Item selection configuration (manual or query-based) */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of manually selected event content IDs */
      items?: string[];
    };
    /** Query-based selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sorting option: 'asc', 'desc', or 'normal' */
      querysorting?: string;
      /** Maximum number of items to fetch */
      count?: number;
    };
  };
  /** Whether to hide event ingress text */
  hideIngress?: boolean;
  /** Short description for the list */
  shortDescription?: string;
  /** List title */
  title?: string;
  /** Custom "read more" link text */
  readMore?: string;
  /** Whether to show "read more" links */
  readMoreEnabled?: boolean;
  /** Custom "load more" button text */
  loadMore?: string;
  /** Whether to enable "load more" functionality */
  loadMoreEnabled?: boolean;
}

/**
 * Processor for event list component.
 *
 * Fetches and configures an event list with support for:
 * - **Manual selection:** Specific events chosen by editor
 * - **Query selection:** Dynamic events fetched via content query with Guillotine API
 *
 * For query mode, the processor:
 * - Fetches initial events server-side for SSR
 * - Configures Guillotine API endpoint for client-side loading
 * - Sets up parent path query for filtering
 * - Prepares sorting expressions for dynamic queries
 *
 * Display options include:
 * - List or grid layout
 * - Image visibility and styling
 * - "Read more" and "Load more" functionality
 *
 * @param component - The React4xp component configuration
 * @param request - The HTTP request object (used to determine branch)
 * @returns Props object for EventList component with events and configuration
 *
 * @example
 * ```ts
 * // Manual selection returns:
 * {
 *   title: "Upcoming Events",
 *   displaytype: "list",
 *   showImage: true,
 *   imageSize: "medium",
 *   items: [{title: "Event 1", from: "2024-06-15", ...}],
 *   useLoader: false
 * }
 *
 * // Query selection returns:
 * {
 *   title: "All Events",
 *   displaytype: "grid",
 *   items: [{...}], // Initial 10 events
 *   apiUrl: "/api/master",
 *   parentPathQuery: "...",
 *   sortExpression: "data.from DESC",
 *   count: 20,
 *   useLoader: true
 * }
 * ```
 */
export const eventListProcessor: ComponentProcessor<'lib.no:eventlist'> = ({component, request}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as EventListConfig;


  const displaytype = config?.displaytype?._selected || 'list';
  const selection = config?.itemsSet?._selected || 'manual';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';

  const items: MappedEvent[] = [];

  if (selection === 'manual') {
    const itemList = config?.itemsSet?.manual?.items || [];
    items.push(...itemList.map(mapEvent));
  } else if (selection === 'query') {
    // Fetch initial events server-side for query mode
    const queryRoot = config?.itemsSet?.query?.queryroot;
    const queryCount = config?.itemsSet?.query?.count || 10;
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';

    if (queryRoot) {
      const eventIds = findItems('lib.no:event', queryRoot, querysorting, queryCount, 0, 'data.from');
      if (eventIds) {
        items.push(...eventIds.map(mapEvent));
      }
    }
  }

  const headless = selection === 'query';
  const queryPath = headless && config?.itemsSet?.query?.queryroot
    ? getContent({key: config.itemsSet.query.queryroot})?._path
    : undefined;

  const parentPathQuery = headless && queryPath ? buildParentPathQuery(queryPath) : undefined;

  const createSort = () => {
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';
    switch (querysorting) {
      case 'asc':
        return 'data.from ASC';
      case 'desc':
        return 'data.from DESC';
      default:
        return '';
    }
  };

  const sortExpression = createSort();
  const useLoader = selection !== 'manual';

  // Get Guillotine v7 endpoint with branch from request
  const branch = request.branch || 'master';
  const guillotineEndpoint = headless ? `/api/${branch}` : '';

  return {
    title: config?.title,
    displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: config?.displaytype?.list?.image?.show?.imagesize,
    imageType: config?.displaytype?.list?.image?.show?.imagetype ? 'round' : '',
    readMore: config?.readMore,
    readMoreEnabled: config?.readMoreEnabled,
    loadMore: config?.loadMore,
    loadMoreEnabled: config?.loadMoreEnabled,
    items,
    apiUrl: headless ? guillotineEndpoint : '',
    parentPathQuery,
    count: selection === 'query' ? (config?.itemsSet?.query?.count || 10) : items.length,
    sortExpression,
    noIngress: !!config?.hideIngress,
    useLoader
  };
};
