import React from 'react';

export default ({
  title,
  imageUrl,
  shortDescription,
  description,
  board,
  tags,
}) => (
  <div>
    <h1 title={title}>{title}</h1>
    <div>
      { imageUrl && (
        <img src={imageUrl} />
      )}
    </div>
    <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div dangerouslySetInnerHTML={{ __html: description }} />
    { board && board.length && (
      <ul>
        { board.map(({ role, person, image }) => (
          <li>
            <div>
            { image && (
              <img src={image} />
            )}
            </div>
            <div>
              <span>
              {role}
              </span>
              <span>
              {person}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )}

  </div>
);
