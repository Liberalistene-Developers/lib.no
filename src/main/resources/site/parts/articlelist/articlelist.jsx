import React from 'react';

import Image from '../image/image.jsx';

import ListItem from '../listitem/listitem.jsx';
import GridItem from '../griditem/griditem.jsx';

export default ({
  description,
  displaytype,
  fields,
  image,
  shortDescription,
  items,
  tags,
  title,
}) => {
  const Item = displaytype === 'list' ? ListItem : GridItem;
  
  return (
    <div className="article-list-holder">
      { title && (
        <h2 title={title}>{title}</h2>
      )} 
      
      <Image image={image} />
      
      { shortDescription && (
        <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      )}
      
      { description && (
        <div dangerouslySetInnerHTML={{ __html: description }} />
      )}
      
      { items && items.length > 0 && (
        <div className={`article-list ${displaytype}`}>
          { items.map((item) => (
            <Item
              key={item.itemID}
              item={item}
              fields={fields}
            />
          ))}
        </div>
      )}
    </div>  
  );
};