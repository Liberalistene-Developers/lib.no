import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getConclusions} from '/react4xp/utils/programme';

/**
 * Part configuration for programme part component.
 */
interface ProgrammePartConfig {
  /** Custom title for the conclusions section */
  conclusionTitle?: string;
}

/**
 * Programme part content data structure from content type.
 */
interface ProgrammePartData {
  /** Description text for the programme part (HTML) */
  description?: string;
  /** Tags for categorization */
  tags?: string;
}

/**
 * Processes programme part content for the ProgrammePart component.
 *
 * Fetches programme part data including conclusions (sub-items) from the content tree.
 * A programme part represents a major section of the political programme with multiple
 * detailed conclusions underneath.
 *
 * Used for displaying high-level programme categories (e.g., "Education", "Healthcare")
 * with their associated policy conclusions.
 *
 * **Data Flow:**
 * 1. Extracts part config and content data
 * 2. Retrieves all child conclusions using getConclusions() utility
 * 3. Returns ProgrammePart props with title, description, conclusions, and metadata
 *
 * @param component - The part component configuration from Enonic XP
 * @param content - The programme part content from Enonic XP
 * @returns ProgrammePart props including title, description, conclusions array, and tags
 *
 * @example
 * ```ts
 * // Content data
 * {
 *   displayName: "Education",
 *   _path: "/programmes/education",
 *   data: {
 *     description: "<p>Our education policies</p>",
 *     tags: "education, schools"
 *   }
 * }
 *
 * // Part config
 * {
 *   conclusionTitle: "Key Points"
 * }
 *
 * // Returns:
 * {
 *   title: "Education",
 *   description: "<p>Our education policies</p>",
 *   conclusionTitle: "Key Points",
 *   conclusions: [...], // Array of conclusion items
 *   tags: "education, schools"
 * }
 * ```
 *
 * @remarks
 * - Uses getConclusions() to fetch child conclusion items from the content tree
 * - conclusionTitle can be customized per part instance
 * - Empty conclusionTitle will default to empty string (component may use its own default)
 */
export const programmePartProcessor: ComponentProcessor<'lib.no:programme-part'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammePartConfig;


  const data = content.data as ProgrammePartData;

  const conclusions = getConclusions({key: content._path});

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || '',
    conclusions,
    tags: data.tags
  };
};
