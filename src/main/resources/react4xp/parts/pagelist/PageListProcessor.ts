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

/**
 * Processes the PageList component to display a curated list of pages.
 *
 * This processor creates a customizable list or grid of pages with support for multiple
 * display modes (gridlist or list), configurable image display (size, shape, visibility),
 * and flexible content sourcing. Each item can override the default image and ingress text.
 *
 * The processor handles complex configuration logic including:
 * - Two display types: gridlist (cards) and list (rows)
 * - Conditional image display for list mode
 * - Image size options (small, medium, large, full)
 * - Image shape (round/circular or rectangular)
 * - Fallback logic: custom image → content image, custom ingress → content ingress → short-description
 * - XML mixin defaults: imagetype defaults to true (round images)
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @returns {object} Props for the PageList component including:
 *   - title: Optional heading text for the page list
 *   - displaytype: Display mode ('gridlist' or 'list')
 *   - showImage: Whether to show images in list mode (always true for gridlist)
 *   - imageSize: Size variant ('small', 'medium', 'large', 'full')
 *   - titleCenter: Center align titles in gridlist mode
 *   - imageType: Image shape ('round' for circular, '' for rectangular)
 *   - items: Array of page objects with id, name, url, shortDescription, and image
 *   - noIngress: Hide ingress/description text if true
 *
 * @example
 * // Returns props with gridlist of pages
 * {
 *   title: "Featured Pages",
 *   displaytype: "gridlist",
 *   showImage: false,
 *   imageSize: "medium",
 *   titleCenter: true,
 *   imageType: "round",
 *   items: [
 *     {
 *       id: "abc123",
 *       name: "About Us",
 *       url: "/about",
 *       shortDescription: "Learn about our history and values",
 *       image: "/_/image/abc123:def456/block-300-300/about.jpg"
 *     },
 *     {
 *       id: "def456",
 *       name: "Get Involved",
 *       url: "/join",
 *       shortDescription: "Join our movement for freedom",
 *       image: "/_/image/ghi789:jkl012/block-300-300/join.jpg"
 *     }
 *   ],
 *   noIngress: false
 * }
 */
export const pageListProcessor: ComponentProcessor<'lib.no:pagelist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PageListConfig;


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
