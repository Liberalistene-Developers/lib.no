import {type FC} from 'react';
import slugify from 'react-slugify';

const createLink = (title: string): string => `#${slugify(title)}`.trim();

interface ContentLinkProps {
  title?: string;
  parentTitle?: string;
}

const ContentLink: FC<ContentLinkProps> = ({ title = '', parentTitle = '' }) => (
  <a href={createLink(`${parentTitle} ${title}`)} title={title}>{title}</a>
);

interface PartItem {
  key?: string;
  type?: string;
  title?: string;
}

interface SectionProps {
  title?: string;
  parentTitle?: string;
  parts?: PartItem[];
}

const Section: FC<SectionProps> = ({
  title = '',
  parentTitle = '',
  parts = []
}) => {
  const displayParts = parts.filter(({ type }) => type === 'lib.no:programme-part');

  return (
    <li className="content-section">
      <ContentLink title={title} parentTitle={parentTitle} />
      {displayParts && displayParts.length > 0
        ? (
          <ul className="content-section-parts list-circle pl-6 mt-2">
            {displayParts.map(({ key, title: partTitle }, index) => {
              const displayTitle = partTitle && partTitle.trim() !== ''
                ? partTitle
                : `${title} #${index + 1}`;

              return (
                <li key={key} className="content-section-part">
                  <ContentLink title={displayTitle} parentTitle={title} />
                </li>
              );
            })}
          </ul>
        )
        : null}
    </li>
  );
};

interface SectionItem extends SectionProps {
  key?: string;
}

interface TableOfContentProps {
  sections?: SectionItem[];
  title?: string;
}

/**
 * TableOfContent component generates a hierarchical table of contents with anchor links.
 *
 * Creates a navigable table of contents from a structured list of sections and their parts.
 * Each section and part generates an anchor link using slugified titles. The component
 * automatically filters to show only programme parts (type: 'lib.no:programme-part').
 *
 * Used primarily for programme pages and long-form documents to provide quick navigation.
 *
 * @example
 * ```tsx
 * <TableOfContent
 *   title="Our Programme 2025"
 *   sections={[
 *     {
 *       key: "section-1",
 *       title: "Economy",
 *       parts: [
 *         { key: "part-1", type: "lib.no:programme-part", title: "Tax Policy" },
 *         { key: "part-2", type: "lib.no:programme-part", title: "Budget Reform" }
 *       ]
 *     },
 *     {
 *       key: "section-2",
 *       title: "Healthcare",
 *       parts: [
 *         { key: "part-3", type: "lib.no:programme-part", title: "Patient Rights" }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - Anchor links are generated using slugified section and part titles
 * - Only parts with type 'lib.no:programme-part' are displayed
 * - Nested parts use parent section title in their anchor links
 */
export const TableOfContent: FC<TableOfContentProps> = ({
  title = '',
  sections = []
}) => (
  <ul className="table-of-content list-disc pl-6">
    {sections && sections.map(({ key, ...props }) =>
      <Section key={key} {...props} parentTitle={title} />
    )}
  </ul>
);
