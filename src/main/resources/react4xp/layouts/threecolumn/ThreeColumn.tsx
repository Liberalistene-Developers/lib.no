import type {ComponentProps, LayoutData} from '@enonic/react-components';
import {Region} from '@enonic/react-components';

export interface ThreeColumnData extends Record<string, unknown> {
  background?: string;
  borderBottom?: boolean;
  fullWidth?: boolean;
  paddingBottom?: boolean;
  paddingTop?: boolean;
  leftClassName?: string;
  middleClassName?: string;
  rightClassName?: string;
}

export const ThreeColumn = ({component: {regions} = {} as LayoutData, meta, data = {}}: ComponentProps<LayoutData>) => {
  const {
    background = '',
    borderBottom = false,
    fullWidth = false,
    paddingBottom = false,
    paddingTop = false,
    leftClassName = '',
    middleClassName = '',
    rightClassName = '',
  } = data as ThreeColumnData;

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
  const middleClasses = ['content-child', 'middle', middleClassName].filter(Boolean).join(' ');
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
          <div className={middleClasses}>
            <Region
              data={regions?.middle?.components}
              meta={meta}
              name="middle"
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
