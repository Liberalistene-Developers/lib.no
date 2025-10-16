import type { PartComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { get as getContent } from '/lib/xp/content';
import { mapArticle } from '/react4xp/utils/articles';
import { findItems } from '/react4xp/utils/query';
import { buildParentPathQuery } from '/react4xp/utils/guillotine/helpers';

interface ArticleListConfig {
  description?: string;
  displaytype?: {
    _selected?: string;
    gridlist?: {
      titleCenter?: boolean;
      imagesize?: string;
      imagetype?: boolean;
    };
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
  featured?: Array<{item: string; style: string; showDate: boolean}>;
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

export const articleListProcessor: ComponentProcessor<'lib.no:articlelist'> = ({component, request}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ArticleListConfig;


  const displaytype = config?.displaytype?._selected || 'gridlist';
  const selection = config?.itemsSet?._selected || 'manual';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';

  const items: unknown[] = [];

  if (selection === 'manual') {
    const itemList = config?.itemsSet?.manual?.items || [];
    items.push(...itemList.map(mapArticle));
  } else if (selection === 'query') {
    // Fetch initial articles server-side for query mode
    const queryRoot = config?.itemsSet?.query?.queryroot;
    const queryCount = config?.itemsSet?.query?.count || 12;
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';

    if (queryRoot) {
      const articleIds = findItems('lib.no:article', queryRoot, querysorting, queryCount, 0, 'data.date');
      if (articleIds) {
        items.push(...articleIds.map(mapArticle));
      }
    }
  }

  const featured = (config?.featured || []).reduce(
    (acc, {item, style, showDate = true}) => ({
      ...acc,
      [item]: {style, showDate}
    }),
    {} as Record<string, {style: string; showDate: boolean}>
  );

  const headless = selection === 'query';
  const queryPath = headless && config?.itemsSet?.query?.queryroot
    ? getContent({key: config.itemsSet.query.queryroot})?._path
    : undefined;

  const parentPathQuery = headless && queryPath ? buildParentPathQuery(queryPath) : undefined;

  const createSort = () => {
    const querysorting = config?.itemsSet?.query?.querysorting || 'normal';
    switch (querysorting) {
      case 'asc':
        return 'data.date ASC';
      case 'desc':
        return 'data.date DESC';
      default:
        return '';
    }
  };

  const sortExpression = createSort();

  // Get Guillotine v7 endpoint with branch from request
  const branch = request.branch || 'master';
  const guillotineEndpoint = headless ? `/api/${branch}` : '';

  return {
    title: config?.title,
    displaytype,
    description: config?.description,
    featured,
    shortDescription: config?.shortDescription,
    titleCenter: displaytype === 'gridlist' && config?.displaytype?.gridlist?.titleCenter,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagesize
      : config?.displaytype?.list?.image?.show?.imagesize,
    imageType: (displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagetype
      : config?.displaytype?.list?.image?.show?.imagetype)
      ? 'round'
      : '',
    readMore: config?.readMore,
    readMoreEnabled: config?.readMoreEnabled,
    loadMore: config?.loadMore,
    loadMoreEnabled: config?.loadMoreEnabled,
    items,
    apiUrl: headless ? guillotineEndpoint : '',
    parentPathQuery,
    count: selection === 'query' ? (config?.itemsSet?.query?.count || 10) : items.length,
    sortExpression,
    noIngress: !!config?.hideIngress
  };
};
