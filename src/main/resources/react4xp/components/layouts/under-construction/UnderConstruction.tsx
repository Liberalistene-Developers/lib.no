import type {ComponentProps, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface UnderConstructionData extends Record<string, unknown> {
  regions?: RegionsData;
}

export const UnderConstruction = ({meta, data}: ComponentProps) => {
  const {regions} = data as UnderConstructionData;

  return (
    <div>
      <header className="header">
        <Region
          data={regions?.top?.components}
          meta={meta}
          name="top"
        />
      </header>
      <main className="box-content">
        <Region
          data={regions?.content?.components}
          meta={meta}
          name="content"
        />
      </main>
    </div>
  );
};
