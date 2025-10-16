import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {mapBoard} from '/react4xp/utils/board';

interface BoardConfig {
  board?: string;
  imagesize?: string;
  imagetype?: boolean;
  showemail?: string;
  showDescriptions?: boolean;
}

interface BoardData {
  member?: string | string[];
}

export const boardProcessor: ComponentProcessor<'lib.no:board'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BoardConfig;


  const boardContent = config?.board ? getContent({key: config.board}) : null;
  const boardData = boardContent?.data as BoardData;
  const members = boardData?.member ? [].concat(boardData.member) : [];

  return {
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    board: members.map(mapBoard),
    showemail: config?.showemail || 'no',
    showDescriptions: config?.showDescriptions
  };
};
