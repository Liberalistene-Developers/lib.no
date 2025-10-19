import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

interface TwoColumnConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  columnsLayout?: string;
}

export const twoColumnProcessor: ComponentProcessor<'lib.no:twocolumn'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;
  const config = layoutComponent.config as TwoColumnConfig;


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
  };
};
