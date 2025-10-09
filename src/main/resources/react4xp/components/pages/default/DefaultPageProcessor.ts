import {PageComponent} from "@enonic-types/core";
import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {getSiteConfig} from '/lib/xp/content';
import {getContent, getSite as getPortalSite} from '/lib/xp/portal';
import {assetUrl} from '/lib/enonic/asset';
import {getMenuTree} from '/lib/menuWrapper';

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

export const defaultPageProcessor: ComponentProcessor<'lib.no:default'> = (props) => {
  const {regions} = props.component as PageComponent;
  const content = getContent();

  log.info('[defaultPageProcessor] Processing page for content: ' + content._id);
  log.info('[defaultPageProcessor] Content type: ' + content.type);
  log.info('[defaultPageProcessor] Content page: ' + JSON.stringify(content.page, null, 2));

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
    // NOTE: Do NOT return regions here - they are automatically processed by DataFetcher
    // and made available through the component prop
    cssUrl: assetUrl({path: 'styles/tailwind.css'}),
    regions
  };
};
