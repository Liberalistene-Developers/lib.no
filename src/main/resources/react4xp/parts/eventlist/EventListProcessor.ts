import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {get as getContext} from '/lib/xp/context';
import {mapEvent} from '/react4xp/utils/events';
import {findItems} from '/react4xp/utils/query';
import {buildParentPathQuery} from '/react4xp/utils/guillotine/helpers';

interface EventListConfig {
  description?: string;
  displaytype?: {
    _selected?: string;
    list?: {
      image?: {
        _selected?: string;
        show?: {
          imagesize?: string;
          imagetype?: boolean;
        };
      };
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
  hideIngress?: boolean;
  shortDescription?: string;
  title?: string;
  readMore?: string;
  readMoreEnabled?: boolean;
  loadMore?: string;
  loadMoreEnabled?: boolean;
}

export const eventListProcessor: ComponentProcessor<'lib.no:eventlist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as EventListConfig;

  log.info(`[EventListProcessor] Processing path: ${partComponent.path}`);

  const displaytype = config?.displaytype?._selected || 'list';
  const selection = config?.itemsSet?._selected || 'manual';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';

  const items: unknown[] = [];

  if (selection === 'manual') {
    const itemList = config?.itemsSet?.manual?.items || [];
    items.push(...itemList.map(mapEvent));
  } else if (selection === 'query') {
    // Fetch initial events server-side for query mode
    const queryRoot = config?.itemsSet?.query?.queryroot;
    const queryCount = config?.itemsSet?.query?.count || 10;
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';

    if (queryRoot) {
      const eventIds = findItems('lib.no:event', queryRoot, querysorting, queryCount, 0, 'data.from');
      if (eventIds) {
        items.push(...eventIds.map(mapEvent));
      }
    }
  }

  const headless = selection === 'query';
  const queryPath = headless && config?.itemsSet?.query?.queryroot
    ? getContent({key: config.itemsSet.query.queryroot})?._path
    : undefined;

  const parentPathQuery = headless && queryPath ? buildParentPathQuery(queryPath) : undefined;

  const createSort = () => {
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';
    switch (querysorting) {
      case 'asc':
        return 'data.from ASC';
      case 'desc':
        return 'data.from DESC';
      default:
        return '';
    }
  };

  const sortExpression = createSort();
  const useLoader = selection !== 'manual';

  // Get current project and branch from context for Guillotine app v7 endpoint
  const context = getContext();
  const repository = context.repository || 'com.enonic.cms.default';
  const projectName = repository.replace('com.enonic.cms.', '');
  const branch = context.branch || 'master';
  const guillotineEndpoint = `/site/${projectName}/${branch}`;

  return {
    title: config?.title,
    displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: config?.displaytype?.list?.image?.show?.imagesize,
    imageType: config?.displaytype?.list?.image?.show?.imagetype ? 'round' : '',
    readMore: config?.readMore,
    readMoreEnabled: config?.readMoreEnabled,
    loadMore: config?.loadMore,
    loadMoreEnabled: config?.loadMoreEnabled,
    items,
    apiUrl: headless ? guillotineEndpoint : '',
    parentPathQuery,
    count: selection === 'query' ? (config?.itemsSet?.query?.count || 10) : items.length,
    sortExpression,
    noIngress: !!config?.hideIngress,
    useLoader
  };
};
