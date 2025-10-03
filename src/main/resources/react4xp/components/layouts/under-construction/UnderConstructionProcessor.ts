import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {LayoutComponent} from '@enonic-types/core';

export const underConstructionProcessor: ComponentProcessor<'lib.no:under-construction'> = ({component}) => {
  const layoutComponent = component as unknown as LayoutComponent;

  return {
    regions: layoutComponent.regions
  };
};
