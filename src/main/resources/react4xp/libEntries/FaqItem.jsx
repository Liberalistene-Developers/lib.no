import React from 'react';
import PropTypes from 'prop-types';

import { Faq } from '../shared/Faq';

export const FaqItem = ({
  itemID,
  answer,
  question,
  expandable = false,
  expanded = true,
  anchorText,
}) => (
  <div className="page-content">
    <div className="faq-list">
      <Faq
        itemID={itemID}
        answer={answer}
        question={question}
        expandable={expandable}
        expanded={expanded}
        anchorText={anchorText}
        Tag="h1"
      />
    </div>
  </div>
);

export default (props) => <FaqItem {...props} />;