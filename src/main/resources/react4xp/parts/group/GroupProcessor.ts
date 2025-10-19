import type {ComponentProcessor} from '@enonic-types/lib-react4xp/DataFetcher';
import type {PartComponent} from '@enonic-types/core';
import {pageUrl} from '/lib/xp/portal';
import {get as getContent} from '/lib/xp/content';
import {imageUrl} from '/react4xp/utils/image';
import {processHtml} from '/react4xp/utils/html';

/**
 * Configuration for the Group part.
 */
interface GroupConfig {
  /** Header background color */
  headerColor?: string;
  /** Header text position/alignment */
  headerPosition?: string;
  /** Whether to display ingress text over image */
  ingressInImage?: boolean;
  /** Whether to display title over image */
  titleInImage?: boolean;
  /** Image size variant */
  imagesize?: string;
  /** Image display type/style */
  imagetype?: boolean;
}

/**
 * Content data for Group content type.
 */
interface GroupData {
  /** Short description/ingress text */
  'short-description'?: string;
  /** Full description (HTML content) */
  description?: string;
  /** Group image content ID */
  image?: string;
  /** Comma-separated tags for categorization */
  tags?: string;
  /** Array of board members with role and person references */
  member?: Array<{role: string; person: string}>;
  /** Physical address of the group */
  address?: string;
}

/**
 * Content data for Person content type.
 */
interface PersonData {
  /** Person image content ID */
  image?: string;
  /** Short description about the person */
  'short-description'?: string;
}

/**
 * Processor for the Group part component.
 *
 * Transforms group/organization content into props for the Group React component.
 * Handles complex data structure including:
 * - Group information (title, descriptions, image, location)
 * - Board member list with role and person lookups
 * - Multiple display configuration options for headers and images
 *
 * Fetches related content for each board member (role names and person details)
 * using XP Content API and builds a structured board member array with links.
 *
 * @param component - The part component containing configuration
 * @param content - The group content item
 * @returns Props object with group data and board member information
 *
 * @example
 * ```typescript
 * // Returns:
 * {
 *   title: 'Oslo Liberalistene',
 *   image: '/_/image/abc123:full/scale-full',
 *   imagesize: 'large',
 *   imagetype: true,
 *   headerColor: 'blue',
 *   headerPosition: 'center',
 *   ingressInImage: false,
 *   titleInImage: true,
 *   shortDescription: 'Local chapter in Oslo',
 *   description: '<p>Oslo Liberalistene represents...</p>',
 *   location: {
 *     address: 'Karl+Johans+gate+22,Oslo'
 *   },
 *   board: [
 *     {
 *       name: 'Jane Doe',
 *       role: 'Chairperson',
 *       shortDescription: 'Political activist',
 *       url: '/people/jane-doe',
 *       image: '/_/image/def456:full/scale-full'
 *     }
 *   ],
 *   tags: 'oslo,local,chapter'
 * }
 * ```
 */
export const groupProcessor: ComponentProcessor<'lib.no:group'> = ({component, content}) => {
  const partComponent = component as unknown as PartComponent;
  const config = partComponent.config as GroupConfig;


  const data = content.data as GroupData;
  const members = data.member ? [].concat(data.member) : [];

  return {
    title: content.displayName,
    image: imageUrl(data.image, 'full'),
    imagesize: config?.imagesize,
    imagetype: config?.imagetype,
    headerColor: config?.headerColor,
    headerPosition: config?.headerPosition,
    ingressInImage: config?.ingressInImage,
    titleInImage: config?.titleInImage,
    shortDescription: data['short-description'],
    description: processHtml(data.description || ''),
    location: {
      address: (data.address || '').replace('\n', ',').replace(/ /g, '+')
    },
    board: members.map(({role: roleId, person: personId}) => {
      const roleContent = getContent({key: roleId});
      const personContent = getContent({key: personId});

      if (!personContent) {
        return null;
      }

      const personData = personContent.data as PersonData;

      return {
        name: personContent.displayName,
        role: roleContent?.displayName,
        shortDescription: personData['short-description'],
        url: personContent._path ? pageUrl({path: personContent._path}) : undefined,
        image: imageUrl(personData.image, 'full')
      };
    }).filter(Boolean),
    tags: data.tags
  };
};
