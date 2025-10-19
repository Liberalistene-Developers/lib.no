import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';

/**
 * Candidate block part configuration from candidateblock.xml schema.
 */
interface CandidateBlockConfig {
  /** Optional title for the candidate block */
  title?: string;
  /** Whether to center the heading */
  centerheading?: boolean;
}

/**
 * Candidate block content data structure.
 *
 * Contains a list of candidates with their person references and positions.
 */
interface CandidateBlockData {
  /** Array of candidates with person ID and position */
  candidates?: Array<{
    /** Content ID of the person */
    person: string;
    /** Candidate's position/role in the election */
    position: string;
  }>;
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image reference */
  image?: string;
  /** Person's email address */
  email?: string;
  /** Person's phone number */
  phone?: string;
}

/**
 * Processes candidate block content for the CandidateBlock component.
 *
 * Fetches candidate data from a content item containing candidate-person associations,
 * then retrieves full person data (name, image, contact info) for each candidate.
 *
 * Used for displaying election candidates with their positions and contact information.
 *
 * **Data Flow:**
 * 1. Extracts candidate block configuration from part component
 * 2. Retrieves candidates array from content data
 * 3. For each candidate:
 *    - Fetches person content using person ID
 *    - Retrieves person data (name, image, email, phone)
 *    - Generates full-size profile image URL
 *    - Combines person data with position
 * 4. Returns CandidateBlock props with candidates array
 *
 * @param component - The candidateblock part component from Enonic XP
 * @param content - The candidate block content node from Enonic XP
 * @returns CandidateBlock props including candidates array and heading settings
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   title: "Our Candidates 2025",
 *   centerheading: true
 * }
 *
 * // Content data
 * {
 *   candidates: [
 *     { person: "person1", position: "1" },
 *     { person: "person2", position: "2" },
 *     { person: "person3", position: "3" }
 *   ]
 * }
 *
 * // Returns:
 * {
 *   title: "Our Candidates 2025",
 *   headingClassName: "center",
 *   items: [
 *     { name: "John Doe", position: "1", email: "john@example.com", phone: "123...", image: {...} },
 *     ...
 *   ]
 * }
 * ```
 *
 * @remarks
 * - Candidates array is normalized (handles both single object and array)
 * - Non-existent persons are filtered out
 * - Profile images use 'full' size
 * - headingClassName is set to 'center' when centerheading is true
 */
export const candidateBlockProcessor: ComponentProcessor<'lib.no:candidateblock'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidateBlockConfig;


  const data = content.data as CandidateBlockData;
  const candidates = data.candidates ? [].concat(data.candidates) : [];

  return {
    title: config?.title,
    headingClassName: config?.centerheading ? 'center' : undefined,
    items: candidates.map(({person: personKey, position}) => {
      const personContent = getContent({key: personKey});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        name: personContent.displayName,
        email: personData.email,
        image: imageUrl(personData.image, 'full'),
        phone: personData.phone,
        position
      };
    }).filter(Boolean)
  };
};
