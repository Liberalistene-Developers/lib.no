import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getContent as getPortalContent} from '/lib/xp/portal';
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

export const localBranchProcessor: ComponentProcessor<'lib.no:localbranch'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBranchConfig;

  const content = getPortalContent();
  if (!content) {
    return {};
  }

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
