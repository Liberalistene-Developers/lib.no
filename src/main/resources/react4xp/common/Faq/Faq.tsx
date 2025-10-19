import {type FC, useState} from 'react';
import slugify from 'react-slugify';

import {SafeHtml} from '@common/SafeHtml/SafeHtml';
import {FAIcon} from '@common/FAIcon/FAIcon';

/**
 * Props for the Faq component.
 */
interface FaqProps {
  /** Unique identifier for the FAQ item */
  itemID?: string;
  /** The question text */
  question?: string;
  /** The answer content (HTML) */
  answer?: string;
  /** Whether the FAQ item should be expanded by default */
  expanded?: boolean;
  /** HTML heading tag to use for the question ('h2' or 'h3') */
  Tag?: 'h2' | 'h3';
  /** Accessible text for the anchor link */
  anchorText?: string;
}

/**
 * FAQ component for displaying expandable question and answer pairs.
 *
 * Renders an interactive FAQ item with:
 * - Expandable/collapsible answer section
 * - Deep-linkable anchor for direct navigation
 * - Schema.org markup for rich search results
 * - Auto-expansion when accessed via URL hash
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * <Faq
 *   itemID="1"
 *   question="What is liberalism?"
 *   answer="<p>Liberalism is a political philosophy...</p>"
 *   expanded={false}
 *   Tag="h2"
 *   anchorText="Link to this question"
 * />
 * ```
 *
 * @remarks
 * - The question is slugified to create a URL-safe anchor ID
 * - If the URL hash matches the FAQ ID, the item auto-expands
 * - Uses Schema.org Question/Answer markup for SEO
 * - The expand/collapse is controlled via CSS and a hidden checkbox
 * - Answer has a max-height animation when expanding
 */
export const Faq: FC<FaqProps> = ({
  itemID,
  question = '',
  answer = '',
  expanded = true,
  Tag = 'h2',
  anchorText
}) => {
  const id = slugify(question);
  const url = (typeof window !== 'undefined' && window.location && window.location.hash) || '';
  const [checked, setChecked] = useState(url === `#${id}` || expanded);

  const link = (
    <a href={`#${id}`} title={anchorText} onClick={() => setChecked(true)}>
      <FAIcon iconType="faLink" />
    </a>
  );

  const headerItem = Tag === 'h2'
    ? (
      <h2>
        {link} {question}
      </h2>
    )
    : (
      <h3>
        {link} {question}
      </h3>
    );

  return (
    <div
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      id={id}
      className="bg-menu-bg border border-[rgba(74,16,74,0.1)] rounded-[3px] shadow-[0px_2px_10px_rgba(74,16,74,0.14)] overflow-hidden [&>input[type=checkbox]:checked~div[itemprop=acceptedAnswer]]:max-h-[500px] [&>input[type=checkbox]:checked~div[itemprop=acceptedAnswer]]:transition-[max-height] [&>input[type=checkbox]:checked~div[itemprop=acceptedAnswer]]:duration-[0.25s] [&>input[type=checkbox]:checked~div[itemprop=acceptedAnswer]]:ease-in"
    >
      <input type="checkbox" id={`checkbox-${itemID}`} defaultChecked={checked} className="hidden" />
      <label htmlFor={`checkbox-${itemID}`}>
        <div
          itemProp="name"
          tabIndex={-1}
          role={'button'}
          className="min-h-[50px] rounded-t-[3px] bg-header-100 px-[15px] flex flex-row justify-between items-center [&>h2]:flex [&>h2]:flex-row [&>h2]:items-center [&>h2]:font-medium [&>h2]:text-[17px] [&>h2]:leading-5 [&>h2]:my-0 [&>h2]:mr-[5px] [&>h2]:gap-x-[15px] [&>h2]:py-[10px] [&>h2]:text-primary-100 [&>h3]:flex [&>h3]:flex-row [&>h3]:items-center [&>h3]:font-medium [&>h3]:text-[17px] [&>h3]:leading-5 [&>h3]:my-0 [&>h3]:mr-[5px] [&>h3]:gap-x-[15px] [&>h3]:py-[10px] [&>h3]:text-primary-100"
        >
          {headerItem}
          <div className="arrow-purple w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[22px] border-b-primary-700 rounded-[5px]" />
        </div>
      </label>
      <div
        itemScope
        itemProp="acceptedAnswer"
        itemType="https://schema.org/Answer"
        className="rich-text rounded-b-[3px] max-h-0 transition-[max-height] duration-[0.25s] ease-in-out [&>div]:p-[15px]"
      >
        <SafeHtml html={answer} as="div" />
      </div>
    </div>
  );
};
