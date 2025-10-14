import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

interface SingleColumn2RowConfig {
  background?: string;
  borderbottom?: boolean;
  fullwidth?: boolean;
  paddingbottom?: boolean;
  paddingtop?: boolean;
  reverseroworder?: boolean;
}

export const singleColumn2RowProcessor: ComponentProcessor<'lib.no:singlecolumn2row'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;
  const config = layoutComponent.config as SingleColumn2RowConfig;

  return {
    background: config?.background,
    borderBottom: config?.borderbottom,
    fullWidth: config?.fullwidth,
    paddingBottom: config?.paddingbottom,
    paddingTop: config?.paddingtop,
    orderClass: config?.reverseroworder ? 'reverse' : '',
  };
};
