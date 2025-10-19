import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

interface TwoColumn2RowConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  columnsLayout?: string;
  reverseroworder?: boolean;
}

export const twoColumn2RowProcessor: ComponentProcessor<'lib.no:twocolumn2row'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;
  const config = layoutComponent.config as TwoColumn2RowConfig;


  const columnsLayout = config?.columnsLayout || '';
  const [leftClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', ''];

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
    leftClassName,
    rightClassName,
    orderClass: config?.reverseroworder ? 'reverse' : '',
  };
};
