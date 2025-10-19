import {type FC, type ReactNode} from 'react';
import cx from 'classnames';

import { ListItem } from '/react4xp/common/ListItem/ListItem';
import { AuthorLink } from '/react4xp/common/AuthorLink/AuthorLink';
import type { ItemData } from '/react4xp/common/types';

/**
 * Props for the ArticleListItem component
 */
interface ArticleListItemProps {
  /** Optional child elements (e.g., badges, tags) */
  children?: ReactNode;
  /** If true, renders children after content. If false, before content */
  childrenLast?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** If true, displays article image. Defaults to true */
  showImage?: boolean;
  /** Image display size. Defaults to 'medium' */
  imageSize?: 'small' | 'medium' | 'large';
  /** Image shape style */
  imageType?: 'round' | '';
  /** Article data (title, image, url, authors, date, etc.) */
  item?: ItemData;
  /** If true, displays article authors. Defaults to false */
  showAuthors?: boolean;
  /** If true, displays publication date. Defaults to true */
  showDate?: boolean;
}

/**
 * Article list item component for compact article listings
 *
 * A simpler, more compact alternative to ArticleCard for article lists. Built on top of
 * ListItem with article-specific metadata. Shows only the first author when authors are enabled.
 *
 * **Features:**
 * - Compact layout optimized for lists
 * - Configurable image display
 * - First author only (vs ArticleCard which can show all)
 * - Publication date display
 * - Round or default image styles
 *
 * **Differences from ArticleCard:**
 * - More compact, less styling
 * - No "read more" link
 * - No presentation mode
 * - No layout direction options
 * - Simplified props
 *
 * **Common use cases:**
 * - Sidebar recent articles
 * - Related articles list
 * - Compact search results
 * - Author profile article list
 *
 * @example
 * ```tsx
 * // Basic list item
 * <ArticleListItem
 *   item={{
 *     name: 'Article Title',
 *     url: '/articles/my-article',
 *     image: thumbnailImage,
 *     authors: [{person: 'John Doe', personUrl: '/authors/john'}],
 *     datePublished: 'January 15, 2025'
 *   }}
 *   showImage={true}
 *   imageSize="small"
 * />
 *
 * // Without image, with authors
 * <ArticleListItem
 *   item={articleData}
 *   showImage={false}
 *   showAuthors={true}
 *   showDate={true}
 * />
 *
 * // With round image
 * <ArticleListItem
 *   item={articleData}
 *   imageType="round"
 *   imageSize="small"
 * />
 * ```
 */
export const ArticleListItem: FC<ArticleListItemProps> = ({
  className,
  showImage = true,
  imageSize = 'medium',
  imageType,
  item = {},
  showAuthors = false,
  showDate = true
}) => {
  const { authors = [], datePublished } = item;

  return (
    <ListItem className={cx('article', className)} imageSize={imageSize} imageType={imageType} showImage={showImage} item={item} childrenLast={true}>
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
    </ListItem>
  );
};
