import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {runQuery} from '/react4xp/utils/query';

/**
 * Book list part configuration from booklist.xml schema.
 *
 * Supports two item selection modes (manual/query).
 */
interface BookListConfig {
  /** Description text for the book list */
  description?: string;
  /** Display type/style for the list */
  displaytype?: string;
  /** Legacy items array (deprecated, use itemsSet instead) */
  items?: string[];
  /** Item selection configuration */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of manually selected book content IDs */
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
  /** Short description text */
  shortDescription?: string;
  /** Localized text prefix for "Buy from" (e.g., "Kjøp fra") */
  buyFromText?: string;
  /** Title for the book list */
  title?: string;
}

/**
 * Book content data structure from book content type.
 */
interface BookData {
  /** Book cover image reference */
  image?: string;
  /** Book ingress/summary text (HTML) */
  ingress?: string;
  /** Author content ID(s) - single ID or array of IDs */
  author?: string | string[];
  /** Purchase links array */
  buy?: Array<Record<string, unknown>>;
}

/**
 * Processes book list configuration and fetches books for the BookList component.
 *
 * Supports two item selection modes:
 * - **Manual mode:** Uses explicitly selected books from configuration
 * - **Query mode:** Fetches books dynamically via content query
 *
 * Features author caching to minimize content API calls when the same author
 * appears in multiple books.
 *
 * **Data Flow:**
 * 1. Extracts book list configuration from part component
 * 2. Determines selection mode (manual/query)
 * 3. For manual mode: Uses selected book IDs
 * 4. For query mode: Runs content query to fetch books
 * 5. For each book:
 *    - Fetches book content data
 *    - Fetches first author's data (with caching)
 *    - Generates book cover image URL
 *    - Extracts first purchase link
 * 6. Returns BookList props with books and configuration
 *
 * @param component - The booklist part component from Enonic XP
 * @returns BookList props including books array and display settings
 *
 * @example
 * ```ts
 * // Manual mode
 * {
 *   title: "Recommended Reading",
 *   buyFromText: "Buy from",
 *   itemsSet: {
 *     _selected: "manual",
 *     manual: { items: ["book1", "book2", "book3"] }
 *   }
 * }
 *
 * // Query mode
 * {
 *   title: "Latest Books",
 *   itemsSet: {
 *     _selected: "query",
 *     query: {
 *       queryroot: "/books",
 *       querysorting: "createdTime DESC",
 *       count: 10
 *     }
 *   }
 * }
 * ```
 *
 * @remarks
 * - Only the first author is included per book
 * - Only the first purchase link is included per book
 * - Author data is cached during processing to improve performance
 * - Book cover images use block(157,239) size
 * - Legacy 'items' config is merged with itemsSet for backward compatibility
 * - Non-existent books are filtered out
 */
export const bookListProcessor: ComponentProcessor<'lib.no:booklist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BookListConfig;


  const selection = config?.itemsSet?._selected || 'manual';
  const items = [...(config?.items || [])];

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        'lib.no:book',
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
  }

  const authorCache: Record<string, {name: string; url: string}> = {};

  return {
    title: config?.title,
    displaytype: config?.displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    buyFromText: config?.buyFromText,
    className: 'grid',
    items: items.map((itemID) => {
      const itemContent = getContent({key: itemID});
      if (!itemContent) {
        return null;
      }

      const itemData = itemContent.data as BookData;
      const buy = itemData.buy ? [].concat(itemData.buy) : [];
      const authors = itemData.author ? [].concat(itemData.author).slice(0, 1) : [];

      const [author] = authors.map((authorId) => {
        if (!authorCache[authorId]) {
          const authorContent = getContent({key: authorId});
          if (authorContent) {
            authorCache[authorId] = {
              name: authorContent.displayName,
              url: authorContent._path
            };
          }
        }
        return authorCache[authorId];
      });

      return {
        itemID,
        url: pageUrl({path: itemContent._path}),
        author,
        title: itemContent.displayName,
        text: itemData.ingress || '',
        image: imageUrl(itemData.image, 'block(157,239)'),
        buy: buy.length ? buy[0] : null,
        buyFromText: config?.buyFromText
      };
    }).filter(Boolean)
  };
};
