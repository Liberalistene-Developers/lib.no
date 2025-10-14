import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface PersonConfig {
  emailPrefix?: string;
}

interface PersonData {
  image?: string;
  description?: string;
  'short-description'?: string;
  email?: string;
  tags?: string | string[];
}

export const personProcessor: ComponentProcessor<'lib.no:person'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PersonConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as PersonData;
  const tags = data.tags ? [].concat(data.tags) : [];

  return {
    title: content.displayName,
    image: imageUrl(data.image, 'block(192,256)'),
    description: processHtml(data.description || ''),
    shortDescription: data['short-description'],
    email: data.email,
    emailPrefix: config?.emailPrefix,
    tags
  };
};
