import React from 'react';

export default ({
  className,
  image,
  imageClassName,
}) => {
  if (!image) {
    return null;
  }
  
  return (
    <div className={className}>
      <img src={image.url} alt={image.alternativeText} className={imageClassName} />
    </div>
  );
};