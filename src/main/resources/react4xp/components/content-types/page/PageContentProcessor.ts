import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { assetUrl } from '/lib/enonic/asset';
import { getMenuTree } from '/lib/menuWrapper';
import { getSiteConfig } from '/lib/xp/content';
import { getContent, getSite as getPortalSite } from '/lib/xp/portal';

interface SiteConfig {
  email?: string;
  image?: string;
  phone?: string;
  place?: string;
  social?: Array<{
    address: string;
  }>;
}

interface MenuItem {
  url: string;
  title: string;
  newWindow?: boolean;
}

interface Menu {
  ariaLabel?: string;
  menuItems: MenuItem[];
}

function imageUrl(imageKey: string, scale: string): {url: string} {
  return {
    url: assetUrl({
      path: imageKey,
      params: {scale}
    })
  };
}

function processSocialMedia(social: Array<{address: string}>): Array<{href: string; className: string}> {
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
 * Content type processor for portal:site and lib.no:page
 * Handles rendering of page content type items directly without requiring page descriptor selection
 */
export const pageContentProcessor: ComponentProcessor<'portal:site'> = (processorContext) => {
  const content = getContent();

  log.info('[pageContentProcessor] Processing page for content: ' + content._id);
  log.info('[pageContentProcessor] Content type: ' + content.type);
  log.info('[pageContentProcessor] Has component in context: ' + !!processorContext.component);

  // React4xp v6: When portal:site has a page descriptor, delegate to page descriptor processor
  // This ensures proper nested component processing
  if (content.page && content.page.descriptor) {
    log.info('[pageContentProcessor] Content has page descriptor: ' + content.page.descriptor);
    log.info('[pageContentProcessor] Delegating to page descriptor processor');

    /*
    if (content.page.descriptor === 'lib.no:default') {
      return defaultPageProcessor(processorContext);
    }
    */

    // Add other page descriptor processors here as needed
    log.warning('[pageContentProcessor] Unknown page descriptor: ' + content.page.descriptor);
  }

  if (processorContext.component) {
    log.info('[pageContentProcessor] Component type: ' + processorContext.component.type);
    log.info('[pageContentProcessor] Component path: ' + processorContext.component.path);
  }

  const site = getPortalSite();
  const config = getSiteConfig<SiteConfig>({
    key: content._id,
    applicationKey: 'lib.no'
  });

  const menuItems = getMenuTree(1) as Menu;

  const {
    language,
    type: contentType
  } = content || {};

  const isFragment = contentType === 'portal:fragment';

  const {
    email,
    image: imageKey,
    phone,
    place,
    social = []
  } = config || {};

  const returnData: Record<string, unknown> = {
    title: site?.displayName || 'Liberalistene',
    language: (language && language.split('_')[0]) || 'no',
    email,
    image: imageKey ? imageUrl(imageKey, 'block(168,40)') : undefined,
    phone,
    place,
    menu: menuItems,
    some: processSocialMedia(social),
    isFragment,
    cssUrl: assetUrl({path: 'styles/tailwind.css'})
  };

  // For content type processors (portal:site), regions are NOT automatically available in component prop
  // We need to manually get them from content.page and return them so DataFetcher can process nested components
  if (content.page && content.page.regions) {
    log.info('[pageContentProcessor] Manually including page regions in return data');
    returnData.regions = content.page.regions;
  }

  return returnData;
};
