import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {runQuery} from '/react4xp/utils/query';

interface SubmenuConfig {
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

export const submenuProcessor: ComponentProcessor<'lib.no:submenu'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as SubmenuConfig;


  const selection = config?.itemsSet?._selected || 'manual';
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
    items: items.map((itemID) => {
      const itemContent = getContent({key: itemID});
      if (!itemContent) {
        return null;
      }

      return {
        itemID,
        url: pageUrl({path: itemContent._path}),
        title: itemContent.displayName,
        current: content._path === itemContent._path
      };
    }).filter(Boolean)
  };
};
