import type {ComponentProps, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface SingleColumn2RowData extends Record<string, unknown> {
  background?: string;
  borderBottom?: boolean;
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  orderClass?: string;
  regions?: RegionsData;
}

export const SingleColumn2Row = ({meta, data = {}}: ComponentProps) => {
  const {
    background = '',
    borderBottom = false,
    fullWidth = false,
    paddingBottom = false,
    paddingTop = false,
    orderClass = '',
    regions
  } = data as SingleColumn2RowData;

  const contentHolderClasses = [
    'content-holder',
    background,
    paddingBottom ? 'padding-bottom' : '',
    paddingTop ? 'padding-top' : ''
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'content',
    fullWidth ? 'full' : ''
  ].filter(Boolean).join(' ');

  const dividerClasses = [
    'divider',
    borderBottom ? 'visible' : ''
  ].filter(Boolean).join(' ');

  const itemsClasses = ['content-item', 'items', orderClass].filter(Boolean).join(' ');

  return (
    <div className={contentHolderClasses}>
      <div className={contentClasses}>
        <div className={itemsClasses}>
          <div className="content-child full">
            <Region
              data={regions?.top?.components}
              meta={meta}
              name="top"
            />
          </div>
          <div className="content-child full">
            <Region
              data={regions?.bottom?.components}
              meta={meta}
              name="bottom"
            />
          </div>
        </div>
        <div className={dividerClasses}></div>
      </div>
    </div>
  );
};
