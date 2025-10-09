import { PageComponent } from "@enonic-types/core";
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { assetUrl } from '/lib/enonic/asset';

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

export const pageProcessor: ComponentProcessor<'lib.no:Page'> = (props) => {
  const {regions} = props.component as PageComponent;

  return {
    regions,
    name: 'main',
  }

};
