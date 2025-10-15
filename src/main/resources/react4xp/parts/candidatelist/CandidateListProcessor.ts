import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface CandidateListConfig {
  candidate?: Array<{role: string; description: string; person: string}>;
  showrole?: boolean;
  imagesize?: string;
  imagetype?: boolean;
}

interface PersonData {
  image?: string;
}

export const candidateListProcessor: ComponentProcessor<'lib.no:candidatelist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidateListConfig;

  log.info(`[CandidateListProcessor] Processing path: ${partComponent.path}`);

  const candidates = config?.candidate ? [].concat(config.candidate) : [];

  return {
    showRole: !!config?.showrole,
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    items: candidates.map(({role, description, person: personId}) => {
      const personContent = getContent({key: personId});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        itemId: personId,
        name: personContent.displayName,
        role,
        shortDescription: processHtml(description),
        url: pageUrl({path: personContent._path}),
        image: imageUrl(personData.image, 'full')
      };
    }).filter(Boolean)
  };
};
