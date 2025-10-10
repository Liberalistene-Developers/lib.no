import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {NestedRecord, PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import { type ButtonProps } from '../../common/Button/ButtonProps';

/**
 * Button part configuration matching button.xml schema
 */
interface ButtonConfig extends NestedRecord {
  /** Button text (required) */
  buttonText: string;
  /** URL selector option-set (required) */
  urlSelector: {
    /** Selected option: 'intern' or 'extern' */
    _selected: 'intern' | 'extern';
    /** Internal page configuration */
    intern?: {
      /** Content ID for internal page (required when intern is selected) */
      url: string;
    };
    /** External URL configuration */
    extern?: {
      /** External URL */
      externUrl?: string;
      /** Target window: '_self' or '_blank' (default: '_self', required when extern is selected) */
      target?: '_self' | '_blank';
    };
  };
}

export const buttonProcessor: ComponentProcessor<'lib.no:button'> = ({component}): Record<string, unknown> => {
  try {

    const partComponent = component  as PartComponent;
    const data = partComponent.config as ButtonConfig

    const createUrl = (config: ButtonConfig): [string | undefined, string | undefined] => {
      try {
        const urlType = config?.urlSelector?._selected;

        if (!config?.urlSelector || !config.urlSelector._selected) {
          throw new Error('URL selector is missing or invalid');
        }
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
      } catch (error) {
        log.error('Error creating URL:', error);

        return [undefined, undefined];
      }
    };

    const [url, target] = createUrl(data);

    return {
      title: data?.buttonText,
      url,
      target,
      className: 'medium-margin'
    } as ButtonProps;
  }
  catch (error) {
    log.error('Error in buttonProcessor:', error);

    return {
      title: 'Error',
      url: undefined,
      target: undefined,
      className: 'medium-margin'
    } as ButtonProps;
  }
};
