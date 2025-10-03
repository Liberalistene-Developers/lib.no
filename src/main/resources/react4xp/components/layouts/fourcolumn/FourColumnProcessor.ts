import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

interface FourColumnConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  columnsLayout?: string;
}

export const fourColumnProcessor: ComponentProcessor<'lib.no:fourcolumn'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;
  const config = layoutComponent.config as FourColumnConfig;

  const columnsLayout = config?.columnsLayout || '';
  const [leftClassName, middleLeftClassName, middleRightClassName, rightClassName] = columnsLayout ? columnsLayout.split(',') : ['', '', '', ''];

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
    leftClassName,
    middleLeftClassName,
    middleRightClassName,
    rightClassName,
    regions: layoutComponent.regions
  };
};
