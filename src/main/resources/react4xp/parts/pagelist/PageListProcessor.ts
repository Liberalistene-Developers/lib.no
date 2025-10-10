import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

interface PageListConfig {
  items?: Array<{item: string; image?: string; ingress?: string}>;
  hideIngress?: boolean;
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
  title?: string;
}

interface PageData {
  image?: string;
  ingress?: string;
  'short-description'?: string;
}

export const pageListProcessor: ComponentProcessor<'lib.no:pagelist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PageListConfig;

  const displaytype = config?.displaytype?._selected || 'gridlist';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';
  const itemsList = config?.items ? [].concat(config.items) : [];

  return {
    title: config?.title,
    displaytype,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagesize
      : config?.displaytype?.list?.image?.show?.imagesize,
    titleCenter: displaytype === 'gridlist' && config?.displaytype?.gridlist?.titleCenter,
    imageType: (displaytype === 'gridlist'
      ? config?.displaytype?.gridlist?.imagetype
      : config?.displaytype?.list?.image?.show?.imagetype)
      ? 'round'
      : '',
    items: itemsList.map(({item: itemKey, image: imageKey, ingress}) => {
      const itemContent = getContent({key: itemKey});
      if (!itemContent) {
        return null;
      }

      const itemData = itemContent.data as PageData;

      return {
        id: itemKey,
        name: itemContent.displayName,
        url: pageUrl({path: itemContent._path}),
        // TODO: Add back when /lib/shared/html is migrated
        // shortDescription: processHtml(ingress || itemData.ingress || itemData['short-description'] || ''),
        shortDescription: ingress || itemData.ingress || itemData['short-description'] || '', // Temporarily unprocessed
        // TODO: Add back when /lib/shared/image is migrated
        image: (imageKey || itemData.image) // Temporarily unprocessed
      };
    }).filter(Boolean),
    noIngress: !!config?.hideIngress
  };
};
