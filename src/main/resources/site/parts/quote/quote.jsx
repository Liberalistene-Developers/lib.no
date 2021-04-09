import React from 'react';

import Image from '../../../react4xp/shared/Image.jsx';

export const Quote = ({
  title,
  image,
  authors,
  quote,
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
    { quote && (
      <div dangerouslySetInnerHTML={{ __html: quote }} />
    )}
    { description && (
      <div dangerouslySetInnerHTML={{ __html: quote || description }} />
    )}
  </div>
);

export default (props) => <Quote {...props} />;