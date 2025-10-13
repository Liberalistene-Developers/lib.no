import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';

interface BookListConfig {
  description?: string;
  displaytype?: string;
  items?: string[];
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
  shortDescription?: string;
  buyFromText?: string;
  title?: string;
}

interface BookData {
  image?: string;
  ingress?: string;
  author?: string | string[];
  buy?: Array<Record<string, unknown>>;
}

export const bookListProcessor: ComponentProcessor<'lib.no:booklist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as BookListConfig;

  const selection = config?.itemsSet?._selected || 'manual';
  const items = [...(config?.items || [])];

  // TODO: Add back when /lib/shared/query is migrated
  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  }

  const authorCache: Record<string, {name: string; url: string}> = {};

  return {
    title: config?.title,
    displaytype: config?.displaytype,
    description: config?.description,
    shortDescription: config?.shortDescription,
    buyFromText: config?.buyFromText,
    className: 'grid',
    items: items.map((itemID) => {
      const itemContent = getContent({key: itemID});
      if (!itemContent) {
        return null;
      }

      const itemData = itemContent.data as BookData;
      const buy = itemData.buy ? [].concat(itemData.buy) : [];
      const authors = itemData.author ? [].concat(itemData.author).slice(0, 1) : [];

      const [author] = authors.map((authorId) => {
        if (!authorCache[authorId]) {
          const authorContent = getContent({key: authorId});
          if (authorContent) {
            authorCache[authorId] = {
              name: authorContent.displayName,
              url: authorContent._path
            };
          }
        }
        return authorCache[authorId];
      });

      return {
        itemID,
        url: pageUrl({path: itemContent._path}),
        author,
        title: itemContent.displayName,
        text: itemData.ingress || '',
        image: imageUrl(itemData.image, 'block(157,239)'),
        buy: buy.length ? buy[0] : null,
        buyFromText: config?.buyFromText
      };
    }).filter(Boolean)
  };
};
