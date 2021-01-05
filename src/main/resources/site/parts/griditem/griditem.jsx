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
  <div className="grid-item">
     { image && (
       <div className={imageSize}>
         <img src={image} className={imageType} />
       </div>
     )}
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