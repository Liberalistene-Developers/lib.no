import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';
import * as React from 'react';

export interface TwoColumnData extends Record<string, unknown> {
  background?: string;
  borderBottom?: boolean;
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  leftClassName?: string;
  rightClassName?: string;
}

export const TwoColumn = ({component, meta, data = {}}: ComponentProps<LayoutData>) => {
  const {
    background = '',
    borderBottom = false,
    fullWidth = false,
    paddingBottom = false,
    paddingTop = false,
    leftClassName = '',
    rightClassName = '',
  } = data as TwoColumnData;

  const regions = component.regions;

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
  const rightClasses = ['content-child', 'right', rightClassName].filter(Boolean).join(' ');

  return (
    <div className={contentHolderClasses}>
      <div className={contentClasses}>
        <div className="content-item items">
          <div className={leftClasses}>
            <Region
              data={regions?.left?.components}
              meta={meta}
              name="left"
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
