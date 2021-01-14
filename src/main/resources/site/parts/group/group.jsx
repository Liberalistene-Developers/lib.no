import React from 'react';

import Image from '../../../react4xp/shared/Image.jsx';

export default ({
  title,
  image,
  shortDescription,
  description,
  board,
  tags,
}) => (
  <div>
    <h1 title={title}>{title}</h1>

    <Image image={image} />

    { shortDescription && (
      <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    )}

    { description && (
      <div dangerouslySetInnerHTML={{ __html: description }} />
    )}

    { board && board.length > 0 ? (
        <ul>
          { board.map(({ role, person, personUrl, image }) => (
            <li>
              <a href={personUrl}>
                { image && (
                  <img src={image} />
                )}
                <span>
                  {role}
                </span>
                <span>
                  {person}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )
      : null
    }

  </div>
);
