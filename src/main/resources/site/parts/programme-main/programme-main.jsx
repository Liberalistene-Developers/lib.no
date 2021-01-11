import React from 'react';
import PropTypes from 'prop-types';

import slugify from 'slugify';

import Section from '../programme-section/programme-section.jsx';

const ProgrammeMain = ({ title, description, sections, tags }) => (
  <div>
    <h1 title={description||title} id={slugify(title)}>{title}</h1>
    { sections && sections.length > 0 ? (
      <div>
        { sections.map(({ key, ...props }) =>
          <Section key={ key } { ...props } anchor={true}/>
        )}
      </div>
    ) : null
    }
  </div>
);

ProgrammeMain.propTypes = {
  description: PropTypes.string,
  sections: PropTypes.array,
  title: PropTypes.string,
};

ProgrammeMain.defaultProps = {
  description: '',
  sections: [],
  title: '',
};

export default ProgrammeMain;

export {
  ProgrammeMain,
};