import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {getParts} from '/react4xp/utils/programme';

/**
 * Part configuration for programme section component.
 */
interface ProgrammeSectionConfig {
  /** Custom title for the parts/conclusions section */
  conclusionTitle?: string;
}

/**
 * Programme section content data structure from content type.
 */
interface ProgrammeSectionData {
  /** Description text for the programme section (HTML) */
  description?: string;
  /** Tags for categorization */
  tags?: string;
}

/**
 * Processes programme section content for the ProgrammeSection component.
 *
 * Fetches programme section data including parts (sub-items) from the content tree.
 * A programme section represents a top-level category in the political programme,
 * containing multiple programme parts underneath.
 *
 * Used for displaying the highest-level programme organization (e.g., "Domestic Policy",
 * "Foreign Policy") with their associated programme parts.
 *
 * **Data Flow:**
 * 1. Extracts part config and content data
 * 2. Retrieves all child programme parts using getParts() utility
 * 3. Returns ProgrammeSection props with title, description, parts, and metadata
 *
 * @param component - The part component configuration from Enonic XP
 * @param content - The programme section content from Enonic XP
 * @returns ProgrammeSection props including title, description, parts array, and tags
 *
 * @example
 * ```ts
 * // Content data
 * {
 *   displayName: "Domestic Policy",
 *   _path: "/programmes/domestic",
 *   data: {
 *     description: "<p>Our domestic policy positions</p>",
 *     tags: "domestic, policy"
 *   }
 * }
 *
 * // Part config
 * {
 *   conclusionTitle: "Policy Areas"
 * }
 *
 * // Returns:
 * {
 *   title: "Domestic Policy",
 *   description: "<p>Our domestic policy positions</p>",
 *   conclusionTitle: "Policy Areas",
 *   parts: [...], // Array of programme part items
 *   tags: "domestic, policy"
 * }
 * ```
 *
 * @remarks
 * - Uses getParts() to fetch child programme part items from the content tree
 * - conclusionTitle defaults to "Liberalistene vil:" (Norwegian: "Liberalists want:")
 * - This is the top-level in the programme hierarchy: Section > Part > Conclusion
 */
export const programmeSectionProcessor: ComponentProcessor<'lib.no:programme-section'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as ProgrammeSectionConfig;


  const data = content.data as ProgrammeSectionData;

  const parts = getParts({key: content._path});

  return {
    title: content.displayName,
    description: data.description,
    conclusionTitle: config?.conclusionTitle || 'Liberalistene vil:',
    parts,
    tags: data.tags
  };
};
