import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';

interface CandidateBlockConfig {
  title?: string;
  centerheading?: boolean;
}

interface CandidateBlockData {
  candidates?: Array<{person: string; position: string}>;
}

interface PersonData {
  image?: string;
  email?: string;
  phone?: string;
}

export const candidateBlockProcessor: ComponentProcessor<'lib.no:candidateblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidateBlockConfig;

  log.info(`[CandidateBlockProcessor] Processing path: ${partComponent.path}`);

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as CandidateBlockData;
  const candidates = data.candidates ? [].concat(data.candidates) : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: candidates.map(({person: personKey, position}) => {
      const personContent = getContent({key: personKey});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        name: personContent.displayName,
        email: personData.email,
        image: imageUrl(personData.image, 'full'),
        phone: personData.phone,
        position
      };
    }).filter(Boolean)
  };
};
