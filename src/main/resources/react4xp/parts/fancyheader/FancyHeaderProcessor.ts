import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';

/**
 * Configuration for the FancyHeader part.
 */
interface FancyHeaderConfig {
  /** Image content ID */
  image?: string;
  /** Effect overlay image content ID */
  effect?: string;
  /** Header title text */
  title?: string;
}

/**
 * Processor for the FancyHeader part component.
 *
 * Transforms FancyHeader part configuration into props for the FancyHeader React component.
 * Handles image URL generation for both the main header image and optional effect overlay.
 *
 * @param component - The part component containing configuration
 * @returns Props object with processed image URLs and title
 *
 * @example
 * ```typescript
 * // Returns:
 * {
 *   image: '/_/image/abc123:full/scale-full',
 *   title: 'Welcome to Liberalistene',
 *   effect: '/_/image/def456:full/scale-full'
 * }
 * ```
 */
export const fancyHeaderProcessor: ComponentProcessor<'lib.no:fancyheader'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as FancyHeaderConfig;


  return {
    image: imageUrl(config?.image, 'full'),
    title: config?.title || '',
    effect: imageUrl(config?.effect, 'full')
  };
};
