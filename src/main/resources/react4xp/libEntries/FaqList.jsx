import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Faq } from './Faq';

export const FaqList = ({ items = [], expandable = false, expanded = true }) => {
  return (
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
  );
};

export default FaqList;
