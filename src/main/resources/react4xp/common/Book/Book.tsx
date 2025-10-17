import * as React from 'react';

import {Image, type ImageData} from '/react4xp/common/Image/Image';
import {SafeHtml} from '/react4xp/common/SafeHtml/SafeHtml';

interface Author {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: string;
}

interface BookProps {
  title?: string;
  image?: ImageData;
  authors?: Author[];
  ingress?: string;
  text?: string;
  description?: string;
  tags?: string[];
}

export const Book: React.FC<BookProps> = ({
  title = '',
  image,
  authors = [],
  ingress = '',
  text = '',
  description = ''
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    {image && <Image image={image} />}

    {authors && authors.length > 0 && (
      <ul>
        {authors.map(({authorID, person, personUrl, image: authorImage}) => (
          <li key={authorID}>
            <div>
              <a href={personUrl}>
                {authorImage && (
                  <img src={authorImage} alt={person} />
                )}
                <span>{person}</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    )}

    {ingress && <SafeHtml html={ingress} />}
    {(text || description) && <SafeHtml html={text || description} />}
  </div>
);
