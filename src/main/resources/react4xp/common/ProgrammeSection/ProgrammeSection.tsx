import {Fragment, type FC} from 'react';
import slugify from 'react-slugify';

import {ProgrammePart, type ProgrammePartProps} from '../ProgrammePart/ProgrammePart';

interface ConclusionProps {
  title?: string;
}

const Conclusion: FC<ConclusionProps> = ({title: conclusion}) => (
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

interface PartItem extends ProgrammePartProps {
  key?: string;
  type?: string;
}

export interface ProgrammeSectionProps {
  anchor?: boolean;
  title?: string;
  conclusionTitle?: string;
  parentTitle?: string;
  description?: string;
  parts?: PartItem[];
}

export const ProgrammeSection: FC<ProgrammeSectionProps> = ({
  anchor = false,
  title = '',
  conclusionTitle = '',
  parentTitle = '',
  description,
  parts = []
}) => {
  let lastElement = '';

  return (
    <div className={parentTitle ? '' : 'page-content'}>
    <div className="mt-10">
      <div>
        <Title title={title} parentTitle={parentTitle} />
      </div>

      {description && (
        <div className="mt-5 mobile:[&_.standard]:w-[calc(100%-2em)] mobile:[&>ul]:w-[calc(100%-80px)]" dangerouslySetInnerHTML={{__html: description}} />
      )}

      {parts && parts.length > 0
        ? (
          <div className="[&_.conclusions-header]:mb-4 [&>.conclusions>ul]:my-0">
            {parts.map(({key, type, ...props}) => {
              if (type === 'lib.no:programme-part') {
                lastElement = type;

                return (
                  <ProgrammePart key={key} {...props} parentTitle={title} anchor={anchor} />
                );
              }

              if (lastElement !== type) {
                lastElement = type || '';

                return (
                  <Fragment key={key}>
                    {conclusionTitle && (
                      <div className="conclusions-header">
                        <div className="title">{conclusionTitle}</div>
                      </div>
                    )}
                    <Conclusion {...props} />
                  </Fragment>
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
};
