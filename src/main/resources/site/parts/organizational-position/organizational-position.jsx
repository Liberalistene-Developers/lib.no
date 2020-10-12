import React from 'react';

export default ({ title, description, shortDescription, tags }) => (
  <div>
    <h1 title={title}>{title}</h1>
    <div dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);
