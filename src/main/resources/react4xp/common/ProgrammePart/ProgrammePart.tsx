import {type FC} from 'react';
import slugify from 'react-slugify';

import {Conclusions, type ConclusionItem} from '/react4xp/common/Conclusions/Conclusions';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the internal Title component.
 */
interface TitleProps {
  /** Whether to render with an anchor ID (true = h3, false = h2 or h1) */
  anchor?: boolean | string;
  /** The title text */
  title?: string;
  /** Parent title for generating composite anchor IDs */
  parentTitle?: string;
}

/**
 * Internal Title component that renders appropriate heading level based on context.
 *
 * Heading hierarchy:
 * - h3: When anchor is true (sub-part within a section)
 * - h2: When parentTitle exists but anchor is false (section title)
 * - h1: When neither anchor nor parentTitle (standalone title)
 */
const Title: FC<TitleProps> = ({anchor, title, parentTitle}) => {
  const id = parentTitle && slugify(`${parentTitle} ${title}`.trim());

  if (anchor) {
    return (
      <h3 id={id}>{title}</h3>
    );
  }

  if (parentTitle) {
    return (
      <h2 id={id}>{title}</h2>
    );
  }

  return (
    <h1>{title}</h1>
  );
};

/**
 * Props for the ProgrammePart component.
 */
export interface ProgrammePartProps {
  /** Whether to render title with anchor ID for deep linking */
  anchor?: boolean;
  /** Title of this programme part */
  title?: string;
  /** Detailed description of the policy (HTML) */
  description?: string;
  /** Title for the conclusions section */
  conclusionTitle?: string;
  /** List of conclusion items */
  conclusions?: ConclusionItem[];
  /** Parent section title for generating composite anchor IDs */
  parentTitle?: string;
}

/**
 * ProgrammePart component for displaying an individual policy section within a programme.
 *
 * Renders a single policy part with:
 * - Hierarchical heading (h1, h2, or h3) based on context
 * - Optional anchor ID for deep linking
 * - HTML description of the policy
 * - Optional list of conclusions/key points
 *
 * @example
 * ```tsx
 * <ProgrammePart
 *   title="Tax Reform"
 *   description="<p>We propose simplifying the tax code...</p>"
 *   conclusionTitle="Key Points"
 *   conclusions={[
 *     {key: '1', conclusion: 'Reduce income tax by 5%'},
 *     {key: '2', conclusion: 'Simplify tax brackets'}
 *   ]}
 *   parentTitle="Economic Policy"
 *   anchor={true}
 * />
 * ```
 *
 * @remarks
 * - When anchor is true, renders h3 with ID for deep linking
 * - The anchor ID is created by slugifying `parentTitle + title`
 * - Wraps content in page-content div only when no title is provided
 */
export const ProgrammePart: FC<ProgrammePartProps> = ({
  anchor = false,
  title = '',
  description = '',
  conclusionTitle,
  conclusions = [],
  parentTitle = ''
}) => {
  return (
    <div className={title ? '' : 'page-content'}>
      <div className="mt-10">
        <div>
          <Title anchor={anchor} parentTitle={parentTitle} title={title} />
        </div>

        {description && (
          <SafeHtml html={description} className="mt-5" />
        )}

        {conclusions && conclusions.length > 0 && (
          <Conclusions title={conclusionTitle} items={conclusions} />
        )}
      </div>
    </div>
  );
};
