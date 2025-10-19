import {type FC, type ReactNode} from 'react';

import { GridItem } from '/react4xp/common/GridItem/GridItem';
import { AuthorLink } from '/react4xp/common/AuthorLink/AuthorLink';
import type { ItemData } from '/react4xp/common/types';

// Re-export ItemData for backward compatibility
export type { ItemData } from '/react4xp/common/types';

/**
 * Props for the ArticleCard component
 */
export interface ArticleCardProps {
  /** Optional child elements (e.g., badges, metadata) */
  children?: ReactNode;
  /** If true, renders children after content. If false, before content */
  childrenLast?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Image/content layout direction */
  direction?: 'left' | 'right' | '' | undefined;
  /** Image display size */
  imageSize?: 'small' | 'medium' | 'large' | 'full';
  /** Image shape style */
  imageType?: 'round' | '';
  /** Article data (title, image, url, authors, date, etc.) */
  item?: ItemData;
  /** If true, hides the article summary/ingress */
  noIngress?: boolean;
  /** If true, uses presentation styling */
  presentation?: boolean;
  /** Text for "read more" link */
  readMore?: string;
  /** If true, shows "read more" link */
  readMoreEnabled?: boolean;
  /** If true, displays article authors. Defaults to true */
  showAuthors?: boolean;
  /** If true, displays publication date. Defaults to true */
  showDate?: boolean;
  /** If true, displays article image */
  showImage?: boolean;
  /** If true, centers the article title */
  titleCenter?: boolean;
}

/**
 * Article card component for article lists and grids
 *
 * A flexible card component for displaying article previews in lists, grids, or related
 * content sections. Built on top of GridItem with article-specific metadata (authors, date).
 *
 * **Features:**
 * - Configurable image size and shape
 * - Author byline with first author only
 * - Publication date display
 * - Optional "read more" link
 * - Flexible layout direction (left/right)
 * - Optional ingress/summary
 * - Responsive presentation mode
 *
 * **Common use cases:**
 * - Article list pages
 * - Related articles section
 * - Search results
 * - Author archive pages
 * - Homepage featured articles
 *
 * **Layout:**
 * - Image (configurable size)
 * - Title (linked to article)
 * - Ingress/summary (optional)
 * - Author byline (first author with image)
 * - Publication date
 * - Read more link (optional)
 *
 * @example
 * ```tsx
 * // Standard article card
 * <ArticleCard
 *   item={{
 *     name: 'Article Title',
 *     url: '/articles/my-article',
 *     image: articleImage,
 *     shortDescription: '<p>Summary...</p>',
 *     authors: [{person: 'John Doe', personUrl: '/authors/john'}],
 *     datePublished: 'January 15, 2025'
 *   }}
 *   imageSize="medium"
 *   showAuthors={true}
 *   showDate={true}
 * />
 *
 * // Card without ingress, with read more link
 * <ArticleCard
 *   item={articleData}
 *   noIngress={true}
 *   readMoreEnabled={true}
 *   readMore="Les mer"
 * />
 *
 * // Horizontal layout card
 * <ArticleCard
 *   item={articleData}
 *   direction="left"
 *   imageSize="small"
 *   imageType="round"
 * />
 * ```
 */
export const ArticleCard: FC<ArticleCardProps> = ({
  className,
  direction = '',
  imageSize = 'full',
  imageType,
  item = {},
  noIngress = false,
  presentation = false,
  readMore,
  readMoreEnabled,
  showAuthors = true,
  showDate = true,
  titleCenter = false
}) => {
  const { authors = [], datePublished } = item;

  return (
    <GridItem
      className={className}
      imageSize={imageSize === 'full' ? '' : imageSize}
      imageType={imageType}
      presentation={presentation}
      direction={direction}
      titleCenter={titleCenter}
      showImage
      item={item}
      noIngress={noIngress}
      childrenLast={true}
      readMore={readMore}
      readMoreEnabled={readMoreEnabled}>
      <div className="article-creds">
        {showAuthors && authors && authors.length > 0 && (
          <ul className="authors">
            {authors.slice(0, 1).map(({ authorID, person, personUrl, image }) => (
              <AuthorLink key={authorID} author={person} url={personUrl} image={image} />
            ))}
          </ul>
        )}
        {datePublished && showDate && (
          <div className="article-date">
            {datePublished}
          </div>
        )}
      </div>
    </GridItem>
  );
};
