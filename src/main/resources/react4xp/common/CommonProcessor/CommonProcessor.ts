import { PageDescriptor } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { assetUrl } from '/lib/enonic/asset';
import { getMenuTree } from '/lib/menu';
import { imageUrl } from '/react4xp/utils/image';

import { getSite, getSiteConfig } from '/lib/xp/content';
// import { getSite as getPortalSite } from '/lib/xp/portal';

import { type CommonProcessorData, type SiteConfig, Social } from './CommonProps';

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
