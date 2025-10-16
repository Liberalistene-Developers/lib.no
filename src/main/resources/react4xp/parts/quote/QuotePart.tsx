import { FC } from 'react';

import { Image } from '/react4xp/common/Image/Image';
import type { ImageData } from '/react4xp/common/types';

interface QuoteAuthor {
  authorID: string;
  person?: string;
  personUrl?: string;
  image?: string;
}

interface QuoteProps {
  title?: string;
  image?: ImageData;
  authors?: QuoteAuthor[];
  qoute?: string; // Note: misspelled in original code
  description?: string;
}

export const QuotePart: FC<QuoteProps> = ({
  title = '',
  image,
  authors = [],
  qoute = '',
  description = ''
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    {authors && authors.length > 0 && (
      <ul>
        {authors.map(({authorID, person, personUrl, image: authorImage}) => (
          <li key={authorID}>
            <div>
              <a href={personUrl}>
                {authorImage && (
                  <img src={authorImage} alt={person} />
                )}
                <span>
                  {person}
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    )}
    {qoute && (
      <div dangerouslySetInnerHTML={{__html: qoute}} />
    )}
    {description && (
      <div dangerouslySetInnerHTML={{__html: qoute || description}} />
    )}
  </div>
);
