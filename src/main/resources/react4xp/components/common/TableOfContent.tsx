import * as React from 'react';
import slugify from 'react-slugify';

const createLink = (title: string): string => `#${slugify(title)}`.trim();

interface ContentLinkProps {
  title?: string;
  parentTitle?: string;
}

const ContentLink: React.FC<ContentLinkProps> = ({ title = '', parentTitle = '' }) => (
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

const Section: React.FC<SectionProps> = ({
  title = '',
  parentTitle = '',
  parts = []
}) => {
  const displayParts = parts.filter(({ type }) => type === 'lib.no:programme-part');

  return (
    <li className="content-section">
      <ContentLink title={title} parentTitle={parentTitle} className="section-link" />
      {displayParts && displayParts.length > 0
        ? (
          <ul className="content-section-parts">
            {displayParts.map(({ key, title: partTitle }) => (
              <li key={key} className="content-section-part">
                <ContentLink title={partTitle} parentTitle={title} className="part-link" />
              </li>
            ))}
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

export const TableOfContent: React.FC<TableOfContentProps> = ({
  title = '',
  sections = []
}) => (
  <ul className="table-of-content">
    {sections && sections.map(({ key, ...props }) =>
      <Section key={key} {...props} parentTitle={title} />
    )}
  </ul>
);
