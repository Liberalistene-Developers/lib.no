import * as React from 'react';

import {Faq} from '/react4xp/common/Faq/Faq';

interface FaqItemProps {
  itemID?: string;
  answer?: string;
  question?: string;
  expanded?: boolean;
  anchorText?: string;
}

export const FaqPart: React.FC<FaqItemProps> = ({
  itemID,
  answer,
  question,
  expanded = true,
  anchorText
}) => (
  <div className="page-content">
    <div className="faq-list">
      <Faq
        itemID={itemID}
        answer={answer}
        question={question}
        expanded={expanded}
        anchorText={anchorText}
        Tag={'h2' as 'h2' | 'h3'}
      />
    </div>
  </div>
);
