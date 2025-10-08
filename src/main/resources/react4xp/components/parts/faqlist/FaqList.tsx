import * as React from 'react';

import {Faq} from '../../common/Faq';

interface FaqListItem {
  itemID?: string;
  answer?: string;
  question?: string;
  url?: string;
}

interface FaqListProps {
  items?: FaqListItem[];
  expandable?: boolean;
  expanded?: boolean;
  anchorText?: string;
}

export const FaqList: React.FC<FaqListProps> = ({
  items = [],
  expandable = false,
  expanded = true,
  anchorText
}) => {
  return (
    <div className="page-content">
      <div className="flex flex-col gap-y-5 w-full max-w-[600px]">
        {items && items.map(({itemID, answer, question}) => (
          <Faq
            key={itemID}
            itemID={itemID}
            answer={answer}
            question={question}
            expandable={expandable}
            expanded={expanded}
            anchorText={anchorText}
            Tag="h3"
          />
        ))}
      </div>
    </div>
  );
};
