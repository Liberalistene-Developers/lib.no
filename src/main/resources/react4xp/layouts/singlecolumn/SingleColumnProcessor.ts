import type { LayoutComponent, LayoutDescriptor } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';

interface SingleColumnConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
}

export const singleColumnProcessor: ComponentProcessor<LayoutDescriptor> = ({component}) => {
  const layoutComponent = component as LayoutComponent;
  const config = layoutComponent.config as SingleColumnConfig;

  log.info(`[SingleColumnProcessor] Processing path: ${layoutComponent.path}`);

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
  };
};
