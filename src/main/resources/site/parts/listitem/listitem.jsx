import React from 'react';

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
    { image && (
      <div className={imageSize}>
        <img src={image} className={imageType} />
      </div>
    )}
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