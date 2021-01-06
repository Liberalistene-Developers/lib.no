import React from 'react';

import Image from '../image/image.jsx';

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
    <h1 title={title}>{title}</h1>
    
    <Image image={image} />

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
    <div dangerouslySetInnerHTML={{ __html: ingress }} />
    <div dangerouslySetInnerHTML={{ __html: text || description }} />
  </div>
);
