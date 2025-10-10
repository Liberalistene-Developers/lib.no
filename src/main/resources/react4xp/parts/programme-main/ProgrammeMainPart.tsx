import * as React from 'react';
import slugify from 'react-slugify';

import {ProgrammeSectionPart} from '../programme-section/ProgrammeSectionPart';
import {TableOfContent} from '/react4xp/common/TableOfContent/TableOfContent';

interface SectionType {
  key?: string;
  [key: string]: unknown;
}

interface ProgrammeMainProps {
  title?: string;
  sections?: SectionType[];
  tableOfContent?: boolean;
}

export const ProgrammeMainPart: React.FC<ProgrammeMainProps> = ({
  title = '',
  sections = [],
  tableOfContent = false
}) => (
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
              <ProgrammeSectionPart key={key} {...props} parentTitle={title} anchor={true} />
            )}
          </div>
        )
        : null
      }
    </div>
  </div>
);
