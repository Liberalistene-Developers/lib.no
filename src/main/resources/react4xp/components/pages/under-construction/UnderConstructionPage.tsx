import type {ComponentProps, PageData, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface UnderConstructionPageData extends Record<string, unknown> {
  title?: string;
  regions?: RegionsData;
  pageData?: PageData;
}

export const UnderConstructionPage = ({meta, data}: ComponentProps) => {
  const {
    title = 'Her kommer Liberalistene',
    regions
  } = data as UnderConstructionPageData;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="xp-page">
        <main className="xp-region">
          <Region
            data={regions?.main?.components}
            meta={meta}
            name="main"
          />
        </main>
      </body>
    </html>
  );
};
