import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';

interface ProgrammePartConfig {
  conclusionTitle?: string;
}

interface ProgrammePartData {
  description?: string;
  tags?: string;
}

export const programmePartProcessor: ComponentProcessor<'lib.no:programme-part'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammePartConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as ProgrammePartData;

  // TODO: Add back when /lib/shared/programme is migrated
  // const conclusions = getConclusions({key: content._path});
  const conclusions: unknown[] = []; // Temporarily empty

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || '',
    conclusions,
    tags: data.tags
  };
};
