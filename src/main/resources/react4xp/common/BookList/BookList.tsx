import {BookCard} from '/react4xp/common/BookCard/BookCard';

import type { ImageData } from '/react4xp/common/Image/Image';


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
