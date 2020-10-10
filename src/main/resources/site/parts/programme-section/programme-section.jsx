import React from 'react';

import Part from '../programme-part/programme-part.jsx';

export default ({ title, description, parts }) => (
  <div>
    <h2 title={description}>{title}</h2>
    { parts && (
      <div>
        { parts.length && parts.map(({ key, ...props }) =>
          <Part key={ key } { ...props } />
        )}
      </div>
    )}
  </div>
);
