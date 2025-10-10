import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getSite, pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';

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

export const articleListProcessor: ComponentProcessor<'lib.no:articlelist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ArticleListConfig;

  const displaytype = config?.displaytype?._selected || 'gridlist';
  const selection = config?.itemsSet?._selected || 'manual';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';

  const items: unknown[] = [];

  // TODO: Add back when /lib/shared/articles and /headless helpers are migrated
  // For now, just handle manual selection
  if (selection === 'manual') {
    const itemList = config?.itemsSet?.manual?.items || [];
    // items.push(...itemList.map(mapArticle));
    items.push(...itemList); // Temporarily unprocessed
  }

  const site = getSite();
  const siteUrl = site ? pageUrl({path: site._path}) : '';

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

  // TODO: Add back when /headless/helpers is migrated
  // const parentPathQuery = headless && queryPath && buildParentPathQuery(queryPath);
  const parentPathQuery = queryPath; // Temporarily simplified

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
    apiUrl: headless ? `${siteUrl.length > 8 ? siteUrl : ''}/api/headless` : '',
    parentPathQuery,
    count: selection === 'query' ? (config?.itemsSet?.query?.count || 10) : items.length,
    sortExpression,
    noIngress: !!config?.hideIngress
  };
};
