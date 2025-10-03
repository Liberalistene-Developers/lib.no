import * as React from 'react';
import {Image} from '../../shared/Image';

interface QuoteImage {
  url: string;
}

interface QuoteAuthor {
  authorID: string;
  person?: string;
  personUrl?: string;
  image?: string;
}

interface QuoteProps {
  title?: string;
  image?: QuoteImage;
  authors?: QuoteAuthor[];
  qoute?: string; // Note: misspelled in original code
  description?: string;
  tags?: string[];
}

export const Quote: React.FC<QuoteProps> = ({
  title = '',
  image,
  authors = [],
  qoute = '',
  description = '',
  tags = []
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
