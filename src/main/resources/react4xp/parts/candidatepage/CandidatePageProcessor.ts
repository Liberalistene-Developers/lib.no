import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Configuration for the candidate page part.
 */
interface CandidatePageConfig {
  /** Optional decorative image ID (e.g., art/background image) */
  image?: string;
}

/**
 * Content data structure for candidate page content type.
 */
interface CandidatePageData {
  /** Reference(s) to person content item(s) */
  person?: string | string[];
  /** Override image for the candidate */
  image?: string;
  /** Override ingress/short description */
  ingress?: string;
  /** Override full description */
  description?: string;
  /** Candidate's position/role */
  position?: string;
  /** Candidate's location */
  place?: string;
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image ID */
  image?: string;
  /** Person's short description */
  'short-description'?: string;
  /** Person's full description */
  description?: string;
  /** Person's email address */
  email?: string;
  /** Person's phone number */
  phone?: string;
}

/**
 * Processor for candidate page component.
 *
 * Fetches and merges candidate page data with referenced person data to create
 * a complete candidate profile. The processor:
 * - Retrieves person content referenced by the page
 * - Merges page data with person data (page data takes precedence)
 * - Processes HTML content and image URLs
 * - Formats position and place information
 *
 * @param component - The React4xp component configuration
 * @param content - The current content item (candidate page)
 * @returns Props object for CandidatePage component with profile data
 *
 * @example
 * ```ts
 * // Returns:
 * {
 *   title: "John Doe",
 *   ingress: "<p>Experienced politician...</p>",
 *   description: "<p>Full bio...</p>",
 *   email: "john@example.com",
 *   phone: "+47 123 45 678",
 *   image: "https://example.com/_/image/abc123:full",
 *   fancyImage: true,
 *   artImage: "https://example.com/_/image/xyz789:full",
 *   position: "Candidate, Oslo"
 * }
 * ```
 */
export const candidatePageProcessor: ComponentProcessor<'lib.no:candidatepage'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidatePageConfig;


  const data = content.data as CandidatePageData;
  const persons = data.person ? [].concat(data.person) : [];

  const personProps = persons.map((personID) => {
    const personContent = getContent({key: personID});
    if (!personContent) {
      return null;
    }

    const personData = personContent.data as PersonData;

    return {
      title: content.displayName || personContent.displayName,
      ingress: processHtml(data.ingress || personData['short-description'] || ''),
      description: processHtml(data.description || personData.description || ''),
      email: personData.email,
      phone: personData.phone,
      image: imageUrl(data.image || personData.image, 'full'),
      fancyImage: !!config?.image,
      artImage: imageUrl(config?.image, 'full'),
      position: `${data.position || ''}, ${data.place || ''}`
    };
  }).filter(Boolean);

  return personProps.length > 0 ? personProps[0] : {};
};
