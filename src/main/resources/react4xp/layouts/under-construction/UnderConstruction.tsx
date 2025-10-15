import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export const UnderConstruction = ({component: {regions} = {} as LayoutData, meta}: ComponentProps<LayoutData>) => {

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
