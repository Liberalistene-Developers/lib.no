import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';

interface FancyHeaderConfig {
  image?: string;
  effect?: string;
  title?: string;
}

export const fancyHeaderProcessor: ComponentProcessor<'lib.no:fancyheader'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FancyHeaderConfig;

  return {
    // TODO: Add back when /lib/shared/image is migrated
    // image: imageUrl(config?.image, 'full'),
    image: config?.image, // Temporarily unprocessed
    title: config?.title || '',
    // TODO: Add back when /lib/shared/image is migrated
    // effect: imageUrl(config?.effect, 'full')
    effect: config?.effect // Temporarily unprocessed
  };
};
