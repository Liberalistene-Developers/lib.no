import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent, attachmentUrl} from '/lib/xp/portal';

interface MissionsBlockConfig {
  title?: string;
  centerheading?: boolean;
}

interface MissionsBlockData {
  missions?: Array<{image: string; title: string; description: string}>;
}

export const missionsBlockProcessor: ComponentProcessor<'lib.no:missionsblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as MissionsBlockConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as MissionsBlockData;
  const missions = data.missions ? [].concat(data.missions) : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: missions.map(({image: imageKey, title, description}) => {
      const image = imageKey && {
        // TODO: Add back when /lib/shared/image is migrated
        // ...imageUrl(imageKey, 'full'),
        url: attachmentUrl({id: imageKey})
      };

      return {
        description,
        image,
        title
      };
    })
  };
};
