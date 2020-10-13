import React from 'react';

export default ({
  title,
  imageUrl,
  description,
  shortDescription,
  tags,
}) => (
  <div>
    <h1 title={title}>{title}</h1>
    { imageUrl && (
      <div>
        <img src={imageUrl} />
      </div>
    )}
    <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);
