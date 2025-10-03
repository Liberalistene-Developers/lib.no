import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getSiteConfig} from '/lib/xp/content';
import {getContent, assetUrl, getSite as getPortalSite} from '/lib/xp/portal';
// @ts-expect-error - lib-menu types not available
import {getMenuTree} from '/lib/menu';

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

export const defaultPageProcessor: ComponentProcessor<'lib.no:default'> = () => {
  const content = getContent();
  const site = getPortalSite();
  const config = getSiteConfig<SiteConfig>({
    key: content._id,
    applicationKey: 'lib.no'
  });

  const menuItems = getMenuTree(1) as Menu;

  const {
    language,
    type: contentType,
    page
  } = content || {};

  const isFragment = contentType === 'portal:fragment';

  const {
    email,
    image: imageKey,
    phone,
    place,
    social = []
  } = config || {};

  return {
    title: site?.displayName || 'Liberalistene',
    language: (language && language.split('_')[0]) || 'no',
    email,
    image: imageKey ? imageUrl(imageKey, 'block(168,40)') : undefined,
    phone,
    place,
    menu: menuItems,
    some: processSocialMedia(social),
    isFragment,
    regions: isFragment ? undefined : page?.regions
  };
};
