import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';

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

export const submenuProcessor: ComponentProcessor<'lib.no:submenu'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as SubmenuConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

  const selection = config?.itemsSet?._selected || 'manual';
  const items: string[] = [];

  // TODO: Add back when /lib/shared/query is migrated
  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
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
