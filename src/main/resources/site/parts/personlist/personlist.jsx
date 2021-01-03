import React from 'react';

import PersonListItem from '../personlistitem/personlistitem.jsx';
import PersonGridItem from '../persongriditem/persongriditem.jsx';

export default ({
  description,
  displaytype,
  fields,
  imageUrl,
  shortDescription,
  persons,
  tags,
  title,
}) => {
  const Item = displaytype === 'list' ? PersonListItem : PersonGridItem;
  
  return (
    <div className="person-list-holder">
      { title && (
        <h1 title={title}>{title}</h1>
      )}    
      { imageUrl && (
        <div>
          <img src={imageUrl} />
        </div>
      )}    
      <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
      <div dangerouslySetInnerHTML={{ __html: description }} />
      { persons.length > 0 && (
        <div className={`person-list ${displaytype}`}>
          { persons.map((person) => (
            <Item
              key={person.personID}
              person={person}
              fields={fields}
            />
          ))}
        </div>
      )}
    </div>  
  );
};