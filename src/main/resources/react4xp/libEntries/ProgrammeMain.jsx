import React from 'react';
import PropTypes from 'prop-types';

import slugify from 'slugify';

import { ProgrammeSection } from './ProgrammeSection';

export const ProgrammeMain = ({ title, description, sections, tags }) => (
  <div className="page-content">
    <div className="programme-main">
      <div className="programme-main-title">
        <h1 title={description||title} id={slugify(title)}>{title}</h1>
      </div>
      
      { sections && sections.length > 0 ? (
        <div className="programme-main-sections">
          { sections.map(({ key, ...props }) =>
            <ProgrammeSection key={ key } { ...props } parentTitle={title} anchor={true}/>
          )}
        </div>
      ) : null
      }
    </div>
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

export default (props) => <ProgrammeMain { ...props } />;
