import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import {imageUrl} from '/react4xp/utils/image';

interface IntroBlockData {
  introimage?: string;
  introtitle?: string;
  introdescription?: string;
  introcaption?: string;
}

/**
 * Processes intro block content data for rendering.
 *
 * Fetches intro block fields from content data and transforms them into props
 * for the IntroBlock component. Used for displaying introductory content with
 * an image, title, description, and optional caption.
 *
 * @param {Object} params - Processor parameters
 * @param {Content<IntroBlockData>} params.content - The content item with intro block data fields
 *
 * @returns {Object} Props for the IntroBlock component
 * @returns {string} [returns.caption] - Caption text for the intro block
 * @returns {string} [returns.description] - Description/body text
 * @returns {string} returns.image - Processed full-size image URL from XP media library
 * @returns {string} [returns.title] - Title text for the intro block
 *
 * @example
 * // Typical intro block output
 * {
 *   title: 'Welcome to Liberalistene',
 *   description: 'We stand for individual freedom...',
 *   image: '/site/default/draft/media/intro.jpg/_/image/full',
 *   caption: 'Party headquarters, Oslo'
 * }
 */
export const introBlockProcessor: ComponentProcessor<'lib.no:introblock'> = ({content}) => {
  const data = content.data as IntroBlockData;

  return {
    caption: data.introcaption,
    description: data.introdescription,
    image: imageUrl(data.introimage, 'full'),
    title: data.introtitle
  };
};
