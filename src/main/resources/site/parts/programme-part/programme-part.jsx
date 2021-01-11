import React from 'react';
import PropTypes from 'prop-types';

import slugify from 'slugify';

const ProgrammePart = ({ anchor, title, description, conclusionTitle, conclusions, parentTitle, tags }) => (
  <div>
    <h3 id={anchor ? slugify(`${parentTitle} ${title}`.trim()) : undefined }>{title}</h3>
    <div dangerouslySetInnerHTML={{ __html: description }} />
    { conclusions && conclusions.length > 0 ? (
      <div>
        <div className="conclusions">
          <div className="title">{ conclusionTitle }</div>
          <ul>
            { conclusions.map(({ key, conclusion }) => (
              <li key={key}>
                { conclusion }
              </li>
            ))}
          </ul>
        </div>
      </div>
    ) : null }
  </div>
);

ProgrammePart.propTypes = {
  /**
   * Add anchor to title.
   */
   anchor: PropTypes.bool,
   description: PropTypes.string,
   conclusions: PropTypes.array,
   parentTitle: PropTypes.string,
   title: PropTypes.string,
};

ProgrammePart.defaultProps = {
  anchor: false,
  description: '',
  conclusions: [],
  parentTitle: '',
  title: '',  
};

export default ProgrammePart;

export {
  ProgrammePart,
};