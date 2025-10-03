import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

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
        // TODO: Add back when /lib/shared/html is migrated
        // shortDescription: processHtml(description),
        shortDescription: description, // Temporarily unprocessed
        url: pageUrl({path: personContent._path}),
        // TODO: Add back when /lib/shared/image is migrated
        // image: imageUrl(personData.image, 'full')
        image: personData.image // Temporarily unprocessed
      };
    }).filter(Boolean)
  };
};
