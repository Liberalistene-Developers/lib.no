import React from 'react';

import Section from '../programme-section/programme-section.jsx';

export default ({ title, description, sections, tags }) => (
  <div>
    <h1 title={description}>{title}</h1>
    { sections && (
      <div>
        { sections.length && sections.map(({ key, ...props }) =>
          <Section key={ key } { ...props } />
        )}
      </div>
    )}
  </div>
);
