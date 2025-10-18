import {BookCard} from '@common/BookCard/BookCard';

import type { ImageData } from '@common/Image/Image';


interface AuthorType {
  name?: string;
  url?: string;
}

interface BuyType {
  url?: string;
  shop?: string;
  store?: string;
  topic?: string;
}

interface BookItem {
  itemID?: string;
  url?: string;
  image?: ImageData;
  author?: AuthorType;
  title?: string;
  text?: string;
  buy?: BuyType;
}

export interface BookListProps {
  title?: string;
  buyFromText?: string;
  className?: string;
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
