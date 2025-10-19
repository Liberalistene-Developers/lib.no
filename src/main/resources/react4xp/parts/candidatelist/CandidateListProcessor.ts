import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Candidate list part configuration from candidatelist.xml schema.
 */
interface CandidateListConfig {
  /** Array of candidate entries with person ID, role, and description */
  candidate?: Array<{
    /** Candidate's role/position */
    role: string;
    /** Description of candidate or their platform (HTML) */
    description: string;
    /** Content ID of the person */
    person: string;
  }>;
  /** Whether to display role information */
  showrole?: boolean;
  /** Image size specification */
  imagesize?: string;
  /** Whether to use round image type */
  imagetype?: boolean;
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image reference */
  image?: string;
}

/**
 * Processes candidate list configuration for the CandidateList component.
 *
 * Fetches candidate data from configuration and retrieves associated person information
 * (name, image, profile URL) for each candidate. Processes HTML descriptions for safe rendering.
 *
 * Used for displaying political candidates with their roles, descriptions, and profile links.
 *
 * **Data Flow:**
 * 1. Extracts candidate list configuration from part component
 * 2. Retrieves candidates array from configuration
 * 3. For each candidate:
 *    - Fetches person content using person ID
 *    - Retrieves person data (name, image)
 *    - Generates profile page URL
 *    - Generates full-size profile image URL
 *    - Processes HTML description
 * 4. Returns CandidateList props with candidates and display settings
 *
 * @param component - The candidatelist part component from Enonic XP
 * @returns CandidateList props including candidates array and display configuration
 *
 * @example
 * ```ts
 * // Configuration
 * {
 *   candidate: [
 *     {
 *       person: "person1",
 *       role: "Mayor Candidate",
 *       description: "<p>Platform: Lower taxes, better schools</p>"
 *     },
 *     {
 *       person: "person2",
 *       role: "Council Member",
 *       description: "<p>Platform: Improved infrastructure</p>"
 *     }
 *   ],
 *   showrole: true,
 *   imagesize: "medium",
 *   imagetype: true
 * }
 *
 * // Returns:
 * {
 *   showRole: true,
 *   imagesize: "medium",
 *   imagetype: true,
 *   items: [
 *     {
 *       itemId: "person1",
 *       name: "John Doe",
 *       role: "Mayor Candidate",
 *       shortDescription: "<p>Platform: Lower taxes...</p>",
 *       url: "/people/john-doe",
 *       image: {...}
 *     },
 *     ...
 *   ]
 * }
 * ```
 *
 * @remarks
 * - Candidates array is normalized (handles both single object and array)
 * - Non-existent persons are filtered out
 * - Profile images use 'full' size
 * - HTML descriptions are processed via processHtml for safe rendering
 * - Each candidate includes a link to their full profile page
 */
export const candidateListProcessor: ComponentProcessor<'lib.no:candidatelist'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidateListConfig;


  const candidates = config?.candidate ? [].concat(config.candidate) : [];

  return {
    showRole: !!config?.showrole,
    imagesize: config?.imagesize || '',
    imagetype: !!config?.imagetype,
    items: candidates.map(({role, description, person: personId}) => {
      const personContent = getContent({key: personId});
      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        itemId: personId,
        name: personContent.displayName,
        role,
        shortDescription: processHtml(description),
        url: pageUrl({path: personContent._path}),
        image: imageUrl(personData.image, 'full')
      };
    }).filter(Boolean)
  };
};
