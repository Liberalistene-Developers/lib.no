import {BookCard} from '@common/BookCard/BookCard';

import type { ImageData } from '@common/Image/Image';

/**
 * Author information for a book in the list.
 */
interface AuthorType {
  /** Author's display name */
  name?: string;
  /** URL to the author's profile or page */
  url?: string;
}

/**
 * Purchase information for a book in the list.
 */
interface BuyType {
  /** URL to purchase the book */
  url?: string;
  /** Shop name (deprecated, use store instead) */
  shop?: string;
  /** Name of the store where the book can be purchased */
  store?: string;
  /** Topic or category of the purchase link */
  topic?: string;
}

/**
 * Individual book item in the book list.
 */
interface BookItem {
  /** Unique identifier for the book item */
  itemID?: string;
  /** URL to the book's detail page */
  url?: string;
  /** Book cover image data */
  image?: ImageData;
  /** Author information */
  author?: AuthorType;
  /** Book title */
  title?: string;
  /** Book description or summary text (supports HTML) */
  text?: string;
  /** Purchase link information */
  buy?: BuyType;
}

/**
 * Props for the BookList component.
 */
export interface BookListProps {
  /** Optional title displayed above the book list */
  title?: string;
  /** Localized text prefix for "Buy from" (e.g., "Kjøp fra") */
  buyFromText?: string;
  /** Additional CSS class name for the book list container */
  className?: string;
  /** Array of books to display */
  items?: BookItem[];
}

/**
 * BookList component displays a collection of books as a grid of book cards.
 *
 * Renders an optional title followed by a list of BookCard components,
 * each representing a book with its cover image, author, description, and purchase links.
 *
 * @example
 * ```tsx
 * <BookList
 *   title="Recommended Reading"
 *   buyFromText="Buy from"
 *   items={[
 *     {
 *       itemID: "1",
 *       title: "Book Title",
 *       author: { name: "Author Name", url: "/author" },
 *       image: { src: "/book-cover.jpg", alt: "Book cover" },
 *       text: "Book description",
 *       url: "/books/book-title",
 *       buy: { url: "https://store.com", shop: "Store Name" }
 *     }
 *   ]}
 * />
 * ```
 */
export const BookList = ({
  title = '',
  items = [],
  className = '',
  buyFromText = ''
}: BookListProps) => {
  return (
    <div className="bookcard-list-wrapper">
      {title && (
        <div className="bookcard-list-title">
          <h2>{title}</h2>
        </div>
      )}

      <div className={`bookcard-list ${className}`}>
        {items && items.map(({
          itemID,
          url,
          image,
          author,
          title: itemTitle,
          text,
          buy
        }) => (
          <BookCard
            key={itemID}
            image={image}
            author={author}
            title={itemTitle}
            text={text}
            url={url}
            buy={buy}
            buyFromText={buyFromText}
          />
        ))}
      </div>
    </div>
  );
};
