import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface FancyHeaderConfig {
  image?: string;
  effect?: string;
  title?: string;
}

export const fancyHeaderProcessor: ComponentProcessor<'lib.no:fancyheader'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FancyHeaderConfig;

  log.info(`[FancyHeaderProcessor] Processing path: ${partComponent.path}`);

  return {
    image: imageUrl(config?.image, 'full'),
    title: config?.title || '',
    effect: imageUrl(config?.effect, 'full')
  };
};
