import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface LocalBranchConfig {
  headerPosition?: string;
  headerType?: string;
  imageOverlay?: string;
  ingressColor?: string;
  localColor?: string;
  mobileSize?: string;
  titleColor?: string;
  title?: string;
}

interface LocalBranchData {
  image?: string;
  ingress?: string;
}

/**
 * Processes the LocalBranch page header configuration for individual local chapter pages.
 *
 * This processor combines part configuration with content data to create a two-part title
 * displaying the party name and local branch name in different colors. It fetches image
 * and ingress text from the content item itself.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @param {Content} params.content - The content item (local branch) being displayed
 * @returns {object} Props for the PageHeader component including:
 *   - Tag: HTML heading tag ('h1', 'h2', etc.) - defaults to 'h1'
 *   - image: Full-size background image URL from content data
 *   - overlay: CSS class for image overlay effect (e.g., 'overlay dark')
 *   - ingress: Introductory text from content data
 *   - ingressColor: Color class for ingress text - defaults to 'light'
 *   - position: Header content position - defaults to 'left'
 *   - title: Two-part title array [party name, branch name] with separate colors
 *   - titleClassName: Responsive size class - defaults to 'full'
 *
 * @example
 * // Returns props with two-part title combining party and branch names
 * {
 *   Tag: "h1",
 *   image: "/_/image/abc123:def456/full/oslo-branch.jpg",
 *   overlay: "overlay dark",
 *   ingress: "Our local chapter in the capital",
 *   ingressColor: "light",
 *   position: "left",
 *   title: [
 *     {title: "Liberalistene", titleColor: "light"},
 *     {title: "Oslo", titleColor: "yellow"}
 *   ],
 *   titleClassName: "full"
 * }
 */
export const localBranchProcessor: ComponentProcessor<'lib.no:localbranch'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBranchConfig;


  const data = content.data as LocalBranchData;

  const image = imageUrl(data.image, 'full');

  return {
    Tag: config?.headerType || 'h1',
    image,
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    ingress: data.ingress,
    ingressColor: config?.ingressColor || 'light',
    position: config?.headerPosition || 'left',
    title: [
      {title: config?.title || 'Liberalistene', titleColor: config?.titleColor || 'light'},
      {title: content.displayName, titleColor: config?.localColor || 'yellow'}
    ],
    titleClassName: config?.mobileSize || 'full'
  };
};
