import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface FourColumnData extends Record<string, unknown> {
  background?: string;
  borderBottom?: boolean;
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  leftClassName?: string;
  middleLeftClassName?: string;
  middleRightClassName?: string;
  rightClassName?: string;
}

export const FourColumn = ({component: {regions} = {} as LayoutData, meta, data = {}, common}: ComponentProps<LayoutData>) => {
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
  } = data as FourColumnData;

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

  const leftClasses = ['content-child', 'left', leftClassName].filter(Boolean).join(' ');
  const middleLeftClasses = ['content-child', 'middleleft', middleLeftClassName].filter(Boolean).join(' ');
  const middleRightClasses = ['content-child', 'middleright', middleRightClassName].filter(Boolean).join(' ');
  const rightClasses = ['content-child', 'right', rightClassName].filter(Boolean).join(' ');

  return (
    <div className={contentHolderClasses}>
      <div className={contentClasses}>
        <div className="content-item items">
          <div className={leftClasses}>
            <Region
              data={regions?.left?.components}
              meta={meta}
              common={common}
              name="left"
            />
          </div>
          <div className={middleLeftClasses}>
            <Region
              data={regions?.middleleft?.components}
              meta={meta}
              common={common}
              name="middleleft"
            />
          </div>
          <div className={middleRightClasses}>
            <Region
              data={regions?.middleright?.components}
              meta={meta}
              common={common}
              name="middleright"
            />
          </div>
          <div className={rightClasses}>
            <Region
              data={regions?.right?.components}
              meta={meta}
              common={common}
              name="right"
            />
          </div>
        </div>
        <div className={dividerClasses}></div>
      </div>
    </div>
  );
};
