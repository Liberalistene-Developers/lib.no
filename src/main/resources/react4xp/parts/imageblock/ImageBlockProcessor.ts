import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

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

  log.info(`[ImageBlockProcessor] Processing path: ${partComponent.path}`);

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
    image: imageUrl(config?.image, 'full'),
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    position: config?.headerPosition,
    title: titleList,
    titleClassName: config?.mobileSize || 'full'
  };
};
