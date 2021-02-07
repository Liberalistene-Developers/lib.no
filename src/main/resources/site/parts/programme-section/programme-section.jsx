import React from 'react';
import PropTypes from 'prop-types';

import slugify from 'slugify';

import Part from '../programme-part/programme-part.jsx';

const ProgrammeSection = ({ anchor, title, description, parts = [], tags }) => (
  <div className="programme-section">
    <h2 title={title} id={anchor ? slugify(title) : undefined}>{title}</h2>
    { description && (
        <div className="programme-section-description" dangerouslySetInnerHTML={{ __html: description }} />
    )}
    { parts && parts.length > 0 ? (
      <div className="programme-sections-parts">
        { parts.map(({ key, ...props }) =>
          <Part key={ key } { ...props } parentTitle={title} anchor={anchor} />
        )}
      </div>
    ) : null }
  </div>
);

ProgrammeSection.propTypes = {
  /**
   * Add anchor to title.
   */
   anchor: PropTypes.bool,
   description: PropTypes.string,
   parts: PropTypes.array,
   title: PropTypes.string,
};

ProgrammeSection.defaultProps = {
  anchor: false,
  description: '',
  parts: [],
};

export default ProgrammeSection;

export {
  ProgrammeSection,
};