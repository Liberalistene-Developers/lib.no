import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

interface PersonConfig {
  emailPrefix?: string;
}

interface PersonData {
  image?: string;
  description?: string;
  'short-description'?: string;
  email?: string;
  tags?: string | string[];
}

/**
 * Processes person content for display.
 *
 * This processor transforms person content data into props for the Person component,
 * handling image URL generation, HTML sanitization, and email configuration.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Component} params.component - The part component instance containing configuration
 * @param {Content} params.content - The person content item being displayed
 * @returns {object} Props for the Person component including:
 *   - title: Person's display name from content
 *   - image: Optimized image URL (192x256 block)
 *   - description: Sanitized HTML description
 *   - shortDescription: Brief description text
 *   - email: Person's email address
 *   - emailPrefix: Optional prefix for the email display (from config)
 *   - tags: Array of tags associated with the person
 *
 * @example
 * // Returns props with formatted person data
 * {
 *   title: "John Doe",
 *   image: "/_/image/abc123:def456/block(192,256)/photo.jpg",
 *   description: "<p>Member of parliament...</p>",
 *   shortDescription: "Politician and activist",
 *   email: "john.doe@example.com",
 *   emailPrefix: "Contact:",
 *   tags: ["politics", "economics"]
 * }
 */
export const personProcessor: ComponentProcessor<'lib.no:person'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as PersonConfig;


  const data = content.data as PersonData;
  const tags = data.tags ? [].concat(data.tags) : [];

  return {
    title: content.displayName,
    image: imageUrl(data.image, 'block(192,256)'),
    description: processHtml(data.description || ''),
    shortDescription: data['short-description'],
    email: data.email,
    emailPrefix: config?.emailPrefix,
    tags
  };
};
