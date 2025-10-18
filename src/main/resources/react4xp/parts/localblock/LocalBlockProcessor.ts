import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface LocalBlockConfig {
  image?: string;
  headerPosition?: string;
  imageOverlay?: string;
  ingress?: string;
  ingressColor?: string;
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
  mobileSize?: string;
}

/**
 * Processes the LocalBlock component configuration for local chapter hero sections.
 *
 * This processor transforms the local block configuration into props for the PageHeader component,
 * supporting both simple single-color titles and fancy multi-color titles. It handles legacy title
 * configuration and provides backward compatibility.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @returns {object} Props for the PageHeader component including:
 *   - Tag: HTML heading tag (always 'h1')
 *   - image: Full-size image URL for the background
 *   - title: Array of title objects with text and color configuration
 *   - position: Header content position ('left', 'center', 'right')
 *   - ingress: Introductory text displayed below the title
 *   - ingressColor: Color class for the ingress text
 *   - overlay: CSS class for image overlay effect (e.g., 'overlay dark')
 *   - titleClassName: Responsive size class for title (e.g., 'full', 'half')
 *
 * @example
 * // Returns props with fancy multi-color title
 * {
 *   Tag: "h1",
 *   image: "/_/image/abc123:def456/full/banner.jpg",
 *   title: [
 *     {title: "Liberalistene", titleColor: "white"},
 *     {title: "Oslo", titleColor: "yellow"}
 *   ],
 *   position: "left",
 *   ingress: "Welcome to our local chapter",
 *   ingressColor: "light",
 *   overlay: "overlay dark",
 *   titleClassName: "full"
 * }
 */
export const localBlockProcessor: ComponentProcessor<'lib.no:localblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBlockConfig;


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
    Tag: 'h1',
    image: imageUrl(config?.image, 'full'),
    title: titleList,
    position: config?.headerPosition,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    titleClassName: config?.mobileSize || 'full'
  };
};
