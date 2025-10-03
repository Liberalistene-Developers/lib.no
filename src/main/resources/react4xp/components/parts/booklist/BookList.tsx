import * as React from 'react';

import {BookCard} from '../book/BookCard';

interface ImageType {
  url?: string;
  alternativeText?: string;
}

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
  image?: ImageType;
  author?: AuthorType;
  title?: string;
  text?: string;
  buy?: BuyType;
}

interface BookListProps {
  title?: string;
  buyFromText?: string;
  className?: string;
  items?: BookItem[];
}

export const BookList: React.FC<BookListProps> = ({
  title = '',
  items = [],
  className = '',
  buyFromText = ''
}) => {
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
