import type {ComponentProps, PageData, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface UnderConstructionPageData extends Record<string, unknown> {
  title?: string;
  regions?: RegionsData;
  pageData?: PageData;
}

export const UnderConstructionPage = ({meta, data, component}: ComponentProps) => {
  const pageData = data as UnderConstructionPageData;
  const regions: RegionsData | undefined = pageData.regions ||
    ('regions' in component ? (component as PageData).regions : undefined);

  return (
    <main className="xp-region">
      {regions?.main && (
        <Region
          data={regions.main.components}
          meta={meta}
          name="main"
        />
      )}
    </main>
  );
};
