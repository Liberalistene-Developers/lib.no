import * as React from 'react';
import slugify from 'react-slugify';

import {ProgrammePartPart} from '../programme-part/ProgrammePartPart';

interface ConclusionProps {
  title?: string;
}

const Conclusion: React.FC<ConclusionProps> = ({title: conclusion}) => (
  <div className="conclusions">
    <ul>
      <li>
        {conclusion}
      </li>
    </ul>
  </div>
);

interface TitleProps {
  title?: string;
  parentTitle?: string;
}

const Title: React.FC<TitleProps> = ({title, parentTitle}) => {
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

interface PartItem {
  key?: string;
  type?: string;
  [key: string]: unknown;
}

interface ProgrammeSectionProps {
  anchor?: boolean;
  title?: string;
  conclusionTitle?: string;
  parentTitle?: string;
  description?: string;
  parts?: PartItem[];
}

let lastElement = '';

export const ProgrammeSectionPart: React.FC<ProgrammeSectionProps> = ({
  anchor = false,
  title = '',
  conclusionTitle = '',
  parentTitle = '',
  description,
  parts = []
}) => (
  <div className={parentTitle ? '' : 'page-content'}>
    <div className="mt-10">
      <div>
        <Title title={title} parentTitle={parentTitle} />
      </div>

      {description && (
        <div className="mt-5 mobile:[&_.Standard]:w-[calc(100%-2em)] mobile:[&>ul]:w-[calc(100%-80px)]" dangerouslySetInnerHTML={{__html: description}} />
      )}

      {parts && parts.length > 0
        ? (
          <div className="[&_.conclusions-header]:mb-4 [&>.conclusions>ul]:my-0">
            {parts.map(({key, type, ...props}) => {
              if (type === 'lib.no:programme-part') {
                lastElement = type;

                return (
                  <ProgrammePartPart key={key} {...props} parentTitle={title} anchor={anchor} />
                );
              }

              if (lastElement !== type) {
                lastElement = type || '';

                return (
                  <React.Fragment key={key}>
                    {conclusionTitle && (
                      <div className="conclusions-header">
                        <div className="title">{conclusionTitle}</div>
                      </div>
                    )}
                    <Conclusion {...props} />
                  </React.Fragment>
                );
              }

              return (
                <Conclusion key={key} {...props} />
              );
            })}
          </div>
        )
        : null}
    </div>
  </div>
);
