import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

interface LocalBlockConfig {
  image?: string;
  headerPosition?: string;
  imageOverlay?: string;
  ingress?: string;
  ingressColor?: string;
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
  mobileSize?: string;
}

export const localBlockProcessor: ComponentProcessor<'lib.no:localblock'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as LocalBlockConfig;

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
    Tag: 'h1',
    image: imageUrl(config?.image, 'full'),
    title: titleList,
    position: config?.headerPosition,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    titleClassName: config?.mobileSize || 'full'
  };
};
