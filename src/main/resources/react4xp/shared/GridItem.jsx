import React from 'react';

import Image from './Image';

const GridItem = ({
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
  <div className="grid-item">

     <Image image={image} className={imageSize} imageClassName={imageType} />

     { name && (
       <div className="grid-item-info">
         <div className="grid-item-title">
           <a href={url} title={name}>{name}</a>
         </div>
         { shortDescription && (
           <div className="grid-item-description">
             <div className="rich-text" dangerouslySetInnerHTML={{ __html: shortDescription }} />
           </div>
         )}
       </div>
     )}
  </div>
);

export default GridItem;

export {
  GridItem,
};