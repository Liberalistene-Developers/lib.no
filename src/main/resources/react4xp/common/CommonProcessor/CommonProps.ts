import { type RequestMode, LiteralUnion } from '@enonic-types/core';
import type { MenuTree } from '/lib/menu';
import type { ImageData } from '@common/types';

export interface Social {
  href: string;
  className: string;
}

export interface SiteConfig {
  email?: string;
  image?: string;
  phone?: string;
  place?: string;
  social?: Array<{
    address: string;
  }>;
}

export interface CommonProcessorData extends Omit<SiteConfig, 'image'>, Record<string, unknown> {
  title?: string;
  language?: string;
  mode?: LiteralUnion<RequestMode, string>;
  menu?: MenuTree;
  some: Social[];
  image?: ImageData;
  cssUrl?: string;
  isFragment?: boolean;
}
