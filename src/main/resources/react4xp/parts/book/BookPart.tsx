import * as React from 'react';
import type {ComponentProps} from '@enonic/react-components';

import {Image, type ImageData} from '/react4xp/common/Image/Image';

interface Author {
  authorID?: string;
  person?: string;
  personUrl?: string;
  image?: string;
}

interface BookData {
  title?: string;
  image?: ImageData;
  authors?: Author[];
  ingress?: string;
  text?: string;
  description?: string;
  tags?: string[];
}

export const BookPart = ({data}: ComponentProps) => {
  const {
    title = '',
    image,
    authors = [],
    ingress = '',
    text = '',
    description = ''
  } = data as BookData;

  return (
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

      {ingress && <div dangerouslySetInnerHTML={{__html: ingress}} />}
      {(text || description) && <div dangerouslySetInnerHTML={{__html: text || description}} />}
    </div>
  );
};
