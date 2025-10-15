import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

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

  log.info(`[PageListProcessor] Processing path: ${partComponent.path}`);

  const displaytype = config?.displaytype?._selected || 'gridlist';
  const imageSelection = config?.displaytype?.list?.image?._selected || 'hide';
  const itemsList = config?.items ? [].concat(config.items) : [];

  // Apply XML mixin defaults (checked=true for imagetype)
  const gridlistImagesize = config?.displaytype?.gridlist?.imagesize || 'medium';
  const gridlistImagetype = config?.displaytype?.gridlist?.imagetype ?? true;
  const listImagesize = config?.displaytype?.list?.image?.show?.imagesize || 'medium';
  const listImagetype = config?.displaytype?.list?.image?.show?.imagetype ?? true;

  return {
    title: config?.title,
    displaytype,
    showImage: displaytype === 'list' && imageSelection === 'show',
    imageSize: displaytype === 'gridlist' ? gridlistImagesize : listImagesize,
    titleCenter: displaytype === 'gridlist' && config?.displaytype?.gridlist?.titleCenter,
    imageType: (displaytype === 'gridlist' ? gridlistImagetype : listImagetype) ? 'round' : '',
    items: itemsList.map(({item: itemKey, image: imageKey, ingress}) => {
      const itemContent = getContent({key: itemKey});
      if (!itemContent) {
        return null;
      }

      const itemData = itemContent.data as PageData;

      const imageId = imageKey || itemData.image;

      return {
        id: itemKey,
        name: itemContent.displayName,
        url: pageUrl({path: itemContent._path}),
        shortDescription: processHtml(ingress || itemData.ingress || itemData['short-description'] || ''),
        image: imageId ? imageUrl(imageId) : null  // Use default scale like v3
      };
    }).filter(Boolean),
    noIngress: !!config?.hideIngress
  };
};
