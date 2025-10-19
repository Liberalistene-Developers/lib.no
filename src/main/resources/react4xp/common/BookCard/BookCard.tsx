import {type FC} from 'react';

import {type ImageData} from '@common/Image/Image';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Author information for a book card.
 */
interface AuthorType {
  /** Author's display name */
  name?: string;
  /** URL to the author's profile or page */
  url?: string;
}

/**
 * Purchase information for a book.
 */
interface BuyType {
  /** URL to purchase the book */
  url?: string;
  /** Name of the store where the book can be purchased */
  store?: string;
  /** Topic or category of the purchase link */
  topic?: string;
}

/**
 * Props for the BookCard component.
 */
interface BookCardProps {
  /** Author information */
  author?: AuthorType;
  /** Book cover image data */
  image?: ImageData | null;
  /** Purchase link information */
  buy?: BuyType | null;
  /** Localized text prefix for "Buy from" (e.g., "Kjøp fra") */
  buyFromText?: string;
  /** Book title */
  title?: string;
  /** Book description or summary text (supports HTML) */
  text?: string;
  /** URL to the book's detail page */
  url?: string;
}

/**
 * BookCard component for displaying a compact book preview with purchase options.
 *
 * Renders a horizontal card layout with the book cover image on the left and details on the right,
 * including title, author, description, and optional purchase link. The image and title can link
 * to either the book's detail page or the purchase URL.
 *
 * @example
 * ```tsx
 * <BookCard
 *   title="Liberal Economics"
 *   author={{name: 'Jane Smith', url: '/authors/jane'}}
 *   image={{url: '/books/economics.jpg', displayName: 'Cover'}}
 *   text="<p>A comprehensive guide to liberal economic principles</p>"
 *   url="/books/economics"
 *   buy={{url: 'https://bookstore.com/economics', store: 'Bookstore.com'}}
 *   buyFromText="Buy from"
 * />
 * ```
 *
 * @remarks
 * - Fixed dimensions: image is 157x239px, card height is 239px
 * - The buy URL takes precedence over the book detail URL for image and title links
 * - Text is truncated with ellipsis if it overflows the available space
 * - HTML content in the text field is sanitized via SafeHtml component
 */
export const BookCard: FC<BookCardProps> = ({
  url = '',
  image = null,
  author,
  title = '',
  text = '',
  buy = null,
  buyFromText = ''
}) => {
  const imageItem = image && (
    <img
      src={image.url}
      alt={image.alternativeText || image.displayName || title || (image.url && image.url.split('?')[0].split('/').pop()) || ''}
      className="w-[157px] h-[239px]"
    />
  );
  const buyAtStoreText = (buy && (buy.store || buy.topic)) ? `${buyFromText} ${buy.store || buy.topic}` : buyFromText;
  const imageContainer = image && ((buy && buy.url) || url)
    ? (
      <a href={(buy && buy.url) || url} title={buyAtStoreText}>
        {imageItem}
      </a>
    )
    : imageItem;

  const titleItem = <h3 className="text-primary-700 font-bold text-[24px] leading-[29px] flex-[0.3_0_0%]">{title}</h3>;
  const titleContainer = url
    ? (
      <a href={(buy && buy.url) || url}>
        {titleItem}
      </a>
    )
    : titleItem;

  return (
    <div className="flex flex-row gap-x-5 h-[239px]">
      {image && (
        <div>
          {imageContainer}
        </div>
      )}
      <div className="flex flex-col w-[201px] gap-y-[6px]">
        <div>
          {titleContainer}
        </div>

        <div className="flex-[0_0_0%] text-primary-300 font-bold text-[18px] leading-[22px]">
          {author && author.name}
        </div>

        {text && (
          <SafeHtml html={text} className="w-full flex-[0.7_0_0%] font-bold text-[14px] leading-[17px] text-ellipsis overflow-hidden text-primary-100" />
        )}

        {buy && (
          <div className="flex-[0_0_0%] [&_a]:font-bold [&_a]:text-[18px] [&_a]:leading-[22px] [&_a]:underline [&_a]:text-primary-700">
            <a href={buy.url} rel="noreferrer">{buyAtStoreText}</a>
          </div>
        )}
      </div>
    </div>
  );
};
