import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface JoinConfig {
  buttonText?: string;
  url?: string;
  message?: string;
  backMessage?: string;
  image?: string;
  frontPlacement?: string;
}

export const joinProcessor: ComponentProcessor<'lib.no:join'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as JoinConfig;

  const urlContent = config?.url ? getContent({key: config.url}) : null;

  return {
    buttonText: config?.buttonText,
    url: urlContent ? pageUrl({path: urlContent._path}) : undefined,
    message: processHtml(config?.message || ''),
    backMessage: processHtml(config?.backMessage || ''),
    image: imageUrl(config?.image, 'square(200)'),
    className: 'medium-margin',
    frontPlacement: config?.frontPlacement
  };
};
