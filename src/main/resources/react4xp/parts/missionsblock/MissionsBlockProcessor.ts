import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface MissionsBlockConfig {
  title?: string;
  centerheading?: boolean;
}

interface MissionsBlockData {
  missions?: Array<{image: string; title: string; description: string}>;
}

export const missionsBlockProcessor: ComponentProcessor<'lib.no:missionsblock'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as MissionsBlockConfig;


  const data = content.data as MissionsBlockData;
  const missions = data.missions ? [].concat(data.missions) : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: missions.map(({image: imageKey, title, description}) => {
      return {
        description,
        image: imageUrl(imageKey, 'full'),
        title
      };
    })
  };
};
