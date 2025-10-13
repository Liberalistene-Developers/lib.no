import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';

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
    // TODO: Add back when /lib/shared/html is migrated
    // description: processHtml(data.description || ''),
    description: data.description || '', // Temporarily unprocessed
    shortDescription: data['short-description'],
    email: data.email,
    emailPrefix: config?.emailPrefix,
    tags
  };
};
