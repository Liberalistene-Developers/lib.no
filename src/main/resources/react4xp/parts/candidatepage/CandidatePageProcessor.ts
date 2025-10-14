import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface CandidatePageConfig {
  image?: string;
}

interface CandidatePageData {
  person?: string | string[];
  image?: string;
  ingress?: string;
  description?: string;
  position?: string;
  place?: string;
}

interface PersonData {
  image?: string;
  'short-description'?: string;
  description?: string;
  email?: string;
  phone?: string;
}

export const candidatePageProcessor: ComponentProcessor<'lib.no:candidatepage'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidatePageConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as CandidatePageData;
  const persons = data.person ? [].concat(data.person) : [];

  const personProps = persons.map((personID) => {
    const personContent = getContent({key: personID});
    if (!personContent) {
      return null;
    }

    const personData = personContent.data as PersonData;

    return {
      title: content.displayName || personContent.displayName,
      ingress: processHtml(data.ingress || personData['short-description'] || ''),
      description: processHtml(data.description || personData.description || ''),
      email: personData.email,
      phone: personData.phone,
      image: imageUrl(data.image || personData.image, 'full'),
      fancyImage: !!config?.image,
      artImage: imageUrl(config?.image, 'full'),
      position: `${data.position || ''}, ${data.place || ''}`
    };
  }).filter(Boolean);

  return personProps.length > 0 ? personProps[0] : {};
};
