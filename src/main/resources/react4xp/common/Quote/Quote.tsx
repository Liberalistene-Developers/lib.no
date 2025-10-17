import {FC} from 'react';

import {Image} from '/react4xp/common/Image/Image';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';
import type {ImageData} from '/react4xp/common/types';

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
  quote?: string;
  qoute?: string; // Legacy field - kept for backwards compatibility
  description?: string;
}

export const Quote: FC<QuoteProps> = ({
  title = '',
  image,
  authors = [],
  quote = '',
  qoute = '', // Legacy support
  description = ''
}) => {
  // Use 'quote' if provided, otherwise fall back to legacy 'qoute'
  const quoteText = quote || qoute;

  return (
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
      {quoteText && (
        <SafeHtml html={quoteText} />
      )}
      {description && (
        <SafeHtml html={description} />
      )}
    </div>
  );
};
