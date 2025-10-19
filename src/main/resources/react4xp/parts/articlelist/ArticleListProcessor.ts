import type { PartComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { get as getContent } from '/lib/xp/content';
import { mapArticle, type MappedArticle } from '/react4xp/utils/articles';
import { findItems } from '/react4xp/utils/query';
import { buildParentPathQuery } from '/react4xp/utils/guillotine/helpers';

/**
 * Article list part configuration from articlelist.xml schema.
 *
 * Supports two display modes (gridlist/list), two item selection modes (manual/query),
 * and optional dynamic loading via Guillotine API.
 */
interface ArticleListConfig {
  description?: string;
  displaytype?: {
    _selected?: string;
    gridlist?: {
      titleCenter?: boolean;
      imagesize?: string;
      imagetype?: boolean;
    };
    list?: {
      image?: {
        _selected?: string;
        show?: {
          imagesize?: string;
          imagetype?: boolean;
        };
      };
    };
  };
  featured?: Array<{item: string; style: string; showDate: boolean}>;
  itemsSet?: {
    _selected?: string;
    manual?: {
      items?: string[];
    };
    query?: {
      queryroot?: string;
      querysorting?: string;
      count?: number;
    };
  };
  hideIngress?: boolean;
  shortDescription?: string;
  title?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  loadMore?: string;
  loadMoreEnabled?: boolean;
}

/**
 * Processes article list configuration and fetches articles for the ArticleList component.
 *
 * Supports two item selection modes:
 * - **Manual mode:** Uses explicitly selected articles from configuration
 * - **Query mode:** Fetches articles dynamically via Guillotine API with pagination
 *
 * Handles both server-side rendering (initial article load) and client-side dynamic loading
 * (infinite scroll via Guillotine API).
 *
 * **Data Flow:**
 * 1. Extracts article list configuration from part component
 * 2. Determines selection mode (manual/query) and display type (gridlist/list)
 * 3. For manual mode: Maps selected article IDs to article data
 * 4. For query mode:
 *    - Fetches initial articles server-side via findItems
 *    - Prepares Guillotine API endpoint for client-side pagination
 *    - Builds query parameters (path, sorting, count)
 * 5. Processes featured articles configuration
 * 6. Returns ArticleListView props with articles and API configuration
 *
 * @param component - The articlelist part component from Enonic XP
 * @param request - The HTTP request object containing branch information
 * @returns ArticleListView props including articles, display settings, and API configuration
 *
 * @example
 * ```ts
 * // Manual mode
 * {
 *   itemsSet: {
 *     _selected: "manual",
 *     manual: { items: ["article1", "article2", "article3"] }
 *   }
 * }
 * // Returns: { items: [mapped articles], apiUrl: "", ... }
 *
 * // Query mode (dynamic loading)
 * {
 *   itemsSet: {
 *     _selected: "query",
 *     query: {
 *       queryroot: "/articles",
 *       querysorting: "desc",
 *       count: 12
 *     }
 *   }
 * }
 * // Returns: { items: [initial 12 articles], apiUrl: "/api/master", parentPathQuery: "...", ... }
 * ```
 *
 * @remarks
 * - Query mode uses Guillotine v7 API endpoint based on request branch
 * - Featured articles can have custom styles and date display settings
 * - Sort expression is converted from simplified format (asc/desc/normal) to XP query format
 * - Initial server-side fetch ensures SEO and fast first paint
 */
export const articleListProcessor: ComponentProcessor<'lib.no:articlelist'> = ({component, request}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ArticleListConfig;


  const displaytype = config?.displaytype?._selected || 'gridlist';
  const selection = config?.itemsSet?._selected || 'manual';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';

  const items: MappedArticle[] = [];

  if (selection === 'manual') {
    const itemList = config?.itemsSet?.manual?.items || [];
    items.push(...itemList.map(mapArticle));
  } else if (selection === 'query') {
    // Fetch initial articles server-side for query mode
    const queryRoot = config?.itemsSet?.query?.queryroot;
    const queryCount = config?.itemsSet?.query?.count || 12;
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';

    if (queryRoot) {
      const articleIds = findItems('lib.no:article', queryRoot, querysorting, queryCount, 0, 'data.date');
      if (articleIds) {
        items.push(...articleIds.map(mapArticle));
      }
    }
  }

  const featured = (config?.featured || []).reduce(
    (acc, {item, style, showDate = true}) => ({
      ...acc,
      [item]: {style, showDate}
    }),
    {} as Record<string, {style: string; showDate: boolean}>
  );

  const headless = selection === 'query';
  const queryPath = headless && config?.itemsSet?.query?.queryroot
    ? getContent({key: config.itemsSet.query.queryroot})?._path
    : undefined;

  const parentPathQuery = headless && queryPath ? buildParentPathQuery(queryPath) : undefined;

  const createSort = () => {
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';
    switch (querysorting) {
      case 'asc':
        return 'data.date ASC';
      case 'desc':
        return 'data.date DESC';
      default:
        return '';
    }
  };

  const sortExpression = createSort();

  // Get Guillotine v7 endpoint with branch from request
  const branch = request.branch || 'master';
  const guillotineEndpoint = headless ? `/api/${branch}` : '';

  return {
    title: config?.title,
    displaytype,
    description: config?.description,
    featured,
    shortDescription: config?.shortDescription,
    titleCenter: displaytype === 'gridlist' && config?.displaytype?.gridlist?.titleCenter,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagesize
      : config?.displaytype?.list?.image?.show?.imagesize,
    imageType: (displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagetype
      : config?.displaytype?.list?.image?.show?.imagetype)
      ? 'round'
      : '',
    readMore: config?.readMore,
    readMoreEnabled: config?.readMoreEnabled,
    loadMore: config?.loadMore,
    loadMoreEnabled: config?.loadMoreEnabled,
    items,
    apiUrl: headless ? guillotineEndpoint : '',
    parentPathQuery,
    count: selection === 'query' ? (config?.itemsSet?.query?.count || 10) : items.length,
    sortExpression,
    noIngress: !!config?.hideIngress
  };
};
