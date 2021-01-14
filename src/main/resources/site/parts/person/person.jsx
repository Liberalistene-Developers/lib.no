import React from 'react';

import Image from '../../../react4xp/shared/Image.jsx';

export default ({
  title,
  image,
  description,
  shortDescription,
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
  </div>
);
