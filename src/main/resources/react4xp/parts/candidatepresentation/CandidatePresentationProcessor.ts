import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {get as getContent} from '/lib/xp/content';
import {pageUrl} from '/lib/xp/portal';
import {imageUrl} from '/react4xp/utils/image';
import {runQuery} from '/react4xp/utils/query';

/**
 * Configuration for the candidate presentation part.
 */
interface CandidatePresentationConfig {
  /** Item selection configuration (manual or query-based) */
  itemsSet?: {
    /** Selection mode: 'manual' or 'query' */
    _selected?: string;
    /** Manual selection configuration */
    manual?: {
      /** Array of manually selected candidate content IDs */
      items?: string[];
    };
    /** Query-based selection configuration */
    query?: {
      /** Root path for content query */
      queryroot?: string;
      /** Sorting option (e.g., 'asc', 'desc', 'normal') */
      querysorting?: string;
      /** Maximum number of items to fetch */
      count?: number;
    };
  };
  /** Whether to display candidates with highlighted styling */
  highlighted?: boolean;
  /** Optional text to display before the candidate list */
  preText?: string;
}

/**
 * Candidate content data structure.
 */
interface CandidateData {
  /** Reference to associated person content */
  person?: string;
  /** Candidate's image ID */
  image?: string;
  /** Candidate's location */
  place?: string;
  /** Candidate's position/role */
  position?: string;
  /** Candidate's short description/bio */
  ingress?: string;
}

/**
 * Person content data structure.
 */
interface PersonData {
  /** Person's profile image ID */
  image?: string;
  /** Person's short description */
  'short-description'?: string;
}

/**
 * Processor for candidate presentation component.
 *
 * Fetches and formats a list of candidates for display. Supports two modes:
 * - **Manual selection:** Specific candidates chosen by editor
 * - **Query selection:** Dynamic candidates fetched via content query
 *
 * For each candidate, the processor:
 * - Fetches candidate content and associated person data
 * - Merges candidate and person data (candidate data takes precedence)
 * - Generates page URLs and processes images
 * - Returns formatted list with name, image, position, place, and ingress
 *
 * @param component - The React4xp component configuration
 * @returns Props object for CandidatePresentation component
 *
 * @example
 * ```ts
 * // Returns:
 * {
 *   items: [
 *     {
 *       name: "Jane Smith",
 *       image: "https://example.com/_/image/abc123:full",
 *       place: "Bergen",
 *       position: "City Council Candidate",
 *       ingress: "Experienced leader...",
 *       url: "/candidates/jane-smith"
 *     }
 *   ],
 *   highlighted: true,
 *   preText: "Meet our candidates"
 * }
 * ```
 */
export const candidatePresentationProcessor: ComponentProcessor<'lib.no:candidatepresentation'> = ({component}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as CandidatePresentationConfig;


  const selection = config?.itemsSet?._selected || 'manual';
  const items: string[] = [];

  if (selection === 'manual') {
    items.push(...(config?.itemsSet?.manual?.items || []));
  } else if (selection === 'query') {
    const queryConfig = config?.itemsSet?.query;
    if (queryConfig?.queryroot) {
      const queryItems = runQuery(
        queryConfig.queryroot,
        queryConfig.count || 10,
        undefined,
        queryConfig.querysorting
      );
      if (queryItems) {
        items.push(...queryItems);
      }
    }
  }

  return {
    items: items.map((itemID) => {
      const candidateContent = getContent({key: itemID});
      if (!candidateContent) {
        return null;
      }

      const candidateData = candidateContent.data as CandidateData;
      const personID = candidateData.person;

      let personImageKey: string | undefined;
      let shortDescription: string | undefined;

      if (personID) {
        const personContent = getContent({key: personID});
        if (personContent) {
          const personData = personContent.data as PersonData;
          personImageKey = personData.image;
          shortDescription = personData['short-description'];
        }
      }

      return {
        name: candidateContent.displayName,
        image: imageUrl(candidateData.image || personImageKey, 'full'),
        place: candidateData.place,
        position: candidateData.position,
        ingress: candidateData.ingress || shortDescription,
        url: pageUrl({path: candidateContent._path})
      };
    }).filter(Boolean),
    highlighted: config?.highlighted,
    preText: config?.preText
  };
};
