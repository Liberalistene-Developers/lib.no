import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';

interface OrganizationalPositionData {
  description?: string;
  short_description?: string;
  tags?: string;
}

/**
 * Processes the OrganizationalPosition content type to display positions within the party.
 *
 * This processor extracts organizational position details from content data, typically used
 * to describe roles, responsibilities, and positions available within the party structure.
 * The position title comes from the content's display name.
 *
 * @param {object} params - The processor parameters from React4xp
 * @param {Content} params.content - The organizational position content item
 * @returns {object} Props for the OrganizationalPosition component including:
 *   - title: Position name from content displayName (e.g., "Party Secretary")
 *   - shortDescription: Brief one-line description of the position
 *   - description: Detailed HTML description of responsibilities and requirements
 *   - tags: Comma-separated or tagged classification of the position
 *
 * @example
 * // Returns props for an organizational position
 * {
 *   title: "Communications Director",
 *   shortDescription: "Lead the party's communication strategy",
 *   description: "<p>Responsible for media relations, social media...</p>",
 *   tags: "communications,leadership,full-time"
 * }
 */
export const organizationalPositionProcessor: ComponentProcessor<'lib.no:organizational-position'> = ({content}) => {
  const data = content.data as OrganizationalPositionData;

  return {
    title: content.displayName,
    shortDescription: data.short_description,
    description: data.description,
    tags: data.tags
  };
};
