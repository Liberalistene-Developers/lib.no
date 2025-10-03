import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PageComponent} from '@enonic-types/core';
import {getContent} from '/lib/xp/portal';

interface UnderConstructionPageConfig {
  title?: string;
}

export const underConstructionPageProcessor: ComponentProcessor<'lib.no:under-construction'> = ({component}) => {
  const pageComponent = component as unknown as PageComponent;
  const config = pageComponent.config as UnderConstructionPageConfig;
  const content = getContent();

  return {
    title: config?.title || 'Her kommer Liberalistene',
    regions: content.page?.regions
  };
};
