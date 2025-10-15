import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface GroupConfig {
  headerColor?: string;
  headerPosition?: string;
  ingressInImage?: boolean;
  titleInImage?: boolean;
  imagesize?: string;
  imagetype?: boolean;
}

interface GroupData {
  'short-description'?: string;
  description?: string;
  image?: string;
  tags?: string;
  member?: Array<{role: string; person: string}>;
  address?: string;
}

interface PersonData {
  image?: string;
  'short-description'?: string;
}

export const groupProcessor: ComponentProcessor<'lib.no:group'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as GroupConfig;

  log.info(`[GroupProcessor] Processing path: ${partComponent.path}`);

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as GroupData;
  const members = data.member ? [].concat(data.member) : [];

  return {
    title: content.displayName,
    image: imageUrl(data.image, 'full'),
    imagesize: config?.imagesize,
    imagetype: config?.imagetype,
    headerColor: config?.headerColor,
    headerPosition: config?.headerPosition,
    ingressInImage: config?.ingressInImage,
    titleInImage: config?.titleInImage,
    shortDescription: data['short-description'],
    description: processHtml(data.description || ''),
    location: {
      address: (data.address || '').replace('\n', ',').replace(/ /g, '+')
    },
    board: members.map(({role: roleId, person: personId}) => {
      const roleContent = getContent({key: roleId});
      const personContent = getContent({key: personId});

      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        name: personContent.displayName,
        role: roleContent?.displayName,
        shortDescription: personData['short-description'],
        url: personContent._path ? pageUrl({path: personContent._path}) : undefined,
        image: imageUrl(personData.image, 'full')
      };
    }).filter(Boolean),
    tags: data.tags
  };
};
