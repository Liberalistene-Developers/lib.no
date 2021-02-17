import React from 'react';
import PropTypes from 'prop-types';

import { Faq } from '../shared/Faq';

const FaqList = ({
  items = [],
  expandable = false,
  expanded = true,
}) => {
  return (
    <div className="page-content">
      <div className="faq-list">
        { items && items.map(({ itemID, answer, question, url }) => (
          <Faq
            key={itemID}
            answer={answer}
            question={question}
            expandable={expandable}
            expanded={expanded}
            url={url}
            Tag="h3"
          />
        ))}
      </div>
    </div>
  );
};

export default FaqList;

export {
  FaqList,
};