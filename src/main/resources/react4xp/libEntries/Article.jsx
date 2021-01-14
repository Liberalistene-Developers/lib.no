import React from 'react';

import { ImageBlock } from './ImageBlock';

export default ({
  title,
  image,
  authors,
  ingress,
  text,
  description,
  tags,
}) => (
  <div>
    <ImageBlock title={title} image={image} ingress={ingress} />
    { authors && authors.length > 0 && (
      <ul>
        { authors.map(({ authorID, person, personUrl, image }) => (
          <li key={authorID}>
            <div>
              <a href={personUrl}>
                { image && (
                  <img src={image} />
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
    { text && (
      <div dangerouslySetInnerHTML={{ __html: text }} />
    )}
  </div>
);
