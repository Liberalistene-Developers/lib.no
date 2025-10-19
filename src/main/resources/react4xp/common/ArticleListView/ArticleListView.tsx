import {type FC, type ReactNode} from 'react';

import { Image } from '@common/Image/Image';
import { SafeHtml } from '@common/SafeHtml/SafeHtml';
import { ArticleListItem } from '@common/ArticleListItem/ArticleListItem';
import { ArticleCard } from '@common/ArticleCard/ArticleCard';
import type { ImageData, ItemData } from '@common/types';

/**
 * Article item data structure
 */
interface ArticleItem {
  /** Unique article identifier */
  id?: string;
}

/**
 * Featured article configuration
 * Maps 1-based index positions to featured display settings
 */
interface FeaturedConfig {
  [key: string]: {
    /** Display style/direction for featured article */
    style?: string;
    /** Whether to show publication date */
    showDate?: boolean;
  } | boolean;
}

/**
 * Props for the ArticleListView component
 */
interface ArticleListViewProps {
  /** Optional child elements (e.g., "Load More" button from DynamicLoader) */
  children?: ReactNode;
  /** Configuration for featured articles at specific positions */
  featured?: FeaturedConfig;
  /** List description/introduction text (HTML) */
  description?: string;
  /** Display type: 'list' or 'grid'. Defaults to 'grid' */
  displaytype?: string;
  /** Optional header image for the list */
  image?: ImageData;
  /** Short description/summary for the list (HTML) */
  shortDescription?: string;
  /** Article items to display */
  items?: ArticleItem[];
  /** List title/heading */
  title?: string;
  /** Text for "read more" link on articles */
  readMore?: string;
  /** If true, shows "read more" links on articles */
  readMoreEnabled?: boolean;
  /** If true, shows article images */
  showImage?: boolean;
  /** Image shape style */
  imageType?: string;
  /** Image display size */
  imageSize?: string;
  /** If true, centers article titles */
  titleCenter?: boolean;
  /** If true, hides article ingress/summary */
  noIngress?: boolean;
}

/**
 * Article list view component for rendering article collections
 *
 * A pure presentation component that renders article items in either list or grid layout.
 * Used by ArticleList for both server-side and client-side rendering. Supports featured
 * article highlighting at specific positions (1-based index).
 *
 * **Display types:**
 * - `'list'` - Uses ArticleListItem for compact vertical list
 * - `'grid'` - Uses ArticleCard for card-based grid layout (default)
 *
 * **Features:**
 * - Automatic component selection based on display type
 * - Featured article styling via 1-based position index
 * - Optional header image and descriptions
 * - Configurable article display options
 * - Children slot for "Load More" button or other elements
 *
 * **Featured article indexing:**
 * Articles are referenced by their position (1-based) in the items array:
 * - Position 1 = items[0]
 * - Position 2 = items[1]
 * - etc.
 *
 * **Common use cases:**
 * - Rendered by ArticleList (both SSR and CSR)
 * - Direct use when no pagination needed
 * - Custom article display implementations
 *
 * @example
 * ```tsx
 * // Basic grid view
 * <ArticleListView
 *   title="Latest Articles"
 *   items={articles}
 *   displaytype="grid"
 *   showImage={true}
 * />
 *
 * // List view with featured first article
 * <ArticleListView
 *   title="News"
 *   items={articles}
 *   displaytype="list"
 *   featured={{
 *     '1': { style: 'right', showDate: true }
 *   }}
 * />
 *
 * // With header image and descriptions
 * <ArticleListView
 *   title="Featured"
 *   image={headerImage}
 *   shortDescription="<p>Brief intro...</p>"
 *   description="<p>Longer description...</p>"
 *   items={articles}
 *   displaytype="grid"
 * />
 *
 * // With "Load More" button (from DynamicLoader)
 * <ArticleListView
 *   items={articles}
 *   displaytype="grid"
 * >
 *   <Button onClick={loadMore}>Load More</Button>
 * </ArticleListView>
 * ```
 */
export const ArticleListView: FC<ArticleListViewProps> = ({
  children,
  featured = {},
  description,
  displaytype = 'grid',
  image,
  shortDescription,
  items,
  title,
  readMore = '',
  readMoreEnabled = false,
  showImage,
  imageType,
  imageSize,
  titleCenter = false,
  noIngress = false
}) => {
  const Item = displaytype === 'list' ? ArticleListItem : ArticleCard;

  return (
    <div className="article-list-holder">
      {title && (
        <div className="article-list-title">
          <h2 title={title}>{title}</h2>
        </div>
      )}

      <Image image={image} />

      {shortDescription && (
        <SafeHtml html={shortDescription} />
      )}

      {description && (
        <SafeHtml html={description} />
      )}

      {items && items.length > 0 && (
        <div className={`article-list ${displaytype}`}>
          {items.map((item, index) => {
            const featuredItem = featured && featured[`${index + 1}`];
            const presentation = typeof featuredItem === 'object' ? featuredItem : false;
            const direction = (presentation && typeof presentation === 'object' && presentation.style) || '';
            const showDate = (presentation && typeof presentation === 'object' && presentation.showDate) || false;

            return (
              <Item
                key={item.id}
                item={item as ItemData}
                presentation={presentation as boolean}
                direction={direction as '' | 'left' | 'right'}
                showDate={showDate}
                titleCenter={titleCenter}
                showImage={showImage}
                imageSize={imageSize as 'small' | 'medium' | 'large'}
                imageType={imageType as '' | 'round'}
                className="article"
                readMore={readMore}
                readMoreEnabled={readMoreEnabled}
                noIngress={noIngress}
              />
            );
          })}
        </div>
      )}
      {children}
    </div>
  );
};
