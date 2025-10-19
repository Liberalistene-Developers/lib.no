import {type FC} from 'react';

import {Faq} from '@common/Faq/Faq';

interface FaqListItem {
  itemID?: string;
  answer?: string;
  question?: string;
  url?: string;
}

interface FaqListProps {
  items?: FaqListItem[];
  expanded?: boolean;
  anchorText?: string;
}

/**
 * FaqList component renders a collection of frequently asked questions (FAQs).
 *
 * Displays a vertical list of expandable/collapsible FAQ items with questions and answers.
 * Each FAQ can be individually expanded or all can start in an expanded/collapsed state.
 * Questions are rendered as H3 headings for proper document structure.
 *
 * @example
 * ```tsx
 * <FaqList
 *   expanded={true}
 *   anchorText="Read answer"
 *   items={[
 *     {
 *       itemID: "faq-1",
 *       question: "What is Liberalistene?",
 *       answer: "<p>Liberalistene is a Norwegian political party...</p>"
 *     },
 *     {
 *       itemID: "faq-2",
 *       question: "How can I join?",
 *       answer: "<p>You can join by visiting our membership page...</p>"
 *     }
 *   ]}
 * />
 * ```
 */
export const FaqList: FC<FaqListProps> = ({
  items = [],
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
            expanded={expanded}
            anchorText={anchorText}
            Tag="h3"
          />
        ))}
      </div>
    </div>
  );
};
