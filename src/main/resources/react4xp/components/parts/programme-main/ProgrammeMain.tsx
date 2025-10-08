import * as React from 'react';
import slugify from 'react-slugify';

import {ProgrammeSection} from '../programme-section/ProgrammeSection';
import {TableOfContent} from '../../common/TableOfContent';

interface SectionType {
  key?: string;
  [key: string]: unknown;
}

interface ProgrammeMainProps {
  title?: string;
  sections?: SectionType[];
  tableOfContent?: boolean;
}

export const ProgrammeMain: React.FC<ProgrammeMainProps> = ({
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
              <ProgrammeSection key={key} {...props} parentTitle={title} anchor={true} />
            )}
          </div>
        )
        : null
      }
    </div>
  </div>
);
