import type { LayoutComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

interface ThreeColumn2RowConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  columnsLayout?: string;
  reverseroworder?: boolean;
}

export const threeColumn2RowProcessor: ComponentProcessor<'lib.no:threecolumn2row'> = ({component}) => {
  const layoutComponent = component as LayoutComponent;
  const config = layoutComponent.config as ThreeColumn2RowConfig;


  const columnsLayout = config?.columnsLayout || '';
  const [leftClassName, middleClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', ''];

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
    leftClassName,
    middleClassName,
    rightClassName,
    orderClass: config?.reverseroworder ? 'reverse' : '',
  };
};
