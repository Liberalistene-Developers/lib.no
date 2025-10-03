import type {ComponentProps, RegionsData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface FourColumn2RowData extends Record<string, unknown> {
  background?: string;
  borderBottom?: boolean;
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  leftClassName?: string;
  middleLeftClassName?: string;
  middleRightClassName?: string;
  rightClassName?: string;
  orderClass?: string;
  regions?: RegionsData;
}

export const FourColumn2Row = ({meta, data}: ComponentProps) => {
  const {
    background = '',
    borderBottom = false,
    fullWidth = false,
    paddingBottom = false,
    paddingTop = false,
    leftClassName = '',
    middleLeftClassName = '',
    middleRightClassName = '',
    rightClassName = '',
    orderClass = '',
    regions
  } = data as FourColumn2RowData;

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
  const leftClasses = ['content-child', 'left', leftClassName].filter(Boolean).join(' ');
  const middleLeftClasses = ['content-child', 'middleleft', middleLeftClassName].filter(Boolean).join(' ');
  const middleRightClasses = ['content-child', 'middleright', middleRightClassName].filter(Boolean).join(' ');
  const rightClasses = ['content-child', 'right', rightClassName].filter(Boolean).join(' ');

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
          <div className={leftClasses}>
            <Region
              data={regions?.left?.components}
              meta={meta}
              name="left"
            />
          </div>
          <div className={middleLeftClasses}>
            <Region
              data={regions?.middleleft?.components}
              meta={meta}
              name="middleleft"
            />
          </div>
          <div className={middleRightClasses}>
            <Region
              data={regions?.middleright?.components}
              meta={meta}
              name="middleright"
            />
          </div>
          <div className={rightClasses}>
            <Region
              data={regions?.right?.components}
              meta={meta}
              name="right"
            />
          </div>
        </div>
        <div className={dividerClasses}></div>
      </div>
    </div>
  );
};
