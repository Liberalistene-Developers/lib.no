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

/**
 * Processes the "Join" call-to-action component configuration.
 *
 * This processor transforms the join part configuration into props for the Join component,
 * handling content URL resolution, HTML sanitization, and image URL generation.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @returns {object} Props for the Join component including:
 *   - buttonText: Text displayed on the call-to-action button
 *   - url: Resolved page URL from referenced content (if configured)
 *   - message: Sanitized HTML message displayed on the front
 *   - backMessage: Sanitized HTML message displayed on the back (flip card)
 *   - image: Optimized image URL (200x200 square)
 *   - className: CSS class for spacing (always 'medium-margin')
 *   - frontPlacement: Position of content on the front of the card
 *
 * @example
 * // Returns props with resolved URL and sanitized HTML
 * {
 *   buttonText: "Bli medlem",
 *   url: "/join/membership",
 *   message: "<p>Join us today!</p>",
 *   backMessage: "<p>Benefits of membership...</p>",
 *   image: "/_/image/abc123:def456/square(200)/photo.jpg",
 *   className: "medium-margin",
 *   frontPlacement: "center"
 * }
 */
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
