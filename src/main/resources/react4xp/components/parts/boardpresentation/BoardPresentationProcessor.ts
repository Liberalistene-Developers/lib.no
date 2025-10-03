import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';

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

  const selection = config?.itemsSet?._selected || 'manual';
  const presentation = config?.presentation?._selected || 'hightlighted';

  const items: string[] = [];

  // TODO: Add back when /lib/shared/query and /lib/shared/board are migrated
  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  }

  return {
    boardTitle: config?.boardname || '',
    description: config?.presentation?.hightlighted?.description || '',
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    // TODO: Add back when /lib/shared/board is migrated
    // items: items.map(mapGroup),
    items, // Temporarily unprocessed
    memberHighlighted: config?.presentation?.hightlighted?.memberHighlighted,
    noHighlighting: presentation === 'list',
    reverseOrder: config?.presentation?.hightlighted?.reverseOrder,
    showEmail: config?.showemail || 'no'
  };
};
