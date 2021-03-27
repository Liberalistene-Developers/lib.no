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
  readMore,
}) => (
  <div className="grid-item">

     <Image image={image} className={imageSize} imageClassName={imageType} title={name} url={url} />

     { name && (
       <div className="grid-item-info">
         <div className="grid-item-title">
           <a href={url} title={name}>{name}</a>
         </div>
         { shortDescription && (
           <div className="grid-item-description">
             <div className="rich-text as-span" dangerouslySetInnerHTML={{ __html: shortDescription }} />
             { readMore && (
               <a href={url} title={name} className="read-more">{readMore}</a>
             )}
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