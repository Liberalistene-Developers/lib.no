import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
import {getSections} from '/react4xp/utils/programme';

interface ProgrammeMainConfig {
  tableOfContent?: boolean;
}

interface ProgrammeMainData {
  tags?: string;
}

export const programmeMainProcessor: ComponentProcessor<'lib.no:programme-main'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammeMainConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const data = content.data as ProgrammeMainData;

  const sections = getSections({key: content._path});

  return {
    title: content.displayName,
    sections,
    tags: data.tags,
    tableOfContent: config?.tableOfContent
  };
};
