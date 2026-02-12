import {Fragment, type FC} from 'react';
import slugify from 'react-slugify';

import {Conclusions} from '/react4xp/common/Conclusions/Conclusions';
import {ProgrammePart, type ProgrammePartProps} from '/react4xp/common/ProgrammePart/ProgrammePart';
import {SafeHtml} from '@common/SafeHtml/SafeHtml';

/**
 * Props for the internal Title component.
 */
interface TitleProps {
  /** The title text */
  title?: string;
  /** Parent programme title for generating composite anchor IDs */
  parentTitle?: string;
}

/**
 * Internal Title component that renders h2 or h1 based on context.
 *
 * - h2 with anchor ID: When parentTitle exists (section within main programme)
 * - h1: When no parentTitle (standalone section)
 */
const Title: FC<TitleProps> = ({title, parentTitle}) => {
  const id = parentTitle && slugify(`${parentTitle} ${title}`.trim());

  if (id) {
    return (
      <h2 id={id} title={title}>{title}</h2>
    );
  }

  return (
    <h1 title={title}>{title}</h1>
  );
};

/**
 * Part item within a programme section, can be either a ProgrammePart or a conclusion.
 */
interface PartItem extends ProgrammePartProps {
  /** Unique key for React rendering */
  key?: string;
  /** Content type identifier (e.g., 'lib.no:programme-part') */
  type?: string;
}

/**
 * Props for the ProgrammeSection component.
 */
export interface ProgrammeSectionProps {
  /** Whether to enable anchor IDs for deep linking on child parts */
  anchor?: boolean;
  /** Title of this programme section */
  title?: string;
  /** Title to display above conclusions section */
  conclusionTitle?: string;
  /** Parent programme title for generating composite anchor IDs */
  parentTitle?: string;
  /** Section description (HTML) */
  description?: string;
  /** Array of parts (ProgrammePart) and conclusions */
  parts?: PartItem[];
}

/**
 * ProgrammeSection component for displaying a major section of a political programme.
 *
 * Renders a programme section with:
 * - Section title (h1 or h2 with anchor)
 * - Optional HTML description
 * - Mixed list of programme parts and conclusions
 * - Smart rendering of conclusion headers
 *
 * The component intelligently handles the display of conclusions:
 * - Groups conclusions together
 * - Displays conclusion title only once when switching from parts to conclusions
 * - Supports interspersed parts and conclusions
 *
 * @example
 * ```tsx
 * <ProgrammeSection
 *   title="Economic Policy"
 *   description="<p>Our vision for the economy</p>"
 *   conclusionTitle="Summary"
 *   parentTitle="Liberal Programme 2025"
 *   anchor={true}
 *   parts={[
 *     {key: '1', type: 'lib.no:programme-part', title: 'Tax Reform', description: '...'},
 *     {key: '2', type: 'conclusion', title: 'Reduce government spending'},
 *     {key: '3', type: 'conclusion', title: 'Simplify regulations'}
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - Parts with type 'lib.no:programme-part' render as ProgrammePart components
 * - Other types render as Conclusion components
 * - The conclusionTitle header appears only on the first conclusion after programme parts
 * - Wraps in page-content div only when no parentTitle (standalone usage)
 */
export const ProgrammeSection: FC<ProgrammeSectionProps> = ({
  anchor = false,
  title = '',
  conclusionTitle = '',
  parentTitle = '',
  description,
  parts = []
}) => {
  // Group consecutive conclusions together
  const groupedContent: Array<{
    type: 'part' | 'conclusions';
    key: string;
    data: PartItem | Array<{key?: string; title?: string}>;
  }> = [];

  let currentConclusionGroup: Array<{key?: string; title?: string}> = [];

  parts.forEach((item, index) => {
    if (item.type === 'lib.no:programme-part') {
      // If we have accumulated conclusions, add them as a group
      if (currentConclusionGroup.length > 0) {
        groupedContent.push({
          type: 'conclusions',
          key: `conclusions-${index}`,
          data: currentConclusionGroup
        });
        currentConclusionGroup = [];
      }

      // Add the programme part
      groupedContent.push({
        type: 'part',
        key: item.key || `part-${index}`,
        data: item
      });
    } else {
      // Accumulate conclusion
      currentConclusionGroup.push({
        key: item.key || `conclusion-${index}`,
        title: item.title
      });
    }
  });

  // Add any remaining conclusions
  if (currentConclusionGroup.length > 0) {
    groupedContent.push({
      type: 'conclusions',
      key: `conclusions-final`,
      data: currentConclusionGroup
    });
  }

  return (
    <div className={parentTitle ? '' : 'page-content'}>
    <div className="mt-10">
      <div>
        <Title title={title} parentTitle={parentTitle} />
      </div>

      {description && (
        <SafeHtml html={description} className="mt-5 mobile:[&_.standard]:w-[calc(100%-2em)] mobile:[&>ul]:w-[calc(100%-80px)]" />
      )}

      {groupedContent.length > 0 && (
        <>
          {groupedContent.map((group) => {
            if (group.type === 'part') {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const {key, type, ...props} = group.data as PartItem;
              return (
                <ProgrammePart key={key} {...props} parentTitle={title} anchor={anchor} />
              );
            }

            return (
              <Conclusions
                key={group.key}
                title={conclusionTitle}
                items={group.data as Array<{key?: string; title?: string}>}
              />
            );
          })}
        </>
      )}
    </div>
  </div>
  );
};
