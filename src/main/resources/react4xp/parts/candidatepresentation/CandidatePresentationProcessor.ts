import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {runQuery} from '/react4xp/utils/query';

interface CandidatePresentationConfig {
  itemsSet?: {
    _selected?: string;
    manual?: {
      items?: string[];
    };
    query?: {
      queryroot?: string;
      querysorting?: string;
      count?: number;
    };
  };
  highlighted?: boolean;
  preText?: string;
}

interface CandidateData {
  person?: string;
  image?: string;
  place?: string;
  position?: string;
  ingress?: string;
}

interface PersonData {
  image?: string;
  'short-description'?: string;
}

export const candidatePresentationProcessor: ComponentProcessor<'lib.no:candidatepresentation'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidatePresentationConfig;

  const selection = config?.itemsSet?._selected || 'manual';
  const items: string[] = [];

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        undefined,
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
  }

  return {
    items: items.map((itemID) => {
      const candidateContent = getContent({key: itemID});
      if (!candidateContent) {
        return null;
      }

      const candidateData = candidateContent.data as CandidateData;
      const personID = candidateData.person;

      let personImageKey: string | undefined;
      let shortDescription: string | undefined;

      if (personID) {
        const personContent = getContent({key: personID});
        if (personContent) {
          const personData = personContent.data as PersonData;
          personImageKey = personData.image;
          shortDescription = personData['short-description'];
        }
      }

      return {
        name: candidateContent.displayName,
        image: imageUrl(candidateData.image || personImageKey, 'full'),
        place: candidateData.place,
        position: candidateData.position,
        ingress: candidateData.ingress || shortDescription,
        url: pageUrl({path: candidateContent._path})
      };
    }).filter(Boolean),
    highlighted: config?.highlighted,
    preText: config?.preText
  };
};
