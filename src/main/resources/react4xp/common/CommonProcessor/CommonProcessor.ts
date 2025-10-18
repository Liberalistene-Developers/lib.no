import { PageDescriptor } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { assetUrl } from '/lib/enonic/asset';
import { getMenuTree } from '/lib/menu';
import { imageUrl } from '@utils/image';

import { getSite, getSiteConfig } from '/lib/xp/content';
// import { getSite as getPortalSite } from '/lib/xp/portal';

import { type CommonProcessorData, type SiteConfig, Social } from './CommonProps';

/**
 * Processes social media addresses into icon-ready format
 *
 * Extracts domain names from URLs to generate FontAwesome icon class names.
 * For example, "https://facebook.com/page" becomes "fa-facebook".
 *
 * @param social - Array of social media addresses from site config
 * @returns Array of Social objects with href and className for icon rendering
 */
function processSocialMedia(social?: Array<{address: string}>): Social[] {
  if (!social) return [];

  return social.map(({address}) => {
    const urlMatch = address.match(/^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/);
    const host = urlMatch && urlMatch.length > 1 ? urlMatch[1].split('.') : [];

    return {
      href: address,
      className: `fa-${host[host.length - 2] || 'link'}`
    };
  });
}

/**
 * Common processor for page-level data shared across all pages
 *
 * This processor runs for every page and provides common data like site configuration,
 * menu structure, edit mode status, and social media links. The data is merged into
 * every page component's props.
 *
 * **Processed data includes:**
 * - Site title and display name
 * - Menu tree structure
 * - Site configuration (logo, social media, etc.)
 * - Edit mode detection
 * - CSS asset URLs
 * - Language settings
 * - Social media links with icon classes
 *
 * **Used by:** All page components via React4xp page rendering
 *
 * @param content - Current content item
 * @param request - Request object with mode information
 * @returns CommonProcessorData object merged into page props
 */
export const commonProcessor: ComponentProcessor<PageDescriptor> = ({ content, request: { mode } }): CommonProcessorData  => {
  const menu = getMenuTree(1);
    // Get common site data first (needed for both paths)
  const site = getSite({ key: content._id });
  const config = getSiteConfig<SiteConfig>({
    key: content._id,
    applicationKey: 'lib.no'
  });

  const title = site?.displayName ?? content?.displayName ?? content._name ??  'Liberalistene';


  const {
    language,
    type: contentType
  } = content || {};
  const isFragment = contentType === 'portal:fragment';


  return {
    title,
    mode,
    isEditMode: mode === 'edit',
    menu,
    ...config,
    language,
    image: config.image ? imageUrl(config.image, 'block(168,40)') : undefined,
    isFragment,
    cssUrl: assetUrl({path: 'styles/tailwind.css'}),
    some: processSocialMedia(config.social),
  };
};
