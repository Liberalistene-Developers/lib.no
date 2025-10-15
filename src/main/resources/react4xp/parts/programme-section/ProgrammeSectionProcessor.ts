import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {getParts} from '/react4xp/utils/programme';

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

  log.info(`[ProgrammeSectionProcessor] Processing path: ${partComponent.path}`);

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as ProgrammeSectionData;

  const parts = getParts({key: content._path});

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || 'Liberalistene vil:',
    parts,
    tags: data.tags
  };
};
