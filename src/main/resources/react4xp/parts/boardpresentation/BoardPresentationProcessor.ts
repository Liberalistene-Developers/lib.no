import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {runQuery} from '/react4xp/utils/query';
import {mapGroup} from '/react4xp/utils/board';

interface BoardPresentationConfig {
  boardname?: string;
  imagesize?: string;
  imagetype?: boolean;
  showemail?: string;
  presentation?: {
    _selected?: string;
    hightlighted?: {
      reverseOrder?: boolean;
      memberHighlighted?: string;
      description?: string;
    };
  };
  itemsSet?: {
    _selected?: string;
    manual?: {
      items?: string[];
    };
    query?: {
      queryroot?: string;
      querysorting?: string;
      count?: number;
    };
  };
}

export const boardPresentationProcessor: ComponentProcessor<'lib.no:boardpresentation'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BoardPresentationConfig;

  log.info(`[BoardPresentationProcessor] Processing path: ${partComponent.path}`);

  const selection = config?.itemsSet?._selected || 'manual';
  const presentation = config?.presentation?._selected || 'hightlighted';

  const items: string[] = [];

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        undefined,
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
  }

  return {
    boardTitle: config?.boardname || '',
    description: config?.presentation?.hightlighted?.description || '',
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    items: items.map(mapGroup),
    memberHighlighted: config?.presentation?.hightlighted?.memberHighlighted,
    noHighlighting: presentation === 'list',
    reverseOrder: config?.presentation?.hightlighted?.reverseOrder,
    showEmail: config?.showemail || 'no'
  };
};
