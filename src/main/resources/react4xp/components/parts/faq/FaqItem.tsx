import * as React from 'react';

import {Faq} from '../../shared/Faq';

interface FaqItemProps {
  itemID?: string;
  answer?: string;
  question?: string;
  expandable?: boolean;
  expanded?: boolean;
  anchorText?: string;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  itemID,
  answer,
  question,
  expandable = false,
  expanded = true,
  anchorText
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
        Tag={'h2' as 'h2' | 'h3'}
      />
    </div>
  </div>
);
