import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getContent as getPortalContent} from '/lib/xp/portal';

interface OrganizationalPositionData {
  description?: string;
  short_description?: string;
  tags?: string;
}

export const organizationalPositionProcessor: ComponentProcessor<'lib.no:organizational-position'> = () => {
  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as OrganizationalPositionData;

  return {
    title: content.displayName,
    shortDescription: data.short_description,
    description: data.description,
    tags: data.tags
  };
};
