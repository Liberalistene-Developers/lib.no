import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';

interface PersonListConfig {
  description?: string;
  displaytype?: string;
  imagesize?: string;
  imagetype?: boolean;
  persons?: string[];
  shortDescription?: string;
  title?: string;
}

interface PersonData {
  image?: string;
  'short-description'?: string;
}

export const personListProcessor: ComponentProcessor<'lib.no:personlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PersonListConfig;

  log.info(`[PersonListProcessor] Processing path: ${partComponent.path}`);

  const items = config?.persons ? [].concat(config.persons) : [];

  return {
    title: config?.title,
    displaytype: config?.displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    imagesize: config?.imagesize,
    imagetype: config?.imagetype,
    items: items.map((itemID) => {
      const personContent = getContent({key: itemID});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        itemID,
        url: pageUrl({path: personContent._path}),
        name: personContent.displayName,
        shortDescription: personData['short-description'] || '',
        image: imageUrl(personData.image, 'square(256)')
      };
    }).filter(Boolean)
  };
};
