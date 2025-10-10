import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {attachmentUrl} from '/lib/xp/portal';

interface ImageBlockConfig {
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
  headerPosition?: string;
  headerType?: string;
  image?: string;
  imageOverlay?: string;
  ingress?: string;
  ingressColor?: string;
  mobileSize?: string;
}

export const imageBlockProcessor: ComponentProcessor<'lib.no:imageblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ImageBlockConfig;

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
    Tag: config?.headerType || 'h1',
    image: config?.image && {
      // TODO: Add back when /lib/shared/image is migrated
      // ...imageUrl(config.image, 'full'),
      url: attachmentUrl({id: config.image})
    },
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    position: config?.headerPosition,
    title: titleList,
    titleClassName: config?.mobileSize || 'full'
  };
};
