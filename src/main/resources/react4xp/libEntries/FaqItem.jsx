import React from 'react';
import PropTypes from 'prop-types';

import { Faq } from '../shared/Faq';

const FaqItem = ({
  answer,
  question,
  expandable = false,
  expanded = true,
}) => (
  <div className="page-content">
    <div className="faq-list">
      <Faq
        answer={answer}
        question={question}
        expandable={expandable}
        expanded={expanded}
        Tag="h1"
      />
    </div>
  </div>
);

export default FaqItem;

export {
  FaqItem,
}