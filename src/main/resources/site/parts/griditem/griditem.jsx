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
  <div className="grid-item">
     { image && (
       <div>
         <img src={image} />
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