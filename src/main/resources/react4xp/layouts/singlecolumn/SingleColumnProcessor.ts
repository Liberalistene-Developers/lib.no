import type { LayoutComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

interface SingleColumnConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
}

export const singleColumnProcessor: ComponentProcessor<'lib.no:singlecolumn'> = ({component, content}) => {

  const layoutComponent = component as LayoutComponent;
  const config = layoutComponent.config as SingleColumnConfig;

  // log.info('****** LAYOUT 3 ******\n');
  // log.info(JSON.stringify(content, null, 2));

  // log.info('****** LAYOUT 2 ******\n');
  // log.info(JSON.stringify(config, null, 2));

  // log.info('****** LAYOUT 1 ******\n', JSON.stringify(component, null, 2));

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
    regions: layoutComponent.regions,
  };
};
