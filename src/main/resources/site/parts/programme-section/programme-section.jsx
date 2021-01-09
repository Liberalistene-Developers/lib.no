import React from 'react';

import Part from '../programme-part/programme-part.jsx';

export default ({ title, description, parts = [], tags }) => (
  <div>
    <h2 title={description}>{title}</h2>
    { parts && parts.length > 0 ? (
      <div>
        { parts.map(({ key, ...props }) =>
          <Part key={ key } { ...props } />
        )}
      </div>
    ) : null }
  </div>
);
