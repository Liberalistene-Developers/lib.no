import {type FC, type ReactNode, useEffect, useState} from 'react';

import doGuillotineRequest from '@utils/guillotine/request';

import {Button} from '/react4xp/common/Button/Button';

/**
 * Generic item interface for dynamic loading
 */
export interface DynamicLoaderItem {
  /** Unique item identifier */
  id?: string;
  /** Additional item properties */
  [key: string]: unknown;
}

/**
 * Props for the DynamicLoader component
 */
interface DynamicLoaderProps {
  /** Guillotine API URL for fetching more items */
  apiUrl?: string;
  /** Function that builds the GraphQL query string */
  buildQueryList?: () => string;
  /** Render prop function that receives items and load more button */
  children?: (args: { items: DynamicLoaderItem[]; children: ReactNode }) => ReactNode;
  /** Number of items to load per request. Defaults to 10 */
  count?: number;
  /** Function to extract item list from GraphQL response */
  extractList?: (data: unknown) => DynamicLoaderItem[];
  /** Initial items (server-side rendered) */
  items?: DynamicLoaderItem[];
  /** Whether "Load More" functionality is enabled */
  loadMoreEnabled?: boolean;
  /** Text for the "Load More" button. Defaults to "Load more" */
  loadMore?: string;
  /** Parent path query filter for Guillotine request */
  parentPathQuery?: string;
  /** Sort expression for Guillotine request */
  sortExpression?: string;
}

/**
 * Dynamic loader component with "Load More" functionality
 *
 * Provides client-side pagination for content lists using Guillotine GraphQL API.
 * Starts with server-side rendered items and allows users to load more items
 * dynamically without page refresh.
 *
 * **Features:**
 * - Progressive loading with "Load More" button
 * - Automatic button hiding when no more items available
 * - Loading state management
 * - Offset tracking for pagination
 * - Customizable query building
 * - Render prop pattern for flexible rendering
 *
 * **Common use cases:**
 * - Article lists with pagination
 * - Event lists with load more
 * - Search results pagination
 *
 * **How it works:**
 * 1. Component receives initial items (from server-side processor)
 * 2. User clicks "Load More" button
 * 3. Guillotine request fetches next batch using offset
 * 4. New items are appended to existing list
 * 5. Button hides when fewer items than `count` are returned
 *
 * @example
 * ```tsx
 * <DynamicLoader
 *   items={initialArticles}
 *   apiUrl="/api/guillotine"
 *   buildQueryList={() => articleListQuery}
 *   extractList={(data) => data.guillotine.queryDsl.articles}
 *   count={10}
 *   loadMoreEnabled={true}
 *   parentPathQuery="/content/articles"
 *   sortExpression="publish.from DESC"
 * >
 *   {({ items, children }) => (
 *     <>
 *       <div className="article-grid">
 *         {items.map(article => <ArticleCard key={article.id} {...article} />)}
 *       </div>
 *       {children}
 *     </>
 *   )}
 * </DynamicLoader>
 * ```
 */
export const DynamicLoader: FC<DynamicLoaderProps> = ({
  apiUrl = '',
  buildQueryList,
  children,
  count = 10,
  extractList,
  items = [],
  loadMoreEnabled = false,
  loadMore = 'Load more',
  parentPathQuery = '',
  sortExpression = ''
}) => {
  const [list, setList] = useState<DynamicLoaderItem[]>(items);
  const [more, setMore] = useState(loadMoreEnabled && !!apiUrl && items.length === count);
  const [loading, setLoading] = useState(false);
  const [nextOffset, setNextOffset] = useState(items.length);

  useEffect(() => {
    setNextOffset(list.length);
  }, [list]);

  const updateItems = (data: DynamicLoaderItem[]): void => {
    if (data.length > 0) {
      setList([
        ...list,
        ...data
      ]);

      if (data.length < count) {
        setMore(false);
      }
    } else {
      setMore(false);
    }

    setLoading(false);
  };

  const readMoreClick = (): void => {
    setLoading(true);

    if (!buildQueryList || !extractList) {
      return;
    }

    doGuillotineRequest({
      url: apiUrl,
      query: buildQueryList(),
      variables: {
        first: count,
        offset: nextOffset,
        sort: sortExpression,
        parentPathQuery
      },
      extractDataFunc: extractList,
      handleDataFunc: updateItems
    });
  };

  const button = more && (
    <div className="more-button">
      <Button title={loadMore} onClick={!loading ? readMoreClick : undefined} />
    </div>
  );

  if (!children) {
    return null;
  }

  return (
    <>
      {children({ items: list, children: button })}
    </>
  );
};
