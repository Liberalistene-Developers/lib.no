import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

interface ThreeColumnConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  columnsLayout?: string;
}

export const threeColumnProcessor: ComponentProcessor<'lib.no:threecolumn'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;
  const config = layoutComponent.config as ThreeColumnConfig;

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
    regions: layoutComponent.regions
  };
};
