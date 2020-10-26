import React from 'react';

export default ({
  title,
  imageUrl,
  authors,
  ingress,
  text,
  description,
  tags,
}) => (
  <div>
    <h1 title={title}>{title}</h1>
    { imageUrl && (
      <div>
        <img src={imageUrl} />
      </div>
    )}
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
    { ingress && (
      <div dangerouslySetInnerHTML={{ __html: ingress }} />
    )}
    { (text || description) && (
      <div dangerouslySetInnerHTML={{ __html: text || description }} />
    )}
  </div>
);
