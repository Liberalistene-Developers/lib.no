import React from 'react';

import Image from '../image/image.jsx';

export default ({
  imageSize,
  imageType,
  item: {
    image,
    name,
    shortDescription,
    url,
  } = {},
  fields,
}) => (
  <div className="list-item">
    
    <Image image={image} className={imageSize} imageClassName={imageType} />
    
    { name && (
      <div className="list-item-info">
        <div>
          <a href={url} title={name}>{name}</a>
        </div>
        { shortDescription && (
          <div>
            {shortDescription}
          </div>           
        )}
      </div>  
    )}
  </div>
);