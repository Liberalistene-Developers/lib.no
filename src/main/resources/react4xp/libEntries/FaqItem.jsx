import React from 'react';
import PropTypes from 'prop-types';

import { Faq } from './Faq';

const FaqItem = ({
  answer,
  question,
  expandable = false,
  expanded = true,
}) => (
  <div className="faq-list">
    <Faq
      answer={answer}
      question={question}
      expandable={expandable}
      expanded={expanded}
      Tag="h1"
    />
  </div>
);

export default FaqItem;

export {
  FaqItem,
}