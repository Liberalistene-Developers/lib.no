import {type FC} from 'react';

import {buildQueryArticleList, extractArticleList} from '@utils/guillotine/requests';

import {ArticleListView} from '/react4xp/common/ArticleListView/ArticleListView';
import {DynamicLoader} from '/react4xp/common/DynamicLoader/DynamicLoader';

import type {ImageData} from '/react4xp/common/types';

/**
 * Article item data structure
 */
interface ArticleItem {
  /** Unique article identifier */
  id?: string;
  /** Additional article properties */
  [key: string]: unknown;
}

/**
 * Featured article configuration
 * Maps article IDs to their featured display settings
 */
interface FeaturedConfig {
  [key: string]: {
    /** Display style for featured article */
    style?: string;
    /** Whether to show publication date */
    showDate?: boolean;
  } | boolean;
}

/**
 * Props for the ArticleList component
 */
export interface ArticleListProps {
  /** Configuration for featured articles with custom styling */
  featured?: FeaturedConfig;
  /** List description/introduction text */
  description?: string;
  /** Display type/variant for the list layout */
  displaytype?: string;
  /** Optional header image for the list */
  image?: ImageData;
  /** Short description/summary for the list */
  shortDescription?: string;
  /** Initial article items (server-side rendered) */
  items?: ArticleItem[];
  /** List title/heading */
  title?: string;
  /** If true, shows article images */
  showImage?: boolean;
  /** Image shape style */
  imageType?: string;
  /** Image display size */
  imageSize?: string;
  /** If true, centers article titles */
  titleCenter?: boolean;
  /** Text for "read more" link on articles */
  readMore?: string;
  /** If true, shows "read more" links on articles */
  readMoreEnabled?: boolean;
  /** If true, enables "Load More" button for pagination */
  loadMoreEnabled?: boolean;
  /** Text for "Load More" button. Defaults to "Load more" */
  loadMore?: string;
  /** Guillotine API URL for loading more articles */
  apiUrl?: string;
  /** Number of articles to load per request. Defaults to 10 */
  count?: number;
  /** Sort expression for Guillotine query */
  sortExpression?: string;
  /** Parent path query filter for Guillotine request */
  parentPathQuery?: string;
  /** If true, hides article ingress/summary */
  noIngress?: boolean;
}

/**
 * Article list component with optional pagination
 *
 * Displays a list of articles with configurable display options and optional "Load More"
 * functionality. Uses server-side rendering for initial articles and client-side loading
 * for pagination via Guillotine API.
 *
 * **Features:**
 * - Server-side and client-side rendering (SSR/CSR hybrid)
 * - Dynamic loading with "Load More" button
 * - Featured article highlighting
 * - Configurable image display
 * - Flexible layout options
 * - Article metadata (authors, dates)
 * - Read more links
 *
 * **Rendering modes:**
 * - Server-side (window undefined): Renders ArticleListView directly
 * - Client-side (window defined): Wraps in DynamicLoader for pagination
 *
 * **Common use cases:**
 * - Article archive pages
 * - Category/tag filtered lists
 * - Homepage article sections
 * - Author article listings
 *
 * @example
 * ```tsx
 * // Basic article list
 * <ArticleList
 *   title="Latest Articles"
 *   items={articles}
 *   showImage={true}
 *   imageSize="medium"
 * />
 *
 * // List with pagination
 * <ArticleList
 *   title="All Articles"
 *   items={initialArticles}
 *   loadMoreEnabled={true}
 *   apiUrl="/api/guillotine"
 *   count={10}
 *   sortExpression="publish.from DESC"
 *   parentPathQuery="/content/articles"
 * />
 *
 * // List with featured articles
 * <ArticleList
 *   title="News"
 *   items={articles}
 *   featured={{
 *     'article-123': { style: 'highlight', showDate: true },
 *     'article-456': true
 *   }}
 * />
 * ```
 */
export const ArticleList: FC<ArticleListProps> = ({
  featured = {},
  description,
  displaytype,
  image,
  shortDescription,
  items = [],
  title,
  showImage,
  imageType,
  imageSize,
  titleCenter = false,
  readMore = '',
  readMoreEnabled = false,
  loadMoreEnabled = false,
  loadMore = 'Load more',
  apiUrl = '',
  count = 10,
  sortExpression = '',
  parentPathQuery = '',
  noIngress = false
}) => {
  if (typeof window === 'undefined') {
    return (
      <ArticleListView
        featured={featured}
        description={description}
        displaytype={displaytype}
        image={image}
        shortDescription={shortDescription}
        items={items}
        title={title}
        showImage={showImage}
        imageSize={imageSize}
        imageType={imageType}
        titleCenter={titleCenter}
        readMore={readMore}
        readMoreEnabled={readMoreEnabled}
        noIngress={noIngress}
      />
    );
  }

  return (
    <DynamicLoader
      apiUrl={apiUrl}
      buildQueryList={buildQueryArticleList}
      count={count}
      extractList={extractArticleList}
      items={items}
      loadMoreEnabled={loadMoreEnabled}
      loadMore={loadMore}
      parentPathQuery={parentPathQuery}
      sortExpression={sortExpression}
    >
      {({
        items: list,
        children: itemsContent
      }: {
        items: ArticleItem[];
        children: React.ReactNode;
      }) => (
        <ArticleListView
          featured={featured}
          description={description}
          displaytype={displaytype}
          image={image}
          shortDescription={shortDescription}
          items={list}
          title={title}
          showImage={showImage}
          imageSize={imageSize}
          imageType={imageType}
          titleCenter={titleCenter}
          readMore={readMore}
          readMoreEnabled={readMoreEnabled}
          noIngress={noIngress}
        >
          {itemsContent}
        </ArticleListView>
      )}
    </DynamicLoader>
  );
};
