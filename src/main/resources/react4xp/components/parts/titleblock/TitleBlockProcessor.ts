import type { PartComponent } from '@enonic-types/core';
import type { ComponentProcessor } from '@enonic-types/lib-react4xp/DataFetcher';
import { imageUrl } from '/lib/shared/image';

interface TitleBlockConfig {
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

export const titleBlockProcessor: ComponentProcessor<'lib.no:titleblock'> = ({component}) => {
  log.info('[titleBlockProcessor] Called!');
  log.info('[titleBlockProcessor] Component exists: ' + !!component);

  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as TitleBlockConfig;

  log.info('[titleBlockProcessor] Config exists: ' + !!config);
  log.info('[titleBlockProcessor] Config: ' + JSON.stringify(config, null, 2));

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
    // image: config?.image, // Temporarily unprocessed
    title: titleList,
    position: config?.headerPosition,
    ingress: config?.ingress,
    ingressColor: config?.ingressColor,
    overlay: config?.imageOverlay ? `overlay ${config.imageOverlay}` : undefined,
    imageClass: config?.mobileSize || 'full'
  };
};
