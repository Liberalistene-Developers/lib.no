import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';

interface ProgrammeSectionConfig {
  conclusionTitle?: string;
}

interface ProgrammeSectionData {
  description?: string;
  tags?: string;
}

export const programmeSectionProcessor: ComponentProcessor<'lib.no:programme-section'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammeSectionConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as ProgrammeSectionData;

  // TODO: Add back when /lib/shared/programme is migrated
  // const parts = getParts({key: content._path});
  const parts: unknown[] = []; // Temporarily empty

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || 'Liberalistene vil:',
    parts,
    tags: data.tags
  };
};
