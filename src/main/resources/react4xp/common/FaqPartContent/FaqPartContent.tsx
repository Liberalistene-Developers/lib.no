import {type FC} from 'react';

import {Faq} from '@common/Faq/Faq';

/**
 * Props for the FaqPartContent component.
 */
interface FaqItemProps {
  /** Unique identifier for the FAQ item */
  itemID?: string;
  /** The answer content (HTML) */
  answer?: string;
  /** The question text */
  question?: string;
  /** Whether the FAQ item should be expanded by default */
  expanded?: boolean;
  /** Accessible text for the anchor link */
  anchorText?: string;
}

/**
 * FaqPartContent component - wrapper for rendering a single FAQ item within a page.
 *
 * This is a simple wrapper component that renders an Faq component within the standard
 * page content layout. It's designed to be used as a Part component in the Enonic XP
 * content structure.
 *
 * @example
 * ```tsx
 * <FaqPartContent
 *   itemID="1"
 *   question="How do I join the party?"
 *   answer="<p>Visit our membership page...</p>"
 *   expanded={true}
 *   anchorText="Link to this FAQ"
 * />
 * ```
 *
 * @remarks
 * - Always uses 'h2' heading tag for the question
 * - Wraps the FAQ in page-content and faq-list containers for consistent styling
 * - Expanded defaults to true for single FAQ displays
 */
export const FaqPartContent: FC<FaqItemProps> = ({
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
