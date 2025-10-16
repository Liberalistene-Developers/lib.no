import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getConclusions} from '/react4xp/utils/programme';

interface ProgrammePartConfig {
  conclusionTitle?: string;
}

interface ProgrammePartData {
  description?: string;
  tags?: string;
}

export const programmePartProcessor: ComponentProcessor<'lib.no:programme-part'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammePartConfig;


  const data = content.data as ProgrammePartData;

  const conclusions = getConclusions({key: content._path});

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || '',
    conclusions,
    tags: data.tags
  };
};
