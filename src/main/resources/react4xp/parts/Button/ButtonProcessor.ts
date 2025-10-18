import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {NestedRecord, PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import { type ButtonProps } from '/react4xp/common/Button/ButtonProps';

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

/**
 * Processes button part configuration and generates button props.
 *
 * Transforms Enonic XP button part configuration into props for the Button component.
 * Handles both internal (content page) and external URLs, resolving internal content
 * references to full page URLs.
 *
 * **Data Flow:**
 * 1. Extracts button configuration from part component
 * 2. Resolves URL based on selected type (intern/extern)
 * 3. For internal URLs: Fetches content and generates page URL
 * 4. For external URLs: Uses URL directly with optional target
 * 5. Returns ButtonProps with title, url, target, and className
 *
 * @param component - The button part component from Enonic XP
 * @returns ButtonProps for rendering the Button component
 *
 * @example
 * ```ts
 * // Internal link
 * {
 *   buttonText: "Learn More",
 *   urlSelector: {
 *     _selected: "intern",
 *     intern: { url: "abc123" }  // Content ID
 *   }
 * }
 * // Returns: { title: "Learn More", url: "/path/to/page", target: undefined, className: "medium-margin" }
 *
 * // External link
 * {
 *   buttonText: "Visit Website",
 *   urlSelector: {
 *     _selected: "extern",
 *     extern: { externUrl: "https://example.com", target: "_blank" }
 *   }
 * }
 * // Returns: { title: "Visit Website", url: "https://example.com", target: "_blank", className: "medium-margin" }
 * ```
 */
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
