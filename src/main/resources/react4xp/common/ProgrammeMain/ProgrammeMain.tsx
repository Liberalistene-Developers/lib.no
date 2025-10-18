import {type FC} from 'react';
import slugify from 'react-slugify';

import {ProgrammeSection} from '/react4xp/common/ProgrammeSection/ProgrammeSection';
import {TableOfContent} from '/react4xp/common/TableOfContent/TableOfContent';

/**
 * Programme section data with dynamic properties.
 */
interface SectionType {
  /** Unique key for React rendering */
  key?: string;
  /** Additional dynamic properties passed to ProgrammeSection */
  [key: string]: unknown;
}

/**
 * Props for the ProgrammeMain component.
 */
export interface ProgrammeMainProps {
  /** Main title of the programme */
  title?: string;
  /** Array of programme sections to render */
  sections?: SectionType[];
  /** Whether to display a table of contents */
  tableOfContent?: boolean;
}

/**
 * ProgrammeMain component for displaying a complete political programme.
 *
 * Renders a structured political programme page with:
 * - A main title with anchor link
 * - Optional table of contents for easy navigation
 * - Multiple sections with nested parts
 *
 * This is the top-level component for displaying the party's political programme,
 * organized hierarchically with sections and parts.
 *
 * @example
 * ```tsx
 * <ProgrammeMain
 *   title="Liberal Programme 2025"
 *   tableOfContent={true}
 *   sections={[
 *     {key: '1', title: 'Economy', description: '<p>Our economic policy...</p>', parts: [...]},
 *     {key: '2', title: 'Education', description: '<p>Our education policy...</p>', parts: [...]}
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - The title is slugified to create a URL-safe anchor ID
 * - Each section receives the parent title for proper anchor generation
 * - Sections are rendered with the `anchor` prop set to true for deep linking
 */
export const ProgrammeMain: FC<ProgrammeMainProps> = ({
  title = '',
  sections,
  tableOfContent = false
}) => {
  return (
    <div className="page-content">
      <div className="mt-10">
        <div>
          <h1 title={title} id={slugify(title)}>{title}</h1>
        </div>

        {tableOfContent
          ? (
            <div>
              <TableOfContent title={title} sections={sections} />
            </div>
          )
          : null}

        {sections && sections.length > 0
          ? (
            <div>
              {sections.map(({key, ...props}) =>
                <ProgrammeSection key={key} {...props} parentTitle={title} anchor={true} />
              )}
            </div>
          )
          : null
        }
      </div>
    </div>
  );
};
