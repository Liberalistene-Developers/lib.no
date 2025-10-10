import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

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

  log.info(JSON.stringify(config, null, 2));

  log.info(JSON.stringify(layoutComponent.regions, null, 2));

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
    regions: layoutComponent.regions,
  };
};
