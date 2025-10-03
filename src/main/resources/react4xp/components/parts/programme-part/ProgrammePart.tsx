import * as React from 'react';
import slugify from 'react-slugify';

interface ConclusionItem {
  key?: string;
  conclusion?: string;
}

interface TitleProps {
  anchor?: boolean | string;
  title?: string;
  parentTitle?: string;
}

const Title: React.FC<TitleProps> = ({anchor, title, parentTitle}) => {
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

interface ProgrammePartProps {
  anchor?: boolean;
  title?: string;
  description?: string;
  conclusionTitle?: string;
  conclusions?: ConclusionItem[];
  parentTitle?: string;
  tags?: unknown[];
}

export const ProgrammePart: React.FC<ProgrammePartProps> = ({
  anchor = false,
  title = '',
  description = '',
  conclusionTitle,
  conclusions = [],
  parentTitle = '',
  tags
}) => {
  return (
    <div className={title ? '' : 'page-content'}>
      <div className="mt-10">
        <div>
          <Title anchor={anchor} parentTitle={parentTitle} title={title} />
        </div>

        {description && (
          <div className="mt-5" dangerouslySetInnerHTML={{__html: description}} />
        )}

        {conclusions && conclusions.length > 0
          ? (
            <div className="conclusions">
              <div className="title">{conclusionTitle}</div>
              <ul>
                {conclusions.map(({key, conclusion}) => (
                  <li key={key}>
                    {conclusion}
                  </li>
                ))}
              </ul>
            </div>
          )
          : null}
      </div>
    </div>
  );
};
