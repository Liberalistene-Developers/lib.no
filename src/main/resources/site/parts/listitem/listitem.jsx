import React from 'react';

export default ({
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
      <div>
        <img src={image} />
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