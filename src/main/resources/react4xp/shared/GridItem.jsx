import React from 'react';

import Image from './Image';

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
  <div className="grid-item">

     <Image image={image} className={imageSize} imageClassName={imageType} />

     { name && (
       <div className="grid-item-info">
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
