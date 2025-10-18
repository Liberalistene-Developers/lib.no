import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface ImageBlockConfig {
  title?: string;
  headerColor?: string;
  titleSet?: {
    _selected?: string;
    simple?: {
      title?: string;
      titleColor?: string;
    };
    fancy?: {
      titles?: Array<{title: string; titleColor: string}>;
    };
  };
  headerPosition?: string;
  headerType?: string;
  image?: string;
  imageOverlay?: string;
  ingress?: string;
  ingressColor?: string;
  mobileSize?: string;
}

/**
 * Processes image block component data for rendering.
 *
 * Transforms the part configuration into props for the ImageBlock component,
 * handling both simple and fancy title configurations. Supports legacy title
 * and headerColor config fields.
 *
 * @param {Object} params - Processor parameters
 * @param {PartComponent} params.component - The image block part component containing configuration
 *
 * @returns {Object} Props for the ImageBlock component
 * @returns {string} returns.Tag - HTML tag for the header (e.g., 'h1', 'h2')
 * @returns {string} returns.image - Processed full-size image URL from XP media library
 * @returns {string} [returns.overlay] - CSS class for image overlay effect if configured
 * @returns {string} [returns.ingress] - Introductory text below the title
 * @returns {string} [returns.ingressColor] - Color class for the ingress text
 * @returns {string} [returns.position] - Header positioning class
 * @returns {Array<{title: string, titleColor: string}>} returns.title - Array of title objects (single for simple, multiple for fancy)
 * @returns {string} returns.titleClassName - Mobile size class for title responsiveness
 *
 * @example
 * // Simple title configuration
 * {
 *   Tag: 'h1',
 *   title: [{title: 'Welcome', titleColor: 'text-primary'}],
 *   image: '/site/default/draft/media/hero.jpg/_/image/full',
 *   titleClassName: 'full'
 * }
 *
 * @example
 * // Fancy title configuration with overlay
 * {
 *   Tag: 'h2',
 *   title: [
 *     {title: 'Multi', titleColor: 'text-red'},
 *     {title: 'Color', titleColor: 'text-blue'}
 *   ],
 *   overlay: 'overlay dark',
 *   titleClassName: 'mobile'
 * }
 */
export const imageBlockProcessor: ComponentProcessor<'lib.no:imageblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ImageBlockConfig;


  const selection = config?.titleSet?._selected || 'simple';
  const oldTitle = config?.title;
  const headerColor = config?.headerColor;

  const simpleTitle = {
    title: oldTitle,
    titleColor: headerColor
  };

  const titleList = selection === 'simple'
    ? [config?.titleSet?.simple || simpleTitle]
    : (config?.titleSet?.fancy?.titles || []);

  return {
    Tag: config?.headerType || 'h1',
    image: imageUrl(config?.image, 'full'),
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    position: config?.headerPosition,
    title: titleList,
    titleClassName: config?.mobileSize || 'full'
  };
};
