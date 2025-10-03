import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';

interface ButtonConfig {
  buttonText?: string;
  urlSelector?: {
    _selected?: string;
    intern?: {
      url?: string;
    };
    extern?: {
      externUrl?: string;
      target?: string;
    };
  };
}

export const buttonProcessor: ComponentProcessor<'lib.no:button'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ButtonConfig;

  const urlType = config?.urlSelector?._selected;

  const createUrl = (): [string | undefined, string | undefined] => {
    if (urlType === 'intern') {
      const urlKey = config?.urlSelector?.intern?.url;
      if (urlKey) {
        const urlContent = getContent({key: urlKey});
        return [urlContent ? pageUrl({path: urlContent._path}) : '', undefined];
      }
      return ['', undefined];
    }

    return [
      config?.urlSelector?.extern?.externUrl,
      config?.urlSelector?.extern?.target
    ];
  };

  const [url, target] = createUrl();

  return {
    title: config?.buttonText,
    url,
    target,
    className: 'medium-margin'
  };
};
