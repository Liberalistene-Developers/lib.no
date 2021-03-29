import React, { useState } from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';

const Faq = ({ itemID, question, answer, expandable = false, expanded = true, Tag = 'h2' }) => {
  const id = slugify(question) ;
  const url = location.hash;
  const [checked, setChecked] = useState(url ===  `#${id}`);
  
  const link = (
    <a href={`#${id}`} onClick={() => setChecked(true)}>
      <i className="fas fa-link"></i>
    </a>
  );
  const headerItem = Tag === 'h2' ? (
    <h2>
      {link} {question}
    </h2>
  ) : (
    <h3>
      {link} {question}
    </h3>
  )

  return (
    <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question" id={id}>
      <input type="checkbox" id={ `checkbox-${itemID}` } checked={checked} />
      <label
        for={ `checkbox-${itemID}` }
        >
      <div
        itemProp="name"
        tabIndex={-1}
        role={'button'}
        >
          {headerItem}
          <div className="arrowPurple" />
      </div>
      </label>
      <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer" className="rich-text">
        <div itemProp="text" dangerouslySetInnerHTML={{ __html: answer }} />
      </div>
    </div>
  );
};

Faq.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
  expandable: PropTypes.bool,
  expanded: PropTypes.bool,
  Tag: PropTypes.string,
};

Faq.defaultProps = {
  question: '',
  answer: '',
  expandable: false,
  expanded: true,
  Tag: 'h2',
};

export default Faq;

export {
  Faq,
};
